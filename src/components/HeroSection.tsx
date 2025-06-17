
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-b from-white to-swap-lightBlue py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Connect with <span className="text-swap-blue">Like-Minded Students</span> Worldwide
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-4 max-w-4xl mx-auto">
          SwapSpot bridges ambitious university students facing the same housing challenges during their exchange programs
        </p>
        <p className="text-lg text-gray-500 mb-10 max-w-3xl mx-auto">
          We connect verified students who share your academic goals and understand your accommodation needs. Find your perfect housing match through trusted peer-to-peer connections.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg" className="text-lg px-8 py-6 bg-swap-blue hover:bg-swap-blue/90">
            <Link to="/signup">Connect with Students</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
            <Link to="/how-it-works">See How We Connect</Link>
          </Button>
        </div>
        
        <div className="mt-12 bg-white/70 backdrop-blur-sm rounded-lg p-6 max-w-4xl mx-auto">
          <p className="text-gray-700 font-medium">
            "SwapSpot isn't just about housing – it's about connecting students who share the same dreams, face the same challenges, and support each other's academic journeys."
          </p>
        </div>
      </div>
    </section>
  );
}
