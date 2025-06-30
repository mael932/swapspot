import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface UserData {
  email: string;
  fullName: string;
  password?: string;
  currentUniversity: string;
  exchangeUniversity: string;
  program: string;
  exchangeStart: string;
  exchangeEnd: string;
  currentAccommodationCity: string;
  address: string;
  monthlyRent: string;
  accommodationDescription: string;
  accommodationPhotos: string;
  amenities: string[];
  universityEmail: string;
  studentUpload: string;
  additionalVerificationInfo: string;
  createdAt: string;
  gdprConsent: boolean;
  matchingConsent: boolean;
  budget: string;
  preferredDestinations: string[];
  verificationMethod: string;
}

// Function to get Google access token using service account
async function getAccessToken() {
  const serviceAccountJson = Deno.env.get('GOOGLE_SERVICE_ACCOUNT_JSON');
  if (!serviceAccountJson) {
    console.error('GOOGLE_SERVICE_ACCOUNT_JSON environment variable not found');
    throw new Error('Google service account JSON not found');
  }

  console.log('Service account JSON found, length:', serviceAccountJson.length);
  
  let serviceAccount;
  try {
    serviceAccount = JSON.parse(serviceAccountJson);
    console.log('Service account parsed successfully, client_email:', serviceAccount.client_email);
  } catch (error) {
    console.error('Error parsing service account JSON:', error);
    throw new Error('Invalid service account JSON format');
  }
  
  // Create JWT for Google OAuth
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: serviceAccount.client_email,
    scope: 'https://www.googleapis.com/auth/spreadsheets',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
  };

  // Create JWT header
  const header = {
    alg: 'RS256',
    typ: 'JWT',
  };

  // Base64 encode header and payload
  const encodedHeader = btoa(JSON.stringify(header)).replace(/[+\/=]/g, (m) => ({'+': '-', '/': '_', '=': ''}[m]));
  const encodedPayload = btoa(JSON.stringify(payload)).replace(/[+\/=]/g, (m) => ({'+': '-', '/': '_', '=': ''}[m]));

  // Create signature using Web Crypto API
  const textEncoder = new TextEncoder();
  const data = textEncoder.encode(`${encodedHeader}.${encodedPayload}`);
  
  // Import private key
  const privateKeyPem = serviceAccount.private_key;
  const privateKeyDer = atob(privateKeyPem.replace(/-----BEGIN PRIVATE KEY-----|\r|\n|-----END PRIVATE KEY-----/g, ''));
  const privateKeyBuffer = new Uint8Array(privateKeyDer.length);
  for (let i = 0; i < privateKeyDer.length; i++) {
    privateKeyBuffer[i] = privateKeyDer.charCodeAt(i);
  }

  const cryptoKey = await crypto.subtle.importKey(
    'pkcs8',
    privateKeyBuffer,
    {
      name: 'RSASSA-PKCS1-v1_5',
      hash: 'SHA-256',
    },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign('RSASSA-PKCS1-v1_5', cryptoKey, data);
  const encodedSignature = btoa(String.fromCharCode(...new Uint8Array(signature))).replace(/[+\/=]/g, (m) => ({'+': '-', '/': '_', '=': ''}[m]));

  const jwt = `${encodedHeader}.${encodedPayload}.${encodedSignature}`;

  // Exchange JWT for access token
  const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
  });

  if (!tokenResponse.ok) {
    const errorText = await tokenResponse.text();
    console.error('Token exchange failed:', tokenResponse.status, errorText);
    throw new Error(`Failed to get access token: ${tokenResponse.status}`);
  }

  const tokenData = await tokenResponse.json();
  console.log('Access token obtained successfully');
  return tokenData.access_token;
}

