
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RoomDetails from "@/components/RoomDetails";
import FavoriteButton from "@/components/FavoriteButton";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Shield, Users, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactFormDialog from "@/components/shared/ContactFormDialog";
import SwapAgreementDialog from "@/components/SwapAgreementDialog";
import MessagingDialog from "@/components/MessagingDialog";

interface SwapDetailParams {
  id: string;
}

interface MockSwap {
  id: string;
  host: {
    id: string;
    name: string;
    avatar: string;
    university: string;
    studyProgram: string;
    yearOfStudy: string;
    currentLocation: string;
    languages: string[];
    interests: string[];
    about: string;
    isVerified: boolean;
    verificationMethod?: string;
    backgroundCheckVerified?: boolean;
  };
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
  location: {
    city: string;
    country: string;
  };
  dates: {
    startDate: string;
    endDate: string;
  };
  stats: {
    views: number;
    saves: number;
    shares: number;
  };
  safety: {
    rating: number;
    reviews: number;
    tips: string[];
  };
}

const SwapDetail = () => {
  const { id } = useParams<{ id: string }>();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Mock data with working image URLs
  const mockSwap: MockSwap = {
    id: id || "1",
    host: {
      id: "1",
      name: "John Doe",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      university: "University of Example",
      studyProgram: "Computer Science",
      yearOfStudy: "3rd Year",
      currentLocation: "New York, USA",
      languages: ["English", "Spanish"],
      interests: ["Photography", "Music", "Travel"],
      about: "Hi, I'm John! I'm looking for a place to stay during my exchange program.",
      isVerified: true,
      verificationMethod: "University ID",
      backgroundCheckVerified: true,
    },
    room: {
      id: "101",
      title: "Cozy Studio Apartment",
      type: "Studio",
      images: [
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&w=800&q=80",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&w=800&q=80",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&w=800&q=80",
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&w=800&q=80",
      ],
      pricing: {
        monthlyRent: "$1200",
        utilities: "$100",
        deposit: "$600",
        notes: "Negotiable, depending on the length of stay.",
      },
      amenities: ["WiFi", "Kitchen", "TV", "Air Conditioning"],
      houseRules: {
        smoking: false,
        pets: false,
        guests: true,
        quietHours: "10 PM - 7 AM",
        cleaningSchedule: "Weekly cleaning provided",
      },
      description:
        "A comfortable studio apartment perfect for students. Close to campus and public transportation.",
      location: {
        neighborhood: "Downtown",
        transportation: ["Bus", "Train", "Subway"],
        nearbyUniversities: ["University of Example", "College of Arts"],
      },
    },
    location: {
      city: "New York",
      country: "USA",
    },
    dates: {
      startDate: "2024-09-01",
      endDate: "2024-12-31",
    },
    stats: {
      views: 1234,
      saves: 123,
      shares: 12,
    },
    safety: {
      rating: 4.5,
      reviews: 50,
      tips: [
        "Always lock the door.",
        "Be aware of your surroundings.",
        "Don't walk alone at night.",
      ],
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-6 max-w-6xl">
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column - Room Details */}
            <div className="lg:col-span-2">
              <RoomDetails room={mockSwap.room} />
            </div>

            {/* Right Column - Student & Contact */}
            <div className="lg:col-span-1 space-y-4">
              
              {/* Price & Quick Info Card */}
              <Card className="sticky top-4">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-swap-blue mb-1">
                      {mockSwap.room.pricing.monthlyRent}
                    </div>
                    <div className="text-sm text-gray-600">per month</div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Location</span>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="font-medium">{mockSwap.location.city}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Duration</span>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="font-medium">4 months</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Room Type</span>
                      <Badge variant="outline">{mockSwap.room.type}</Badge>
                    </div>
                  </div>

                  {/* Contact Actions */}
                  <div className="space-y-3">
                    <MessagingDialog 
                      recipientName={mockSwap.host.name}
                      listingTitle={mockSwap.room.title}
                      listingLocation={`${mockSwap.location.city}, ${mockSwap.location.country}`}
                      contactInfo={{
                        instagram: "john_exchange",
                        whatsapp: "+1 555 123 4567",
                        snapchat: "johndoe_snap",
                        email: "john@university-example.edu"
                      }}
                      buttonVariant="default"
                      buttonText="View Contact Info"
                      className="w-full bg-swap-blue hover:bg-swap-darkBlue text-lg py-3"
                    />
                    
                    <SwapAgreementDialog
                      recipientName={mockSwap.host.name}
                      listingTitle={mockSwap.room.title}
                      listingLocation={`${mockSwap.location.city}, ${mockSwap.location.country}`}
                      listingDates={{
                        startDate: mockSwap.dates.startDate,
                        endDate: mockSwap.dates.endDate
                      }}
                      userDates={{
                        startDate: "2025-09-01",
                        endDate: "2025-12-15"
                      }}
                      buttonVariant="outline"
                      className="w-full"
                    />
                    
                    <FavoriteButton 
                      listingId={mockSwap.id}
                      variant="ghost"
                      className="w-full"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Student Profile - Compact */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <img 
                      src={mockSwap.host.avatar} 
                      alt={mockSwap.host.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-swap-blue"
                      onError={(e) => {
                        console.log(`Failed to load student avatar: ${mockSwap.host.avatar}`);
                        e.currentTarget.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face";
                      }}
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{mockSwap.host.name}</h3>
                        {mockSwap.host.isVerified && (
                          <Shield className="h-4 w-4 text-green-600" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{mockSwap.host.studyProgram}</p>
                      <p className="text-xs text-gray-500">{mockSwap.host.university}</p>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-700 mb-3">{mockSwap.host.about}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-2">
                    {mockSwap.host.languages.map((language, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {language}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      <span>{mockSwap.stats.views} views</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3" />
                      <span>Student Verified</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Connection Message */}
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <p className="text-sm text-blue-800 text-center">
                    Connect with a verified student who understands your exchange experience
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SwapDetail;
