
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Upload, MapPin, Calendar, Home, Euro, Info } from "lucide-react";
import AmenitiesSelector from "./AmenitiesSelector";

interface EnhancedPreferencesStepProps {
  data: any;
  onUpdate: (data: any) => void;
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
  const [currentAddress, setCurrentAddress] = useState(data.currentAddress || "");
  const [duration, setDuration] = useState(data.duration || "");
  const [startDate, setStartDate] = useState(data.startDate || "");
  const [endDate, setEndDate] = useState(data.endDate || "");
  const [budget, setBudget] = useState(data.budget || "");
  const [apartmentPhotos, setApartmentPhotos] = useState<File[]>(data.apartmentPhotos || []);
  const [apartmentDescription, setApartmentDescription] = useState(data.apartmentDescription || "");
  const [currentAmenities, setCurrentAmenities] = useState<string[]>(data.currentAmenities || []);
  const [preferredAmenities, setPreferredAmenities] = useState<string[]>(data.preferredAmenities || []);

  const durationOptions = [
    { value: "1-3-months", label: "1-3 months" },
    { value: "3-6-months", label: "3-6 months" },
    { value: "6-12-months", label: "6-12 months" },
    { value: "1-year-plus", label: "1+ years" },
    { value: "flexible", label: "Flexible" }
  ];

  const budgetRanges = [
    { value: "0-500", label: "€0 - €500/month" },
    { value: "500-800", label: "€500 - €800/month" },
    { value: "800-1200", label: "€800 - €1,200/month" },
    { value: "1200-1500", label: "€1,200 - €1,500/month" },
    { value: "1500-plus", label: "€1,500+/month" }
  ];

