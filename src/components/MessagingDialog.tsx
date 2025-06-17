
import React from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Crown, Instagram, Phone, MessageSquare } from "lucide-react";
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

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={buttonVariant} className={className}>
          <MessageCircle className="h-4 w-4 mr-2" />
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Connect with {recipientName}</DialogTitle>
          <DialogDescription>
            Access contact information for "{listingTitle}" in {listingLocation}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {isPremium ? (
            // Show contact information for premium users
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="h-5 w-5 text-yellow-600" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {contactInfo?.instagram && (
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <Instagram className="h-5 w-5 text-pink-600" />
                      <span className="font-medium">Instagram</span>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => openSocialLink('instagram', contactInfo.instagram!)}
                    >
                      @{contactInfo.instagram}
                    </Button>
                  </div>
                )}
                
                {contactInfo?.whatsapp && (
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <Phone className="h-5 w-5 text-green-600" />
                      <span className="font-medium">WhatsApp</span>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => openSocialLink('whatsapp', contactInfo.whatsapp!)}
                    >
                      {contactInfo.whatsapp}
                    </Button>
                  </div>
                )}
                
                {contactInfo?.snapchat && (
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-yellow-500" />
                      <span className="font-medium">Snapchat</span>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => openSocialLink('snapchat', contactInfo.snapchat!)}
                    >
                      @{contactInfo.snapchat}
                    </Button>
                  </div>
                )}
                
                {contactInfo?.email && (
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <MessageCircle className="h-5 w-5 text-blue-600" />
                      <span className="font-medium">Email</span>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => window.open(`mailto:${contactInfo.email}`, '_blank')}
                    >
                      {contactInfo.email}
                    </Button>
                  </div>
                )}
                
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Trust & Safety:</strong> Remember to verify the person's identity through their university email before meeting. SwapSpot facilitates connections between verified students only.
                  </p>
                </div>
              </CardContent>
            </Card>
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

                <Button onClick={handleUpgrade} className="w-full bg-yellow-600 hover:bg-yellow-700">
                  <Crown className="h-4 w-4 mr-2" />
                  Upgrade to Premium - €25/month
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
  );
}
