
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MapPin, Calendar, Euro, ArrowRightLeft, Search, SlidersHorizontal } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data for swaps
const allSwaps = [
  {
    id: 1,
    user: {
      name: "Emma Johnson",
      avatar: "https://i.pravatar.cc/150?img=1",
      university: "Sciences Po Paris"
    },
    current: {
      city: "Paris, France",
      type: "Studio Apartment",
      price: "€800/month",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXBhcnRtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60"
    },
    wanted: {
      city: "Madrid, Spain",
      type: "Any",
      price: "€600-800/month"
    },
    dates: "Sep 5, 2023 - Feb 20, 2024",
    tags: ["Near University", "Furnished", "Public Transit"]
  },
  {
    id: 2,
    user: {
      name: "Miguel Santos",
      avatar: "https://i.pravatar.cc/150?img=11",
      university: "University of Barcelona"
    },
    current: {
      city: "Barcelona, Spain",
      type: "1 Bedroom Apartment",
      price: "€750/month",
      image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGFwYXJ0bWVudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60"
    },
    wanted: {
      city: "Berlin, Germany",
      type: "Studio or Room",
      price: "€500-800/month"
    },
    dates: "Oct 10, 2023 - Mar 15, 2024",
    tags: ["Balcony", "WiFi", "Furnished"]
  },
  {
    id: 3,
    user: {
      name: "Sophie Weber",
      avatar: "https://i.pravatar.cc/150?img=5",
      university: "Humboldt University"
    },
    current: {
      city: "Berlin, Germany",
      type: "2 Bedroom Apartment (Shared)",
      price: "€550/month",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGFwYXJ0bWVudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60"
    },
    wanted: {
      city: "Copenhagen, Denmark",
      type: "Any",
      price: "€500-700/month"
    },
    dates: "Jan 15, 2024 - Jun 30, 2024",
    tags: ["Pet Friendly", "Near Park", "Bicycle Storage"]
  },
  {
    id: 4,
    user: {
      name: "Anna Kowalski",
      avatar: "https://i.pravatar.cc/150?img=6",
      university: "University of Warsaw"
    },
    current: {
      city: "Warsaw, Poland",
      type: "1 Bedroom Apartment",
      price: "€500/month",
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fGFwYXJ0bWVudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60"
    },
    wanted: {
      city: "Vienna, Austria",
      type: "Studio or 1 Bedroom",
      price: "€500-700/month"
    },
    dates: "Feb 1, 2024 - Jul 15, 2024",
    tags: ["City Center", "Fully Equipped Kitchen", "Quiet"]
  },
  {
    id: 5,
    user: {
      name: "Lukas Müller",
      avatar: "https://i.pravatar.cc/150?img=12",
      university: "TU Munich"
    },
    current: {
      city: "Munich, Germany",
      type: "Studio Apartment",
      price: "€650/month",
      image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW9kZXJuJTIwYXBhcnRtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60"
    },
    wanted: {
      city: "Amsterdam, Netherlands",
      type: "Any",
      price: "€600-800/month"
    },
    dates: "Mar 10, 2024 - Aug 20, 2024",
    tags: ["Modern", "Near Public Transport", "Furnished"]
  },
  {
    id: 6,
    user: {
      name: "Clara Dupont",
      avatar: "https://i.pravatar.cc/150?img=9",
      university: "Université de Genève"
    },
    current: {
      city: "Geneva, Switzerland",
      type: "Room in Shared Apartment",
      price: "€700/month",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXBhcnRtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60"
    },
    wanted: {
      city: "London, UK",
      type: "Room or Studio",
      price: "€700-900/month"
    },
    dates: "Sep 1, 2024 - Jan 31, 2025",
    tags: ["Lake View", "Furnished", "Student Area"]
  }
];

