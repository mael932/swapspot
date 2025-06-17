
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Euro, 
  Wifi, 
  Car, 
  Utensils, 
  Tv, 
  Wind, 
  Droplets, 
  Zap, 
  Home,
  X,
  Check,
  PawPrint,
  Cigarette
} from "lucide-react";

interface RoomDetailsProps {
  room: {
    id: string;
    title: string;
    type: string;
    images: string[];
    pricing: {
      monthlyRent?: string;
      utilities?: string;
      deposit?: string;
      notes?: string;
    };
    amenities: string[];
    houseRules: {
      smoking: boolean;
      pets: boolean;
      guests: boolean;
      quietHours?: string;
      cleaningSchedule?: string;
    };
    description: string;
    location: {
      neighborhood: string;
      transportation: string[];
      nearbyUniversities: string[];
    };
  };
  className?: string;
}

export default function RoomDetails({ room, className }: RoomDetailsProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const getAmenityIcon = (amenity: string) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      "WiFi": <Wifi className="h-4 w-4" />,
      "Parking": <Car className="h-4 w-4" />,
      "Kitchen": <Utensils className="h-4 w-4" />,
      "TV": <Tv className="h-4 w-4" />,
      "Air Conditioning": <Wind className="h-4 w-4" />,
      "Heating": <Droplets className="h-4 w-4" />,
      "Electricity": <Zap className="h-4 w-4" />,
      "Furnished": <Home className="h-4 w-4" />,
    };
    return iconMap[amenity] || <Home className="h-4 w-4" />;
  };

  return (
    <div className={className}>
      {/* Image Gallery */}
      <Card className="mb-6">
        <CardContent className="p-0">
          <div className="relative aspect-video">
            <img 
              src={room.images[activeImageIndex]} 
              alt={`${room.title} - Image ${activeImageIndex + 1}`}
              className="w-full h-full object-cover rounded-t-lg"
              onError={(e) => {
                console.log(`Failed to load main image: ${room.images[activeImageIndex]}`);
                e.currentTarget.src = "https://images.unsplash.com/photo-1615874955480-11278309c194?ixlib=rb-4.0.3&w=1000&q=80";
              }}
            />
            <div className="absolute top-4 right-4">
              <Badge variant="secondary" className="bg-black/70 text-white">
                {activeImageIndex + 1} / {room.images.length}
              </Badge>
            </div>
          </div>
          <div className="p-4">
            <div className="flex overflow-x-auto gap-2 pb-2">
              {room.images.map((image, index) => (
                <button 
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden border-2 transition-all ${
                    index === activeImageIndex ? 'border-swap-blue' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      console.log(`Failed to load thumbnail: ${image}`);
                      e.currentTarget.src = "https://images.unsplash.com/photo-1615874955480-11278309c194?ixlib=rb-4.0.3&w=200&q=80";
                    }}
                  />
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Room Info */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{room.title}</span>
            <Badge variant="outline">{room.type}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-4">{room.description}</p>
          
          {/* Location Info */}
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <h4 className="font-medium mb-2">Location</h4>
            <p className="text-sm text-gray-600 mb-2">{room.location.neighborhood}</p>
            
            <div className="space-y-2">
              <div>
                <span className="text-xs font-medium text-gray-500">Transportation:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {room.location.transportation.map((transport, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {transport}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <span className="text-xs font-medium text-gray-500">Nearby Universities:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {room.location.nearbyUniversities.map((uni, index) => (
                    <Badge key={index} variant="secondary" className="text-xs bg-swap-lightBlue text-swap-darkBlue">
                      {uni}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pricing */}
      {(room.pricing.monthlyRent || room.pricing.utilities) && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Euro className="h-5 w-5 text-swap-blue" />
              Pricing Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {room.pricing.monthlyRent && (
                <div>
                  <span className="text-sm font-medium text-gray-500">Monthly Rent</span>
                  <p className="text-lg font-semibold">{room.pricing.monthlyRent}</p>
                </div>
              )}
              {room.pricing.utilities && (
                <div>
                  <span className="text-sm font-medium text-gray-500">Utilities</span>
                  <p className="text-lg font-semibold">{room.pricing.utilities}</p>
                </div>
              )}
              {room.pricing.deposit && (
                <div>
                  <span className="text-sm font-medium text-gray-500">Deposit</span>
                  <p className="text-lg font-semibold">{room.pricing.deposit}</p>
                </div>
              )}
            </div>
            {room.pricing.notes && (
              <p className="text-sm text-gray-600 mt-3 italic">{room.pricing.notes}</p>
            )}
          </CardContent>
        </Card>
      )}

      {/* Amenities */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Amenities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {room.amenities.map((amenity, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <div className="text-swap-blue">
                  {getAmenityIcon(amenity)}
                </div>
                <span>{amenity}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* House Rules */}
      <Card>
        <CardHeader>
          <CardTitle>House Rules</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Cigarette className="h-4 w-4 text-gray-500" />
                <span className="text-sm">Smoking</span>
              </div>
              <div className="flex items-center gap-1">
                {room.houseRules.smoking ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <X className="h-4 w-4 text-red-600" />
                )}
                <span className="text-sm">
                  {room.houseRules.smoking ? "Allowed" : "Not allowed"}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <PawPrint className="h-4 w-4 text-gray-500" />
                <span className="text-sm">Pets</span>
              </div>
              <div className="flex items-center gap-1">
                {room.houseRules.pets ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <X className="h-4 w-4 text-red-600" />
                )}
                <span className="text-sm">
                  {room.houseRules.pets ? "Allowed" : "Not allowed"}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Home className="h-4 w-4 text-gray-500" />
                <span className="text-sm">Guests</span>
              </div>
              <div className="flex items-center gap-1">
                {room.houseRules.guests ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <X className="h-4 w-4 text-red-600" />
                )}
                <span className="text-sm">
                  {room.houseRules.guests ? "Allowed" : "Not allowed"}
                </span>
              </div>
            </div>

            {room.houseRules.quietHours && (
              <div className="border-t pt-3 mt-3">
                <span className="text-sm font-medium text-gray-600">Quiet Hours:</span>
                <p className="text-sm text-gray-700">{room.houseRules.quietHours}</p>
              </div>
            )}

            {room.houseRules.cleaningSchedule && (
              <div className="border-t pt-3 mt-3">
                <span className="text-sm font-medium text-gray-600">Cleaning Schedule:</span>
                <p className="text-sm text-gray-700">{room.houseRules.cleaningSchedule}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
