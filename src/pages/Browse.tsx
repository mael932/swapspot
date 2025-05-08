
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MapPin, Calendar, Euro, ArrowRightLeft, Search, SlidersHorizontal, Users, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

// Mock data for student swaps
const swapListings = [
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
  }
];

// Mock data for au pair listings
const auPairListings = [
  {
    id: 101,
    user: {
      name: "The Martinez Family",
      avatar: "https://i.pravatar.cc/150?img=20",
      location: "Lyon, France"
    },
    accommodation: {
      title: "Private Room in Family Home",
      image: "https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60",
      benefits: "Private room, meals included, family atmosphere"
    },
    requirements: {
      hours: "15-20 hours per week",
      tasks: "Childcare for 2 children (ages 5 & 8), light housework",
      language: "English and basic French"
    },
    duration: "Sep 10, 2023 - Jun 30, 2024",
    tags: ["Family with Children", "City Center", "Cultural Exchange"]
  },
  {
    id: 102,
    user: {
      name: "The Schmidt Family",
      avatar: "https://i.pravatar.cc/150?img=30",
      location: "Munich, Germany"
    },
    accommodation: {
      title: "Guest Suite with Private Bathroom",
      image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60",
      benefits: "Private suite, meals included, access to family car"
    },
    requirements: {
      hours: "20 hours per week",
      tasks: "Childcare for 3 children (ages 3, 6, 10), school pickups",
      language: "English and basic German"
    },
    duration: "Oct 15, 2023 - Jul 15, 2024",
    tags: ["Suburban Area", "Pet-friendly", "Near Public Transport"]
  },
  {
    id: 103,
    user: {
      name: "The Garcia Family",
      avatar: "https://i.pravatar.cc/150?img=33",
      location: "Madrid, Spain"
    },
    accommodation: {
      title: "Cozy Room in Modern Apartment",
      image: "https://images.unsplash.com/photo-1617104611622-d5f245d317f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60",
      benefits: "Shared bathroom, meals included, Spanish lessons"
    },
    requirements: {
      hours: "15 hours per week",
      tasks: "Childcare for 1 child (age 7), tutoring in English",
      language: "English, Spanish beneficial"
    },
    duration: "Nov 1, 2023 - May 30, 2024",
    tags: ["City Center", "Cultural Activities", "Language Exchange"]
  }
];

// Mock data for rental listings
const rentalListings = [
  {
    id: 201,
    title: "Modern Studio in City Center",
    location: "Milan, Italy",
    price: "€850/month",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60",
    size: "30m²",
    description: "Fully furnished studio in the heart of Milan. Walking distance to universities and public transit.",
    amenities: ["WiFi", "Washer", "Air Conditioning"],
    availability: "Available from Sep 1, 2023"
  },
  {
    id: 202,
    title: "Charming 1-Bedroom Near University",
    location: "Vienna, Austria",
    price: "€700/month",
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60",
    size: "45m²",
    description: "Beautiful 1-bedroom apartment with balcony, perfect for students. 5 minutes to university campus.",
    amenities: ["Balcony", "Furnished", "Heating", "Dishwasher"],
    availability: "Available from Oct 15, 2023"
  },
  {
    id: 203,
    title: "Shared 2-Bedroom Student Flat",
    location: "Lisbon, Portugal",
    price: "€450/month per room",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60",
    size: "70m² (whole apartment)",
    description: "Room available in shared apartment with one other student. Common kitchen and living area. Great location.",
    amenities: ["Shared Kitchen", "Laundry", "WiFi", "Utilities Included"],
    availability: "Available immediately"
  }
];

