
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function CtaSection() {
  const benefits = [
    "Connect with students who share your academic ambitions",
    "Find peers who understand your exchange challenges",
    "Build a trusted network of like-minded university students",
    "Support each other's academic and personal growth"
  ];

  return (
    <section className="py-16 bg-swap-lightBlue">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join a Community of Like-Minded Students
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto md:mx-0">
            SwapSpot connects ambitious university students who share similar goals, face common challenges, and believe in supporting each other's academic journeys. We're not just a platform – we're a bridge between students who understand each other.
          </p>
          
          <ul className="space-y-4 mb-8 max-w-md mx-auto md:mx-0">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-swap-blue flex-shrink-0" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 mb-8 max-w-2xl mx-auto md:mx-0">
            <p className="text-swap-darkBlue font-medium italic">
              "SwapSpot connects students who get it – the excitement of studying abroad, the stress of finding housing, and the dream of making the most of your exchange experience."
            </p>
          </div>
          
          <Button className="bg-swap-blue hover:bg-swap-darkBlue text-white px-6 py-6" asChild>
            <Link to="/signup">
              Connect with Your Community
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
