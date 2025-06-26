
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface UserData {
  email: string;
  fullName: string;
  university: string;
  program: string;
  startDate: string;
  endDate: string;
  minPrice: number;
  maxPrice: number;
  location: string;
  accommodationType: string;
  amenities: string[];
  hasUploadedProof: boolean;
  verificationMethod: string;
  createdAt: string;
  gdprConsent: boolean;
  // Apartment details
  apartmentTitle: string;
  apartmentLocation: string;
  apartmentPrice: number;
  apartmentBedrooms: string;
  apartmentSurface: string;
  apartmentDescription: string;
  apartmentAmenities: string[];
  // Preferences
  preferredCountries: string[];
  preferredAmenities: string[];
  minBedrooms: string;
  minSurface: string;
}

// Function to get Google access token using service account
async function getAccessToken() {
  const serviceAccountJson = Deno.env.get('GOOGLE_SERVICE_ACCOUNT_JSON');
  if (!serviceAccountJson) {
    throw new Error('Google service account JSON not found');
  }

  const serviceAccount = JSON.parse(serviceAccountJson);
  
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
    throw new Error(`Failed to get access token: ${tokenResponse.status}`);
  }

  const tokenData = await tokenResponse.json();
  return tokenData.access_token;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const userData: UserData = await req.json();
    
    // Get spreadsheet ID from environment
    const spreadsheetId = Deno.env.get('GOOGLE_SHEETS_SPREADSHEET_ID');
    
    if (!spreadsheetId) {
      throw new Error('Missing Google Sheets spreadsheet ID');
    }

    // Get access token
    const accessToken = await getAccessToken();

    // Prepare row data for your centralized Google Sheet with clear column headers
    const rowData = [
      userData.createdAt,
      userData.email,
      userData.fullName,
      userData.university,
      userData.program,
      userData.startDate,
      userData.endDate,
      userData.minPrice.toString(),
      userData.maxPrice.toString(),
      userData.location,
      userData.accommodationType,
      userData.amenities.join(', '),
      userData.hasUploadedProof ? 'Yes' : 'No',
      userData.verificationMethod,
      userData.gdprConsent ? 'Yes' : 'No',
      // Their apartment details
      userData.apartmentTitle,
      userData.apartmentLocation,
      userData.apartmentPrice.toString(),
      userData.apartmentBedrooms,
      userData.apartmentSurface,
      userData.apartmentDescription,
      userData.apartmentAmenities.join(', '),
      // Their destination preferences
      userData.preferredCountries.join(', '),
      userData.preferredAmenities.join(', '),
      userData.minBedrooms,
      userData.minSurface,
    ];

    // Add data to your centralized Google Sheet
    const sheetsUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1:append?valueInputOption=RAW`;
    
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
      console.error('Google Sheets API error:', errorText);
      throw new Error(`Google Sheets API error: ${response.status}`);
    }

    const result = await response.json();
    console.log('Successfully added user to centralized Google Sheet:', result);

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