const Browse = () => {
  const location = useLocation();
  const [mode, setMode] = useState("swap");
  const [allListings, setAllListings] = useState(swapListings);
  const [displayListings, setDisplayListings] = useState(swapListings);
  const [searchLocation, setSearchLocation] = useState("");
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [pageTitle, setPageTitle] = useState("Browse Available Swaps");
  const [pageDescription, setPageDescription] = useState("Find your perfect accommodation swap from students around the world");
  
  useEffect(() => {
    // Determine mode based on URL path
    if (location.pathname === "/aupair") {
      setMode("aupair");
      setAllListings(auPairListings);
      setDisplayListings(auPairListings);
      setPageTitle("Browse Au Pair Opportunities");
      setPageDescription("Find families offering accommodation in exchange for childcare or household help");
    } else if (location.pathname === "/rentals") {
      setMode("rental");
      setAllListings(rentalListings);
      setDisplayListings(rentalListings);
      setPageTitle("Browse Rental Properties");
      setPageDescription("Find apartments, rooms, and shared accommodations for students");
    } else {
      setMode("swap");
      setAllListings(swapListings);
      setDisplayListings(swapListings);
      setPageTitle("Browse Available Swaps");
      setPageDescription("Find your perfect accommodation swap from students around the world");
    }
  }, [location.pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchLocation.trim()) {
      setDisplayListings(allListings);
      return;
    }
    
    let filtered;
    if (mode === "swap") {
      filtered = allListings.filter((item: any) => 
        item.current.city.toLowerCase().includes(searchLocation.toLowerCase()) ||
        item.wanted.city.toLowerCase().includes(searchLocation.toLowerCase())
      );
    } else if (mode === "aupair") {
      filtered = allListings.filter((item: any) => 
        item.user.location.toLowerCase().includes(searchLocation.toLowerCase())
      );
    } else { // rental
      filtered = allListings.filter((item: any) => 
        item.location.toLowerCase().includes(searchLocation.toLowerCase())
      );
    }
    
    setDisplayListings(filtered);
  };

  const renderListingCard = (listing: any) => {
    if (mode === "swap") {
      return (
        <Card key={listing.id} className="overflow-hidden hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <img 
                  src={listing.user.avatar} 
                  alt={listing.user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <CardTitle className="text-lg">{listing.user.name}</CardTitle>
                  <CardDescription>{listing.user.university}</CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="flex items-center justify-between mb-4 pt-2">
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <Calendar className="h-4 w-4 text-swap-blue" />
                <span>{listing.dates}</span>
              </div>
            </div>
            
            {/* Apartment image */}
            <div className="mb-4 aspect-video rounded-md overflow-hidden">
              <img 
                src={listing.current.image} 
                alt={`${listing.current.city} apartment`}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-swap-lightBlue rounded-lg p-4">
                <h4 className="font-medium mb-2 text-sm uppercase text-gray-500">Current Place</h4>
                <div className="mb-2">
                  <div className="flex items-center gap-1 mb-1">
                    <MapPin className="h-4 w-4 text-swap-blue" />
                    <span className="font-medium">{listing.current.city}</span>
                  </div>
                  <p className="text-sm text-gray-600">{listing.current.type}</p>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Euro className="h-4 w-4" />
                  <span>{listing.current.price}</span>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium mb-2 text-sm uppercase text-gray-500">Looking For</h4>
                <div className="mb-2">
                  <div className="flex items-center gap-1 mb-1">
                    <MapPin className="h-4 w-4 text-swap-blue" />
                    <span className="font-medium">{listing.wanted.city}</span>
                  </div>
                  <p className="text-sm text-gray-600">{listing.wanted.type}</p>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Euro className="h-4 w-4" />
                  <span>{listing.wanted.price}</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-2">
              {listing.tags.map((tag: string, index: number) => (
                <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-800 hover:bg-gray-200">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
          
          <CardFooter>
            <Button asChild className="w-full bg-swap-blue hover:bg-swap-darkBlue">
              <Link to={`/swaps/${listing.id}`}>
                <ArrowRightLeft className="h-4 w-4 mr-2" />
                View Swap Details
              </Link>
            </Button>
          </CardFooter>
        </Card>
      );
    } 
    else if (mode === "aupair") {
      return (
        <Card key={listing.id} className="overflow-hidden hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <img 
                  src={listing.user.avatar} 
                  alt={listing.user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <CardTitle className="text-lg">{listing.user.name}</CardTitle>
                  <CardDescription>{listing.user.location}</CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="flex items-center justify-between mb-4 pt-2">
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <Calendar className="h-4 w-4 text-purple-600" />
                <span>{listing.duration}</span>
              </div>
            </div>
            
            {/* Accommodation image */}
            <div className="mb-4 aspect-video rounded-md overflow-hidden">
              <img 
                src={listing.accommodation.image} 
                alt={listing.accommodation.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="grid grid-cols-1 gap-4 mb-4">
              <div className="bg-purple-50 rounded-lg p-4">
                <h4 className="font-medium mb-2 text-sm uppercase text-gray-500">Accommodation Offered</h4>
                <p className="font-medium mb-1">{listing.accommodation.title}</p>
                <p className="text-sm text-gray-600 mb-2">{listing.accommodation.benefits}</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium mb-2 text-sm uppercase text-gray-500">Requirements</h4>
                <div className="mb-1">
                  <p className="text-sm"><span className="font-medium">Hours:</span> {listing.requirements.hours}</p>
                  <p className="text-sm"><span className="font-medium">Tasks:</span> {listing.requirements.tasks}</p>
                  <p className="text-sm"><span className="font-medium">Language:</span> {listing.requirements.language}</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-2">
              {listing.tags.map((tag: string, index: number) => (
                <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-800 hover:bg-gray-200">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
          
          <CardFooter>
            <Button asChild className="w-full bg-purple-600 hover:bg-purple-700">
              <Link to={`/aupair/${listing.id}`}>
                <Users className="h-4 w-4 mr-2" />
                View Au Pair Details
              </Link>
            </Button>
          </CardFooter>
        </Card>
      );
    }
    else { // rental
      return (
        <Card key={listing.id} className="overflow-hidden hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{listing.title}</CardTitle>
            <CardDescription className="flex items-center gap-1">
              <MapPin className="h-4 w-4" /> {listing.location}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="mb-4 aspect-video rounded-md overflow-hidden">
              <img 
                src={listing.image} 
                alt={listing.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex justify-between items-center mb-4">
              <div className="text-lg font-bold text-amber-600">{listing.price}</div>
              <div className="text-sm text-gray-500">{listing.size}</div>
            </div>
            
            <p className="text-gray-700 mb-4">{listing.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-2">
              {listing.amenities.map((amenity: string, index: number) => (
                <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-800 hover:bg-gray-200">
                  {amenity}
                </Badge>
              ))}
            </div>
            
            <p className="text-sm text-gray-600 mt-3">{listing.availability}</p>
          </CardContent>
          
          <CardFooter>
            <Button asChild className="w-full bg-amber-600 hover:bg-amber-700">
              <Link to={`/rentals/${listing.id}`}>
                <Home className="h-4 w-4 mr-2" />
                View Property Details
              </Link>
            </Button>
          </CardFooter>
        </Card>
      );
    }
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
              <Button type="submit" className={mode === "swap" ? "bg-swap-blue hover:bg-swap-darkBlue" : 
                                             mode === "aupair" ? "bg-purple-600 hover:bg-purple-700" :
                                             "bg-amber-600 hover:bg-amber-700"}>
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
                
                {mode !== "aupair" && (
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
                )}
                
                <div>
                  <label className="block text-sm font-medium mb-1">Available From</label>
                  <Input type="date" />
                </div>
              </div>
            )}
          </div>
          
          {/* Results */}
          <div className="mb-4">
            <p className="text-gray-600">{displayListings.length} results found</p>
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
              <Button onClick={() => {setSearchLocation(''); setDisplayListings(allListings);}}>
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
