import React from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RoomDetails from "@/components/RoomDetails";
import StudentProfile from "@/components/StudentProfile";
import FavoriteButton from "@/components/FavoriteButton";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactFormDialog from "@/components/shared/ContactFormDialog";
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

  // Mock data for the swap detail page
  const mockSwap: MockSwap = {
    id: id || "1",
    host: {
      id: "1",
      name: "John Doe",
      avatar: "https://images.unsplash.com/photo-1500648767791-00d5a4ee9baa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80",
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
        "https://images.unsplash.com/photo-1615874955480-11278309c194?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHN0dWRlbnQlMjByb29tfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
        "https://images.unsplash.com/photo-1588072432829-3f42f6506e96?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHN0dWRlbnQlMjByb29tfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
        "https://images.unsplash.com/photo-1541444445040-625243592752?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHN0dWRlbnQlMjByb29tfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Room Details */}
              <RoomDetails room={mockSwap.room} />
            </div>

            <div className="space-y-6">
              {/* Host Profile */}
              <StudentProfile student={mockSwap.host} />

              {/* Contact */}
              <Card>
                <CardHeader>
                  <CardTitle>Interested in this swap?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <MessagingDialog
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
                    buttonText="Send Message"
                    className="w-full"
                  />
                  
                  <FavoriteButton 
                    listingId={mockSwap.id}
                    variant="outline"
                    className="w-full"
                  />
                </CardContent>
              </Card>

              {/* Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Views</span>
                    <Badge variant="secondary">{mockSwap.stats.views}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Saves</span>
                    <Badge variant="secondary">{mockSwap.stats.saves}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Shares</span>
                    <Badge variant="secondary">{mockSwap.stats.shares}</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Location */}
              <Card>
                <CardHeader>
                  <CardTitle>Location</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span>{mockSwap.location.city}, {mockSwap.location.country}</span>
                  </div>
                  {/* Add a map component here if you have one */}
                </CardContent>
              </Card>

              {/* Safety Tips */}
              <Card>
                <CardHeader>
                  <CardTitle>Safety Tips</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {mockSwap.safety.tips.map((tip, index) => (
                    <div key={index} className="text-sm text-gray-700">
                      - {tip}
                    </div>
                  ))}
                  <div className="flex items-center gap-1 mt-2">
                    <Badge variant="secondary">Rating: {mockSwap.safety.rating}</Badge>
                    <span className="text-sm text-gray-500">({mockSwap.safety.reviews} reviews)</span>
                  </div>
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
