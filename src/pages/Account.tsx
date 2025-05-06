
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, LogOut, Plus, Settings } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "@/components/ui/sonner";

const Account = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getProfile = async () => {
      try {
        setLoading(true);
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          // Redirect to login if not authenticated
          navigate("/login");
          return;
        }
        
        setUser(session.user);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        toast.error("Failed to load your profile");
      } finally {
        setLoading(false);
      }
    };
    
    getProfile();
  }, [navigate]);
  
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("You've been logged out successfully");
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to log out. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-swap-blue border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-4">Loading your profile...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Your Account</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Profile</CardTitle>
                  <CardDescription>Your account information</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-swap-lightBlue flex items-center justify-center">
                        <User className="h-6 w-6 text-swap-blue" />
                      </div>
                      <div>
                        <p className="font-medium">{user?.email?.split('@')[0] || "User"}</p>
                        <p className="text-sm text-gray-500">Verified Student</p>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <p className="text-sm text-gray-500 mb-1">Email</p>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <span>{user?.email}</span>
                      </div>
                    </div>
                    
                    <div className="pt-4 flex flex-col gap-2">
                      <Button variant="outline" size="sm" className="justify-start" asChild>
                        <a href="/settings">
                          <Settings className="h-4 w-4 mr-2" />
                          Edit Profile
                        </a>
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={handleLogout}
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Log Out
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-2">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Your Places</CardTitle>
                  <CardDescription>Places you've listed for swap</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 border border-dashed border-gray-300 rounded-md">
                    <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                      <Plus className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No Places Added Yet</h3>
                    <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                      List your accommodation to start swapping with other students around the world
                    </p>
                    <Button className="bg-green-600 hover:bg-green-700" asChild>
                      <a href="/post-place">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Your First Place
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Account;
