
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, LogIn, UserPlus, Menu } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
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
          <div className="flex items-center gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <LogIn className="h-4 w-4" />
              <span>Log In</span>
            </Button>
            <Button className="bg-swap-blue hover:bg-swap-darkBlue flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              <span>Sign Up</span>
            </Button>
          </div>
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
            <div className="flex flex-col gap-2 pt-2">
              <Button variant="outline" className="w-full justify-center">
                <LogIn className="h-4 w-4 mr-2" />
                <span>Log In</span>
              </Button>
              <Button className="w-full bg-swap-blue hover:bg-swap-darkBlue justify-center">
                <UserPlus className="h-4 w-4 mr-2" />
                <span>Sign Up</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
