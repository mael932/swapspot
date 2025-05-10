
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { ArrowLeft, Calendar, Heart, MessageCircle, Users } from "lucide-react";
import Map from "@/components/Map";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

// Mock data for au pair listings
const getAuPairById = (id: string) => {
  const auPairListings = [
    {
      id: "101",
      user: {
        name: "The Martinez Family",
        avatar: "https://i.pravatar.cc/150?img=20",
        location: "Lyon, France"
      },
      accommodation: {
        title: "Private Room in Family Home",
        image: "https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60",
        benefits: "Private room, meals included, family atmosphere",
        description: "We offer a comfortable private room in our family home located in a quiet neighborhood of Lyon. The room has a single bed, desk, and plenty of storage space. You'll have access to a shared bathroom with the children. Our home is spacious with a garden and is located 15 minutes from the city center by public transport."
      },
      requirements: {
        hours: "15-20 hours per week",
        tasks: "Childcare for 2 children (ages 5 & 8), light housework",
        language: "English and basic French",
        additional: "We're looking for someone energetic, patient, and creative who enjoys spending time with children. Experience with childcare is preferred but not required if you have the right attitude. We'd like someone who can help with homework and organize fun activities."
      },
      duration: "Sep 10, 2023 - Jun 30, 2024",
      tags: ["Family with Children", "City Center", "Cultural Exchange"],
      family: {
        description: "We are a friendly family of four, with two children aged 5 and 8. Both parents work in education. We enjoy outdoor activities, board games, and exploring our region during weekends. We've hosted au pairs before and value cultural exchange as part of the experience."
      }
    },
    {
      id: "102",
      user: {
        name: "The Schmidt Family",
        avatar: "https://i.pravatar.cc/150?img=30",
        location: "Munich, Germany"
      },
      accommodation: {
        title: "Guest Suite with Private Bathroom",
        image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60",
        benefits: "Private suite, meals included, access to family car",
        description: "You will have your own private guest suite with an en-suite bathroom on the top floor of our house. The room includes a comfortable double bed, desk, TV, and mini-fridge. Our home is in a suburban area with good public transport connections to the city center (20 minutes by train)."
      },
      requirements: {
        hours: "20 hours per week",
        tasks: "Childcare for 3 children (ages 3, 6, 10), school pickups",
        language: "English and basic German",
        additional: "We need help primarily with school pickups, after-school activities, and occasional evening babysitting. The ideal candidate would be responsible, organized, and have a driver's license as you may need to drive the children to activities."
      },
      duration: "Oct 15, 2023 - Jul 15, 2024",
      tags: ["Suburban Area", "Pet-friendly", "Near Public Transport"],
      family: {
        description: "We are a family of five with three active children. Both parents work full-time in business. We have a friendly dog named Max who loves attention. We enjoy hiking on weekends and have a vacation home in the mountains that we visit during school breaks."
      }
    },
    {
      id: "103",
      user: {
        name: "The Garcia Family",
        avatar: "https://i.pravatar.cc/150?img=33",
        location: "Madrid, Spain"
      },
      accommodation: {
        title: "Cozy Room in Modern Apartment",
        image: "https://images.unsplash.com/photo-1617104611622-d5f245d317f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60",
        benefits: "Shared bathroom, meals included, Spanish lessons",
        description: "We offer a bright and cozy room in our modern apartment in central Madrid. You'll have your own bedroom with a single bed, desk and built-in wardrobe. The bathroom is shared with our daughter. Our apartment is located in a lively neighborhood with many cafes, restaurants and shops nearby."
      },
      requirements: {
        hours: "15 hours per week",
        tasks: "Childcare for 1 child (age 7), tutoring in English",
        language: "English, Spanish beneficial",
        additional: "We're looking for someone who can help our daughter improve her English through conversation, reading, and fun activities. We would prefer someone with some teaching experience or who enjoys working with children. A creative person who can make learning fun would be ideal."
      },
      duration: "Nov 1, 2023 - May 30, 2024",
      tags: ["City Center", "Cultural Activities", "Language Exchange"],
      family: {
        description: "We are a small family of three. Mom is a university professor and Dad works in marketing. Our daughter is 7 years old and very curious and energetic. We love arts and culture, and often visit museums and attend concerts. We're offering Spanish lessons as part of the cultural exchange."
      }
    }
  ];
  
  return auPairListings.find(listing => listing.id === id);
};

const AuPairDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [auPair, setAuPair] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showHeart, setShowHeart] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      // In a real app, this would be an API call
      const auPairData = getAuPairById(id);
      setAuPair(auPairData);
      setLoading(false);
    }
  }, [id]);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent",
      description: `Your message has been sent to ${auPair?.user.name}. They will get back to you soon.`,
    });
  };

  const handleFavoriteClick = () => {
    if (!isFavorited) {
      setShowHeart(true);
      setTimeout(() => {
        setShowHeart(false);
      }, 1000);
      setIsFavorited(true);
      toast({
        title: "Added to Favorites",
        description: "This au pair opportunity has been added to your favorites.",
      });
    } else {
      setIsFavorited(false);
      toast({
        title: "Removed from Favorites",
        description: "This au pair opportunity has been removed from your favorites.",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-pulse">Loading au pair details...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!auPair) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center p-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Au Pair Listing Not Found</h1>
            <p className="mb-6">The au pair listing you're looking for doesn't exist or has been removed.</p>
            <Link to="/aupair">
              <Button>Browse Au Pair Opportunities</Button>
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
          <Link to="/aupair" className="flex items-center text-purple-600 mb-6 hover:underline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Browse
          </Link>
          
          {/* Family info and dates */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div className="flex items-center gap-4 mb-4 md:mb-0">
              <img 
                src={auPair.user.avatar} 
                alt={auPair.user.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-purple-500"
              />
              <div>
                <h1 className="text-2xl font-bold">{auPair.user.name}</h1>
                <p className="text-gray-600">{auPair.user.location}</p>
              </div>
            </div>
            <div className="flex items-center bg-white px-4 py-2 rounded-lg border">
              <Calendar className="h-5 w-5 text-purple-600 mr-2" />
              <span className="font-medium">{auPair.duration}</span>
            </div>
          </div>
          
          {/* Main content area */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column - accommodation info */}
            <div className="lg:col-span-2">
              {/* Photo */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
                <div className="relative aspect-video">
                  <img 
                    src={auPair.accommodation.image} 
                    alt={auPair.accommodation.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* Details grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Accommodation */}
                <div className="bg-purple-50 rounded-lg p-6">
                  <h2 className="text-xl font-semibold mb-4">ACCOMMODATION OFFERED</h2>
                  <div className="mb-3">
                    <p className="font-medium text-lg mb-2">{auPair.accommodation.title}</p>
                    <p className="text-gray-700 mb-4">{auPair.accommodation.benefits}</p>
                    <p className="text-gray-700">{auPair.accommodation.description}</p>
                  </div>
                </div>
                
                {/* Requirements */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h2 className="text-xl font-semibold mb-4">REQUIREMENTS</h2>
                  <div className="mb-3">
                    <p className="text-gray-700"><span className="font-medium">Hours:</span> {auPair.requirements.hours}</p>
                    <p className="text-gray-700 mt-2"><span className="font-medium">Tasks:</span> {auPair.requirements.tasks}</p>
                    <p className="text-gray-700 mt-2"><span className="font-medium">Language:</span> {auPair.requirements.language}</p>
                    <p className="text-gray-700 mt-4">{auPair.requirements.additional}</p>
                  </div>
                </div>
              </div>
              
              {/* Family information */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">About the Family</h2>
                <p className="text-gray-700">{auPair.family.description}</p>
              </div>
              
              {/* Amenities/Tags */}
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-3">Features</h3>
                <div className="flex flex-wrap gap-2">
                  {auPair.tags.map((tag: string, index: number) => (
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
                <h3 className="font-semibold text-lg mb-4">Interested in this opportunity?</h3>
                <p className="text-gray-600 mb-6">
                  Contact {auPair.user.name} to discuss the details of this au pair arrangement
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 mb-3">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Send a Message
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Message {auPair.user.name}</DialogTitle>
                      <DialogDescription>
                        Send a message about this au pair opportunity. We'll share your contact information so they can respond directly.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleContactSubmit} className="space-y-4 py-4">
                      <div className="grid w-full items-center gap-1.5">
                        <label htmlFor="aupair-name" className="text-sm font-medium">Your Name</label>
                        <input 
                          id="aupair-name" 
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                          required
                        />
                      </div>
                      <div className="grid w-full items-center gap-1.5">
                        <label htmlFor="aupair-email" className="text-sm font-medium">Your Email</label>
                        <input 
                          id="aupair-email" 
                          type="email" 
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                          required
                        />
                      </div>
                      <div className="grid w-full gap-1.5">
                        <label htmlFor="aupair-message" className="text-sm font-medium">Message</label>
                        <textarea 
                          id="aupair-message" 
                          rows={4} 
                          className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                          placeholder="I'm interested in your au pair opportunity. I would like to discuss..."
                          required
                        ></textarea>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Send Message</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
                <div className="relative">
                  <Button 
                    variant="outline" 
                    className={`w-full ${isFavorited ? 'bg-purple-50 text-purple-600 border-purple-200' : ''}`}
                    onClick={handleFavoriteClick}
                  >
                    {isFavorited ? 'Saved to Favorites' : 'Save to Favorites'}
                  </Button>
                  {showHeart && (
                    <Heart 
                      className="absolute left-1/2 transform -translate-x-1/2 text-red-500 animate-[fade-in_0.3s_ease-out,float_3s_ease-in-out_infinite] opacity-0"
                      fill="red"
                      size={20}
                    />
                  )}
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-4">Location</h3>
                <div className="rounded-lg h-48">
                  <Map city={auPair.user.location} />
                </div>
                <p className="mt-3 text-sm text-gray-600">
                  Note: Only an approximate location is shown for privacy reasons
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

export default AuPairDetail;
