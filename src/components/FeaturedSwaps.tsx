
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Euro, ArrowRightLeft } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

// Dummy data for featured swaps
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

export default function FeaturedSwaps() {
  const [visibleSwaps, setVisibleSwaps] = useState(swapListings);
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Swap Opportunities</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Browse some of the latest accommodation swaps available on our platform.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleSwaps.map((swap) => (
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
        
        <div className="text-center mt-12">
          <Button variant="outline" asChild className="border-swap-blue text-swap-blue hover:bg-swap-lightBlue px-6">
            <Link to="/browse">View All Swaps</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
