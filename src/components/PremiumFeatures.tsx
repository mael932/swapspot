
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Crown, Shield, Star, Zap, MessageCircle, Users, Eye } from "lucide-react";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { supabase } from "@/lib/supabase";
import { toast } from "@/components/ui/sonner";

interface PremiumFeaturesProps {
  className?: string;
}

export default function PremiumFeatures({ className }: PremiumFeaturesProps) {
  const { subscriptionData, isPremium, loading, user } = useSubscription();

  const handleUpgrade = async () => {
    if (!user) {
      toast.error("Please log in to upgrade to premium");
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        headers: {
          Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
        },
      });

      if (error) {
        console.error("Checkout error:", error);
        toast.error("Failed to start checkout. Please try again.");
        return;
      }

      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Error creating checkout:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleManageSubscription = async () => {
    if (!user) {
      toast.error("Please log in to manage your subscription");
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke('customer-portal', {
        headers: {
          Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
        },
      });

      if (error) {
        console.error("Portal error:", error);
        toast.error("Failed to open customer portal. Please try again.");
        return;
      }

      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Error opening customer portal:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const features = [
    {
      icon: <MessageCircle className="h-5 w-5" />,
      title: "Access Contact Information",
      description: "Get Instagram, WhatsApp, Snapchat handles and email addresses of students",
      premium: true,
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: "Unlimited Connections",
      description: "Connect with as many students as you want without restrictions",
      premium: true,
    },
    {
      icon: <Eye className="h-5 w-5" />,
      title: "See Who Viewed Your Profile",
      description: "Track interest in your listings and know who's checking you out",
      premium: true,
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "Verified Student Network",
      description: "Access to university-verified students across Europe",
      premium: false,
    },
    {
      icon: <Star className="h-5 w-5" />,
      title: "Priority Support",
      description: "Get help within 2 hours, 24/7 support available",
      premium: true,
    },
    {
      icon: <Crown className="h-5 w-5" />,
      title: "Premium Badge",
      description: "Show other students you're a verified premium member",
      premium: true,
    },
  ];

  if (loading) {
    return (
      <div className={className}>
        <Card>
          <CardContent className="p-6">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="space-y-6">
        {/* Current Plan Status */}
        <Card className={isPremium ? "border-yellow-200 bg-yellow-50" : ""}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  {isPremium ? (
                    <>
                      <Crown className="h-5 w-5 text-yellow-600" />
                      Premium Access
                    </>
                  ) : (
                    "Free Browsing"
                  )}
                </CardTitle>
                <CardDescription>
                  {isPremium 
                    ? `You have full access to student contact information${subscriptionData?.subscription_end ? ` until ${new Date(subscriptionData.subscription_end).toLocaleDateString()}` : ''}`
                    : "Browse student profiles and accommodations. Upgrade to access contact information and connect directly."
                  }
                </CardDescription>
              </div>
              <Badge variant={isPremium ? "default" : "secondary"}>
                {isPremium ? "Premium" : "Free"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3">
              {isPremium ? (
                <Button variant="outline" onClick={handleManageSubscription}>
                  Manage Subscription
                </Button>
              ) : (
                <Button onClick={handleUpgrade} className="bg-yellow-600 hover:bg-yellow-700">
                  <Crown className="h-4 w-4 mr-2" />
                  Get Premium Access - €25/month
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* How It Works */}
        <Card>
          <CardHeader>
            <CardTitle>How SwapSpot Works</CardTitle>
            <CardDescription>
              Connecting trusted European university students for accommodation exchanges
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">1</div>
                <div>
                  <h4 className="font-medium">Browse & Discover</h4>
                  <p className="text-sm text-gray-600">Find accommodation listings from verified university students across Europe</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center text-sm font-medium">2</div>
                <div>
                  <h4 className="font-medium">Get Premium Access</h4>
                  <p className="text-sm text-gray-600">Subscribe to access contact information (Instagram, WhatsApp, Snapchat)</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-medium">3</div>
                <div>
                  <h4 className="font-medium">Connect Directly</h4>
                  <p className="text-sm text-gray-600">Chat with students on their preferred platforms and arrange your accommodation swap</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>Features Overview</CardTitle>
            <CardDescription>
              What you get with each plan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg border">
                  <div className={`p-2 rounded-full ${
                    feature.premium 
                      ? (isPremium ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-400')
                      : 'bg-green-100 text-green-600'
                  }`}>
                    {feature.icon}
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className={`font-medium ${feature.premium && !isPremium ? 'text-gray-500' : ''}`}>
                        {feature.title}
                      </h3>
                      {feature.premium ? (
                        isPremium ? (
                          <Check className="h-4 w-4 text-green-600" />
                        ) : (
                          <Crown className="h-4 w-4 text-yellow-600" />
                        )
                      ) : (
                        <Check className="h-4 w-4 text-green-600" />
                      )}
                    </div>
                    <p className={`text-sm ${feature.premium && !isPremium ? 'text-gray-500' : 'text-gray-600'}`}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Trust & Safety */}
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-600" />
              Built on Trust
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-blue-800 mb-3">
              SwapSpot is designed for European university students who value trust and community. All members are verified through their university email addresses.
            </p>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• University email verification required</li>
              <li>• Student-to-student connections only</li>
              <li>• Safe, familiar social platforms for communication</li>
              <li>• Community-driven safety guidelines</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
