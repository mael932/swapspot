import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { ArrowLeft, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import Map from "@/components/Map";
import ContactFormDialog from "@/components/shared/ContactFormDialog";
import FavoriteButton from "@/components/shared/FavoriteButton";
import StudentProfile from "@/components/StudentProfile";
import RoomDetails from "@/components/RoomDetails";

// Enhanced mock data with detailed student profiles and room information
const getSwapById = (id: string) => {
  const swaps = [
    {
      id: "1",
      user: {
        id: "user1",
        name: "Emma Johnson",
        avatar: "https://i.pravatar.cc/150?img=1",
        university: "Sciences Po Paris",
        studyProgram: "International Relations",
        yearOfStudy: "3rd Year",
        currentLocation: "Paris, France",
        languages: ["English (Native)", "French (Fluent)", "Spanish (Intermediate)"],
        interests: ["Photography", "Travel", "Reading", "Museum Visits", "Cooking"],
        about: "Hi there! I'm Emma, a 21-year-old International Relations student from Canada currently studying at Sciences Po Paris. I love exploring new cultures and am an avid photographer in my spare time. I'm a clean, organized person who respects others' space. I'm looking for a swap in Madrid as I'll be doing an exchange semester there. I don't smoke, and I'm happy to water your plants and take care of any pets you might have!",
        isVerified: true,
        verificationMethod: "University Email + Student ID",
        backgroundCheckVerified: true
      },
      current: {
        id: "room1",
        title: "Cozy Studio in Latin Quarter",
        type: "Studio Apartment",
        images: [
          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXBhcnRtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60",
          "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGFwYXJ0bWVudCUyMGtpdGNoZW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
          "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGFwYXJ0bWVudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60"
        ],
        pricing: {
          monthlyRent: "€800",
          utilities: "€50 (Electricity, Water)",
          deposit: "€400",
          notes: "Willing to negotiate for longer stays"
        },
        amenities: ["WiFi", "Furnished", "Kitchen", "Heating", "Near Metro"],
        houseRules: {
          smoking: false,
          pets: false,
          guests: true,
          quietHours: "10 PM - 8 AM",
          cleaningSchedule: "Weekly cleaning expected"
        },
        description: "A charming studio apartment in the heart of the Latin Quarter, just 10 minutes walk from Sciences Po. Perfect for a student who wants to experience authentic Parisian life. The space is compact but efficiently designed with everything you need.",
        location: {
          neighborhood: "5th Arrondissement - Latin Quarter",
          transportation: ["Metro Line 4", "RER B", "Multiple Bus Lines"],
          nearbyUniversities: ["Sciences Po Paris", "Sorbonne University", "Panthéon-Sorbonne"]
        }
      },
      wanted: {
        city: "Madrid, Spain",
        type: "Any",
        price: "€600-800/month",
        description: "I'm looking for any type of accommodation in Madrid, preferably close to the university area. I need it for my exchange semester."
      },
      dates: "Sep 5, 2023 - Feb 20, 2024"
    },
    {
      id: "2",
      user: {
        id: "user2",
        name: "Miguel Santos",
        avatar: "https://i.pravatar.cc/150?img=11",
        university: "University of Barcelona",
        studyProgram: "Architecture",
        yearOfStudy: "4th Year",
        currentLocation: "Barcelona, Spain",
        languages: ["Spanish (Native)", "Catalan (Fluent)", "English (Advanced)"],
        interests: ["Design", "Urban Planning", "Sustainable Living", "Sketching", "Guitar"],
        about: "Hello! I'm Miguel, a 23-year-old Architecture student from Barcelona. I'm very passionate about design, urban planning, and sustainable living. In my free time, I enjoy sketching city landscapes and playing guitar. I'm a responsible and tidy person who values a clean living space. I'm looking for a swap in Berlin for my upcoming exchange program. I don't smoke and I'm perfectly fine with pets as I grew up with dogs.",
        isVerified: true,
        verificationMethod: "Student ID Card",
        backgroundCheckVerified: false
      },
      current: {
        id: "room2",
        title: "Modern Apartment in Gracia",
        type: "1 Bedroom Apartment",
        images: [
          "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGFwYXJ0bWVudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60",
          "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGFwYXJ0bWVudCUyMGJlZHJvb218ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
          "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXBhcnRtZW50JTIwYmFsY29ueXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60"
        ],
        pricing: {
          monthlyRent: "€750",
          utilities: "Included",
          deposit: "€500",
          notes: "Negotiable for responsible tenants"
        },
        amenities: ["Balcony", "WiFi", "Furnished", "Close to Metro", "Natural Light"],
        houseRules: {
          smoking: false,
          pets: true,
          guests: true,
          quietHours: "11 PM - 9 AM",
          cleaningSchedule: "Shared responsibility"
        },
        description: "Modern 1-bedroom apartment in the heart of Barcelona, just 15 minutes by metro from the university. Features a spacious living room, separate bedroom, and a small balcony with a view of the street.",
        location: {
          neighborhood: "Gracia",
          transportation: ["Metro L3", "Multiple Bus Lines", "Bicing (Bike Sharing)"],
          nearbyUniversities: ["University of Barcelona", "Polytechnic University of Catalonia"]
        }
      },
      wanted: {
        city: "Berlin, Germany",
        type: "Studio or Room",
        price: "€500-800/month",
        description: "Looking for a comfortable place to stay during my exchange semester in Berlin. Preferably close to public transportation."
      },
      dates: "Oct 10, 2023 - Mar 15, 2024"
    },
    {
      id: "3",
      user: {
        id: "user3",
        name: "Sophie Weber",
        avatar: "https://i.pravatar.cc/150?img=5",
        university: "Humboldt University",
        studyProgram: "Sociology",
        yearOfStudy: "2nd Year",
        currentLocation: "Berlin, Germany",
        languages: ["German (Native)", "English (Fluent)", "French (Basic)"],
        interests: ["Reading", "Indie Films", "Cafés", "Cycling", "Vegetarian Cooking"],
        about: "Greetings from Berlin! I'm Sophie, a 22-year-old Sociology student at Humboldt University. I'm an avid reader, enjoy indie films, and love discovering hidden cafés around the city. I'm a relaxed but responsible person who keeps things tidy. I'm looking for a swap in Copenhagen for my research semester. I'm a non-smoker, vegetarian, and I love cycling as my main mode of transportation. I have a collection of plants that my neighbor will care for while I'm away.",
        isVerified: false,
        verificationMethod: null,
        backgroundCheckVerified: false
      },
      current: {
        id: "room3",
        title: "Room in Shared Apartment in Kreuzberg",
        type: "Room in 2 Bedroom Apartment",
        images: [
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGFwYXJ0bWVudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60",
          "https://images.unsplash.com/photo-1598928636135-d146006ff4be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGFwYXJ0bWVudCUyMGxpdmluZyUyMHJvb218ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YXBhcnRtZW50JTIwa2l0Y2hlbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60"
        ],
        pricing: {
          monthlyRent: "€550",
          utilities: "€80 (Shared)",
          deposit: "€300",
          notes: "Includes internet and shared supplies"
        },
        amenities: ["Pet Friendly", "Near Park", "Bicycle Storage", "Shared Kitchen", "Washing Machine"],
        houseRules: {
          smoking: false,
          pets: true,
          guests: "With notice",
          quietHours: "10 PM - 7 AM",
          cleaningSchedule: "Rotating weekly chores"
        },
        description: "A room in a shared 2-bedroom apartment in Kreuzberg, Berlin. The apartment has a spacious living room, fully equipped kitchen, and a shared bathroom. Your roommate would be a friendly local student.",
        location: {
          neighborhood: "Kreuzberg",
          transportation: ["U-Bahn U1", "Bus Lines", "Bike Paths"],
          nearbyUniversities: ["Humboldt University", "Free University of Berlin"]
        }
      },
      wanted: {
        city: "Copenhagen, Denmark",
        type: "Any",
        price: "€500-700/month",
        description: "I'm flexible with accommodation type as long as it's in Copenhagen and within my budget range."
      },
      dates: "Jan 15, 2024 - Jun 30, 2024"
    }
  ];
  
  return swaps.find(swap => swap.id === id);
};

const SwapDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [swap, setSwap] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      // In a real app, this would be an API call
      const swapData = getSwapById(id);
      setSwap(swapData);
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-pulse">Loading swap details...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!swap) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center p-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Swap Not Found</h1>
            <p className="mb-6">The swap you're looking for doesn't exist or has been removed.</p>
            <Link to="/browse">
              <Button>Browse Available Swaps</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-8 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <Link to="/browse" className="flex items-center text-swap-blue mb-6 hover:underline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Browse
          </Link>
          
          {/* Header with dates */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <h1 className="text-3xl font-bold mb-4 md:mb-0">Student Swap Details</h1>
            <div className="flex items-center bg-white px-4 py-2 rounded-lg border">
              <Calendar className="h-5 w-5 text-swap-blue mr-2" />
              <span className="font-medium">{swap.dates}</span>
            </div>
          </div>
          
          {/* Main content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column - Student profile and room details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Student Profile */}
              <StudentProfile student={swap.user} />
              
              {/* Room Details */}
              <RoomDetails room={swap.current} />
            </div>
            
            {/* Right column - Contact and looking for */}
            <div className="space-y-6">
              {/* Contact Card */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-4">Interested in this swap?</h3>
                <p className="text-gray-600 mb-6">
                  Contact {swap.user.name} to discuss the details of your potential accommodation swap
                </p>
                <ContactFormDialog 
                  recipientName={swap.user.name}
                  buttonColor="bg-swap-blue hover:bg-swap-darkBlue mb-3"
                  placeholder="I'm interested in swapping with you. I have an apartment in..."
                />
                <FavoriteButton itemName="swap opportunity" />
              </div>

              {/* Looking For Card */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-xl font-semibold mb-4">Looking For</h3>
                <div className="space-y-3">
                  <div>
                    <span className="font-medium text-gray-600">Destination:</span>
                    <p className="text-lg">{swap.wanted.city}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Type:</span>
                    <p>{swap.wanted.type}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Budget:</span>
                    <p>{swap.wanted.price}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Details:</span>
                    <p className="text-gray-700">{swap.wanted.description}</p>
                  </div>
                </div>
              </div>
              
              {/* Map */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-4">Location</h3>
                <div className="rounded-lg h-48">
                  <Map city={swap.current.location.neighborhood} />
                </div>
                <p className="mt-3 text-sm text-gray-600">
                  Note: Exact address is shared only after matching
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SwapDetail;
