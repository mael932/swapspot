
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

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
        <div className="text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to find your perfect accommodation match?
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto md:mx-0">
            Join thousands of students around the world who are saving money and having amazing experiences through accommodation swaps.
          </p>
          
          <ul className="space-y-4 mb-8 max-w-md mx-auto md:mx-0">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-swap-blue flex-shrink-0" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
          
          <Button className="bg-swap-blue hover:bg-swap-darkBlue text-white px-6 py-6" asChild>
            <Link to="/signup">
              Sign Up For Free
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
