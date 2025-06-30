
import { supabase } from "@/lib/supabase";

interface UserData {
  email: string;
  fullName: string;
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
  createdAt: string;
  gdprConsent: boolean;
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
  // Convert photos to a simple count or list since we can't embed actual files
  const photoCount = onboardingData.apartmentPhotos?.length || 0;
  const photoInfo = photoCount > 0 ? `${photoCount} photos uploaded` : 'No photos';

  return {
    email: onboardingData.email || '',
    fullName: onboardingData.fullName || '',
    currentUniversity: onboardingData.university || '',
    exchangeUniversity: onboardingData.exchangeUniversity || '',
    program: onboardingData.program || '',
    exchangeStart: onboardingData.startDate || '',
    exchangeEnd: onboardingData.endDate || '',
    currentAccommodationCity: onboardingData.currentLocation || '',
    address: onboardingData.currentAddress || '',
    monthlyRent: onboardingData.monthlyRent || '',
    accommodationDescription: onboardingData.apartmentDescription || '',
    accommodationPhotos: photoInfo,
    amenities: onboardingData.amenities || [],
    createdAt: new Date().toISOString(),
    gdprConsent: onboardingData.gdprConsent || false,
  };
};
