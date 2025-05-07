
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const FAQ = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-swap-blue py-20">
          <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Find answers to common questions about SwapSpot
            </p>
          </div>
        </section>
        
        {/* FAQ Content */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 md:px-8">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">General Questions</h2>
                <div className="space-y-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">What is SwapSpot?</h3>
                    <p className="text-gray-700">
                      SwapSpot is a platform that connects university students for accommodation exchanges during study abroad semesters. Instead of paying for expensive housing, students can swap their existing accommodations, making international education more affordable.
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">How does SwapSpot verify users?</h3>
                    <p className="text-gray-700">
                      We verify all users through their university email addresses. This ensures that everyone on our platform is a current student at an accredited university, providing an additional layer of security and trust.
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">Is SwapSpot available worldwide?</h3>
                    <p className="text-gray-700">
                      Yes, SwapSpot is available to university students worldwide. Our platform supports international exchanges between students from different countries and continents.
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold mb-4">Using SwapSpot</h2>
                <div className="space-y-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">How do I find a swap match?</h3>
                    <p className="text-gray-700">
                      After creating a profile and listing your accommodation, you can browse available listings or use our matching algorithm to find potential swap partners. You can filter by location, dates, and accommodation type to find the perfect match.
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">What if I don't find a direct swap match?</h3>
                    <p className="text-gray-700">
                      SwapSpot allows for both direct swaps and network swaps. This means you can participate in a chain of exchanges if a direct match isn't available for your specific cities and dates.
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">Is there a fee to use SwapSpot?</h3>
                    <p className="text-gray-700">
                      Basic matching and communication features are free. Premium features like verified profile badges, priority matching, and virtual tours will be available with a premium subscription in the future.
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold mb-4">Safety & Support</h2>
                <div className="space-y-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">How are conflicts resolved?</h3>
                    <p className="text-gray-700">
                      SwapSpot provides a mediation service for any issues that may arise during the swap. We also encourage users to create clear agreements about accommodation rules and expectations before finalizing a swap.
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">What happens if my swap partner cancels?</h3>
                    <p className="text-gray-700">
                      If your swap partner cancels before your exchange begins, our team will prioritize finding you a new match. We also recommend having a backup plan just in case.
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">How can I contact support?</h3>
                    <p className="text-gray-700">
                      You can reach our support team through the contact form on our support page, or by emailing hello@swapspot.com. For urgent matters, premium users have access to expedited support.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
