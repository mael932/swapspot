
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Users, MessageSquare, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const AlreadyRegistered = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <Card className="shadow-lg border-0">
            <CardHeader className="text-center pb-6">
              <div className="mx-auto mb-4">
                <CheckCircle className="h-16 w-16 text-green-500" />
              </div>
              <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
                You're Already Registered!
              </CardTitle>
              <p className="text-lg text-gray-600">
                You've already submitted your housing swap request. Check out the community to connect with other exchange students.
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-swap-lightBlue/20 rounded-lg p-6 text-center">
                  <Users className="h-8 w-8 text-swap-blue mx-auto mb-3" />
                  <h3 className="font-semibold text-lg mb-2">Join the Community</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Connect with thousands of students looking for housing swaps
                  </p>
                  <Button asChild className="w-full">
                    <Link to="/community">
                      Visit Community
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-6 text-center">
                  <MessageSquare className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-lg mb-2">Get Help & Tips</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Learn how to make the most of your housing swap experience
                  </p>
                  <Button variant="outline" asChild className="w-full">
                    <Link to="/help-tips">
                      Help & Tips
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="text-center pt-4">
                <p className="text-gray-600 mb-4">
                  Need to update your profile or preferences?
                </p>
                <Button variant="outline" asChild>
                  <Link to="/profile">
                    View My Profile
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AlreadyRegistered;
