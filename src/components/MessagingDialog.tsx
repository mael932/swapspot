
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Crown, Instagram, Phone, MessageSquare, Sparkles, Check, Eye, Users, Shield, Star, Lock } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";
import { toast } from "@/components/ui/sonner";

interface MessagingDialogProps {
  recipientName: string;
  listingTitle: string;
  listingLocation: string;
  contactInfo?: {
    instagram?: string;
    whatsapp?: string;
    snapchat?: string;
    email?: string;
  };
  buttonVariant?: "default" | "outline" | "destructive" | "secondary" | "ghost" | "link";
  buttonText?: string;
  className?: string;
}

// Confetti component
const Confetti = () => {
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, color: string, delay: number}>>([]);

  useEffect(() => {
    const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'];
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -10,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 3
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 animate-float-up"
          style={{
            left: `${particle.x}%`,
            backgroundColor: particle.color,
            animationDelay: `${particle.delay}s`,
            animationDuration: '3s'
          }}
        />
      ))}
    </div>
  );
};

export default function MessagingDialog({
  recipientName,
  listingTitle,
  listingLocation,
  contactInfo,
  buttonVariant = "default",
  buttonText = "View Contact Info",
  className
}: MessagingDialogProps) {
  const { subscriptionData, user, loading } = useSubscription();
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const isSubscribed = subscriptionData?.subscribed || false;
  const currentTier = subscriptionData?.subscription_tier || 'free';

  const handleUpgrade = async (tier: 'basic' | 'premium' | 'elite') => {
    if (!user) {
      toast.error("Please log in to upgrade your account");
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { tier },
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
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error("Error creating checkout:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleDemoUpgrade = () => {
    setShowCongratulations(true);
    setShowConfetti(true);
    
    setTimeout(() => {
      setShowConfetti(false);
    }, 4000);

    toast.success("🎉 Welcome to SwapSpot Premium!");
  };

  const openSocialLink = (platform: string, handle: string) => {
    let url = '';
    switch (platform) {
      case 'instagram':
        url = `https://instagram.com/${handle.replace('@', '')}`;
        break;
      case 'whatsapp':
        url = `https://wa.me/${handle.replace(/[^0-9]/g, '')}`;
        break;
      case 'snapchat':
        url = `https://snapchat.com/add/${handle.replace('@', '')}`;
        break;
    }
    if (url) {
      window.open(url, '_blank');
    }
  };

  const subscriptionPlans = [
    {
      id: 'basic',
      name: 'SwapSpot Basic Connect',
      price: '€15',
      period: '/month',
      description: 'Perfect for occasional connections',
      features: [
        'Connect with up to 5 students per month',
        'Access to Instagram handles',
        'Basic profile verification',
        'Email support'
      ],
      color: 'bg-blue-50 border-blue-200',
      buttonColor: 'bg-blue-600 hover:bg-blue-700',
      isPopular: false
    },
    {
      id: 'premium',
      name: 'SwapSpot Premium Connect',
      price: '€25',
      period: '/month',
      description: 'Most popular choice for active students',
      features: [
        'Unlimited connections',
        'Access to all contact info (Instagram, WhatsApp, Email)',
        'Priority support (2-hour response)',
        'Advanced profile verification',
        'See who viewed your profile'
      ],
      color: 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-300',
      buttonColor: 'bg-purple-600 hover:bg-purple-700',
      isPopular: true
    },
    {
      id: 'elite',
      name: 'SwapSpot Elite Experience',
      price: '€45',
      period: '/month',
      description: 'VIP treatment with premium perks',
      features: [
        'Everything in Premium',
        'VIP badge and priority listing',
        '24/7 premium support',
        'Personal concierge assistance',
        'Exclusive events and networking',
        'Advanced safety verification'
      ],
      color: 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-300',
      buttonColor: 'bg-yellow-600 hover:bg-yellow-700',
      isPopular: false
    }
  ];

  return (
    <>
      {showConfetti && <Confetti />}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={buttonVariant} className={className}>
            <MessageCircle className="h-4 w-4 mr-2" />
            {buttonText}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {showCongratulations && <Sparkles className="h-5 w-5 text-yellow-500" />}
              {isSubscribed || showCongratulations 
                ? `Connect with ${recipientName}` 
                : `Unlock ${recipientName}'s Contact Information`
              }
            </DialogTitle>
            <DialogDescription>
              {isSubscribed || showCongratulations
                ? `Access contact information for "${listingTitle}" in ${listingLocation}`
                : `Choose a plan to connect with verified students like ${recipientName} and access their contact information`
              }
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {isSubscribed || showCongratulations ? (
              // Show contact information for subscribed users
              <div className="space-y-4">
                {showCongratulations && (
                  <Card className="border-yellow-200 bg-gradient-to-r from-yellow-50 to-orange-50">
                    <CardContent className="p-4">
                      <div className="text-center">
                        <Crown className="h-12 w-12 text-yellow-600 mx-auto mb-2" />
                        <h3 className="text-lg font-bold text-yellow-800 mb-1">Congratulations! 🎉</h3>
                        <p className="text-sm text-yellow-700">You're now a SwapSpot member with access to connect with verified students!</p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageCircle className="h-5 w-5 text-blue-600" />
                      Contact {recipientName}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {contactInfo?.instagram && (
                      <div className="flex items-center justify-between p-3 border rounded-lg bg-gradient-to-r from-pink-50 to-purple-50">
                        <div className="flex items-center gap-3">
                          <Instagram className="h-6 w-6 text-pink-600" />
                          <div>
                            <span className="font-medium">Instagram</span>
                            <p className="text-xs text-gray-600">Direct messaging available</p>
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => openSocialLink('instagram', contactInfo.instagram!)}
                          className="bg-pink-600 text-white hover:bg-pink-700"
                        >
                          @{contactInfo.instagram}
                        </Button>
                      </div>
                    )}
                    
                    {contactInfo?.whatsapp && (currentTier === 'premium' || currentTier === 'elite' || showCongratulations) && (
                      <div className="flex items-center justify-between p-3 border rounded-lg bg-gradient-to-r from-green-50 to-emerald-50">
                        <div className="flex items-center gap-3">
                          <Phone className="h-6 w-6 text-green-600" />
                          <div>
                            <span className="font-medium">WhatsApp</span>
                            <p className="text-xs text-gray-600">Call or message instantly</p>
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => openSocialLink('whatsapp', contactInfo.whatsapp!)}
                          className="bg-green-600 text-white hover:bg-green-700"
                        >
                          {contactInfo.whatsapp}
                        </Button>
                      </div>
                    )}
                    
                    {contactInfo?.email && (
                      <div className="flex items-center justify-between p-3 border rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50">
                        <div className="flex items-center gap-3">
                          <MessageCircle className="h-6 w-6 text-blue-600" />
                          <div>
                            <span className="font-medium">University Email</span>
                            <p className="text-xs text-gray-600">Official verified contact</p>
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => window.open(`mailto:${contactInfo.email}`, '_blank')}
                          className="bg-blue-600 text-white hover:bg-blue-700"
                        >
                          {contactInfo.email}
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Trust & Safety:</strong> Remember to verify the person's identity through their university email before meeting. SwapSpot facilitates connections between verified students only.
                  </p>
                </div>
              </div>
            ) : (
              // Show subscription plans for free users (Kamernet-style paywall)
              <div className="space-y-6">
                {/* Header with locked contact preview */}
                <Card className="border-gray-200 bg-gray-50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <Lock className="h-6 w-6 text-gray-400" />
                      <div>
                        <h3 className="font-semibold text-gray-700">Contact Information Locked</h3>
                        <p className="text-sm text-gray-600">Choose a subscription to unlock {recipientName}'s contact details</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="flex items-center gap-2 p-2 bg-white rounded border">
                        <Instagram className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-400">Instagram: ****</span>
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-white rounded border">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-400">WhatsApp: ****</span>
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-white rounded border">
                        <MessageCircle className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-400">Email: ****</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Subscription plans */}
                <div>
                  <h3 className="text-lg font-semibold text-center mb-6">Choose Your SwapSpot Plan</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {subscriptionPlans.map((plan) => (
                      <Card key={plan.id} className={`relative ${plan.color} ${plan.isPopular ? 'ring-2 ring-purple-300' : ''}`}>
                        {plan.isPopular && (
                          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                            <Badge className="bg-purple-600 text-white px-3 py-1">Most Popular</Badge>
                          </div>
                        )}
                        <CardHeader className="text-center pb-4">
                          <CardTitle className="text-lg font-bold">{plan.name}</CardTitle>
                          <div className="flex items-baseline justify-center gap-1">
                            <span className="text-3xl font-bold">{plan.price}</span>
                            <span className="text-sm text-gray-600">{plan.period}</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-2">{plan.description}</p>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <ul className="space-y-2">
                            {plan.features.map((feature, index) => (
                              <li key={index} className="flex items-start gap-2 text-sm">
                                <Check className="h-4 w-4 text-green-600 mt-0.5" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                          <Button 
                            onClick={() => handleUpgrade(plan.id as 'basic' | 'premium' | 'elite')}
                            className={`w-full ${plan.buttonColor} text-white`}
                            disabled={loading}
                          >
                            {loading ? 'Processing...' : `Get ${plan.name.split(' ')[1]}`}
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Trust indicators */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <Shield className="h-8 w-8 text-green-600" />
                    <div>
                      <h4 className="font-medium">Verified Students</h4>
                      <p className="text-xs text-gray-600">All members verified through university email</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Users className="h-8 w-8 text-blue-600" />
                    <div>
                      <h4 className="font-medium">10,000+ Students</h4>
                      <p className="text-xs text-gray-600">Active community across Europe</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Star className="h-8 w-8 text-yellow-600" />
                    <div>
                      <h4 className="font-medium">4.8/5 Rating</h4>
                      <p className="text-xs text-gray-600">Trusted by students everywhere</p>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-center text-gray-500">
                  Cancel anytime • Secure payment by Stripe • Money-back guarantee within 14 days
                </p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
