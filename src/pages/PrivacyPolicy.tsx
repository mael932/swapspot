
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-swap-blue py-16">
          <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-white/90 max-w-3xl mx-auto">
              Last Updated: {new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </section>
        
        {/* Privacy Policy Content */}
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4 md:px-8">
            <div className="prose max-w-none">
              <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
              <p className="mb-4">
                SwapSpot ("we," "our," or "us") is committed to protecting your privacy and ensuring compliance with the General Data Protection Regulation (GDPR). This Privacy Policy explains how we collect, use, and protect your personal data when you use our student accommodation exchange platform.
              </p>
              
              <h2 className="text-2xl font-bold mb-4 mt-8">2. Data Controller Information</h2>
              <p className="mb-4">
                SwapSpot acts as the data controller for the personal data we collect. You can contact us at hello@swapspot.com for any privacy-related inquiries.
              </p>
              
              <h2 className="text-2xl font-bold mb-4 mt-8">3. What Data We Collect</h2>
              <p className="mb-4">We collect the following types of personal data:</p>
              <ul className="list-disc pl-6 mb-4">
                <li className="mb-2"><strong>Personal Information:</strong> Full name, email address, university affiliation</li>
                <li className="mb-2"><strong>Accommodation Details:</strong> Your current housing information including location, price, room details, amenities, and photos</li>
                <li className="mb-2"><strong>Housing Preferences:</strong> Preferred destinations, budget range, accommodation type, desired amenities, and stay dates</li>
                <li className="mb-2"><strong>Student Verification:</strong> Proof of enrollment documents (optional)</li>
                <li className="mb-2"><strong>Communication Data:</strong> Messages sent through our platform, support inquiries</li>
                <li className="mb-2"><strong>Technical Data:</strong> IP address, browser type, device information, usage statistics</li>
              </ul>
              
              <h2 className="text-2xl font-bold mb-4 mt-8">4. Legal Basis for Processing</h2>
              <p className="mb-4">We process your personal data based on:</p>
              <ul className="list-disc pl-6 mb-4">
                <li className="mb-2"><strong>Consent:</strong> When you agree to our data processing during signup</li>
                <li className="mb-2"><strong>Legitimate Interest:</strong> To provide and improve our accommodation matching services</li>
                <li className="mb-2"><strong>Contractual Necessity:</strong> To fulfill our obligations in providing the SwapSpot service</li>
              </ul>
              
              <h2 className="text-2xl font-bold mb-4 mt-8">5. How We Use Your Data</h2>
              <p className="mb-4">We use your personal data to:</p>
              <ul className="list-disc pl-6 mb-4">
                <li className="mb-2">Match you with compatible accommodation swap opportunities</li>
                <li className="mb-2">Facilitate communication between swap partners</li>
                <li className="mb-2">Verify student status and prevent fraud</li>
                <li className="mb-2">Provide customer support and respond to inquiries</li>
                <li className="mb-2">Improve our services and user experience</li>
                <li className="mb-2">Send important updates about your account or matches</li>
              </ul>
              
              <h2 className="text-2xl font-bold mb-4 mt-8">6. Data Storage and Security</h2>
              <p className="mb-4">
                Your data is currently stored securely in encrypted Google Sheets with restricted access. We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.
              </p>
              <p className="mb-4">
                Access to your data is limited to authorized SwapSpot team members who need it to provide our services. We do not make your personal data publicly accessible.
              </p>
              
              <h2 className="text-2xl font-bold mb-4 mt-8">7. Data Sharing</h2>
              <p className="mb-4">We do not sell your personal data. We may share your data only:</p>
              <ul className="list-disc pl-6 mb-4">
                <li className="mb-2">With potential swap partners (limited accommodation details only, with your consent)</li>
                <li className="mb-2">With service providers who help us operate our platform (under strict data processing agreements)</li>
                <li className="mb-2">When required by law or to protect our legal rights</li>
              </ul>
              
              <h2 className="text-2xl font-bold mb-4 mt-8">8. International Data Transfers</h2>
              <p className="mb-4">
                Your data may be transferred to and processed in countries outside the European Economic Area (EEA). When we do so, we ensure appropriate safeguards are in place to protect your data in accordance with GDPR requirements.
              </p>
              
              <h2 className="text-2xl font-bold mb-4 mt-8">9. Data Retention</h2>
              <p className="mb-4">
                We retain your personal data only for as long as necessary to fulfill the purposes outlined in this policy, typically:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li className="mb-2">Account data: Until you delete your account plus 30 days</li>
                <li className="mb-2">Communication records: 2 years for customer support purposes</li>
                <li className="mb-2">Legal compliance: As required by applicable laws</li>
              </ul>
              
              <h2 className="text-2xl font-bold mb-4 mt-8">10. Your Rights Under GDPR</h2>
              <p className="mb-4">You have the following rights regarding your personal data:</p>
              <ul className="list-disc pl-6 mb-4">
                <li className="mb-2"><strong>Right of Access:</strong> Request a copy of your personal data</li>
                <li className="mb-2"><strong>Right to Rectification:</strong> Correct inaccurate or incomplete data</li>
                <li className="mb-2"><strong>Right to Erasure:</strong> Request deletion of your personal data</li>
                <li className="mb-2"><strong>Right to Restrict Processing:</strong> Limit how we use your data</li>
                <li className="mb-2"><strong>Right to Data Portability:</strong> Receive your data in a portable format</li>
                <li className="mb-2"><strong>Right to Object:</strong> Object to processing based on legitimate interests</li>
                <li className="mb-2"><strong>Right to Withdraw Consent:</strong> Withdraw consent for data processing at any time</li>
              </ul>
              <p className="mb-4">
                To exercise any of these rights, please contact us at hello@swapspot.com. We will respond within 30 days.
              </p>
              
              <h2 className="text-2xl font-bold mb-4 mt-8">11. Cookies and Tracking</h2>
              <p className="mb-4">
                We use essential cookies to ensure our website functions properly. We do not use tracking cookies or third-party analytics without your explicit consent.
              </p>
              
              <h2 className="text-2xl font-bold mb-4 mt-8">12. Children's Privacy</h2>
              <p className="mb-4">
                Our services are intended for users aged 18 and above. We do not knowingly collect personal data from children under 16 without parental consent.
              </p>
              
              <h2 className="text-2xl font-bold mb-4 mt-8">13. Changes to This Policy</h2>
              <p className="mb-4">
                We may update this Privacy Policy from time to time. We will notify you of significant changes by email or through our platform. The "Last Updated" date at the top indicates when the policy was last modified.
              </p>
              
              <h2 className="text-2xl font-bold mb-4 mt-8">14. Data Protection Authority</h2>
              <p className="mb-4">
                If you have concerns about how we handle your personal data, you have the right to lodge a complaint with your local data protection authority.
              </p>
              
              <h2 className="text-2xl font-bold mb-4 mt-8">15. Contact Us</h2>
              <p className="mb-4">
                For any questions about this Privacy Policy or our data practices, please contact us at:
              </p>
              <ul className="list-none mb-4">
                <li className="mb-2">Email: hello@swapspot.com</li>
                <li className="mb-2">Subject: Privacy Policy Inquiry</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
