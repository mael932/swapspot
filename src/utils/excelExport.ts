
import * as XLSX from 'xlsx';
import { OnboardingData } from '@/components/onboarding/OnboardingFlow';

export interface ExportableUserData {
  id: string;
  submittedAt: string;
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

export interface ExportableOnboardingData extends OnboardingData {
  id: string;
  submittedAt: string;
  email?: string;
}

export const exportUserDataToExcel = (data: ExportableUserData[]) => {
  // Flatten the data for Excel export
  const flattenedData = data.map(item => ({
    'ID': item.id,
    'Submitted At': item.submittedAt,
    'Email': item.email,
    'Full Name': item.fullName,
    'University': item.university,
    'Program': item.program,
    'Start Date': item.startDate,
    'End Date': item.endDate,
    'Min Price': item.minPrice,
    'Max Price': item.maxPrice,
    'Location Preference': item.location,
    'Accommodation Type': item.accommodationType,
    'Required Amenities': item.amenities.join(', '),
    'Has Uploaded Proof': item.hasUploadedProof ? 'Yes' : 'No',
    'Verification Method': item.verificationMethod,
    'Apartment Title': item.apartmentTitle,
    'Apartment Location': item.apartmentLocation,
    'Apartment Price': item.apartmentPrice,
    'Apartment Bedrooms': item.apartmentBedrooms,
    'Apartment Surface': item.apartmentSurface,
    'Apartment Description': item.apartmentDescription,
    'Apartment Amenities': item.apartmentAmenities.join(', '),
    'Preferred Countries': item.preferredCountries.join(', '),
    'Preferred Amenities': item.preferredAmenities.join(', '),
    'Min Bedrooms': item.minBedrooms,
    'Min Surface': item.minSurface,
  }));

  // Create workbook and worksheet
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(flattenedData);

  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(wb, ws, 'User Accounts & Preferences');

  // Generate filename with timestamp
  const timestamp = new Date().toISOString().split('T')[0];
  const filename = `SwapSpot_Users_${timestamp}.xlsx`;

  // Write the file
  XLSX.writeFile(wb, filename);
};

export const exportToExcel = (data: ExportableOnboardingData[]) => {
  // Flatten the data for Excel export
  const flattenedData = data.map(item => ({
    ID: item.id,
    'Submitted At': item.submittedAt,
    'Email': item.email || 'Not provided',
    'University': item.university,
    'Program': item.program,
    'Start Date': item.preferredDates.startDate,
    'End Date': item.preferredDates.endDate,
    'Photos Count': item.photos.length,
    'Verification Method': item.verificationMethod,
    'Has Verification File': item.verificationFile ? 'Yes' : 'No'
  }));

  // Create workbook and worksheet
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(flattenedData);

  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(wb, ws, 'Student Preferences');

  // Generate filename with timestamp
  const timestamp = new Date().toISOString().split('T')[0];
  const filename = `SwapSpot_Students_${timestamp}.xlsx`;

  // Write the file
  XLSX.writeFile(wb, filename);
};

export const saveUserAccountData = (signupData: any, onboardingData?: any): ExportableUserData => {
  const userData: ExportableUserData = {
    id: crypto.randomUUID(),
    submittedAt: new Date().toISOString(),
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

  // Save to localStorage
  const existingData = localStorage.getItem('swapspot_user_accounts');
  const accounts: ExportableUserData[] = existingData ? JSON.parse(existingData) : [];
  accounts.push(userData);
  localStorage.setItem('swapspot_user_accounts', JSON.stringify(accounts));

  return userData;
};

export const saveOnboardingData = (data: OnboardingData): string => {
  const existingData = localStorage.getItem('swapspot_submissions');
  const submissions: ExportableOnboardingData[] = existingData ? JSON.parse(existingData) : [];
  
  const newSubmission: ExportableOnboardingData = {
    ...data,
    id: crypto.randomUUID(),
    submittedAt: new Date().toISOString(),
    email: localStorage.getItem('userEmail') || undefined
  };
  
  submissions.push(newSubmission);
  localStorage.setItem('swapspot_submissions', JSON.stringify(submissions));
  
  return newSubmission.id;
};

export const getAllSubmissions = (): ExportableOnboardingData[] => {
  const existingData = localStorage.getItem('swapspot_submissions');
  return existingData ? JSON.parse(existingData) : [];
};

export const getAllUserAccounts = (): ExportableUserData[] => {
  const existingData = localStorage.getItem('swapspot_user_accounts');
  return existingData ? JSON.parse(existingData) : [];
};
