
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Shield, AlertCircle, CheckCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ProofOfEnrollmentStepProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
}

const ProofOfEnrollmentStep: React.FC<ProofOfEnrollmentStepProps> = ({
  data,
  onUpdate,
  onNext,
  onPrevious,
  canGoNext,
  canGoPrevious,
}) => {
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [additionalInfo, setAdditionalInfo] = useState(data.additionalInfo || "");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setProofFile(file);
      onUpdate({ 
        ...data, 
        proofOfEnrollment: file,
        hasUploadedProof: true 
      });
    }
  };

  const handleAdditionalInfoChange = (value: string) => {
    setAdditionalInfo(value);
    onUpdate({ ...data, additionalInfo: value });
  };

  const handleNext = () => {
    if (proofFile) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <Shield className="h-12 w-12 text-swap-blue mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-swap-blue mb-2">
          Verify Your Student Status
        </h3>
        <p className="text-gray-600">
          For safety and authenticity, we need to verify that you're currently enrolled as a student.
        </p>
      </div>

      <Alert className="border-blue-200 bg-blue-50">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription className="text-blue-800">
          <strong>Why we need this:</strong> Student verification helps us maintain a safe community and ensures 
          all users are legitimate students looking for accommodation exchanges.
        </AlertDescription>
      </Alert>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="proof-upload" className="text-base font-medium">
            Upload Proof of Enrollment *
          </Label>
          <p className="text-sm text-gray-600 mb-3">
            Please upload one of the following documents:
          </p>
          <ul className="text-sm text-gray-600 mb-4 space-y-1">
            <li>• Student ID card (both sides)</li>
            <li>• Official enrollment letter from your university</li>
            <li>• Current semester transcript</li>
            <li>• University-issued document with your name and enrollment status</li>
          </ul>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-swap-blue transition-colors">
            <label className="cursor-pointer">
              <Input
                id="proof-upload"
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileChange}
                className="hidden"
                required
              />
              <div className="flex flex-col items-center gap-3">
                <Upload className="h-12 w-12 text-gray-400" />
                <div>
                  <p className="text-lg font-medium text-gray-700">
                    {proofFile ? proofFile.name : "Click to upload your document"}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Supported formats: JPG, PNG, PDF (Max 10MB)
                  </p>
                </div>
                {proofFile && (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="h-5 w-5" />
                    <span className="text-sm font-medium">Document uploaded successfully</span>
                  </div>
                )}
              </div>
            </label>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="additional-info" className="text-base font-medium">
            Additional Information (Optional)
          </Label>
          <Textarea
            id="additional-info"
            placeholder="Any additional information about your enrollment, exchange program, or special circumstances..."
            value={additionalInfo}
            onChange={(e) => handleAdditionalInfoChange(e.target.value)}
            rows={4}
            className="resize-none"
          />
        </div>

        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4" />
          <AlertDescription className="text-green-800">
            <strong>Manual Review Process:</strong> Our team will manually review your submission within 24-48 hours. 
            You'll receive an email notification once your student status is verified.
          </AlertDescription>
        </Alert>
      </div>

      <div className="flex gap-4 pt-4">
        {canGoPrevious && (
          <Button type="button" variant="outline" onClick={onPrevious} className="flex-1">
            Previous
          </Button>
        )}
        <Button 
          onClick={handleNext} 
          disabled={!proofFile || !canGoNext}
          className="flex-1"
        >
          Continue to Preferences
        </Button>
      </div>
    </div>
  );
};

export default ProofOfEnrollmentStep;
