
import { MapPin, Users, Calendar, CheckCircle } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: <MapPin className="h-8 w-8 text-swap-blue" />,
      title: "Select destination & dates",
      description: "Choose your destination university and study dates to find perfect matches."
    },
    {
      icon: <Users className="h-8 w-8 text-swap-blue" />,
      title: "View verified student swaps",
      description: "Browse accommodation offers from verified students at your destination."
    },
    {
      icon: <Calendar className="h-8 w-8 text-swap-blue" />,
      title: "Match your dates",
      description: "Find students whose dates align perfectly with your study period."
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-swap-blue" />,
      title: "Swap and confirm",
      description: "Connect directly, exchange details, and confirm your housing swap."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How Student Swaps Work</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Four simple steps to your perfect accommodation exchange
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
      </div>
    </section>
  );
}
