
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InsuranceSupport from "@/components/InsuranceSupport";
import SwapAgreementDialog from "@/components/SwapAgreementDialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  CheckCircle, 
  AlertTriangle, 
  FileText, 
  Users,
  Lock,
  Eye,
  MessageCircle
} from "lucide-react";

const SafetyResources = () => {
  const safetyTips = [
    {
      category: "Before You Swap",
      icon: <Eye className="h-5 w-5" />,
      tips: [
        "Video chat with your swap partner before agreeing",
        "Verify their student status and university enrollment",
        "Check their social media profiles and references",
        "Create a detailed written agreement using our template",
        "Exchange emergency contact information"
      ]
    },
    {
      category: "During Your Swap",
      icon: <Lock className="h-5 w-5" />,
      tips: [
        "Take photos of the accommodation upon arrival",
        "Keep important documents secure",
        "Know the location of nearest hospital and police",
        "Stay in regular contact with family/friends",
        "Follow agreed-upon house rules"
      ]
    },
    {
      category: "Communication",
      icon: <MessageCircle className="h-5 w-5" />,
      tips: [
        "Keep all important conversations documented",
        "Be clear about expectations and boundaries",
        "Address issues promptly and professionally",
        "Use SwapSpot's messaging system for important discussions",
        "Respect cultural differences and time zones"
      ]
    },
    {
      category: "If Issues Arise",
      icon: <AlertTriangle className="h-5 w-5" />,
      tips: [
        "Document everything with photos and messages",
        "Try direct communication first",
        "Contact SwapSpot support if needed",
        "Keep emergency contacts accessible",
        "Know your local emergency numbers"
      ]
    }
  ];

  const trustIndicators = [
    {
      title: "University Verification",
      description: "Confirmed student status with valid university email",
      icon: <CheckCircle className="h-4 w-4 text-green-600" />,
      coverage: "All users required"
    },
    {
      title: "Background Check",
      description: "Optional enhanced verification for added trust",
      icon: <Shield className="h-4 w-4 text-blue-600" />,
      coverage: "Opt-in available"
    },
    {
      title: "Photo Verification",
      description: "Profile photos verified against government ID",
      icon: <Eye className="h-4 w-4 text-purple-600" />,
      coverage: "Recommended"
    },
    {
      title: "Reference Check",
      description: "Previous swap partners or roommates provide feedback",
      icon: <Users className="h-4 w-4 text-orange-600" />,
      coverage: "After first swap"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-swap-blue py-16">
          <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Safety & Trust Resources
            </h1>
            <p className="text-lg text-white/90 max-w-3xl mx-auto">
              Your safety is our priority. Learn about our safety features, trust indicators, and support resources.
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          {/* Quick Actions */}
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-4">Quick Safety Actions</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <SwapAgreementDialog
                buttonVariant="default"
                className="min-w-[200px]"
              />
              <Button variant="outline" className="min-w-[200px]">
                <Shield className="h-4 w-4 mr-2" />
                Report an Issue
              </Button>
              <Button variant="outline" className="min-w-[200px]">
                <MessageCircle className="h-4 w-4 mr-2" />
                Emergency Support
              </Button>
            </div>
          </div>

          {/* Trust Indicators */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Trust & Verification</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {trustIndicators.map((indicator, index) => (
                <Card key={index}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2 mb-2">
                      {indicator.icon}
                      <CardTitle className="text-lg">{indicator.title}</CardTitle>
                    </div>
                    <Badge variant="outline" className="w-fit">{indicator.coverage}</Badge>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{indicator.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Safety Tips */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Safety Guidelines</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {safetyTips.map((category, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {category.icon}
                      {category.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {category.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Support & Insurance */}
          <section>
            <InsuranceSupport />
          </section>

          {/* Emergency Information */}
          <section className="mt-12">
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-800">
                  <AlertTriangle className="h-5 w-5" />
                  Emergency Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <h4 className="font-medium text-red-800">SwapSpot Emergency</h4>
                    <p className="text-red-700">+1 (555) SWAP-911</p>
                    <p className="text-red-700">emergency@swapspot.com</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-red-800">International Emergency</h4>
                    <p className="text-red-700">Know local emergency numbers</p>
                    <p className="text-red-700">Contact your embassy if abroad</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-red-800">24/7 Support</h4>
                    <p className="text-red-700">Available via app chat</p>
                    <p className="text-red-700">Response within 15 minutes</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SafetyResources;
