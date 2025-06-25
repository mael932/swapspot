
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Clock, Zap, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

export default function CtaSection() {
  const benefits = [
    "We find compatible exchange students automatically",
    "We verify all university student profiles for you", 
    "We deliver semester abroad matches directly to your inbox",
    "We handle all the tedious searching and filtering for your exchange"
  ];

  return (
    <section className="py-16 bg-swap-lightBlue">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
            <GraduationCap className="h-6 w-6 text-swap-blue" />
            <span className="text-swap-blue font-semibold">Built for Exchange Students</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Stop Searching. Start Your Exchange Adventure.
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto md:mx-0">
            Why spend countless hours browsing through listings when we can do all the work for you? Our intelligent system finds, filters, and delivers perfect exchange student matches while you focus on what really matters - preparing for your study abroad experience.
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
            <div className="flex items-center gap-3 mb-3">
              <Clock className="h-6 w-6 text-swap-blue" />
              <span className="font-semibold text-swap-darkBlue">Time You'll Save on Your Exchange Planning</span>
            </div>
            <p className="text-swap-darkBlue font-medium">
              Average exchange student spends 40+ hours searching for housing swaps. With SwapSpot, you spend 5 minutes setting up your profile, and we do the other 39 hours and 55 minutes of work for you.
            </p>
          </div>
          
          <Button className="bg-swap-blue hover:bg-swap-darkBlue text-white px-6 py-6" asChild>
            <Link to="/signup">
              Let Us Work For Your Exchange
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
