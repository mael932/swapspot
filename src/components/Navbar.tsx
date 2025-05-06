
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, LogIn, UserPlus, Menu, User, LogOut, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "@/components/ui/sonner";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check for existing session
    const getSession = async () => {
      try {
        setLoading(true);
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user || null);
        
        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          (_event, session) => {
            console.log("Auth state changed:", _event, session?.user?.email);
            setUser(session?.user || null);
          }
        );
        
        return () => subscription.unsubscribe();
      } catch (error) {
        console.error("Auth error:", error);
      } finally {
        setLoading(false);
      }
    };
    
    getSession();
  }, []);
  
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("You've been logged out successfully");
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to log out. Please try again.");
    }
    setIsMenuOpen(false);
  };
  
  return (
    <nav className="w-full py-4 px-4 md:px-8 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Home className="h-6 w-6 text-swap-blue" />
          <Link to="/" className="font-bold text-xl text-swap-darkBlue">SwapSpot</Link>
        </div>
        
        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
        
        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-gray-600 hover:text-swap-blue">Home</Link>
          <Link to="/how-it-works" className="text-gray-600 hover:text-swap-blue">How It Works</Link>
          <Link to="/browse" className="text-gray-600 hover:text-swap-blue">Browse</Link>
          <Link to="/about" className="text-gray-600 hover:text-swap-blue">About</Link>
          
          {loading ? (
            <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
          ) : user ? (
            <div className="flex items-center gap-2">
              <Button className="bg-green-600 hover:bg-green-700 flex items-center gap-2" asChild>
                <Link to="/post-place">
                  <Plus className="h-4 w-4" />
                  <span>Post a Place</span>
                </Link>
              </Button>
              <Button variant="outline" className="flex items-center gap-2" asChild>
                <Link to="/account">
                  <User className="h-4 w-4" />
                  <span>Your Account</span>
                </Link>
              </Button>
              <Button variant="ghost" onClick={handleLogout} className="flex items-center gap-2">
                <LogOut className="h-4 w-4" />
                <span>Log Out</span>
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="outline" className="flex items-center gap-2" asChild>
                <Link to="/login">
                  <LogIn className="h-4 w-4" />
                  <span>Log In</span>
                </Link>
              </Button>
              <Button className="bg-swap-blue hover:bg-swap-darkBlue flex items-center gap-2" asChild>
                <Link to="/signup">
                  <UserPlus className="h-4 w-4" />
                  <span>Sign Up</span>
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
      
      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="md:hidden mt-2 py-3 px-4 bg-white rounded-md shadow-lg animate-fade-in">
          <div className="flex flex-col gap-3">
            <Link to="/" className="text-gray-600 hover:text-swap-blue py-2">Home</Link>
            <Link to="/how-it-works" className="text-gray-600 hover:text-swap-blue py-2">How It Works</Link>
            <Link to="/browse" className="text-gray-600 hover:text-swap-blue py-2">Browse</Link>
            <Link to="/about" className="text-gray-600 hover:text-swap-blue py-2">About</Link>
            
            {user ? (
              <>
                <Link to="/post-place" className="text-gray-600 hover:text-swap-blue py-2 flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  <span>Post a Place</span>
                </Link>
                <Link to="/account" className="text-gray-600 hover:text-swap-blue py-2 flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>Your Account</span>
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="text-left text-gray-600 hover:text-swap-blue py-2 flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Log Out</span>
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-2 pt-2">
                <Button variant="outline" className="w-full justify-center" asChild>
                  <Link to="/login">
                    <LogIn className="h-4 w-4 mr-2" />
                    <span>Log In</span>
                  </Link>
                </Button>
                <Button className="w-full bg-swap-blue hover:bg-swap-darkBlue justify-center" asChild>
                  <Link to="/signup">
                    <UserPlus className="h-4 w-4 mr-2" />
                    <span>Sign Up</span>
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
