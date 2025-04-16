
import { Button } from "@/components/ui/button";
import { ArrowRight, Home, MapPin, Calendar, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <div className="hero-pattern py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Swap your home, <br />
              <span className="text-swap-blue">find your perfect match</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Student housing exchange made easy. Connect with other students from around the world and swap accommodations for your study abroad experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-swap-blue hover:bg-swap-darkBlue text-white px-6 py-6 rounded-md flex items-center gap-2" asChild>
                <Link to="/signup">
                  Get Started
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
              <Button variant="outline" className="bg-white hover:bg-gray-50 border-swap-blue text-swap-blue px-6 py-6 rounded-md" asChild>
                <Link to="/how-it-works">
                  How It Works
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="relative hidden md:block animate-float">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-md mx-auto">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="h-6 w-6 text-swap-orange" />
                <h3 className="font-semibold text-lg">Perfect Match Found!</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="p-4 bg-swap-lightBlue rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Home className="h-5 w-5 text-swap-blue" />
                    <h4 className="font-medium">Your Place</h4>
                  </div>
                  <span className="block text-sm text-gray-600 mb-1">Paris, France</span>
                  <span className="block text-sm text-gray-800 font-medium">Studio Apartment</span>
                  <span className="block text-sm text-gray-600 mt-2">€800/month</span>
                </div>
                
                <div className="p-4 bg-swap-gray rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Home className="h-5 w-5 text-swap-blue" />
                    <h4 className="font-medium">Their Place</h4>
                  </div>
                  <span className="block text-sm text-gray-600 mb-1">Madrid, Spain</span>
                  <span className="block text-sm text-gray-800 font-medium">1 Bedroom Flat</span>
                  <span className="block text-sm text-gray-600 mt-2">€750/month</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="h-5 w-5 text-swap-blue" />
                <span className="text-sm text-gray-700">Sep 5, 2023 - Feb 20, 2024</span>
              </div>
              
              <Button className="w-full bg-swap-green hover:bg-swap-green/90 text-white">
                Accept Swap
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
