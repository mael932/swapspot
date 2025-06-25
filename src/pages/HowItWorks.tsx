
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, UserCheck, Zap, Users, CheckCircle } from "lucide-react";

const HowItWorksPage = () => {
  const steps = [
    {
      number: "1",
      icon: <UserCheck className="h-16 w-16 text-swap-blue" />,
      title: "You tell us your needs",
      description: "Share your university, study dates, location preferences, and housing requirements. That's it - we handle the rest."
    },
    {
      number: "2", 
      icon: <Zap className="h-16 w-16 text-swap-blue" />,
      title: "We do the searching",
      description: "Our intelligent system works 24/7, automatically scanning and analyzing thousands of student profiles to find your perfect matches."
    },
    {
      number: "3",
      icon: <Users className="h-16 w-16 text-swap-blue" />,
      title: "We deliver your matches", 
      description: "Receive curated match notifications with complete profiles and contact details - no searching, no browsing, just perfect matches."
    },
    {
      number: "4",
      icon: <CheckCircle className="h-16 w-16 text-swap-blue" />,
      title: "You connect and swap",
      description: "Simply reach out to your pre-screened matches to finalize details. We've already done all the hard work of finding compatibility."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-white to-swap-lightBlue py-20">
          <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              We Handle Everything So You Don't Have To
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
              Stop wasting time on endless searches. Our AI-powered system works around the clock to find your perfect housing match automatically.
            </p>
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 md:px-8">
            <div className="space-y-20">
              {steps.map((step, index) => (
                <div key={index} className={`flex flex-col lg:flex-row items-center gap-12 ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                  {/* Visual Side */}
                  <div className="w-full lg:w-1/2 flex justify-center">
                    <div className="relative">
                      <div className="bg-swap-lightBlue rounded-3xl p-16 flex items-center justify-center">
                        {step.icon}
                      </div>
                      <div className="absolute -top-4 -right-4 bg-swap-blue text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold shadow-lg">
                        {step.number}
                      </div>
                    </div>
                  </div>
                  
                  {/* Content Side */}
                  <div className="w-full lg:w-1/2 text-center lg:text-left">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                      {step.title}
                    </h2>
                    <p className="text-xl text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="mt-24 text-center">
              <div className="bg-swap-lightBlue rounded-2xl p-12 max-w-4xl mx-auto">
                <h3 className="text-3xl font-bold text-swap-darkBlue mb-6">
                  Zero Effort, Maximum Results
                </h3>
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                  While you focus on your studies, our advanced matching system works continuously to find students who perfectly complement your needs. 
                  We analyze compatibility factors, verify student status, and deliver only the highest-quality matches directly to you.
                </p>
                <p className="text-lg font-semibold text-swap-darkBlue mb-8">
                  You literally don't have to do anything except provide your preferences once.
                </p>
                <Button asChild size="lg" className="text-lg px-8 py-6 bg-swap-blue hover:bg-swap-darkBlue">
                  <Link to="/signup">
                    Let Us Find Your Match
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorksPage;
