
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
}

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
      throw new Error('Failed to add user to Google Sheet');
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding user to Google Sheet:', error);
    throw error;
  }
};

export const formatUserDataForSheet = (signupData: any, onboardingData?: any): UserData => {
  return {
    email: signupData.email || '',
    fullName: signupData.fullName || '',
    university: signupData.university || onboardingData?.university || '',
    program: onboardingData?.program || '',
    startDate: onboardingData?.preferredDates?.startDate || '',
    endDate: onboardingData?.preferredDates?.endDate || '',
    minPrice: onboardingData?.requirements?.priceRange?.min || 0,
    maxPrice: onboardingData?.requirements?.priceRange?.max || 0,
    location: onboardingData?.requirements?.location || '',
    accommodationType: onboardingData?.requirements?.accommodationType || '',
    amenities: onboardingData?.requirements?.amenities || [],
    hasUploadedProof: signupData.hasUploadedProof || false,
    verificationMethod: onboardingData?.verificationMethod || '',
    createdAt: new Date().toISOString(),
  };
};
