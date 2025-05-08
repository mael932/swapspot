
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, MapPin, Calendar, Home, Upload, AlertCircle } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/lib/supabase";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const PostPlace = () => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [availableFrom, setAvailableFrom] = useState("");
  const [availableTo, setAvailableTo] = useState("");
  const [roomType, setRoomType] = useState("");
  const [error, setError] = useState("");
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
      setError("Please fill out all required fields");
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {
      // In a real implementation, we would save this to Supabase
      // For now, we'll just simulate saving
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success("Your apartment has been submitted!", {
        description: "It will be reviewed and published soon."
      });
      
      navigate("/account");
    } catch (err: any) {
      console.error("Error submitting apartment:", err);
      setError(err.message || "Failed to submit your apartment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Post Your Apartment</h1>
          <p className="text-gray-600 mb-8">List your accommodation to find potential swaps</p>
          
          {/* Optional demo mode notice */}
          {!isAuthenticated && (
            <Alert variant="info" className="mb-6 bg-blue-50 border border-blue-200">
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
              <CardDescription>Provide information about your accommodation for potential swappers</CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Title *
                  </label>
                  <Input 
                    id="title" 
                    placeholder="e.g., Cozy Studio Near University Campus"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                    Location *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <Input 
                      id="location" 
                      placeholder="City, Country"
                      className="pl-10"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="roomType" className="block text-sm font-medium text-gray-700">
                      Room Type
                    </label>
                    <Select value={roomType} onValueChange={setRoomType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select room type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="entire-apartment">Entire Apartment</SelectItem>
                        <SelectItem value="private-room">Private Room</SelectItem>
                        <SelectItem value="shared-room">Shared Room</SelectItem>
                        <SelectItem value="studio">Studio</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="availableFrom" className="block text-sm font-medium text-gray-700">
                      Available From
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                      <Input 
                        id="availableFrom" 
                        type="date"
                        className="pl-10"
                        value={availableFrom}
                        onChange={(e) => setAvailableFrom(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description *
                  </label>
                  <Textarea 
                    id="description" 
                    placeholder="Describe your place, including number of rooms, amenities, and why someone would want to stay there..."
                    rows={5}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Photos
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-6">
                    <div className="flex flex-col items-center">
                      <Upload className="h-8 w-8 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-600">
                        Drag and drop images here, or click to upload
                      </p>
                      <Button variant="outline" size="sm" className="mt-3">
                        Choose Files
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button 
                    type="submit" 
                    className="w-full bg-swap-blue hover:bg-swap-darkBlue"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Home className="h-4 w-4 mr-2" />
                        Post Your Apartment
                      </>
                    )}
                  </Button>
                </div>
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
