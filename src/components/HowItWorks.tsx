
import { ArrowRight, Users, Search, HomeIcon, CalendarCheck } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: <Users className="h-8 w-8 text-swap-blue" />,
      title: "Create your profile",
      description: "Sign up and tell us about yourself, your current accommodation, and what you're looking for."
    },
    {
      icon: <HomeIcon className="h-8 w-8 text-swap-blue" />,
      title: "List your place",
      description: "Add details about your accommodation, including photos, amenities, and location."
    },
    {
      icon: <Search className="h-8 w-8 text-swap-blue" />,
      title: "Find your match",
      description: "Browse available listings or wait for potential matches based on your preferences."
    },
    {
      icon: <CalendarCheck className="h-8 w-8 text-swap-blue" />,
      title: "Confirm your swap",
      description: "When you find a match, communicate and confirm the details of your exchange."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How SwapSpot Works</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our platform makes it easy to find the perfect accommodation swap for your study abroad experience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-swap-lightBlue p-3 rounded-full w-fit mb-4">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:flex justify-end mt-4">
                  <ArrowRight className="h-6 w-6 text-swap-blue" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
