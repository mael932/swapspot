
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Crown, Instagram, Phone, MessageSquare, Sparkles, Check, Eye, Users, Shield, Star } from "lucide-react";
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
  const { isPremium, user } = useSubscription();
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleDemoUpgrade = () => {
    // Demo upgrade - show congratulations immediately
    setShowCongratulations(true);
    setShowConfetti(true);
    
    // Hide confetti after 4 seconds
    setTimeout(() => {
      setShowConfetti(false);
    }, 4000);

    toast.success("🎉 Welcome to SwapSpot Premium!");
  };

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

  const premiumPerks = [
    {
      icon: <MessageCircle className="h-5 w-5" />,
      title: "Access All Contact Information",
      description: "Instagram, WhatsApp, Snapchat & Email addresses"
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: "Unlimited Connections",
      description: "Connect with as many students as you want"
    },
    {
      icon: <Eye className="h-5 w-5" />,
      title: "See Who Viewed Your Profile",
      description: "Track interest and know who's checking you out"
    },
    {
      icon: <Star className="h-5 w-5" />,
      title: "Priority Support",
      description: "Get help within 2 hours, 24/7 support"
    },
    {
      icon: <Crown className="h-5 w-5" />,
      title: "Premium Badge",
      description: "Show you're a verified premium member"
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "Enhanced Trust & Safety",
      description: "Additional verification and security features"
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
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {showCongratulations && <Sparkles className="h-5 w-5 text-yellow-500" />}
              {showCongratulations ? `🎉 Welcome to Premium!` : `Connect with ${recipientName}`}
            </DialogTitle>
            <DialogDescription>
              {showCongratulations 
                ? "You now have access to all premium features and contact information!"
                : `Access contact information for "${listingTitle}" in ${listingLocation}`
              }
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {isPremium || showCongratulations ? (
              // Show contact information and premium perks
              <div className="space-y-4">
                {showCongratulations && (
                  <Card className="border-yellow-200 bg-gradient-to-r from-yellow-50 to-orange-50">
                    <CardContent className="p-4">
                      <div className="text-center">
                        <Crown className="h-12 w-12 text-yellow-600 mx-auto mb-2" />
                        <h3 className="text-lg font-bold text-yellow-800 mb-1">Congratulations! 🎉</h3>
                        <p className="text-sm text-yellow-700">You're now a SwapSpot Premium member with full access to connect with verified students across Europe!</p>
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
                    
                    {contactInfo?.whatsapp && (
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
                    
                    {contactInfo?.snapchat && (
                      <div className="flex items-center justify-between p-3 border rounded-lg bg-gradient-to-r from-yellow-50 to-amber-50">
                        <div className="flex items-center gap-3">
                          <MessageSquare className="h-6 w-6 text-yellow-500" />
                          <div>
                            <span className="font-medium">Snapchat</span>
                            <p className="text-xs text-gray-600">Quick photo sharing</p>
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => openSocialLink('snapchat', contactInfo.snapchat!)}
                          className="bg-yellow-500 text-white hover:bg-yellow-600"
                        >
                          @{contactInfo.snapchat}
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

                {/* Premium Perks */}
                <Card className="border-yellow-200 bg-yellow-50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Crown className="h-5 w-5 text-yellow-600" />
                      Your Premium Benefits
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {premiumPerks.map((perk, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg border">
                          <div className="p-2 bg-yellow-100 rounded-full text-yellow-600">
                            {perk.icon}
                          </div>
                          <div>
                            <h4 className="font-medium text-sm">{perk.title}</h4>
                            <p className="text-xs text-gray-600">{perk.description}</p>
                          </div>
                          <Check className="h-4 w-4 text-green-600 ml-auto" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Trust & Safety:</strong> Remember to verify the person's identity through their university email before meeting. SwapSpot facilitates connections between verified students only.
                  </p>
                </div>
              </div>
            ) : (
              // Show upgrade prompt for free users
              <Card className="border-yellow-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Crown className="h-5 w-5 text-yellow-600" />
                    Premium Required
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">
                    To access {recipientName}'s contact information and connect directly, you need a SwapSpot Premium subscription.
                  </p>
                  
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h4 className="font-medium text-yellow-800 mb-2">What you'll get with Premium:</h4>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• Access to all student contact information</li>
                      <li>• Instagram, WhatsApp, and Snapchat handles</li>
                      <li>• Direct communication outside the platform</li>
                      <li>• Unlimited profile views and connections</li>
                      <li>• Priority support and verification</li>
                    </ul>
                  </div>

                  <Button onClick={handleDemoUpgrade} className="w-full bg-yellow-600 hover:bg-yellow-700">
                    <Crown className="h-4 w-4 mr-2" />
                    Get Premium Access - €25/month (Demo)
                  </Button>
                  
                  <p className="text-xs text-center text-gray-500">
                    Trusted by European university students • Cancel anytime
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
