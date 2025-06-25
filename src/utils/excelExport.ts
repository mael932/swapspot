
import * as XLSX from 'xlsx';
import { OnboardingData } from '@/components/onboarding/OnboardingFlow';

export interface ExportableOnboardingData extends OnboardingData {
  id: string;
  submittedAt: string;
  email?: string;
}

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
