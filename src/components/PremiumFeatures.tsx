
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Crown, Shield, Star, Zap } from "lucide-react";
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
      icon: <Shield className="h-5 w-5" />,
      title: "Swap Guarantee",
      description: "Full protection against no-shows and property issues",
      premium: true,
    },
    {
      icon: <Star className="h-5 w-5" />,
      title: "Spotlight Listings",
      description: "Get your accommodation featured at the top of search results",
      premium: true,
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Priority Support",
      description: "Get help within 2 hours, 24/7 support available",
      premium: true,
    },
    {
      icon: <Crown className="h-5 w-5" />,
      title: "Premium Badge",
      description: "Show other users you're a verified premium member",
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
                      Premium Plan
                    </>
                  ) : (
                    "Free Plan"
                  )}
                </CardTitle>
                <CardDescription>
                  {isPremium 
                    ? `Your premium subscription is active${subscriptionData?.subscription_end ? ` until ${new Date(subscriptionData.subscription_end).toLocaleDateString()}` : ''}`
                    : "Upgrade to unlock premium features and enhance your swapping experience"
                  }
                </CardDescription>
              </div>
              <Badge variant={isPremium ? "default" : "secondary"}>
                {isPremium ? "Active" : "Free"}
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
                  Upgrade to Premium - €25/month
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Premium Features */}
        <Card>
          <CardHeader>
            <CardTitle>Premium Features</CardTitle>
            <CardDescription>
              Everything you need for a safe and successful swap experience
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg border">
                  <div className={`p-2 rounded-full ${isPremium ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-600'}`}>
                    {feature.icon}
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium">{feature.title}</h3>
                      {isPremium && <Check className="h-4 w-4 text-green-600" />}
                    </div>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pricing Comparison */}
        {!isPremium && (
          <Card>
            <CardHeader>
              <CardTitle>Why Go Premium?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="font-medium text-gray-900">Free Plan</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />
                      Post and browse accommodations
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />
                      Basic messaging
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />
                      Standard support
                    </li>
                  </ul>
                </div>
                <div className="space-y-3 p-4 border-2 border-yellow-200 rounded-lg bg-yellow-50">
                  <h3 className="font-medium text-yellow-800">Premium Plan - €25/month</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />
                      Everything in Free
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />
                      Swap guarantee protection
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />
                      Spotlight your listings
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />
                      Priority 24/7 support
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />
                      Premium member badge
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
