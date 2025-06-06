
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowRightLeft } from "lucide-react";

const AccommodationModes = () => {
  return (
    <div className="w-full py-16 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Find Your Perfect Student Swap</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Exchange your accommodation with other students and experience a new city 
            without the extra costs of traditional rentals.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader className="bg-swap-lightBlue rounded-t-lg">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">Student Swap</CardTitle>
                  <CardDescription className="text-gray-700">
                    Exchange your accommodation with other students
                  </CardDescription>
                </div>
                <div className="bg-swap-blue rounded-full p-3">
                  <ArrowRightLeft className="h-8 w-8 text-white" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="mb-4">
                Perfect for students looking to experience a new city without extra costs. Swap your 
                apartment with another student for a semester or academic year.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <div className="bg-green-100 rounded-full p-1 mr-2 mt-0.5">
                    <svg className="h-3 w-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Cost-effective: Pay only your current rent</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-100 rounded-full p-1 mr-2 mt-0.5">
                    <svg className="h-3 w-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Trusted network: Exchange with fellow students</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-100 rounded-full p-1 mr-2 mt-0.5">
                    <svg className="h-3 w-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Flexible duration: Semester or year-long exchanges</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full bg-swap-blue hover:bg-swap-darkBlue">
                <Link to="/browse">
                  Browse Student Swaps <ArrowRight className="ml-2 h-4 w-4" />
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
