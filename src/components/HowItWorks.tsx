
import { Users, Link, School, CheckCircle } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: <School className="h-8 w-8 text-swap-blue" />,
      title: "Join our student community",
      description: "Connect with verified university students who share your academic ambitions and housing challenges."
    },
    {
      icon: <Users className="h-8 w-8 text-swap-blue" />,
      title: "Find like-minded matches",
      description: "Discover students with similar goals, study periods, and housing needs through our intelligent matching system."
    },
    {
      icon: <Link className="h-8 w-8 text-swap-blue" />,
      title: "Connect directly",
      description: "Bridge the gap between students facing the same problems – we facilitate meaningful connections, not transactions."
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-swap-blue" />,
      title: "Build lasting relationships",
      description: "Form connections that extend beyond housing – create a network of ambitious students worldwide."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Connecting Students, Not Just Housing</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            SwapSpot is a bridge between ambitious students who understand each other's challenges and share similar academic goals
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
              More Than Housing – We Connect Ambitions
            </h3>
            <p className="text-gray-700 text-lg">
              Every student on SwapSpot shares your drive for academic excellence and understands the unique challenges of studying abroad. 
              We don't just match accommodations – we connect students with shared values, similar goals, and mutual understanding.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
