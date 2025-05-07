
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-swap-blue py-16">
          <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Terms of Service
            </h1>
            <p className="text-lg text-white/90 max-w-3xl mx-auto">
              Last Updated: May 7, 2025
            </p>
          </div>
        </section>
        
        {/* Terms Content */}
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4 md:px-8">
            <div className="prose max-w-none">
              <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
              <p className="mb-4">
                By accessing or using SwapSpot, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
              </p>
              
              <h2 className="text-2xl font-bold mb-4 mt-8">2. Eligibility</h2>
              <p className="mb-4">
                To use SwapSpot, you must be a current university student with a valid university email address. You must be at least 18 years old or the legal age of majority in your jurisdiction, whichever is greater.
              </p>
              
              <h2 className="text-2xl font-bold mb-4 mt-8">3. User Accounts</h2>
              <p className="mb-4">
                3.1. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
              </p>
              <p className="mb-4">
                3.2. You must provide accurate and complete information when creating your account and keep this information updated.
              </p>
              <p className="mb-4">
                3.3. SwapSpot reserves the right to suspend or terminate accounts that contain false or misleading information.
              </p>
              
              <h2 className="text-2xl font-bold mb-4 mt-8">4. Accommodation Listings</h2>
              <p className="mb-4">
                4.1. You may only list accommodations that you have the legal right to offer for exchange.
              </p>
              <p className="mb-4">
                4.2. All listings must accurately represent the accommodation being offered.
              </p>
              <p className="mb-4">
                4.3. SwapSpot reserves the right to remove listings that violate our policies or terms.
              </p>
              
              <h2 className="text-2xl font-bold mb-4 mt-8">5. Swap Agreements</h2>
              <p className="mb-4">
                5.1. Swap agreements are contracts between users. SwapSpot provides tools to facilitate these agreements but is not a party to them.
              </p>
              <p className="mb-4">
                5.2. Users are encouraged to create clear written agreements before finalizing swaps.
              </p>
              <p className="mb-4">
                5.3. SwapSpot is not liable for any damages resulting from swap agreements between users.
              </p>
              
              <h2 className="text-2xl font-bold mb-4 mt-8">6. Privacy</h2>
              <p className="mb-4">
                Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and disclose information.
              </p>
              
              <h2 className="text-2xl font-bold mb-4 mt-8">7. Prohibited Activities</h2>
              <p className="mb-4">
                Users are prohibited from:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li className="mb-2">Using SwapSpot for any illegal purpose</li>
                <li className="mb-2">Providing false or misleading information</li>
                <li className="mb-2">Harassment or abuse of other users</li>
                <li className="mb-2">Using SwapSpot for commercial purposes</li>
                <li className="mb-2">Any activity that disrupts or interferes with our services</li>
              </ul>
              
              <h2 className="text-2xl font-bold mb-4 mt-8">8. Modifications to Terms</h2>
              <p className="mb-4">
                SwapSpot reserves the right to modify these Terms of Service at any time. We will notify users of significant changes and continued use of our services after such modifications constitutes acceptance of the updated terms.
              </p>
              
              <h2 className="text-2xl font-bold mb-4 mt-8">9. Limitation of Liability</h2>
              <p className="mb-4">
                To the maximum extent permitted by law, SwapSpot shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or use, arising out of or in connection with these terms or the use of our services.
              </p>
              
              <h2 className="text-2xl font-bold mb-4 mt-8">10. Contact Information</h2>
              <p className="mb-4">
                If you have any questions about these Terms of Service, please contact us at hello@swapspot.com.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
