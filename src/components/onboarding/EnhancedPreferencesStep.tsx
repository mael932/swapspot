
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Upload, MapPin, Calendar, Home, Euro } from "lucide-react";

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
  const [preferredDestinations, setPreferredDestinations] = useState<string[]>(data.preferredDestinations || []);
  const [apartmentPhotos, setApartmentPhotos] = useState<File[]>(data.apartmentPhotos || []);
  const [apartmentDescription, setApartmentDescription] = useState(data.apartmentDescription || "");

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

  const europeanCountries = [
    "Netherlands", "Germany", "France", "Spain", "Italy", "Portugal",
    "Belgium", "Austria", "Switzerland", "Sweden", "Norway", "Denmark",
    "Finland", "Poland", "Czech Republic", "Hungary", "Greece", "Croatia"
  ];

  const toggleDestination = (country: string) => {
    const updated = preferredDestinations.includes(country)
      ? preferredDestinations.filter(c => c !== country)
      : [...preferredDestinations, country];
    setPreferredDestinations(updated);
    updateData({ preferredDestinations: updated });
  };

  const handlePhotosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setApartmentPhotos(files);
      updateData({ apartmentPhotos: files });
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
      preferredDestinations,
      apartmentPhotos,
      apartmentDescription,
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
      <div className="text-center mb-6">
        <MapPin className="h-12 w-12 text-swap-blue mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-swap-blue mb-2">
          Your Stay Details & Preferences
        </h3>
        <p className="text-gray-600">
          Tell us about where you're staying now and where you'd like to go.
        </p>
      </div>

      {/* Current Location Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-blue-800 mb-4 flex items-center gap-2">
          <Home className="h-5 w-5" />
          Your Current Accommodation
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <Label htmlFor="current-location">City & Country *</Label>
            <Input
              id="current-location"
              placeholder="e.g., Amsterdam, Netherlands"
              value={currentLocation}
              onChange={(e) => {
                setCurrentLocation(e.target.value);
                updateData({ currentLocation: e.target.value });
              }}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="current-address">Full Address *</Label>
            <Input
              id="current-address"
              placeholder="Street address, postal code"
              value={currentAddress}
              onChange={(e) => {
                setCurrentAddress(e.target.value);
                updateData({ currentAddress: e.target.value });
              }}
              required
            />
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <Label htmlFor="apartment-description">Describe Your Place</Label>
          <Textarea
            id="apartment-description"
            placeholder="Describe your current accommodation (size, amenities, neighborhood, etc.)"
            value={apartmentDescription}
            onChange={(e) => {
              setApartmentDescription(e.target.value);
              updateData({ apartmentDescription: e.target.value });
            }}
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="apartment-photos">Photos of Your Place *</Label>
          <div className="border-2 border-dashed border-blue-300 rounded-lg p-4 text-center">
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
              <div className="flex flex-col items-center gap-2">
                <Upload className="h-8 w-8 text-blue-400" />
                <span className="text-sm text-blue-700">
                  {apartmentPhotos.length > 0 
                    ? `${apartmentPhotos.length} photos selected`
                    : "Upload photos of your apartment"
                  }
                </span>
                <span className="text-xs text-blue-600">
                  Multiple photos help attract better matches
                </span>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Exchange Preferences Section */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-green-800 mb-4 flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Your Exchange Preferences
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <Label htmlFor="duration">Duration *</Label>
            <Select value={duration} onValueChange={(value) => {
              setDuration(value);
              updateData({ duration: value });
            }}>
              <SelectTrigger>
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
            <Label htmlFor="budget">Budget Range *</Label>
            <Select value={budget} onValueChange={(value) => {
              setBudget(value);
              updateData({ budget: value });
            }}>
              <SelectTrigger>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <Label htmlFor="start-date">Preferred Start Date *</Label>
            <Input
              id="start-date"
              type="date"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
                updateData({ startDate: e.target.value });
              }}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="end-date">Preferred End Date *</Label>
            <Input
              id="end-date"
              type="date"
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value);
                updateData({ endDate: e.target.value });
              }}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Preferred Destinations *</Label>
          <p className="text-sm text-gray-600 mb-3">Select the countries you'd like to visit (choose multiple):</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-48 overflow-y-auto border rounded-lg p-4">
            {europeanCountries.map((country) => (
              <div key={country} className="flex items-center space-x-2">
                <Checkbox
                  id={country}
                  checked={preferredDestinations.includes(country)}
                  onCheckedChange={() => toggleDestination(country)}
                />
                <Label htmlFor={country} className="text-sm font-medium">{country}</Label>
              </div>
            ))}
          </div>
          {preferredDestinations.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {preferredDestinations.map((country) => (
                <Badge key={country} variant="secondary" className="bg-green-100 text-green-800">
                  {country}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        {canGoPrevious && (
          <Button type="button" variant="outline" onClick={onPrevious} className="flex-1">
            Previous
          </Button>
        )}
        <Button 
          onClick={handleNext} 
          disabled={!currentLocation || !currentAddress || !duration || !budget || !startDate || !endDate || preferredDestinations.length === 0 || apartmentPhotos.length === 0}
          className="flex-1"
        >
          Complete Registration
        </Button>
      </div>
    </div>
  );
};

export default EnhancedPreferencesStep;
