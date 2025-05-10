import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { ArrowLeft, Calendar, Euro, Home, MapPin } from "lucide-react";
import Map from "@/components/Map";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import ContactFormDialog from "@/components/shared/ContactFormDialog";
import FavoriteButton from "@/components/shared/FavoriteButton";

// Mock data for rental listings
const getRentalById = (id: string) => {
  const rentalListings = [
    {
      id: "201",
      title: "Modern Studio in City Center",
      location: "Milan, Italy",
      price: "€850/month",
      images: [
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60",
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60",
        "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60"
      ],
      size: "30m²",
      description: "Fully furnished studio in the heart of Milan. Walking distance to universities and public transit. The apartment features a comfortable sleeping area, a small kitchenette with all necessary appliances, and a modern bathroom. Large windows provide plenty of natural light throughout the day.",
      amenities: ["WiFi", "Washer", "Air Conditioning", "Dishwasher", "Smart TV", "Building Security"],
      availability: "Available from Sep 1, 2023",
      landlordName: "Elena Rossi",
      landlordAvatar: "https://i.pravatar.cc/150?img=28",
      about: "I'm Elena, a university professor who has been renting to students for over 10 years. I live nearby and am always available to help with any issues that arise. I'm passionate about making sure my tenants have a comfortable and pleasant stay in Milan. I speak Italian, English, and some French.",
      additionalInfo: "Utilities included in the rent. Minimum stay of 4 months required. The building has an elevator and secure entry system."
    },
    {
      id: "202",
      title: "Charming 1-Bedroom Near University",
      location: "Vienna, Austria",
      price: "€700/month",
      images: [
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60",
        "https://images.unsplash.com/photo-1598928636135-d146006ff4be?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60",
        "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60"
      ],
      size: "45m²",
      description: "Beautiful 1-bedroom apartment with balcony, perfect for students. 5 minutes to university campus. The apartment consists of a separate bedroom, living room with an open kitchen, and a bathroom with shower. The balcony overlooks a quiet courtyard.",
      amenities: ["Balcony", "Furnished", "Heating", "Dishwasher", "Storage Space", "Bike Storage"],
      availability: "Available from Oct 15, 2023",
      landlordName: "Thomas Wagner",
      landlordAvatar: "https://i.pravatar.cc/150?img=51",
      about: "Hello! I'm Thomas, a local business owner who enjoys meeting students from around the world. I've been renting out this apartment for 5 years and take pride in maintaining it to a high standard. I'm responsive to maintenance requests and happy to provide advice about living in Vienna.",
      additionalInfo: "Utilities are not included in the rent price. No pets allowed. Security deposit equal to 2 months rent required."
    },
    {
      id: "203",
      title: "Shared 2-Bedroom Student Flat",
      location: "Lisbon, Portugal",
      price: "€450/month per room",
      images: [
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60",
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60",
        "https://images.unsplash.com/photo-1617104611622-d5f245d317f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60"
      ],
      size: "70m² (whole apartment)",
      description: "Room available in shared apartment with one other student. Common kitchen and living area. Great location. The available room is fully furnished with a single bed, desk, chair, and wardrobe. The apartment has a fully equipped kitchen, cozy living room, and a shared bathroom.",
      amenities: ["Shared Kitchen", "Laundry", "WiFi", "Utilities Included", "Study Area", "Public Transport Nearby"],
      availability: "Available immediately",
      landlordName: "Sofia Almeida",
      landlordAvatar: "https://i.pravatar.cc/150?img=47",
      about: "I'm Sofia, a young professional who owns and manages several student accommodations in Lisbon. As a former international student myself, I understand the challenges of finding comfortable housing in a new city. I strive to create a welcoming environment for all my tenants and am available to help with anything you might need during your stay.",
      additionalInfo: "Current roommate is a friendly 22-year-old female engineering student. Communal areas are cleaned once a week (included in rent). No overnight guests allowed more than twice per week."
    }
  ];
  
  return rentalListings.find(rental => rental.id === id);
};

const RentalDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [rental, setRental] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      // In a real app, this would be an API call
      const rentalData = getRentalById(id);
      setRental(rentalData);
      setLoading(false);
    }
  }, [id]);

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Viewing Requested",
      description: "Your viewing request has been submitted. We'll confirm the details soon.",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-pulse">Loading rental details...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!rental) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center p-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Rental Listing Not Found</h1>
            <p className="mb-6">The rental listing you're looking for doesn't exist or has been removed.</p>
            <Link to="/rentals">
              <Button>Browse Available Rentals</Button>
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
          <Link to="/rentals" className="flex items-center text-amber-600 mb-6 hover:underline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Browse
          </Link>
          
          {/* Property title and location */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">{rental.title}</h1>
            <div className="flex items-center text-gray-600">
              <MapPin className="h-4 w-4 mr-1" />
              <p>{rental.location}</p>
            </div>
          </div>
          
          {/* Main content area */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column - property info */}
            <div className="lg:col-span-2">
              {/* Photo gallery */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
                <div className="relative aspect-video">
                  <img 
                    src={rental.images[activeImageIndex]} 
                    alt={rental.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-2 flex overflow-x-auto gap-2">
                  {rental.images.map((image: string, index: number) => (
                    <button 
                      key={index}
                      onClick={() => setActiveImageIndex(index)}
                      className={`relative w-20 h-20 flex-shrink-0 ${index === activeImageIndex ? 'ring-2 ring-amber-500' : ''}`}
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
              
              {/* Property details */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Property Details</h2>
                  <div className="flex items-center">
                    <Euro className="h-5 w-5 text-amber-600 mr-2" />
                    <span className="text-xl font-bold text-amber-600">{rental.price}</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-gray-600 mb-1">Size</p>
                  <p className="font-medium">{rental.size}</p>
                </div>
                
                <div className="mb-4">
                  <p className="text-gray-600 mb-1">Availability</p>
                  <p className="font-medium">{rental.availability}</p>
                </div>
                
                <div className="mb-6">
                  <p className="text-gray-600 mb-2">Description</p>
                  <p className="text-gray-800">{rental.description}</p>
                </div>
                
                <div>
                  <p className="text-gray-600 mb-3">Amenities</p>
                  <div className="flex flex-wrap gap-2">
                    {rental.amenities.map((amenity: string, index: number) => (
                      <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-800 py-1.5 px-3 text-sm">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* About the Landlord section */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">About the Landlord</h2>
                <p className="text-gray-700">{rental.about}</p>
              </div>
              
              {/* Additional information */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">Additional Information</h2>
                <p className="text-gray-700">{rental.additionalInfo}</p>
              </div>
            </div>
            
            {/* Right column - contact and map */}
            <div>
              <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src={rental.landlordAvatar} 
                    alt={rental.landlordName}
                    className="w-12 h-12 rounded-full object-cover border-2 border-amber-500"
                  />
                  <div>
                    <h3 className="font-medium">{rental.landlordName}</h3>
                    <p className="text-sm text-gray-600">Property Manager</p>
                  </div>
                </div>
                
                <ContactFormDialog 
                  recipientName={rental.landlordName}
                  buttonColor="bg-amber-600 hover:bg-amber-700 mb-3"
                  placeholder="I'm interested in this property and would like to know more about..."
                  successMessage={`Your message has been sent to ${rental.landlordName}. They will get back to you soon.`}
                />
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full mb-3">
                      <Home className="h-4 w-4 mr-2" />
                      Schedule Viewing
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Schedule a Viewing</DialogTitle>
                      <DialogDescription>
                        Select a date and time that works for you to see this property.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleScheduleSubmit} className="space-y-4 py-4">
                      <div className="grid w-full items-center gap-1.5">
                        <label htmlFor="viewing-name" className="text-sm font-medium">Your Name</label>
                        <input 
                          id="viewing-name" 
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                          required
                        />
                      </div>
                      <div className="grid w-full items-center gap-1.5">
                        <label htmlFor="viewing-email" className="text-sm font-medium">Your Email</label>
                        <input 
                          id="viewing-email" 
                          type="email" 
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                          required
                        />
                      </div>
                      <div className="grid w-full items-center gap-1.5">
                        <label htmlFor="viewing-date" className="text-sm font-medium">Preferred Date</label>
                        <input 
                          id="viewing-date" 
                          type="date" 
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                          required
                        />
                      </div>
                      <div className="grid w-full items-center gap-1.5">
                        <label htmlFor="viewing-time" className="text-sm font-medium">Preferred Time</label>
                        <select 
                          id="viewing-time" 
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                          required
                        >
                          <option value="">Select a time</option>
                          <option value="morning">Morning (9AM - 12PM)</option>
                          <option value="afternoon">Afternoon (12PM - 5PM)</option>
                          <option value="evening">Evening (5PM - 8PM)</option>
                        </select>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Request Viewing</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
                
                <FavoriteButton itemName="rental property" />
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-4">Location</h3>
                <div className="rounded-lg h-48">
                  <Map city={rental.location} />
                </div>
                <p className="mt-3 text-sm text-gray-600">
                  Note: The exact address will be provided after initial screening
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

export default RentalDetail;
