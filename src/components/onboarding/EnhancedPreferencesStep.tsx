import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Home, 
  MapPin, 
  Calendar, 
  Euro, 
  Upload, 
  CheckCircle, 
  Info,
  DollarSign
} from "lucide-react";
import { OnboardingData } from "./OnboardingFlow";

interface EnhancedPreferencesStepProps {
  data: OnboardingData;
  onUpdate: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
}

const EnhancedPreferencesStep: React.FC<EnhancedPreferencesStepProps> = ({
  data,
  onUpdate,
  onNext,
  onPrevious,
  canGoNext,
  canGoPrevious,
}) => {
  const [currentLocation, setCurrentLocation] = useState(data.currentLocation || "");
  const [duration, setDuration] = useState(data.duration || "");
  const [budget, setBudget] = useState(data.budget || "");
  const [apartmentDescription, setApartmentDescription] = useState(data.apartmentDescription || "");
  const [apartmentPhotos, setApartmentPhotos] = useState<File[]>(data.apartmentPhotos || []);
  const [preferences, setPreferences] = useState(data.preferences || {
    cleanliness: 3,
    noiseLevel: 3,
    socialBattery: 3,
  });
  const [gdprConsent, setGdprConsent] = useState(data.gdprConsent || false);

  const handleUpdate = (updates: Partial<OnboardingData>) => {
    onUpdate({ ...data, ...updates });
  };

  const handleNext = () => {
    onNext();
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setApartmentPhotos([...apartmentPhotos, ...files]);
      handleUpdate({ apartmentPhotos: [...apartmentPhotos, ...files] });
    }
  };

  const removePhoto = (index: number) => {
    const newPhotos = [...apartmentPhotos];
    newPhotos.splice(index, 1);
    setApartmentPhotos(newPhotos);
    handleUpdate({ apartmentPhotos: newPhotos });
  };

  const updatePreference = (key: string, value: number) => {
    const newPreferences = { ...preferences, [key]: value };
    setPreferences(newPreferences);
    handleUpdate({ preferences: newPreferences });
  };

  const canProceed = currentLocation.trim() !== "" && budget;

  return (
    <div className="space-y-8">
      {/* 60% - Primary Content */}
      <div className="text-center mb-8">
        <Home className="h-16 w-16 text-swap-blue mx-auto mb-4" />
        <h3 className="text-3xl font-bold text-gray-900 mb-2">
          Tell us about your accommodation
        </h3>
        <p className="text-gray-600 text-lg">
          Help us find your perfect match
        </p>
      </div>

      {/* 30% - Secondary Content */}
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-base font-medium">Current Location *</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="City, Country"
                value={currentLocation}
                onChange={(e) => {
                  setCurrentLocation(e.target.value);
                  handleUpdate({ currentLocation: e.target.value });
                }}
                className="pl-10 h-12 border-gray-300 focus:border-swap-blue"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-base font-medium">Duration</Label>
            <Select value={duration} onValueChange={(value) => {
              setDuration(value);
              handleUpdate({ duration: value });
            }}>
              <SelectTrigger className="h-12 border-gray-300 focus:border-swap-blue">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-month">1 Month</SelectItem>
                <SelectItem value="1-semester">1 Semester</SelectItem>
                <SelectItem value="2-semesters">2 Semesters</SelectItem>
                <SelectItem value="summer">Summer</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-base font-medium flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Monthly Rent Budget *
            </Label>
            <Select value={budget} onValueChange={(value) => {
              setBudget(value);
              handleUpdate({ budget: value });
            }}>
              <SelectTrigger className="h-12 border-gray-300 focus:border-swap-blue">
                <SelectValue placeholder="Select your budget range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-300">€0 - €300</SelectItem>
                <SelectItem value="300-500">€300 - €500</SelectItem>
                <SelectItem value="500-700">€500 - €700</SelectItem>
                <SelectItem value="700-1000">€700 - €1000</SelectItem>
                <SelectItem value="1000+">€1000+</SelectItem>
              </SelectContent>
            </Select>
            
            <Alert className="border-blue-200 bg-blue-50">
              <Info className="h-4 w-4" />
              <AlertDescription className="text-blue-800">
                <strong>Budget matching:</strong> We use your rent budget to find fair matches. 
                Tell us what you pay for rent so we can match you with someone in a similar price range. 
                This ensures both parties get equal value from the exchange.
              </AlertDescription>
            </Alert>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-base font-medium">Accommodation Description</Label>
          <Textarea
            placeholder="Describe your place (size, amenities, neighborhood, etc.)"
            value={apartmentDescription}
            onChange={(e) => {
              setApartmentDescription(e.target.value);
              handleUpdate({ apartmentDescription: e.target.value });
            }}
            rows={4}
            className="resize-none border-gray-300 focus:border-swap-blue"
          />
        </div>

        <div className="space-y-4">
          <Label className="text-base font-medium">Accommodation Photos</Label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-swap-blue transition-colors">
            <label className="cursor-pointer">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
              <div className="flex flex-col items-center gap-3">
                <Upload className="h-10 w-10 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-700">
                    Click to upload photos of your accommodation
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Upload multiple photos (JPG, PNG - Max 10MB each)
                  </p>
                </div>
                {apartmentPhotos.length > 0 && (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="h-5 w-5" />
                    <span className="text-sm font-medium">{apartmentPhotos.length} photo(s) uploaded</span>
                  </div>
                )}
              </div>
            </label>
          </div>
          
          {apartmentPhotos.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {apartmentPhotos.map((photo, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt={`Accommodation ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => removePhoto(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-semibold">Lifestyle Preferences</h4>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-base font-medium">Cleanliness Level</Label>
              <div className="px-3">
                <Slider
                  value={[preferences.cleanliness]}
                  onValueChange={(value) => updatePreference('cleanliness', value[0])}
                  max={5}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Relaxed</span>
                  <span>Very Tidy</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-base font-medium">Noise Tolerance</Label>
              <div className="px-3">
                <Slider
                  value={[preferences.noiseLevel]}
                  onValueChange={(value) => updatePreference('noiseLevel', value[0])}
                  max={5}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Quiet</span>
                  <span>Social/Lively</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-base font-medium">Social Energy</Label>
              <div className="px-3">
                <Slider
                  value={[preferences.socialBattery]}
                  onValueChange={(value) => updatePreference('socialBattery', value[0])}
                  max={5}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Introverted</span>
                  <span>Extroverted</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="gdpr-consent"
            checked={gdprConsent}
            onCheckedChange={(checked) => {
              setGdprConsent(!!checked);
              handleUpdate({ gdprConsent: !!checked });
            }}
          />
          <Label 
            htmlFor="gdpr-consent" 
            className="text-sm text-gray-600 leading-relaxed"
          >
            I agree to the processing of my personal data for matching purposes and understand that my information will be shared with potential exchange partners.
          </Label>
        </div>
      </div>

      {/* 10% - Accent Content */}
      <div className="bg-green-50 p-3 rounded-lg">
        <p className="text-sm text-green-700">
          💡 Complete profiles get better matches
        </p>
      </div>

      <div className="flex gap-4 pt-6">
        {canGoPrevious && (
          <Button 
            type="button" 
            variant="outline" 
            onClick={onPrevious} 
            className="flex-1 h-12"
          >
            Previous
          </Button>
        )}
        <Button 
          onClick={handleNext}
          disabled={!canProceed || !canGoNext}
          className="flex-1 h-12 bg-swap-blue hover:bg-swap-blue/90 text-white font-medium"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default EnhancedPreferencesStep;
