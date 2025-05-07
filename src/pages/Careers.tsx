
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Briefcase, Globe, Heart, Sparkles } from "lucide-react";

const Careers = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-swap-blue py-20">
          <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Join Our Team
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              Help us make international education more accessible by creating the perfect platform for student accommodation exchanges.
            </p>
          </div>
        </section>
        
        {/* Our Mission */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="w-full md:w-1/2">
                <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                <p className="text-lg text-gray-700 mb-4">
                  At SwapSpot, we're building a community that makes international education more accessible by solving one of its biggest challenges: affordable accommodation.
                </p>
                <p className="text-lg text-gray-700">
                  We believe that financial constraints shouldn't prevent students from experiencing the transformative power of studying abroad. By connecting students for accommodation exchanges, we're removing barriers and creating opportunities.
                </p>
              </div>
              <div className="w-full md:w-1/2 grid grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <Globe className="h-10 w-10 text-swap-blue mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Global Impact</h3>
                  <p className="text-gray-600">Supporting student mobility and cultural exchange worldwide</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <Heart className="h-10 w-10 text-swap-blue mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Community First</h3>
                  <p className="text-gray-600">Building trusted connections between students globally</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <Sparkles className="h-10 w-10 text-swap-blue mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                  <p className="text-gray-600">Creating elegant solutions to complex problems</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <Briefcase className="h-10 w-10 text-swap-blue mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Growth</h3>
                  <p className="text-gray-600">Expanding opportunities for our team and community</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Open Positions */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center">Open Positions</h2>
            
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">Senior Full-Stack Developer</h3>
                    <p className="text-gray-600">Remote • Full-time</p>
                  </div>
                  <Button className="w-full md:w-auto">
                    Apply Now
                  </Button>
                </div>
                <p className="text-gray-700">
                  We're looking for an experienced full-stack developer to help build and scale our platform. You'll work with React, Node.js, and PostgreSQL to create beautiful, functional features that help students connect.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">UX/UI Designer</h3>
                    <p className="text-gray-600">Remote • Full-time</p>
                  </div>
                  <Button className="w-full md:w-auto">
                    Apply Now
                  </Button>
                </div>
                <p className="text-gray-700">
                  Help us create an intuitive, accessible platform that students love to use. You'll work closely with our product team to research, prototype, and design features that solve real problems for our users.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">University Partnerships Manager</h3>
                    <p className="text-gray-600">Remote • Full-time</p>
                  </div>
                  <Button className="w-full md:w-auto">
                    Apply Now
                  </Button>
                </div>
                <p className="text-gray-700">
                  Build relationships with universities worldwide to help promote SwapSpot to their international exchange students. You'll work with international offices to integrate SwapSpot into their study abroad programs.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">Community Manager</h3>
                    <p className="text-gray-600">Remote • Part-time</p>
                  </div>
                  <Button className="w-full md:w-auto">
                    Apply Now
                  </Button>
                </div>
                <p className="text-gray-700">
                  Help grow and nurture our community of exchange students. You'll engage with users across social media, moderate discussions, gather feedback, and help create content that resonates with international students.
                </p>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <p className="text-lg mb-6">
                Don't see a position that matches your skills? We're always looking for talented people to join our team.
              </p>
              <Button size="lg" variant="outline">
                Send Spontaneous Application
              </Button>
            </div>
          </div>
        </section>
        
        {/* Benefits */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center">Why Join SwapSpot</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Flexible Work</h3>
                <p className="text-gray-700">
                  Work remotely with flexible hours. We care about results, not when or where you work.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Meaningful Impact</h3>
                <p className="text-gray-700">
                  Help make international education more accessible for students worldwide.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Growth Opportunities</h3>
                <p className="text-gray-700">
                  Join an early-stage startup with room to grow and shape your role.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Competitive Compensation</h3>
                <p className="text-gray-700">
                  Salary, equity, and benefits packages that reward your contributions.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">International Team</h3>
                <p className="text-gray-700">
                  Work with colleagues from around the world, bringing diverse perspectives.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Learning Budget</h3>
                <p className="text-gray-700">
                  Resources for conferences, courses, and tools to help you grow professionally.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Careers;
