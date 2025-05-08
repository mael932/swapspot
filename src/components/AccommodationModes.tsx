
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Home, Users, ArrowRightLeft } from "lucide-react";

const AccommodationModes = () => {
  return (
    <div className="w-full py-16 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Find Your Perfect Accommodation</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose the accommodation type that best fits your needs - swap your home with other students, 
            become an au pair, or find a traditional rental.
          </p>
        </div>

        <Tabs defaultValue="swap" className="max-w-4xl mx-auto">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="swap">Student Swap</TabsTrigger>
            <TabsTrigger value="aupair">Au Pair</TabsTrigger>
            <TabsTrigger value="rental">Normal Listings</TabsTrigger>
          </TabsList>

          <TabsContent value="swap">
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
          </TabsContent>

          <TabsContent value="aupair">
            <Card>
              <CardHeader className="bg-purple-50 rounded-t-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">Au Pair</CardTitle>
                    <CardDescription className="text-gray-700">
                      Live with a host family in exchange for services
                    </CardDescription>
                  </div>
                  <div className="bg-purple-600 rounded-full p-3">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="mb-4">
                  Become an au pair and live with a local family. In exchange for help with childcare or light housework, 
                  get accommodation and a cultural immersion experience.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <div className="bg-green-100 rounded-full p-1 mr-2 mt-0.5">
                      <svg className="h-3 w-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>Low cost: Free or reduced-price accommodation</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-green-100 rounded-full p-1 mr-2 mt-0.5">
                      <svg className="h-3 w-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>Cultural exchange: Live with locals</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-green-100 rounded-full p-1 mr-2 mt-0.5">
                      <svg className="h-3 w-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>Support network: Become part of a family</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full bg-purple-600 hover:bg-purple-700">
                  <Link to="/aupair">
                    Explore Au Pair Options <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="rental">
            <Card>
              <CardHeader className="bg-amber-50 rounded-t-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">Traditional Rentals</CardTitle>
                    <CardDescription className="text-gray-700">
                      Find a regular accommodation to rent
                    </CardDescription>
                  </div>
                  <div className="bg-amber-600 rounded-full p-3">
                    <Home className="h-8 w-8 text-white" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="mb-4">
                  Browse our selection of regular rental accommodations. Find apartments, shared flats, 
                  and rooms available for short and long-term stays.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <div className="bg-green-100 rounded-full p-1 mr-2 mt-0.5">
                      <svg className="h-3 w-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>Wide selection: Various types of accommodations</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-green-100 rounded-full p-1 mr-2 mt-0.5">
                      <svg className="h-3 w-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>Flexibility: No swap partner needed</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-green-100 rounded-full p-1 mr-2 mt-0.5">
                      <svg className="h-3 w-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>Student-friendly: Properties suitable for students</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full bg-amber-600 hover:bg-amber-700">
                  <Link to="/rentals">
                    Find Rental Properties <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AccommodationModes;
