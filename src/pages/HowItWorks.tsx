
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Users, Search, UserCheck, CalendarCheck, MessageCircle, Star, Shield } from "lucide-react";

const HowItWorksPage = () => {
  const steps = [
    {
      icon: <UserCheck className="h-12 w-12 text-swap-blue" />,
      title: "Tell us about yourself",
      description: "Create your profile with your university details, study dates, accommodation preferences, and what you're looking for in a swap partner."
    },
    {
      icon: <Search className="h-12 w-12 text-swap-blue" />,
      title: "We find your matches",
      description: "Our smart matching algorithm analyzes your preferences and finds compatible students who share your academic goals and housing needs."
    },
    {
      icon: <MessageCircle className="h-12 w-12 text-swap-blue" />,
      title: "Get notified of matches",
      description: "When we find suitable matches, you'll receive email notifications with their contact details and accommodation information."
    },
    {
      icon: <Users className="h-12 w-12 text-swap-blue" />,
      title: "Connect directly",
      description: "Reach out to your matches through the provided contact information to discuss details and plan your accommodation swap."
    },
    {
      icon: <CalendarCheck className="h-12 w-12 text-swap-blue" />,
      title: "Confirm your match",
      description: "Once you've found a compatible partner and agreed on terms, confirm your match and prepare for your exchange experience."
    },
    {
      icon: <Star className="h-12 w-12 text-swap-blue" />,
      title: "Enjoy your exchange",
      description: "Move into your matched accommodation and focus on your studies while building meaningful connections with fellow students."
    }
  ];

  const faq = [
    {
      question: "How does the matching algorithm work?",
      answer: "Our algorithm considers your location preferences, study dates, university program, accommodation type preferences, and personal compatibility factors to find the most suitable matches from our verified student community."
    },
    {
      question: "How quickly will I receive matches?",
      answer: "Most users receive their first potential matches within 24-48 hours of completing their profile. We continuously search for new matches as more students join the platform."
    },
    {
      question: "What information do I receive about my matches?",
      answer: "You'll receive detailed profiles including their accommodation photos, location, university information, study dates, and direct contact details so you can connect immediately."
    },
    {
      question: "What if I don't like the matches I receive?",
      answer: "You can update your preferences anytime to refine future matches. Our algorithm learns from your feedback to provide increasingly better matches over time."
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
              We Find Your Perfect Match
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto">
              Skip the endless browsing. Tell us what you need, and we'll connect you with compatible students automatically.
            </p>
          </div>
        </section>

        {/* Main Steps Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">How SwapSpot Matching Works</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Our intelligent system does the work for you - just provide your details and we'll find compatible matches
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

        {/* Matching Benefits Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="w-full md:w-1/2">
                <div className="bg-swap-blue p-8 rounded-full inline-block mb-6">
                  <Shield className="h-16 w-16 text-white" />
                </div>
                <h2 className="text-3xl font-bold mb-6">Why Our Matching System Works</h2>
                <div className="space-y-4">
                  <p className="text-lg text-gray-700">
                    Unlike traditional listing platforms, SwapSpot uses intelligent matching to connect compatible students based on shared academic goals and housing preferences.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <div className="bg-swap-blue rounded-full p-1 mt-1 flex-shrink-0">
                        <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700">AI-powered compatibility matching</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-swap-blue rounded-full p-1 mt-1 flex-shrink-0">
                        <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700">Verified university students only</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-swap-blue rounded-full p-1 mt-1 flex-shrink-0">
                        <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700">Automatic match notifications</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-swap-blue rounded-full p-1 mt-1 flex-shrink-0">
                        <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700">Direct contact information provided</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="w-full md:w-1/2 bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">What Makes a Good Match?</h3>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <div className="bg-swap-lightBlue p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                      <span className="font-bold text-swap-blue">1</span>
                    </div>
                    <div>
                      <p className="font-medium">Compatible study schedules</p>
                      <p className="text-sm text-gray-600">Matching academic calendars and exchange periods</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="bg-swap-lightBlue p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                      <span className="font-bold text-swap-blue">2</span>
                    </div>
                    <div>
                      <p className="font-medium">Similar accommodation standards</p>
                      <p className="text-sm text-gray-600">Matching quality and type of housing preferences</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="bg-swap-lightBlue p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                      <span className="font-bold text-swap-blue">3</span>
                    </div>
                    <div>
                      <p className="font-medium">Complementary locations</p>
                      <p className="text-sm text-gray-600">You want to go where they are, they want to come where you are</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="bg-swap-lightBlue p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                      <span className="font-bold text-swap-blue">4</span>
                    </div>
                    <div>
                      <p className="font-medium">Shared academic focus</p>
                      <p className="text-sm text-gray-600">Similar fields of study and academic goals</p>
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
                Common questions about our matching process
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
              Ready to Find Your Perfect Match?
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Join thousands of students who have found their ideal accommodation matches through our intelligent system
            </p>
            <Button asChild size="lg" className="text-lg px-8 py-6 bg-white text-swap-blue hover:bg-gray-100">
              <Link to="/signup">Start Matching Now</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorksPage;