// Function to check if headers exist and add them if needed
async function ensureHeaders(accessToken: string, spreadsheetId: string) {
  console.log('Checking if headers exist...');
  
  // First, check if there's any data in row 1
  const checkUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1!A1:U1`;
  
  const checkResponse = await fetch(checkUrl, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  if (!checkResponse.ok) {
    console.error('Error checking headers:', checkResponse.status);
    throw new Error(`Failed to check headers: ${checkResponse.status}`);
  }

  const checkData = await checkResponse.json();
  
  // If no data in row 1, add headers
  if (!checkData.values || checkData.values.length === 0) {
    console.log('No headers found, adding headers...');
    
    const headers = [
      'Timestamp',
      'Email', 
      'Name',
      'Password',
      'Current University',
      'Exchange University',
      'Program',
      'Exchange Start',
      'Exchange End',
      'Current Accommodation City',
      'Address',
      'Monthly Rent',
      'Budget',
      'Preferred Destinations',
      'Accommodation Description',
      'Accommodation Photos',
      'Amenities',
      'University Email',
      'Student Upload',
      'Additional Verification Information',
      'Verification Method',
      'GDPR Consent',
      'Matching Consent'
    ];

    const headerUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1!A1:W1?valueInputOption=RAW`;
    
    const headerResponse = await fetch(headerUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        values: [headers],
      }),
    });

    if (!headerResponse.ok) {
      const errorText = await headerResponse.text();
      console.error('Error adding headers:', headerResponse.status, errorText);
      throw new Error(`Failed to add headers: ${headerResponse.status}`);
    }

    console.log('Headers added successfully');
  } else {
    console.log('Headers already exist');
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Google Sheets function called');
    const userData: UserData = await req.json();
    console.log('User data received:', { email: userData.email, currentUniversity: userData.currentUniversity });
    
    // Get spreadsheet ID from environment
    const spreadsheetId = Deno.env.get('GOOGLE_SHEETS_SPREADSHEET_ID');
    
    if (!spreadsheetId) {
      console.error('GOOGLE_SHEETS_SPREADSHEET_ID not found');
      throw new Error('Missing Google Sheets spreadsheet ID');
    }

    console.log('Spreadsheet ID found:', spreadsheetId);

    // Get access token
    console.log('Getting access token...');
    const accessToken = await getAccessToken();

    // Ensure headers exist
    await ensureHeaders(accessToken, spreadsheetId);

    // Prepare row data that matches the headers exactly
    const rowData = [
      userData.createdAt,                                    // Timestamp
      userData.email,                                        // Email
      userData.fullName,                                     // Name
      userData.password || 'N/A',                           // Password
      userData.currentUniversity,                            // Current University
      userData.exchangeUniversity,                           // Exchange University
      userData.program,                                      // Program
      userData.exchangeStart,                                // Exchange Start
      userData.exchangeEnd,                                  // Exchange End
      userData.currentAccommodationCity,                     // Current Accommodation City
      userData.address,                                      // Address
      userData.monthlyRent,                                  // Monthly Rent
      userData.budget,                                       // Budget
      userData.preferredDestinations.join(', '),            // Preferred Destinations
      userData.accommodationDescription,                     // Accommodation Description
      userData.accommodationPhotos,                          // Accommodation Photos
      userData.amenities.join(', '),                        // Amenities
      userData.universityEmail,                              // University Email
      userData.studentUpload,                               // Student Upload
      userData.additionalVerificationInfo,                  // Additional Verification Information
      userData.verificationMethod,                          // Verification Method
      userData.gdprConsent ? 'Yes' : 'No',                 // GDPR Consent
      userData.matchingConsent ? 'Yes' : 'No',             // Matching Consent
    ];

    console.log('Prepared row data for Google Sheets:', rowData);

    // Append data as a new row (this will automatically find the next empty row)
    const sheetsUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1:append?valueInputOption=RAW`;
    
    console.log('Making request to Google Sheets API...');
    const response = await fetch(sheetsUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        values: [rowData],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Google Sheets API error:', response.status, errorText);
      throw new Error(`Google Sheets API error: ${response.status}`);
    }

    const result = await response.json();
    console.log('Successfully added user to Google Sheet:', result);

    return new Response(
      JSON.stringify({ success: true, result }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        } 
      }
    );

  } catch (error) {
    console.error('Error in google-sheets function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
      }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        } 
      }
    );
  }
});
