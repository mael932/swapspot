
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

// This function sends data to your centralized Google Sheet
export const addUserToGoogleSheet = async (userData: UserData) => {
  try {
    const response = await fetch('/api/google-sheets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Failed to add user to centralized Google Sheet');
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding user to centralized Google Sheet:', error);
    throw error;
  }
};

export const formatUserDataForSheet = (signupData: any, onboardingData?: any): UserData => {
  return {
    email: signupData.email || '',
    fullName: signupData.fullName || '',
    university: signupData.university || onboardingData?.university || '',
    program: onboardingData?.program || '',
    startDate: signupData.preferences?.startDate || onboardingData?.preferredDates?.startDate || '',
    endDate: signupData.preferences?.endDate || onboardingData?.preferredDates?.endDate || '',
    minPrice: onboardingData?.requirements?.priceRange?.min || 0,
    maxPrice: parseInt(signupData.preferences?.maxPrice) || onboardingData?.requirements?.priceRange?.max || 0,
    location: onboardingData?.requirements?.location || '',
    accommodationType: onboardingData?.requirements?.accommodationType || '',
    amenities: onboardingData?.requirements?.amenities || [],
    hasUploadedProof: signupData.hasUploadedProof || false,
    verificationMethod: onboardingData?.verificationMethod || '',
    createdAt: new Date().toISOString(),
    // Apartment details
    apartmentTitle: signupData.apartmentDetails?.title || '',
    apartmentLocation: signupData.apartmentDetails?.location || '',
    apartmentPrice: parseInt(signupData.apartmentDetails?.price) || 0,
    apartmentBedrooms: signupData.apartmentDetails?.bedrooms || '',
    apartmentSurface: signupData.apartmentDetails?.surface || '',
    apartmentDescription: signupData.apartmentDetails?.description || '',
    apartmentAmenities: signupData.apartmentDetails?.amenities || [],
    // Preferences
    preferredCountries: signupData.preferences?.preferredCountries || [],
    preferredAmenities: signupData.preferences?.preferredAmenities || [],
    minBedrooms: signupData.preferences?.minBedrooms || '',
    minSurface: signupData.preferences?.minSurface || '',
  };
};
