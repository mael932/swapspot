
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Shield, Users, Lock, AlertTriangle } from "lucide-react";

const Safety = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-swap-blue py-20">
          <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Your Safety is Our Priority
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              SwapSpot is built on trust and safety. Learn how we keep our community secure.
            </p>
          </div>
        </section>
        
        {/* Safety Features */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-swap-lightBlue p-3 rounded-full">
                    <Shield className="h-6 w-6 text-swap-blue" />
                  </div>
                  <h2 className="text-2xl font-bold">University Verification</h2>
                </div>
                <p className="text-gray-700">
                  Every SwapSpot user must verify their university email address. This ensures that our community consists only of current university students, providing an additional layer of security and trust.
                </p>
              </div>
              
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-swap-lightBlue p-3 rounded-full">
                    <Users className="h-6 w-6 text-swap-blue" />
                  </div>
                  <h2 className="text-2xl font-bold">Secure Messaging</h2>
                </div>
                <p className="text-gray-700">
                  Our platform includes a secure messaging system that allows users to communicate without sharing personal contact information until they're ready. All conversations are stored for safety and reference.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-swap-lightBlue p-3 rounded-full">
                    <Lock className="h-6 w-6 text-swap-blue" />
                  </div>
                  <h2 className="text-2xl font-bold">Swap Agreements</h2>
                </div>
                <p className="text-gray-700">
                  Our platform provides customizable swap agreements that outline the terms of the exchange. These digital agreements help prevent misunderstandings and provide a reference point for both parties.
                </p>
              </div>
              
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-swap-lightBlue p-3 rounded-full">
                    <AlertTriangle className="h-6 w-6 text-swap-blue" />
                  </div>
                  <h2 className="text-2xl font-bold">24/7 Support</h2>
                </div>
                <p className="text-gray-700">
                  Our support team is available to assist with any issues that may arise during your swap. We provide mediation services for conflict resolution and emergency support when needed.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Safety Tips */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center">Safety Tips for Exchange Students</h2>
            
            <div className="space-y-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3">Before Your Swap</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Verify your swap partner's university email and student ID</li>
                  <li>Schedule a video call to meet virtually before committing</li>
                  <li>Ask detailed questions about the accommodation and neighborhood</li>
                  <li>Establish clear communication channels</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3">During Your Exchange</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Keep emergency contacts saved in your phone</li>
                  <li>Share your location with trusted friends or family</li>
                  <li>Familiarize yourself with local emergency services</li>
                  <li>Keep all important documents secure</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3">If Something Goes Wrong</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Contact SwapSpot support immediately</li>
                  <li>Document any issues with photos or written records</li>
                  <li>Reach out to your university's international student office</li>
                  <li>In emergencies, always contact local authorities first</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Safety;
