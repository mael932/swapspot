
import { Users, Search, UserCheck, CheckCircle, Zap } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: <UserCheck className="h-8 w-8 text-swap-blue" />,
      title: "You tell us your needs",
      description: "Share your university, study dates, location preferences, and housing requirements. That's it - we handle the rest."
    },
    {
      icon: <Zap className="h-8 w-8 text-swap-blue" />,
      title: "We do the searching",
      description: "Our intelligent system works 24/7, automatically scanning and analyzing thousands of student profiles to find your perfect matches."
    },
    {
      icon: <Users className="h-8 w-8 text-swap-blue" />,
      title: "We deliver your matches",
      description: "Receive curated match notifications with complete profiles and contact details - no searching, no browsing, just perfect matches."
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-swap-blue" />,
      title: "You connect and swap",
      description: "Simply reach out to your pre-screened matches to finalize details. We've already done all the hard work of finding compatibility."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">We Handle Everything So You Don't Have To</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stop wasting time on endless searches. Our AI-powered system works around the clock to find your perfect housing match automatically.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="bg-swap-lightBlue p-3 rounded-full w-fit mx-auto mb-4">
                {step.icon}
              </div>
              <div className="bg-swap-blue text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-3 text-sm font-bold">
                {index + 1}
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="bg-swap-lightBlue rounded-lg p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-swap-darkBlue mb-4">
              Zero Effort, Maximum Results
            </h3>
            <p className="text-gray-700 text-lg">
              While you focus on your studies, our advanced matching system works continuously to find students who perfectly complement your needs. 
              We analyze compatibility factors, verify student status, and deliver only the highest-quality matches directly to you.
              <span className="font-semibold text-swap-darkBlue"> You literally don't have to do anything except provide your preferences once.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
