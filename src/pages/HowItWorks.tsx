
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Users, Search, HomeIcon, CalendarCheck, MessageCircle, Star, Shield } from "lucide-react";

const HowItWorksPage = () => {
  const steps = [
    {
      icon: <Users className="h-12 w-12 text-swap-blue" />,
      title: "Create your profile",
      description: "Sign up with your university email and verify your account. Fill in details about yourself, your current accommodation, and what you're looking for in a swap."
    },
    {
      icon: <HomeIcon className="h-12 w-12 text-swap-blue" />,
      title: "List your place",
      description: "Add details about your accommodation, including photos, amenities, location, and the dates it will be available for a swap."
    },
    {
      icon: <Search className="h-12 w-12 text-swap-blue" />,
      title: "Find your match",
      description: "Browse available listings or wait for potential matches based on your preferences. Our algorithm will suggest swaps that match your criteria."
    },
    {
      icon: <MessageCircle className="h-12 w-12 text-swap-blue" />,
      title: "Connect and discuss",
      description: "When you find a potential match, message them directly through our platform to discuss details and ask questions."
    },
    {
      icon: <CalendarCheck className="h-12 w-12 text-swap-blue" />,
      title: "Confirm your swap",
      description: "Once you've found a suitable match and agreed on the details, confirm the swap through our platform to make it official."
    },
    {
      icon: <Star className="h-12 w-12 text-swap-blue" />,
      title: "Enjoy your experience",
      description: "Move into your swap accommodation and enjoy your study abroad experience without the stress of finding housing in an unfamiliar city."
    }
  ];

  const faq = [
    {
      question: "How does the matching process work?",
      answer: "Our algorithm matches students based on location preferences, dates, and accommodation types. You'll be shown potential matches that align with your needs, and you can also browse all available listings manually."
    },
    {
      question: "What if my dates don't exactly match with a potential swap partner?",
      answer: "Partial overlaps are common in student exchanges. Our platform allows you to specify your flexibility with dates, and you can discuss specific arrangements with your potential swap partner."
    },
    {
      question: "How do I know the other person's accommodation is as described?",
      answer: "All listings require photos and detailed descriptions. We encourage video calls between potential swap partners to tour the accommodations virtually. We also have a verification system and reviews from previous swappers."
    },
    {
      question: "What happens if there's a problem during my stay?",
      answer: "We provide a mediation service for any issues that arise during swaps. We recommend creating a swap agreement that outlines expectations for both parties before confirming."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-white to-swap-lightBlue py-20">
          <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              How SwapSpot Works
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto">
              Your guide to finding the perfect accommodation swap for your study abroad experience
            </p>
          </div>
        </section>

        {/* Main Steps Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">The SwapSpot Process</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Follow these simple steps to find your perfect accommodation swap
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-12">
              {steps.map((step, index) => (
                <div key={index} className={`flex flex-col md:flex-row gap-8 items-center ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                  <div className="w-full md:w-1/2 bg-swap-lightBlue p-12 rounded-xl flex items-center justify-center">
                    <div className="bg-white p-6 rounded-full">
                      {step.icon}
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="bg-swap-blue text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <h3 className="text-2xl font-bold">{step.title}</h3>
                    </div>
                    <p className="text-lg text-gray-600">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Safety Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="w-full md:w-1/2">
                <div className="bg-swap-blue p-8 rounded-full inline-block mb-6">
                  <Shield className="h-16 w-16 text-white" />
                </div>
                <h2 className="text-3xl font-bold mb-6">Safety is Our Priority</h2>
                <div className="space-y-4">
                  <p className="text-lg text-gray-700">
                    SwapSpot is built with student safety in mind. Our comprehensive verification system ensures that only real university students can access the platform.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <div className="bg-swap-blue rounded-full p-1 mt-1 flex-shrink-0">
                        <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700">Verified university email addresses</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-swap-blue rounded-full p-1 mt-1 flex-shrink-0">
                        <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700">Secure in-platform messaging</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-swap-blue rounded-full p-1 mt-1 flex-shrink-0">
                        <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700">Detailed user profiles and reviews</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-swap-blue rounded-full p-1 mt-1 flex-shrink-0">
                        <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700">24/7 support for urgent issues</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="w-full md:w-1/2 bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Tips for a Successful Swap</h3>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <div className="bg-swap-lightBlue p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                      <span className="font-bold text-swap-blue">1</span>
                    </div>
                    <div>
                      <p className="font-medium">Be clear and honest in your listing</p>
                      <p className="text-sm text-gray-600">Accurate descriptions and photos help set the right expectations</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="bg-swap-lightBlue p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                      <span className="font-bold text-swap-blue">2</span>
                    </div>
                    <div>
                      <p className="font-medium">Video chat before confirming</p>
                      <p className="text-sm text-gray-600">Have a virtual tour to see the accommodation and meet your swap partner</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="bg-swap-lightBlue p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                      <span className="font-bold text-swap-blue">3</span>
                    </div>
                    <div>
                      <p className="font-medium">Create a swap agreement</p>
                      <p className="text-sm text-gray-600">Document expectations about utilities, rules, and conditions</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="bg-swap-lightBlue p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                      <span className="font-bold text-swap-blue">4</span>
                    </div>
                    <div>
                      <p className="font-medium">Keep communication on platform</p>
                      <p className="text-sm text-gray-600">For your safety, use our messaging system until you're comfortable</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Common questions about using SwapSpot
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              {faq.map((item, index) => (
                <div key={index} className="mb-8 border-b pb-8 last:border-b-0">
                  <h3 className="text-xl font-semibold mb-3">{item.question}</h3>
                  <p className="text-gray-700">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-swap-blue">
          <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to Find Your Perfect Swap?
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Join thousands of students who have already found their ideal accommodation through SwapSpot
            </p>
            <Button asChild size="lg" className="text-lg px-8 py-6 bg-white text-swap-blue hover:bg-gray-100">
              <Link to="/signup">Sign Up Now</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorksPage;
