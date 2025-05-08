
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { Select, SelectValue, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { 
  Form, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormDescription, 
  FormMessage 
} from "@/components/ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { toast } from "@/components/ui/sonner";

const PostPlace = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [roomType, setRoomType] = useState("private");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication status - but allow access even if not authenticated
    // This is for demo purposes to make sure functionality is accessible
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session?.user) {
        setUser(data.session.user);
        setIsAuthenticated(true);
        toast.success("Welcome back!", {
          description: "You're logged in and ready to post your apartment"
        });
      } else {
        // For demo purposes - show info but don't redirect
        console.log("User not authenticated but allowing access for demo");
        toast.info("Demo Mode", {
          description: "You're using this feature in demo mode"
        });
      }
    };
    
    checkAuth();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!title || !location || !description) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    // For demo purposes, just show a success message
    toast.success("Apartment listing submitted!", {
      description: "In a production app, this would be saved to the database."
    });
    
    // Reset form
    setTitle("");
    setLocation("");
    setRoomType("private");
    setPrice("");
    setDescription("");
    
    // Redirect to browse page after a short delay
    setTimeout(() => navigate("/browse"), 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-10 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Post Your Apartment</h1>
          <p className="text-gray-600 mb-8">List your accommodation to find potential swaps</p>
          
          {/* Optional demo mode notice */}
          {!isAuthenticated && (
            <Alert className="mb-6 bg-blue-50 border border-blue-200">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-blue-500" />
                <div>
                  <h3 className="font-medium text-blue-700">Demo Mode</h3>
                  <AlertDescription className="text-blue-600">
                    You're using this feature in demo mode. In a production app, verification would be required.
                  </AlertDescription>
                </div>
              </div>
            </Alert>
          )}
          
          <Card>
            <CardHeader>
              <CardTitle>Apartment Details</CardTitle>
              <CardDescription>
                Provide information about the place you want to swap
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <FormLabel htmlFor="title">Listing Title *</FormLabel>
                    <Input 
                      id="title"
                      placeholder="e.g., Cozy Studio in the City Center"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                    <FormDescription>
                      Create a catchy, descriptive title for your listing
                    </FormDescription>
                  </div>
                  
                  <div>
                    <FormLabel htmlFor="location">Location *</FormLabel>
                    <Input 
                      id="location"
                      placeholder="e.g., Amsterdam, Netherlands"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <FormLabel htmlFor="roomType">Room Type</FormLabel>
                      <Select value={roomType} onValueChange={setRoomType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Room Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="entire">Entire Place</SelectItem>
                          <SelectItem value="private">Private Room</SelectItem>
                          <SelectItem value="shared">Shared Room</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <FormLabel htmlFor="price">Monthly Price (Optional)</FormLabel>
                      <Input 
                        id="price"
                        type="text"
                        placeholder="e.g., €800"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <FormLabel htmlFor="description">Description *</FormLabel>
                    <Textarea 
                      id="description"
                      placeholder="Describe your place, including amenities, neighborhood, and transportation options..."
                      rows={6}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <Button type="submit" className="w-full">
                  Submit Listing
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PostPlace;
