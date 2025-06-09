
import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, X, Camera } from "lucide-react";
import { OnboardingData } from "./OnboardingFlow";

interface PhotosStepProps {
  data: OnboardingData;
  onUpdate: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
}

const PhotosStep: React.FC<PhotosStepProps> = ({
  data,
  onUpdate,
  onNext,
  onPrevious,
  canGoNext,
  canGoPrevious
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const newPhotos = [...data.photos, ...files].slice(0, 6); // Max 6 photos
    onUpdate({ photos: newPhotos });
  };

  const removePhoto = (index: number) => {
    const newPhotos = data.photos.filter((_, i) => i !== index);
    onUpdate({ photos: newPhotos });
  };

  const canProceed = data.photos.length >= 1; // At least 1 photo required

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <Camera className="h-12 w-12 text-swap-blue mx-auto mb-3" />
        <h3 className="text-lg font-semibold mb-2">Show off your space</h3>
        <p className="text-gray-600">Upload photos of your room to attract potential swappers</p>
      </div>

      <div className="space-y-4">
        {/* Upload Area */}
        <Card
          className="border-2 border-dashed border-gray-300 p-8 text-center cursor-pointer hover:border-swap-blue transition-colors"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-600 mb-1">Click to upload photos</p>
          <p className="text-xs text-gray-500">Max 6 photos, JPG or PNG</p>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </Card>

        {/* Photo Preview Grid */}
        {data.photos.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {data.photos.map((photo, index) => (
              <div key={index} className="relative group">
                <img
                  src={URL.createObjectURL(photo)}
                  alt={`Room photo ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <Button
                  size="sm"
                  variant="destructive"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
                  onClick={() => removePhoto(index)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        )}

        {data.photos.length > 0 && (
          <p className="text-sm text-green-600 text-center">
            {data.photos.length} photo{data.photos.length !== 1 ? 's' : ''} uploaded
          </p>
        )}
      </div>

      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={onPrevious} 
          disabled={!canGoPrevious}
        >
          Previous
        </Button>
        <Button 
          onClick={onNext} 
          disabled={!canProceed || !canGoNext}
          className="px-8"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default PhotosStep;
