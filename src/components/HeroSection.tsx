
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-b from-white to-swap-lightBlue py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
        <div className="mb-4">
          <span className="bg-swap-blue text-white px-4 py-2 rounded-full text-sm font-medium">
            Made Exclusively for Exchange Students
          </span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          <span className="text-swap-blue">We Do All The Work</span> - You Just Study Abroad
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-4 max-w-4xl mx-auto">
          Stop spending hours searching for exchange housing swaps. Tell us your university exchange preferences once, and we'll automatically find and deliver perfect student matches to your inbox.
        </p>
        <p className="text-lg text-gray-500 mb-10 max-w-3xl mx-auto">
          No browsing, no endless searching, no stress. We handle everything while you focus on what matters most - your studies abroad and exchange experience.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg" className="text-lg px-8 py-6 bg-swap-blue hover:bg-swap-blue/90">
            <Link to="/signup">Find My Exchange Housing Match</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
            <Link to="/how-it-works">See How We Work For Exchange Students</Link>
          </Button>
        </div>
        
        <div className="mt-12 bg-white/70 backdrop-blur-sm rounded-lg p-6 max-w-4xl mx-auto">
          <p className="text-gray-700 font-medium">
            "Finally, a service that actually works FOR exchange students instead of making us do all the work. SwapSpot found my perfect semester abroad housing match in 2 days - I didn't have to search through hundreds of listings!"
          </p>
          <p className="text-sm text-gray-600 mt-2">- Sarah M., studying abroad in Barcelona</p>
        </div>
      </div>
    </section>
  );
}