const Browse = () => {
  const [swaps, setSwaps] = useState(allSwaps);
  const [searchLocation, setSearchLocation] = useState("");
  const [filtersVisible, setFiltersVisible] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchLocation.trim()) {
      setSwaps(allSwaps);
      return;
    }
    
    const filtered = allSwaps.filter(swap => 
      swap.current.city.toLowerCase().includes(searchLocation.toLowerCase()) ||
      swap.wanted.city.toLowerCase().includes(searchLocation.toLowerCase())
    );
    
    setSwaps(filtered);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-8 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Browse Available Swaps</h1>
            <p className="text-gray-600">Find your perfect accommodation swap from students around the world</p>
          </div>
          
          {/* Search and filter bar */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
              <div className="flex-grow">
                <Input 
                  placeholder="Search by location (offering or wanted)" 
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="w-full"
                />
              </div>
              <Button type="submit" className="bg-swap-blue hover:bg-swap-darkBlue">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setFiltersVisible(!filtersVisible)}
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </form>
            
            {filtersVisible && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t">
                <div>
                  <label className="block text-sm font-medium mb-1">Price Range</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select price range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-500">€0 - €500/month</SelectItem>
                      <SelectItem value="500-750">€500 - €750/month</SelectItem>
                      <SelectItem value="750-1000">€750 - €1000/month</SelectItem>
                      <SelectItem value="1000+">€1000+/month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Type</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select accommodation type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="studio">Studio</SelectItem>
                      <SelectItem value="1br">1 Bedroom</SelectItem>
                      <SelectItem value="shared">Room in Shared Apartment</SelectItem>
                      <SelectItem value="any">Any</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Available From</label>
                  <Input type="date" />
                </div>
              </div>
            )}
          </div>
          
          {/* Results */}
          <div className="mb-4">
            <p className="text-gray-600">{swaps.length} results found</p>
          </div>
          
          {swaps.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {swaps.map((swap) => (
                <Card key={swap.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <img 
                          src={swap.user.avatar} 
                          alt={swap.user.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <CardTitle className="text-lg">{swap.user.name}</CardTitle>
                          <CardDescription>{swap.user.university}</CardDescription>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="flex items-center justify-between mb-4 pt-2">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Calendar className="h-4 w-4 text-swap-blue" />
                        <span>{swap.dates}</span>
                      </div>
                    </div>
                    
                    {/* Apartment image */}
                    <div className="mb-4 aspect-video rounded-md overflow-hidden">
                      <img 
                        src={swap.current.image} 
                        alt={`${swap.current.city} apartment`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-swap-lightBlue rounded-lg p-4">
                        <h4 className="font-medium mb-2 text-sm uppercase text-gray-500">Current Place</h4>
                        <div className="mb-2">
                          <div className="flex items-center gap-1 mb-1">
                            <MapPin className="h-4 w-4 text-swap-blue" />
                            <span className="font-medium">{swap.current.city}</span>
                          </div>
                          <p className="text-sm text-gray-600">{swap.current.type}</p>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Euro className="h-4 w-4" />
                          <span>{swap.current.price}</span>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium mb-2 text-sm uppercase text-gray-500">Looking For</h4>
                        <div className="mb-2">
                          <div className="flex items-center gap-1 mb-1">
                            <MapPin className="h-4 w-4 text-swap-blue" />
                            <span className="font-medium">{swap.wanted.city}</span>
                          </div>
                          <p className="text-sm text-gray-600">{swap.wanted.type}</p>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Euro className="h-4 w-4" />
                          <span>{swap.wanted.price}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-2">
                      {swap.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-800 hover:bg-gray-200">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  
                  <CardFooter>
                    <Button asChild className="w-full bg-swap-blue hover:bg-swap-darkBlue">
                      <Link to={`/swaps/${swap.id}`}>
                        <ArrowRightLeft className="h-4 w-4 mr-2" />
                        View Swap Details
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="bg-gray-100 p-8 rounded-lg inline-block mb-4">
                <Search className="h-12 w-12 text-gray-400 mx-auto" />
              </div>
              <h3 className="text-xl font-medium mb-2">No swaps found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search criteria or check back later for new listings
              </p>
              <Button onClick={() => {setSearchLocation(''); setSwaps(allSwaps);}}>
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Browse;
