
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";

export default function CtaSection() {
  const benefits = [
    "Find accommodation that fits your budget",
    "Connect with verified students worldwide",
    "Safe and secure exchange process",
    "Save money on housing during your exchange"
  ];

  return (
    <section className="py-16 bg-swap-lightBlue">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to find your perfect accommodation match?
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Join thousands of students around the world who are saving money and having amazing experiences through accommodation swaps.
            </p>
            
            <ul className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-swap-blue flex-shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
            
            <Button className="bg-swap-blue hover:bg-swap-darkBlue text-white px-6 py-6">
              Sign Up For Free
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Create your account now</h3>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-swap-blue focus:border-swap-blue"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-swap-blue focus:border-swap-blue"
                  placeholder="Enter your email"
                />
              </div>
              
              <div>
                <label htmlFor="university" className="block text-sm font-medium text-gray-700 mb-1">
                  University
                </label>
                <input
                  type="text"
                  id="university"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-swap-blue focus:border-swap-blue"
                  placeholder="Your university name"
                />
              </div>
              
              <Button className="w-full bg-swap-blue hover:bg-swap-darkBlue text-white py-6">
                Get Started
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              
              <p className="text-xs text-center text-gray-500 mt-4">
                By signing up, you agree to our Terms of Service and Privacy Policy.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
