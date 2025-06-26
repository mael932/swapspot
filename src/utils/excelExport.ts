
import * as XLSX from 'xlsx';
import { OnboardingData } from '@/components/onboarding/OnboardingFlow';

export interface ExportableOnboardingData extends OnboardingData {
  // All fields are already defined in OnboardingData
  email: string; // Make email required for export
}

export const saveOnboardingData = (data: OnboardingData): string => {
  try {
    // Create a simplified version for export
    const exportData: ExportableOnboardingData = {
      ...data,
      email: data.email || '', // Ensure email is string
    };

    // Generate a unique submission ID
    const submissionId = `SWAP_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Get existing data from localStorage
    const existingData = localStorage.getItem('swapspot_submissions');
    const submissions = existingData ? JSON.parse(existingData) : [];
    
    // Add new submission
    const newSubmission = {
      id: submissionId,
      timestamp: new Date().toISOString(),
      data: exportData
    };
    
    submissions.push(newSubmission);
    
    // Save back to localStorage
    localStorage.setItem('swapspot_submissions', JSON.stringify(submissions));
    
    console.log('Onboarding data saved with ID:', submissionId);
    return submissionId;
  } catch (error) {
    console.error('Error saving onboarding data:', error);
    throw error;
  }
};

export const exportToExcel = (data: ExportableOnboardingData[]): void => {
  try {
    // Prepare data for Excel export
    const excelData = data.map((item, index) => ({
      'Submission #': index + 1,
      'Full Name': item.fullName,
      'Email': item.email,
      'University': item.university,
      'Program': item.program,
      'Current Location': item.currentLocation,
      'Current Address': item.currentAddress,
      'Duration': item.duration,
      'Start Date': item.startDate,
      'End Date': item.endDate,
      'Budget': item.budget,
      'Preferred Destinations': item.preferredDestinations?.join(', ') || '',
      'Apartment Description': item.apartmentDescription,
      'Additional Info': item.additionalInfo,
      'Has Uploaded Proof': item.hasUploadedProof ? 'Yes' : 'No',
      'GDPR Consent': item.gdprConsent ? 'Yes' : 'No',
      'Apartment Photos Count': item.apartmentPhotos?.length || 0,
      'Submission Date': new Date().toLocaleDateString()
    }));

    // Create workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(excelData);
    
    // Auto-size columns
    const colWidths = Object.keys(excelData[0] || {}).map(key => ({
      wch: Math.max(key.length, 15)
    }));
    ws['!cols'] = colWidths;
    
    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, 'SwapSpot Submissions');
    
    // Generate filename with timestamp
    const filename = `swapspot_submissions_${new Date().toISOString().split('T')[0]}.xlsx`;
    
    // Save file
    XLSX.writeFile(wb, filename);
    
    console.log('Excel file exported:', filename);
  } catch (error) {
    console.error('Error exporting to Excel:', error);
    throw error;
  }
};

export const getAllSubmissions = (): ExportableOnboardingData[] => {
  try {
    const existingData = localStorage.getItem('swapspot_submissions');
    if (!existingData) {
      return [];
    }
    
    const submissions = JSON.parse(existingData);
    return submissions.map((submission: any) => submission.data);
  } catch (error) {
    console.error('Error getting submissions:', error);
    return [];
  }
};
