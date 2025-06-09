import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import AuPairImageGallery from "@/components/aupair/AuPairImageGallery";
import AuPairFamilyInfo from "@/components/aupair/AuPairFamilyInfo";
import AuPairAccommodationInfo from "@/components/aupair/AuPairAccommodationInfo";
import AuPairRequirements from "@/components/aupair/AuPairRequirements";
import AuPairLocationMap from "@/components/aupair/AuPairLocationMap";
import ContactFormDialog from "@/components/shared/ContactFormDialog";
import FavoriteButton from "@/components/shared/FavoriteButton";

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

  useEffect(() => {
    if (id) {
      // In a real app, this would be an API call
      const auPairData = getAuPairById(id);
      setAuPair(auPairData);
      setLoading(false);
    }
  }, [id]);

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

  const favoriteButtonClass = (isFavorited: boolean): string => {
    return isFavorited ? "bg-purple-50 text-purple-600 border-purple-200" : "";
  };

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
              <AuPairImageGallery 
                image={auPair.accommodation.image} 
                title={auPair.accommodation.title} 
              />
              
              {/* Details grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Accommodation */}
                <AuPairAccommodationInfo
                  title={auPair.accommodation.title}
                  benefits={auPair.accommodation.benefits}
                  description={auPair.accommodation.description}
                />
                
                {/* Requirements */}
                <AuPairRequirements
                  hours={auPair.requirements.hours}
                  tasks={auPair.requirements.tasks}
                  language={auPair.requirements.language}
                  additional={auPair.requirements.additional}
                />
              </div>
              
              {/* Family information and tags */}
              <AuPairFamilyInfo 
                familyDescription={auPair.family.description} 
                tags={auPair.tags} 
              />
            </div>
            
            {/* Right column - contact and map */}
            <div>
              <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                <h3 className="font-semibold text-lg mb-4">Interested in this opportunity?</h3>
                <p className="text-gray-600 mb-6">
                  Contact {auPair.user.name} to discuss the details of this au pair arrangement
                </p>
                <ContactFormDialog 
                  recipientName={auPair.user.name}
                  buttonColor="bg-purple-600 hover:bg-purple-700 mb-3"
                  placeholder="I'm interested in your au pair opportunity. I would like to discuss..."
                />
                <FavoriteButton 
                  itemName="au pair opportunity" 
                  colorClass={favoriteButtonClass}
                />
              </div>
              
              <AuPairLocationMap location={auPair.user.location} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AuPairDetail;