  const handlePhotosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setApartmentPhotos(files);
      updateData({ apartmentPhotos: files, photos: files }); // Update both fields for compatibility
    }
  };

  const updateData = (updates: any) => {
    const newData = {
      ...data,
      currentLocation,
      currentAddress,
      duration,
      startDate,
      endDate,
      budget,
      apartmentPhotos,
      apartmentDescription,
      currentAmenities,
      preferredAmenities,
      ...updates
    };
    onUpdate(newData);
  };

  const handleNext = () => {
    updateData({});
    onNext();
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <Home className="h-16 w-16 text-swap-blue mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          About Your Accommodation
        </h3>
        <p className="text-gray-600 text-lg">
          Tell us about your current place and what you're looking for
        </p>
      </div>

      {/* Current Location Section */}
      <div className="bg-gray-50 rounded-xl p-8 border">
        <h4 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
          <MapPin className="h-6 w-6 text-swap-blue" />
          Your Current Location
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-2">
            <Label htmlFor="current-location" className="text-base font-medium">City & Country *</Label>
            <Input
              id="current-location"
              placeholder="e.g., Amsterdam, Netherlands"
              value={currentLocation}
              onChange={(e) => {
                setCurrentLocation(e.target.value);
                updateData({ currentLocation: e.target.value });
              }}
              className="h-12 border-gray-300 focus:border-swap-blue"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="current-address" className="text-base font-medium">Full Address *</Label>
            <Input
              id="current-address"
              placeholder="Street address, postal code"
              value={currentAddress}
              onChange={(e) => {
                setCurrentAddress(e.target.value);
                updateData({ currentAddress: e.target.value });
              }}
              className="h-12 border-gray-300 focus:border-swap-blue"
              required
            />
          </div>
        </div>

        <div className="space-y-2 mb-6">
          <Label htmlFor="apartment-description" className="text-base font-medium">Describe Your Place</Label>
          <Textarea
            id="apartment-description"
            placeholder="Describe your current accommodation (size, amenities, neighborhood, etc.)"
            value={apartmentDescription}
            onChange={(e) => {
              setApartmentDescription(e.target.value);
              updateData({ apartmentDescription: e.target.value });
            }}
            rows={4}
            className="border-gray-300 focus:border-swap-blue"
          />
        </div>

        <AmenitiesSelector
          selectedAmenities={currentAmenities}
          onAmenitiesChange={(amenities) => {
            setCurrentAmenities(amenities);
            updateData({ currentAmenities: amenities });
          }}
          title="Current Accommodation Amenities"
        />

        <div className="space-y-2 mt-6">
          <Label htmlFor="apartment-photos" className="text-base font-medium">Photos of Your Place *</Label>
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center bg-white">
            <label className="cursor-pointer">
              <Input
                id="apartment-photos"
                type="file"
                accept="image/*"
                multiple
                onChange={handlePhotosChange}
                className="hidden"
                required
              />
              <div className="flex flex-col items-center gap-3">
                <Upload className="h-12 w-12 text-gray-400" />
                <div>
                  <span className="text-lg font-medium text-gray-700">
                    {apartmentPhotos.length > 0 
                      ? `${apartmentPhotos.length} photos selected`
                      : "Upload photos of your apartment"
                    }
                  </span>
                  <p className="text-sm text-gray-500 mt-1">
                    Multiple photos help attract better matches
                  </p>
                </div>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Exchange Preferences Section */}
      <div className="bg-gray-50 rounded-xl p-8 border">
        <h4 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
          <Calendar className="h-6 w-6 text-swap-blue" />
          Exchange Preferences
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-2">
            <Label htmlFor="duration" className="text-base font-medium">Duration *</Label>
            <Select value={duration} onValueChange={(value) => {
              setDuration(value);
              updateData({ duration: value });
            }}>
              <SelectTrigger className="h-12 border-gray-300 focus:border-swap-blue">
                <SelectValue placeholder="How long do you want to stay?" />
              </SelectTrigger>
              <SelectContent>
                {durationOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="budget" className="text-base font-medium">Budget Range *</Label>
            <Select value={budget} onValueChange={(value) => {
              setBudget(value);
              updateData({ budget: value });
            }}>
              <SelectTrigger className="h-12 border-gray-300 focus:border-swap-blue">
                <SelectValue placeholder="Your budget range" />
              </SelectTrigger>
              <SelectContent>
                {budgetRanges.map((range) => (
                  <SelectItem key={range.value} value={range.value}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Budget Disclaimer */}
        <Alert className="mb-6 border-blue-200 bg-blue-50">
          <Info className="h-4 w-4" />
          <AlertDescription className="text-blue-800">
            <strong>Why we ask for budget range:</strong> We use this information to make the most fair matches possible. 
            This helps us connect you with partners who have similar expectations about accommodation costs and living standards.
            <br /><br />
            <strong>Our service fee:</strong> SwapSpot charges a small verification and matching fee. We'll provide full pricing details 
            before you confirm any exchange to ensure complete transparency.
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-2">
            <Label htmlFor="start-date" className="text-base font-medium">Preferred Start Date *</Label>
            <Input
              id="start-date"
              type="date"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
                updateData({ startDate: e.target.value });
              }}
              className="h-12 border-gray-300 focus:border-swap-blue"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="end-date" className="text-base font-medium">Preferred End Date *</Label>
            <Input
              id="end-date"
              type="date"
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value);
                updateData({ endDate: e.target.value });
              }}
              className="h-12 border-gray-300 focus:border-swap-blue"
              required
            />
          </div>
        </div>

        <AmenitiesSelector
          selectedAmenities={preferredAmenities}
          onAmenitiesChange={(amenities) => {
            setPreferredAmenities(amenities);
            updateData({ preferredAmenities: amenities });
          }}
          title="Preferred Amenities for Exchange Accommodation"
        />
      </div>

      <div className="flex gap-4 pt-6">
        {canGoPrevious && (
          <Button 
            type="button" 
            variant="outline" 
            onClick={onPrevious} 
            className="flex-1 h-12 border-2 border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Previous
          </Button>
        )}
        <Button 
          onClick={handleNext} 
          disabled={!currentLocation || !currentAddress || !duration || !budget || !startDate || !endDate || apartmentPhotos.length === 0}
          className="flex-1 h-12 bg-[#EA6B4A] hover:bg-[#EA6B4A]/90 text-white font-medium"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default EnhancedPreferencesStep;
