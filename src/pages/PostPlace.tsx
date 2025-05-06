
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, MapPin } from "lucide-react";
import { toast } from "@/components/ui/sonner";

const PostPlace = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // This is a placeholder for future implementation
    setTimeout(() => {
      setLoading(false);
      toast.success("Your place has been submitted!", {
        description: "It will be reviewed and published soon."
      });
      navigate("/account");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Add Your Place</h1>
          <p className="text-gray-600 mb-8">List your accommodation to find potential swaps</p>
          
          <Card>
            <CardHeader>
              <CardTitle>Place Details</CardTitle>
              <CardDescription>Provide information about your accommodation</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Title
                  </label>
                  <Input 
                    id="title" 
                    placeholder="e.g., Cozy Studio Near University Campus"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                    Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <Input 
                      id="location" 
                      placeholder="City, Country"
                      className="pl-10"
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-500">The city and country where your place is located</p>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <Textarea 
                    id="description" 
                    placeholder="Describe your place, including number of rooms, amenities, and why someone would want to stay there..."
                    rows={5}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Photos
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-6">
                    <div className="flex flex-col items-center">
                      <Plus className="h-8 w-8 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-600">
                        Drag and drop images here, or click to upload
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        (Feature coming soon)
                      </p>
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
                        <Plus className="h-4 w-4 mr-2" />
                        Submit Place
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
