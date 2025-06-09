
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MapPin, Calendar, Euro, ArrowRightLeft, Search, SlidersHorizontal, Users, Home, Shield, GraduationCap } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

// Mock data for student swaps with university and verification info
const swapListings = [
  {
    id: 1,
    user: {
      name: "Emma Johnson",
      avatar: "https://i.pravatar.cc/150?img=1",
      university: "Sciences Po Paris",
      isVerified: true,
      verificationMethod: "University Email"
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
      university: "University of Barcelona",
      isVerified: true,
      verificationMethod: "Student ID Card"
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
      university: "Humboldt University",
      isVerified: false,
      verificationMethod: null
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
  }
];

// University list for filtering
const universities = [
  "All Universities",
  "Sciences Po Paris",
  "University of Barcelona", 
  "Humboldt University",
  "University of Amsterdam",
  "Sorbonne University",
  "Heidelberg University",
  "Cambridge University",
  "Oxford University",
  "Politecnico di Milano",
  "Technical University of Berlin",
  "Uppsala University",
  "Complutense University of Madrid",
  "IE University Madrid",
  "Erasmus University Rotterdam",
  "Harvard University",
  "Stanford University",
  "MIT",
  "UC Berkeley",
  "New York University"
];

// Type definitions
type SwapListing = typeof swapListings[0];
type ListingType = SwapListing;

const Browse = () => {
  const location = useLocation();
  const [allListings, setAllListings] = useState<ListingType[]>(swapListings as ListingType[]);
  const [displayListings, setDisplayListings] = useState<ListingType[]>(swapListings as ListingType[]);
  const [searchLocation, setSearchLocation] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState("All Universities");
  const [verificationFilter, setVerificationFilter] = useState("all");
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [pageTitle, setPageTitle] = useState("Browse Available Swaps");
  const [pageDescription, setPageDescription] = useState("Find your perfect accommodation swap from verified students around the world");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters();
  };

  const applyFilters = () => {
    let filtered = allListings;

    // Location filter
    if (searchLocation.trim()) {
      filtered = filtered.filter((item) => {
        const swapItem = item as SwapListing;
        return swapItem.current?.city.toLowerCase().includes(searchLocation.toLowerCase()) ||
               swapItem.wanted?.city.toLowerCase().includes(searchLocation.toLowerCase());
      });
    }

    // University filter
    if (selectedUniversity !== "All Universities") {
      filtered = filtered.filter((item) => {
        const swapItem = item as SwapListing;
        return swapItem.user.university === selectedUniversity;
      });
    }

    // Verification filter
    if (verificationFilter === "verified") {
      filtered = filtered.filter((item) => {
        const swapItem = item as SwapListing;
        return swapItem.user.isVerified;
      });
    } else if (verificationFilter === "unverified") {
      filtered = filtered.filter((item) => {
        const swapItem = item as SwapListing;
        return !swapItem.user.isVerified;
      });
    }

    setDisplayListings(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [selectedUniversity, verificationFilter]);

  const renderListingCard = (listing: ListingType) => {
    const swapListing = listing as SwapListing;
    return (
      <Card key={swapListing.id} className="overflow-hidden hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <img 
                src={swapListing.user.avatar} 
                alt={swapListing.user.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <div className="flex items-center gap-2">
                  <CardTitle className="text-lg">{swapListing.user.name}</CardTitle>
                  {swapListing.user.isVerified ? (
                    <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1">
                      <Shield className="h-3 w-3" />
                      Verified
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200">
                      Unverified
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <GraduationCap className="h-3 w-3" />
                  <CardDescription>{swapListing.user.university}</CardDescription>
                </div>
                {swapListing.user.isVerified && swapListing.user.verificationMethod && (
                  <p className="text-xs text-green-600">Verified via {swapListing.user.verificationMethod}</p>
                )}
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="flex items-center justify-between mb-4 pt-2">
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Calendar className="h-4 w-4 text-swap-blue" />
              <span>{swapListing.dates}</span>
            </div>
          </div>
          
          {/* Apartment image */}
          <div className="mb-4 aspect-video rounded-md overflow-hidden">
            <img 
              src={swapListing.current.image} 
              alt={`${swapListing.current.city} apartment`}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-swap-lightBlue rounded-lg p-4">
              <h4 className="font-medium mb-2 text-sm uppercase text-gray-500">Current Place</h4>
              <div className="mb-2">
                <div className="flex items-center gap-1 mb-1">
                  <MapPin className="h-4 w-4 text-swap-blue" />
                  <span className="font-medium">{swapListing.current.city}</span>
                </div>
                <p className="text-sm text-gray-600">{swapListing.current.type}</p>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <Euro className="h-4 w-4" />
                <span>{swapListing.current.price}</span>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium mb-2 text-sm uppercase text-gray-500">Looking For</h4>
              <div className="mb-2">
                <div className="flex items-center gap-1 mb-1">
                  <MapPin className="h-4 w-4 text-swap-blue" />
                  <span className="font-medium">{swapListing.wanted.city}</span>
                </div>
                <p className="text-sm text-gray-600">{swapListing.wanted.type}</p>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <Euro className="h-4 w-4" />
                <span>{swapListing.wanted.price}</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-2">
            {swapListing.tags.map((tag: string, index: number) => (
              <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-800 hover:bg-gray-200">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
        
        <CardFooter>
          <Button asChild className="w-full bg-swap-blue hover:bg-swap-darkBlue">
            <Link to={`/swaps/${swapListing.id}`}>
              <ArrowRightLeft className="h-4 w-4 mr-2" />
              View Swap Details
            </Link>
          </Button>
        </CardFooter>
      </Card>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-8 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">{pageTitle}</h1>
            <p className="text-gray-600">{pageDescription}</p>
          </div>
          
          {/* Search and filter bar */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
              <div className="flex-grow">
                <Input 
                  placeholder="Search by location" 
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="flex gap-2">
                <Select value={selectedUniversity} onValueChange={setSelectedUniversity}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Select university" />
                  </SelectTrigger>
                  <SelectContent>
                    {universities.map((uni) => (
                      <SelectItem key={uni} value={uni}>
                        {uni}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
              </div>
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
                  <label className="block text-sm font-medium mb-1">Verification Status</label>
                  <Select value={verificationFilter} onValueChange={setVerificationFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All students" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Students</SelectItem>
                      <SelectItem value="verified">Verified Only</SelectItem>
                      <SelectItem value="unverified">Unverified Only</SelectItem>
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
          <div className="mb-4 flex justify-between items-center">
            <p className="text-gray-600">{displayListings.length} results found</p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Filter by verification:</span>
              <Button
                variant={verificationFilter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setVerificationFilter("all")}
              >
                All
              </Button>
              <Button
                variant={verificationFilter === "verified" ? "default" : "outline"}
                size="sm"
                onClick={() => setVerificationFilter("verified")}
                className="flex items-center gap-1"
              >
                <Shield className="h-3 w-3" />
                Verified
              </Button>
            </div>
          </div>
          
          {displayListings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayListings.map((listing) => renderListingCard(listing))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="bg-gray-100 p-8 rounded-lg inline-block mb-4">
                <Search className="h-12 w-12 text-gray-400 mx-auto" />
              </div>
              <h3 className="text-xl font-medium mb-2">No listings found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search criteria or check back later for new listings
              </p>
              <Button onClick={() => {
                setSearchLocation(''); 
                setSelectedUniversity('All Universities');
                setVerificationFilter('all');
                setDisplayListings(allListings);
              }}>
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
