
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function CtaSection() {
  return (
    <section className="py-16 bg-gradient-to-r from-swap-blue to-swap-darkBlue">
      <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Ready to Start Your Housing Swap?
        </h2>
        <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
          Join thousands of students already finding their perfect exchange accommodations. 
          Get verified access to connect with students across Europe.
        </p>
        <Button asChild size="lg" className="text-lg px-8 py-6 bg-white text-swap-blue hover:bg-gray-100">
          <Link to="/onboarding">
            Start Your Housing Swap
            <ArrowRight className="h-5 w-5 ml-2" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
