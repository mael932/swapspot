
import { supabase } from "@/lib/supabase";

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

// This function sends data to your centralized Google Sheet via Supabase Edge Function
export const addUserToGoogleSheet = async (userData: UserData) => {
  try {
    console.log('Calling Supabase Edge Function: google-sheets');
    console.log('User data being sent:', userData);

    const { data, error } = await supabase.functions.invoke('google-sheets', {
      body: userData
    });

    if (error) {
      console.error('Supabase Edge Function error:', error);
      throw error;
    }

    console.log('Google Sheets function response:', data);
    return data;
  } catch (error) {
    console.error('Error calling google-sheets Edge Function:', error);
    throw error;
  }
};

export const formatUserDataForSheet = (onboardingData: any): UserData => {
  return {
    email: onboardingData.email || '',
    fullName: onboardingData.fullName || '',
    university: onboardingData.university || '',
    program: onboardingData.program || '',
    startDate: onboardingData.startDate || '',
    endDate: onboardingData.endDate || '',
    minPrice: 0,
    maxPrice: onboardingData.budget ? parseInt(onboardingData.budget.split('-')[1]?.replace('€', '').replace('+', '')) || 0 : 0,
    location: onboardingData.currentLocation || '',
    accommodationType: onboardingData.duration || '',
    amenities: onboardingData.amenities || [],
    hasUploadedProof: onboardingData.hasUploadedProof || false,
    verificationMethod: onboardingData.verificationMethod || 'email',
    createdAt: new Date().toISOString(),
    gdprConsent: onboardingData.gdprConsent || false,
    // Apartment details
    apartmentTitle: '',
    apartmentLocation: onboardingData.currentLocation || '',
    apartmentPrice: onboardingData.budget ? parseInt(onboardingData.budget.split('-')[1]?.replace('€', '').replace('+', '')) || 0 : 0,
    apartmentBedrooms: '',
    apartmentSurface: '',
    apartmentDescription: onboardingData.apartmentDescription || '',
    apartmentAmenities: onboardingData.amenities || [],
    // Preferences
    preferredCountries: onboardingData.preferredDestinations || [],
    preferredAmenities: onboardingData.amenities || [],
    minBedrooms: '',
    minSurface: '',
  };
};
