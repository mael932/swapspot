
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MapPin, Calendar, Users, Star } from "lucide-react";
import SwapCompatibilityIndicator from "./SwapCompatibilityIndicator";

interface RecommendedSwap {
  id: string;
  title: string;
  location: string;
  dates: {
    startDate: string;
    endDate: string;
  };
  university: string;
  hostName: string;
  hostAvatar: string;
  images: string[];
  compatibility: number;
  type: string;
  price?: string;
  verified: boolean;
}

interface SmartRecommendationsProps {
  userPreferences?: {
    location?: string;
    dates?: {
      startDate: string;
      endDate: string;
    };
    university?: string;
  };
  className?: string;
}

export default function SmartRecommendations({ userPreferences, className }: SmartRecommendationsProps) {
  // Mock recommendations - in real app, this would come from API based on user preferences
  const mockRecommendations: RecommendedSwap[] = [
    {
      id: "1",
      title: "Cozy Studio Near Campus",
      location: "Barcelona, Spain",
      dates: { startDate: "2025-09-01", endDate: "2025-12-15" },
      university: "Universitat de Barcelona",
      hostName: "Maria García",
      hostAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b193?w=150&h=150&fit=crop&crop=face",
      images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop"],
      compatibility: 95,
      type: "Room Swap",
      price: "€450/month",
      verified: true
    },
    {
      id: "2", 
      title: "Modern Apartment Downtown",
      location: "Paris, France",
      dates: { startDate: "2025-08-15", endDate: "2025-12-20" },
      university: "Sorbonne University",
      hostName: "Pierre Dubois",
      hostAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop"],
      compatibility: 87,
      type: "Full Apartment",
      price: "€600/month",
      verified: true
    },
    {
      id: "3",
      title: "Student Dorm Room",
      location: "Amsterdam, Netherlands", 
      dates: { startDate: "2025-09-15", endDate: "2025-01-15" },
      university: "University of Amsterdam",
      hostName: "Emma van der Berg",
      hostAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      images: ["https://images.unsplash.com/photo-1555854877-bab0e5734e27?w=400&h=300&fit=crop"],
      compatibility: 82,
      type: "Room Swap",
      verified: false
    }
  ];

  return (
    <div className={className}>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-swap-blue mb-2">Recommended for You</h2>
        <p className="text-gray-600">
          Based on your preferences and profile, here are your top compatible swaps
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockRecommendations.map((swap, index) => (
          <Card key={swap.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img 
                src={swap.images[0]} 
                alt={swap.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-3 left-3">
                <Badge className="bg-swap-blue text-white">
                  #{index + 1} Match
                </Badge>
              </div>
              <div className="absolute top-3 right-3">
                <SwapCompatibilityIndicator 
                  compatibility={swap.compatibility}
                  variant="compact"
                />
              </div>
              {swap.verified && (
                <div className="absolute bottom-3 left-3">
                  <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">
                    Verified
                  </Badge>
                </div>
              )}
            </div>

            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{swap.title}</CardTitle>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{swap.location}</span>
                </div>
                {swap.price && (
                  <Badge variant="outline">{swap.price}</Badge>
                )}
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <img 
                  src={swap.hostAvatar} 
                  alt={swap.hostName}
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <p className="text-sm font-medium">{swap.hostName}</p>
                  <p className="text-xs text-gray-500">{swap.university}</p>
                </div>
              </div>

              <div className="flex items-center gap-1 text-sm text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>
                  {new Date(swap.dates.startDate).toLocaleDateString()} - {new Date(swap.dates.endDate).toLocaleDateString()}
                </span>
              </div>

              <div className="flex gap-2">
                <Button asChild className="flex-1">
                  <Link to={`/swaps/${swap.id}`}>
                    View Details
                  </Link>
                </Button>
                <Button variant="outline" size="sm" className="px-3">
                  <Star className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6 text-center">
        <Button variant="outline" asChild>
          <Link to="/browse">
            View All Swaps
          </Link>
        </Button>
      </div>
    </div>
  );
}
