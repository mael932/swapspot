
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Globe, Users, Shield, BookOpen, Award, Heart } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-swap-blue py-20">
          <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our Mission
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              SwapSpot connects university students worldwide for safe, affordable accommodation exchanges during study abroad semesters.
            </p>
          </div>
        </section>
        
        {/* Our Story */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="w-full md:w-1/2">
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <p className="text-lg text-gray-700 mb-4">
                  SwapSpot was born from a simple realization: every semester, thousands of university students travel abroad for exchange programs, while their rooms sit empty at home.
                </p>
                <p className="text-lg text-gray-700 mb-4">
                  Founded by a group of former exchange students who experienced the housing struggle firsthand, we created SwapSpot to solve this problem through a safe, university-verified home exchange platform.
                </p>
                <p className="text-lg text-gray-700">
                  Our platform ensures that students can find affordable accommodations while studying abroad, making international education more accessible to all.
                </p>
              </div>
              <div className="w-full md:w-1/2 bg-gray-100 rounded-lg p-8">
                <blockquote className="text-gray-700 italic">
                  "During my exchange semester, finding affordable housing was the biggest challenge. I kept thinking how perfect it would be if I could just swap with another student going to my home university. That's when the idea for SwapSpot began to take shape."
                </blockquote>
                <p className="mt-4 font-medium">— Mael Moulin Fournier, Co-founder</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Values */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Values</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                The principles that guide everything we do at SwapSpot
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="bg-swap-lightBlue p-3 rounded-full w-fit mb-4">
                  <Shield className="h-6 w-6 text-swap-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Safety First</h3>
                <p className="text-gray-600">
                  We verify all users through their university email addresses and provide tools to help students make informed decisions about their swaps.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="bg-swap-lightBlue p-3 rounded-full w-fit mb-4">
                  <Globe className="h-6 w-6 text-swap-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Accessible Education</h3>
                <p className="text-gray-600">
                  We believe that financial constraints shouldn't prevent students from experiencing international education opportunities.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="bg-swap-lightBlue p-3 rounded-full w-fit mb-4">
                  <Users className="h-6 w-6 text-swap-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Community</h3>
                <p className="text-gray-600">
                  Beyond just accommodation, SwapSpot helps build connections between students worldwide, fostering a global community of learners.
                </p>
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
                Everything you need to know about using SwapSpot
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">How does SwapSpot verify users?</h3>
                <p className="text-gray-600">
                  We verify all users through their university email addresses. This ensures that everyone on our platform is a current student at an accredited university.
                </p>
              </div>
              
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">What if I don't find a direct swap match?</h3>
                <p className="text-gray-600">
                  SwapSpot allows for both direct swaps and network swaps. This means you can participate in a chain of exchanges if a direct match isn't available for your specific cities and dates.
                </p>
              </div>
              
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Is there a fee to use SwapSpot?</h3>
                <p className="text-gray-600">
                  Basic matching and communication features are free. Premium features like verified profile badges, priority matching, and virtual tours will be available with a premium subscription in the future.
                </p>
              </div>
              
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">How are conflicts resolved?</h3>
                <p className="text-gray-600">
                  SwapSpot provides a mediation service for any issues that may arise during the swap. We also encourage users to create clear agreements about accommodation rules and expectations before finalizing a swap.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2">Can I list my accommodation if I don't need a swap?</h3>
                <p className="text-gray-600">
                  Currently, SwapSpot focuses on exchanges. However, we're exploring options to allow one-way listings for students who want to offer their accommodation without requiring a swap in return.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                The passionate people behind SwapSpot
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {name: "Mael Moulin Fournier", role: "Co-founder & CEO", avatar: "https://i.pravatar.cc/150?img=23"},
                {name: "Marco Rossi", role: "Co-founder & CTO", avatar: "https://i.pravatar.cc/150?img=53"},
                {name: "Sophia Müller", role: "Head of User Experience", avatar: "https://i.pravatar.cc/150?img=47"},
                {name: "Liam Johnson", role: "Head of Partnerships", avatar: "https://i.pravatar.cc/150?img=67"}
              ].map((member, index) => (
                <div key={index} className="text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md">
                      <img 
                        src={member.avatar} 
                        alt={member.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-swap-blue">
          <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to Join the SwapSpot Community?
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Sign up with your university email and start finding your perfect accommodation swap today.
            </p>
            <Button asChild size="lg" className="text-lg px-8 py-6 bg-white text-swap-blue hover:bg-gray-100">
              <Link to="/signup">Sign Up with University Email</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
