
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Users, MessageCircle, Calendar } from "lucide-react";
import { OnboardingData } from "./OnboardingFlow";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/sonner";
import { addUserToGoogleSheet, formatUserDataForSheet } from "@/services/googleSheetsService";
import { uploadAccommodationPhotos } from "@/services/storageService";

interface ProfileCompleteStepProps {
  data: OnboardingData;
  onUpdate: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  onComplete: () => void;
}

const ProfileCompleteStep: React.FC<ProfileCompleteStepProps> = ({
  data,
  onUpdate,
  onNext,
  onPrevious,
  canGoNext,
  canGoPrevious,
  onComplete
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleComplete = async () => {
    setIsLoading(true);
    
    try {
      let photoUrls: string[] = [];
      
      // Upload photos to Supabase Storage if they exist
      if (data.apartmentPhotos && data.apartmentPhotos.length > 0) {
        console.log('Uploading photos to storage...');
        const userId = `user_${Date.now()}`; // Generate a temporary user ID
        const uploadResults = await uploadAccommodationPhotos(data.apartmentPhotos, userId);
        photoUrls = uploadResults.map(result => result.url);
        console.log('Photos uploaded:', photoUrls);
      }

      // Add photo URLs to the data
      const dataWithPhotos = {
        ...data,
        photoUrls
      };

      // Format and send data to Google Sheets
      const formattedData = formatUserDataForSheet(dataWithPhotos);
      console.log('Sending data to Google Sheets:', formattedData);
      
      const result = await addUserToGoogleSheet(formattedData);
      
      if (result.success) {
        toast.success("Registration completed successfully!", {
          description: "We'll email you when we find potential swaps"
        });
        
        // Navigate to community page
        navigate("/community");
      } else {
        toast.error("Failed to complete registration", {
          description: "Please try again"
        });
      }
    } catch (error) {
      console.error("Error completing registration:", error);
      toast.error("An error occurred", {
        description: "Please try again"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* 60% - Primary Content */}
      <div className="text-center mb-8">
        <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
        <h3 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to SwapSpot!
        </h3>
        <p className="text-xl text-gray-600 mb-4">
          Your registration is complete and ready to connect with other students
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-blue-800 font-medium">
            📧 We'll email you when we find potential swaps that match your preferences
          </p>
          <p className="text-blue-600 text-sm mt-1">
            Check your inbox at <strong>{data.email}</strong> for updates
          </p>
        </div>
      </div>

      {/* 30% - Secondary Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="text-center p-6 bg-blue-50 rounded-lg">
          <Users className="h-12 w-12 text-swap-blue mx-auto mb-3" />
          <h4 className="font-semibold text-gray-900 mb-2">Connect</h4>
          <p className="text-sm text-gray-600">
            Join our community of verified students
          </p>
        </div>
        
        <div className="text-center p-6 bg-green-50 rounded-lg">
          <MessageCircle className="h-12 w-12 text-green-600 mx-auto mb-3" />
          <h4 className="font-semibold text-gray-900 mb-2">Chat</h4>
          <p className="text-sm text-gray-600">
            Start conversations with potential swap partners
          </p>
        </div>
        
        <div className="text-center p-6 bg-purple-50 rounded-lg">
          <Calendar className="h-12 w-12 text-purple-600 mx-auto mb-3" />
          <h4 className="font-semibold text-gray-900 mb-2">Plan</h4>
          <p className="text-sm text-gray-600">
            Organize your exchange experience
          </p>
        </div>
      </div>

      {/* 10% - Accent Content */}
      <div className="bg-gradient-to-r from-swap-blue to-purple-600 p-4 rounded-lg text-white text-center">
        <p className="font-medium">
          🎉 You're now part of Europe's largest student exchange community!
        </p>
      </div>

      <div className="flex gap-4 pt-6">
        <Button 
          variant="outline" 
          onClick={onPrevious} 
          disabled={!canGoPrevious || isLoading}
          className="flex-1 h-12"
        >
          Previous
        </Button>
        <Button 
          onClick={handleComplete}
          disabled={isLoading}
          className="flex-1 h-12 bg-swap-blue hover:bg-swap-blue/90 text-white font-medium"
        >
          {isLoading ? "Uploading photos and completing..." : "Join Community"}
        </Button>
      </div>
    </div>
  );
};

export default ProfileCompleteStep;
