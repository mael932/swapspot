
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { DollarSign, MapPin, Home } from "lucide-react";
import { OnboardingData } from "./OnboardingFlow";

interface RequirementsStepProps {
  data: OnboardingData;
  onUpdate: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
}

const RequirementsStep: React.FC<RequirementsStepProps> = ({
  data,
  onUpdate,
  onNext,
  onPrevious,
  canGoNext,
  canGoPrevious
}) => {
  const handleMinPriceChange = (value: string) => {
    const minPrice = parseInt(value) || 0;
    onUpdate({
      requirements: {
        ...data.requirements,
        priceRange: {
          ...data.requirements.priceRange,
          min: minPrice
        }
      }
    });
  };

  const handleMaxPriceChange = (value: string) => {
    const maxPrice = parseInt(value) || 2000;
    onUpdate({
      requirements: {
        ...data.requirements,
        priceRange: {
          ...data.requirements.priceRange,
          max: maxPrice
        }
      }
    });
  };

  const handleLocationChange = (location: string) => {
    onUpdate({
      requirements: {
        ...data.requirements,
        location
      }
    });
  };

  const handleAccommodationTypeChange = (accommodationType: string) => {
    onUpdate({
      requirements: {
        ...data.requirements,
        accommodationType
      }
    });
  };

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    const currentAmenities = data.requirements.amenities;
    const updatedAmenities = checked
      ? [...currentAmenities, amenity]
      : currentAmenities.filter(a => a !== amenity);
    
    onUpdate({
      requirements: {
        ...data.requirements,
        amenities: updatedAmenities
      }
    });
  };

  const canProceed = data.requirements.location && data.requirements.accommodationType;

  const amenitiesList = [
    "WiFi",
    "Kitchen Access",
    "Laundry",
    "Air Conditioning",
    "Heating",
    "Parking",
    "Gym Access",
    "Study Space",
    "Balcony/Terrace",
    "Near Public Transport"
  ];

  const priceOptions = [
    { value: 0, label: "€0" },
    { value: 200, label: "€200" },
    { value: 400, label: "€400" },
    { value: 600, label: "€600" },
    { value: 800, label: "€800" },
    { value: 1000, label: "€1000" },
    { value: 1200, label: "€1200" },
    { value: 1500, label: "€1500" },
    { value: 2000, label: "€2000" },
    { value: 2500, label: "€2500" },
    { value: 3000, label: "€3000+" }
  ];

  const bedroomOptions = [
    { value: "studio", label: "Studio+" },
    { value: "1", label: "1+ bedroom" },
    { value: "2", label: "2+ bedrooms" },
    { value: "3", label: "3+ bedrooms" },
    { value: "4", label: "4+ bedrooms" }
  ];

  const surfaceOptions = [
    { value: "0", label: "0+ m²" },
    { value: "20", label: "20+ m²" },
    { value: "40", label: "40+ m²" },
    { value: "60", label: "60+ m²" },
    { value: "80", label: "80+ m²" },
    { value: "100", label: "100+ m²" }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-800">Your Requirements</h3>
        <p className="text-gray-600">Tell us what you're looking for in your perfect swap</p>
      </div>

      <div className="space-y-6">
        {/* Price Range */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-base font-medium mb-2 block">Min. price</Label>
            <Select 
              value={data.requirements.priceRange.min.toString()} 
              onValueChange={handleMinPriceChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="€0" />
              </SelectTrigger>
              <SelectContent>
                {priceOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value.toString()}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label className="text-base font-medium mb-2 block">Max. price</Label>
            <Select 
              value={data.requirements.priceRange.max.toString()} 
              onValueChange={handleMaxPriceChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="€2000" />
              </SelectTrigger>
              <SelectContent>
                {priceOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value.toString()}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Bedrooms and Surface Area */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-base font-medium mb-2 block">Bedrooms</Label>
            <Select 
              value={data.requirements.accommodationType} 
              onValueChange={handleAccommodationTypeChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Studio+" />
              </SelectTrigger>
              <SelectContent>
                {bedroomOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label className="text-base font-medium mb-2 block">Surface area</Label>
            <Select defaultValue="0">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="0+ m²" />
              </SelectTrigger>
              <SelectContent>
                {surfaceOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Preferred Location */}
        <div>
          <Label htmlFor="location" className="flex items-center gap-2 mb-2">
            <MapPin className="h-4 w-4 text-swap-blue" />
            Preferred City/Location
          </Label>
          <Input
            id="location"
            placeholder="e.g., Amsterdam, Berlin, Paris..."
            value={data.requirements.location}
            onChange={(e) => handleLocationChange(e.target.value)}
          />
        </div>

        {/* Amenities */}
        <div>
          <Label className="text-base font-medium mb-3 block">Desired Amenities</Label>
          <div className="grid grid-cols-2 gap-3">
            {amenitiesList.map((amenity) => (
              <div key={amenity} className="flex items-center space-x-2">
                <Checkbox
                  id={amenity}
                  checked={data.requirements.amenities.includes(amenity)}
                  onCheckedChange={(checked) => handleAmenityChange(amenity, checked as boolean)}
                />
                <Label htmlFor={amenity} className="text-sm cursor-pointer">
                  {amenity}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Expected Matches */}
        {canProceed && (
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">👤</span>
              </div>
              <p className="text-gray-700">
                With this search you can expect <span className="font-semibold text-orange-600">15-25 matches</span> per week.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between pt-4">
        <Button 
          variant="outline" 
          onClick={onPrevious} 
          disabled={!canGoPrevious}
          className="px-8"
        >
          Previous
        </Button>
        <Button 
          onClick={onNext} 
          disabled={!canProceed || !canGoNext}
          className="px-8 bg-orange-500 hover:bg-orange-600"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default RequirementsStep;
