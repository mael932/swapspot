
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

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const userData: UserData = await req.json();
    
    // Get Google Sheets credentials from environment
    const googleSheetsApiKey = Deno.env.get('GOOGLE_SHEETS_API_KEY');
    const spreadsheetId = Deno.env.get('GOOGLE_SHEETS_SPREADSHEET_ID');
    
    if (!googleSheetsApiKey || !spreadsheetId) {
      throw new Error('Missing Google Sheets configuration');
    }

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
    const sheetsUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1:append?valueInputOption=RAW&key=${googleSheetsApiKey}`;
    
    const response = await fetch(sheetsUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
