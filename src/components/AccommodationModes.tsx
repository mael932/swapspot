
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowRightLeft } from "lucide-react";
import accommodationImage from "@/assets/accommodation-collage.jpg";

const AccommodationModes = () => {
  return (
    <div 
      className="w-full py-16 relative"
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.9)), url(${accommodationImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Direct Housing Swaps Made Simple</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            No middleman, no points system, no extra fees. Just direct exchanges between verified students 
            for the exact dates you need.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader className="bg-swap-lightBlue rounded-t-lg">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">Student Housing Swap</CardTitle>
                  <CardDescription className="text-gray-700">
                    Direct exchange with verified students worldwide
                  </CardDescription>
                </div>
                <div className="bg-swap-blue rounded-full p-3">
                  <ArrowRightLeft className="h-8 w-8 text-white" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="mb-4">
                Perfect for students seeking authentic exchanges. Swap your accommodation directly 
                with another verified student for your exact study dates—no fees, no points, just a fair trade.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <div className="bg-green-100 rounded-full p-1 mr-2 mt-0.5">
                    <svg className="h-3 w-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span><strong>Zero extra costs:</strong> Pay only your existing rent</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-100 rounded-full p-1 mr-2 mt-0.5">
                    <svg className="h-3 w-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span><strong>Verified students only:</strong> University email verification required</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-100 rounded-full p-1 mr-2 mt-0.5">
                    <svg className="h-3 w-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span><strong>Date matching:</strong> Find swaps for your exact study period</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full bg-swap-blue hover:bg-swap-darkBlue">
                <Link to="/browse">
                  Start Your Housing Swap <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AccommodationModes;
