
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-b from-white to-swap-lightBlue py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Swap Your Student Housing <span className="text-swap-blue">Directly</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-4 max-w-4xl mx-auto">
          One-Time, No Points, Perfectly Matched to Your Study Dates
        </p>
        <p className="text-lg text-gray-500 mb-10 max-w-3xl mx-auto">
          Connect directly with verified students for seamless accommodation exchanges during your semester abroad.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg" className="text-lg px-8 py-6 bg-swap-blue hover:bg-swap-blue/90">
            <Link to="/signup">Find Your Perfect Swap</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
            <Link to="/how-it-works">See How It Works</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
