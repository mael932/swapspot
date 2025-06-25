
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, UserCheck, Zap, Users, CheckCircle } from "lucide-react";

const HowItWorksPage = () => {
  const steps = [
    {
      number: "1",
      icon: <UserCheck className="h-12 w-12 text-swap-blue" />,
      title: "Tell us your needs",
      description: "Share your university, study dates, location preferences, and housing requirements. That's it - we handle the rest."
    },
    {
      number: "2", 
      icon: <Zap className="h-12 w-12 text-swap-blue" />,
      title: "We do the searching",
      description: "Our intelligent system works 24/7, automatically scanning and analyzing thousands of student profiles to find your perfect matches."
    },
    {
      number: "3",
      icon: <Users className="h-12 w-12 text-swap-blue" />,
      title: "We deliver your matches", 
      description: "Receive curated match notifications with complete profiles and contact details - no searching, no browsing, just perfect matches."
    },
    {
      number: "4",
      icon: <CheckCircle className="h-12 w-12 text-swap-blue" />,
      title: "You connect and swap",
      description: "Simply reach out to your pre-screened matches to finalize details. We've already done all the hard work of finding compatibility."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-white to-swap-lightBlue/30 py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              We Handle Everything<br />
              <span className="text-swap-blue">So You Don't Have To</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Stop wasting time on endless searches. Our AI-powered system works around the clock to find your perfect housing match automatically.
            </p>
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-5xl mx-auto px-4 md:px-8">
            <div className="space-y-16 md:space-y-24">
              {steps.map((step, index) => (
                <div key={index} className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-16 ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                  {/* Visual Side */}
                  <div className="w-full lg:w-1/2 flex justify-center">
                    <div className="relative">
                      <div className="bg-gradient-to-br from-swap-lightBlue to-swap-lightBlue/60 rounded-3xl p-12 md:p-16 flex items-center justify-center shadow-lg">
                        {step.icon}
                      </div>
                      <div className="absolute -top-3 -right-3 bg-swap-blue text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold shadow-lg">
                        {step.number}
                      </div>
                    </div>
                  </div>
                  
                  {/* Content Side */}
                  <div className="w-full lg:w-1/2 text-center lg:text-left">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                      {step.title}
                    </h2>
                    <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="mt-20 md:mt-32 text-center">
              <div className="bg-gradient-to-r from-swap-lightBlue/50 to-swap-lightBlue/30 rounded-3xl p-8 md:p-12 max-w-4xl mx-auto shadow-lg">
                <h3 className="text-2xl md:text-3xl font-bold text-swap-darkBlue mb-6 leading-tight">
                  Zero Effort, Maximum Results
                </h3>
                <div className="space-y-6 text-base md:text-lg text-gray-700 leading-relaxed">
                  <p>
                    While you focus on your studies, our advanced matching system works continuously to find students who perfectly complement your needs.
                  </p>
                  <p>
                    We analyze compatibility factors, verify student status, and deliver only the highest-quality matches directly to you.
                  </p>
                  <p className="text-lg md:text-xl font-semibold text-swap-darkBlue">
                    You literally don't have to do anything except provide your preferences once.
                  </p>
                </div>
                <Button asChild size="lg" className="mt-8 text-base md:text-lg px-8 py-6 bg-swap-blue hover:bg-swap-darkBlue transition-all duration-300 shadow-lg hover:shadow-xl">
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
