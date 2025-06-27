
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="bg-gray-50 py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
        {/* 60% - Primary Content */}
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            <span className="text-swap-blue">We Find</span> Your Perfect Exchange
          </h1>
          <p className="text-2xl md:text-3xl text-gray-700 mb-8 max-w-4xl mx-auto">
            Stop searching. Start studying abroad.
          </p>
        </div>

        {/* 30% - Secondary Content */}
        <div className="mb-8">
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            We automatically match verified students for housing swaps. No browsing required.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <Button asChild size="lg" className="text-lg px-8 py-6 bg-swap-blue hover:bg-swap-blue/90 text-white">
              <Link to="/signup">Find My Match</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
              <Link to="/how-it-works">How It Works</Link>
            </Button>
          </div>
        </div>
        
        {/* 10% - Accent Content */}
        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 max-w-2xl mx-auto border border-gray-200 shadow-sm">
          <p className="text-gray-800 font-medium text-sm">
            "Found my Barcelona housing match in 2 days"
          </p>
          <p className="text-xs text-gray-600 mt-1">- Sarah M.</p>
        </div>
      </div>
    </section>
  );
}
