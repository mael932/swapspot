
import { Users, Search, UserCheck, CheckCircle } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: <UserCheck className="h-8 w-8 text-swap-blue" />,
      title: "Complete your profile",
      description: "Tell us about your university, study dates, location preferences, and what you're looking for in an accommodation match."
    },
    {
      icon: <Search className="h-8 w-8 text-swap-blue" />,
      title: "We find your matches",
      description: "Our intelligent algorithm analyzes your preferences and finds compatible students with complementary housing needs."
    },
    {
      icon: <Users className="h-8 w-8 text-swap-blue" />,
      title: "Get match notifications",
      description: "Receive email notifications with detailed profiles and contact information when we find suitable matches for you."
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-swap-blue" />,
      title: "Connect and swap",
      description: "Reach out directly to your matches to discuss details and finalize your perfect accommodation exchange."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">We Find Your Perfect Match</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Skip the endless browsing. Complete your profile and let our intelligent matching system connect you with compatible students automatically.
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
              Smart Matching, Not Endless Searching
            </h3>
            <p className="text-gray-700 text-lg">
              Our AI-powered system analyzes compatibility factors like study schedules, accommodation preferences, 
              and academic goals to find students who are genuinely compatible for housing exchanges. 
              No more scrolling through hundreds of listings – we bring the perfect matches directly to you.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
