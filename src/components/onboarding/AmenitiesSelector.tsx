
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { 
  Wifi, 
  Car, 
  Waves, 
  Dumbbell, 
  WashingMachine, 
  Tv, 
  Coffee,
  Utensils,
  Bath,
  Snowflake,
  Flame,
  Shield
} from "lucide-react";

interface AmenitiesSelectorProps {
  selectedAmenities: string[];
  onAmenitiesChange: (amenities: string[]) => void;
  title: string;
}

const amenitiesList = [
  { id: "wifi", label: "WiFi", icon: Wifi },
  { id: "parking", label: "Parking", icon: Car },
  { id: "pool", label: "Swimming Pool", icon: Waves },
  { id: "gym", label: "Gym/Fitness", icon: Dumbbell },
  { id: "laundry", label: "Laundry", icon: WashingMachine },
  { id: "tv", label: "TV", icon: Tv },
  { id: "kitchen", label: "Kitchen Access", icon: Utensils },
  { id: "dishwasher", label: "Dishwasher", icon: Coffee },
  { id: "bathroom", label: "Private Bathroom", icon: Bath },
  { id: "aircon", label: "Air Conditioning", icon: Snowflake },
  { id: "heating", label: "Heating", icon: Flame },
  { id: "security", label: "Security", icon: Shield }
];

const AmenitiesSelector: React.FC<AmenitiesSelectorProps> = ({
  selectedAmenities,
  onAmenitiesChange,
  title
}) => {
  const toggleAmenity = (amenityId: string) => {
    const updated = selectedAmenities.includes(amenityId)
      ? selectedAmenities.filter(id => id !== amenityId)
      : [...selectedAmenities, amenityId];
    onAmenitiesChange(updated);
  };

  return (
    <div className="space-y-4">
      <Label className="text-base font-medium">{title}</Label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {amenitiesList.map((amenity) => {
          const IconComponent = amenity.icon;
          return (
            <div
              key={amenity.id}
              className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all hover:bg-gray-50 ${
                selectedAmenities.includes(amenity.id)
                  ? "border-swap-blue bg-blue-50"
                  : "border-gray-200"
              }`}
              onClick={() => toggleAmenity(amenity.id)}
            >
              <Checkbox
                id={amenity.id}
                checked={selectedAmenities.includes(amenity.id)}
                onChange={() => toggleAmenity(amenity.id)}
              />
              <IconComponent className="h-5 w-5 text-gray-600" />
              <Label htmlFor={amenity.id} className="text-sm font-medium cursor-pointer">
                {amenity.label}
              </Label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AmenitiesSelector;
