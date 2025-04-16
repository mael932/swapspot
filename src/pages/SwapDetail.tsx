
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { ArrowLeft, Calendar, Euro, MapPin, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

// This would typically come from an API call using the ID
const getSwapById = (id: string) => {
  // Mock data for now - in a real app, this would be fetched from a database
  const swaps = [
    {
      id: "1",
      user: {
        name: "Emma Johnson",
        avatar: "https://i.pravatar.cc/150?img=1",
        university: "Sciences Po Paris"
      },
      current: {
        city: "Paris, France",
        type: "Studio Apartment",
        price: "€800/month",
        description: "A cozy studio apartment located in the 5th arrondissement, just a 10-minute walk from Sciences Po. The apartment features a comfortable bed, a small kitchen area, and a bathroom. It's perfect for a single student and has great natural light.",
        images: [
          "/lovable-uploads/0cb5b474-ad02-4905-b91d-d7920095c6c9.png",
          "https://i.pravatar.cc/500?img=32",
          "https://i.pravatar.cc/500?img=20"
        ]
      },
      wanted: {
        city: "Madrid, Spain",
        type: "Any",
        price: "€600-800/month",
        description: "I'm looking for any type of accommodation in Madrid, preferably close to the university area. I need it for my exchange semester."
      },
      dates: "Sep 5, 2023 - Feb 20, 2024",
      tags: ["Near University", "Furnished", "Public Transit"]
    },
    {
      id: "2",
      user: {
        name: "Miguel Santos",
        avatar: "https://i.pravatar.cc/150?img=11",
        university: "University of Barcelona"
      },
      current: {
        city: "Barcelona, Spain",
        type: "1 Bedroom Apartment",
        price: "€750/month",
        description: "Modern 1-bedroom apartment in the heart of Barcelona, just 15 minutes by metro from the university. Features a spacious living room, separate bedroom, and a small balcony with a view of the street.",
        images: [
          "https://i.pravatar.cc/500?img=21",
          "https://i.pravatar.cc/500?img=22",
          "https://i.pravatar.cc/500?img=23"
        ]
      },
      wanted: {
        city: "Berlin, Germany",
        type: "Studio or Room",
        price: "€500-800/month",
        description: "Looking for a comfortable place to stay during my exchange semester in Berlin. Preferably close to public transportation."
      },
      dates: "Oct 10, 2023 - Mar 15, 2024",
      tags: ["Balcony", "WiFi", "Furnished"]
    },
    {
      id: "3",
      user: {
        name: "Sophie Weber",
        avatar: "https://i.pravatar.cc/150?img=5",
        university: "Humboldt University"
      },
      current: {
        city: "Berlin, Germany",
        type: "2 Bedroom Apartment (Shared)",
        price: "€550/month",
        description: "A room in a shared 2-bedroom apartment in Kreuzberg, Berlin. The apartment has a spacious living room, fully equipped kitchen, and a shared bathroom. Your roommate would be a friendly local student.",
        images: [
          "https://i.pravatar.cc/500?img=24",
          "https://i.pravatar.cc/500?img=25",
          "https://i.pravatar.cc/500?img=26"
        ]
      },
      wanted: {
        city: "Copenhagen, Denmark",
        type: "Any",
        price: "€500-700/month",
        description: "I'm flexible with accommodation type as long as it's in Copenhagen and within my budget range."
      },
      dates: "Jan 15, 2024 - Jun 30, 2024",
      tags: ["Pet Friendly", "Near Park", "Bicycle Storage"]
    }
  ];
  
  return swaps.find(swap => swap.id === id);
};

const SwapDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [swap, setSwap] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

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
          
          {/* User info and dates */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div className="flex items-center gap-4 mb-4 md:mb-0">
              <img 
                src={swap.user.avatar} 
                alt={swap.user.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-swap-blue"
              />
              <div>
                <h1 className="text-2xl font-bold">{swap.user.name}</h1>
                <p className="text-gray-600">{swap.user.university}</p>
              </div>
            </div>
            <div className="flex items-center bg-white px-4 py-2 rounded-lg border">
              <Calendar className="h-5 w-5 text-swap-blue mr-2" />
              <span className="font-medium">{swap.dates}</span>
            </div>
          </div>
          
          {/* Main content area */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column - place info */}
            <div className="lg:col-span-2">
              {/* Photo gallery */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
                <div className="relative aspect-video">
                  <img 
                    src={swap.current.images[activeImageIndex]} 
                    alt={`${swap.current.city} accommodation`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-2 flex overflow-x-auto gap-2">
                  {swap.current.images.map((image: string, index: number) => (
                    <button 
                      key={index}
                      onClick={() => setActiveImageIndex(index)}
                      className={`relative w-20 h-20 flex-shrink-0 ${index === activeImageIndex ? 'ring-2 ring-swap-blue' : ''}`}
                    >
                      <img 
                        src={image} 
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover rounded"
                      />
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Details grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Current place */}
                <div className="bg-swap-lightBlue rounded-lg p-6">
                  <h2 className="text-xl font-semibold mb-4">CURRENT PLACE</h2>
                  <div className="mb-3">
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin className="h-5 w-5 text-swap-blue" />
                      <span className="font-medium text-lg">{swap.current.city}</span>
                    </div>
                    <p className="text-gray-700">{swap.current.type}</p>
                  </div>
                  <div className="flex items-center gap-2 text-lg font-medium mb-4">
                    <Euro className="h-5 w-5" />
                    <span>{swap.current.price}</span>
                  </div>
                  <p className="text-gray-700">{swap.current.description}</p>
                </div>
                
                {/* Looking for */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h2 className="text-xl font-semibold mb-4">LOOKING FOR</h2>
                  <div className="mb-3">
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin className="h-5 w-5 text-swap-blue" />
                      <span className="font-medium text-lg">{swap.wanted.city}</span>
                    </div>
                    <p className="text-gray-700">{swap.wanted.type}</p>
                  </div>
                  <div className="flex items-center gap-2 text-lg font-medium mb-4">
                    <Euro className="h-5 w-5" />
                    <span>{swap.wanted.price}</span>
                  </div>
                  <p className="text-gray-700">{swap.wanted.description}</p>
                </div>
              </div>
              
              {/* Amenities/Tags */}
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-3">Amenities & Features</h3>
                <div className="flex flex-wrap gap-2">
                  {swap.tags.map((tag: string, index: number) => (
                    <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-800 py-1.5 px-3 text-sm">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Right column - contact and map */}
            <div>
              <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                <h3 className="font-semibold text-lg mb-4">Interested in this swap?</h3>
                <p className="text-gray-600 mb-6">
                  Contact {swap.user.name} to discuss the details of your potential accommodation swap
                </p>
                <Button className="w-full bg-swap-blue hover:bg-swap-darkBlue mb-3">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Send a Message
                </Button>
                <Button variant="outline" className="w-full">
                  Save to Favorites
                </Button>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-4">Location</h3>
                <div className="bg-gray-200 rounded-lg h-48 flex items-center justify-center">
                  <p className="text-gray-600">Map would be displayed here</p>
                </div>
                <p className="mt-3 text-sm text-gray-600">
                  Note: Exact location is shared only after matching
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
