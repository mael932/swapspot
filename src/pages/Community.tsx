
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  BookOpen, 
  MessageSquare, 
  Users, 
  Star,
  Clock,
  ThumbsUp,
  Search,
  Filter,
  Bot,
  Crown,
  Lock,
  Globe,
  MapPin,
  Calendar,
  Mail
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import PubertChat from "@/components/PubertChat";
import CommunityChat from "@/components/CommunityChat";
import ConnectForums from "@/components/ConnectForums";
import { useState, useEffect } from "react";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { supabase } from "@/lib/supabase";

const Community = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { subscriptionData, isPremium, isBasic, isElite, loading } = useSubscription();
  
  const hasAccess = isPremium || isBasic || isElite;

  // Check email verification status
  useEffect(() => {
    const checkEmailVerification = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          setIsEmailVerified(user.email_confirmed_at !== null);
        }
      } catch (error) {
        console.error("Error checking email verification:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkEmailVerification();
  }, []);

  const handleResendVerification = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.email) {
        const { error } = await supabase.auth.resend({
          type: 'signup',
          email: user.email,
          options: {
            emailRedirectTo: `${window.location.origin}/verify`
          }
        });
        
        if (error) {
          console.error("Error resending verification:", error);
        } else {
          alert("Verification email sent! Please check your inbox.");
        }
      }
    } catch (error) {
      console.error("Error resending verification:", error);
    }
  };
  
  const wikiGuides = [
    {
      title: "How to Clean and Leave the Place",
      description: "Complete checklist for preparing your space for your swap partner",
      category: "Preparation",
      readTime: "5 min",
      rating: 4.8,
      views: 1250,
      featured: true
    },
    {
      title: "Cultural Etiquette Differences Checklist",
      description: "Navigate cultural differences and house rules respectfully",
      category: "Culture",
      readTime: "8 min",
      rating: 4.9,
      views: 980,
      featured: true
    },
    {
      title: "What to Do if Your Match Falls Through",
      description: "Backup plans and emergency accommodation options",
      category: "Emergency",
      readTime: "6 min",
      rating: 4.7,
      views: 750,
      featured: true
    },
    {
      title: "First Week Survival Guide",
      description: "Essential tips for settling into your temporary home",
      category: "Getting Started",
      readTime: "10 min",
      rating: 4.6,
      views: 1100
    },
    {
      title: "Managing Utilities and Bills",
      description: "How to handle shared expenses during your swap",
      category: "Practical",
      readTime: "7 min",
      rating: 4.5,
      views: 650
    },
    {
      title: "Communication Best Practices",
      description: "How to maintain clear communication with your swap partner",
      category: "Communication",
      readTime: "4 min",
      rating: 4.8,
      views: 890
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-swap-blue mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* 60% - Primary Content: Hero Section */}
        <section className="bg-swap-blue py-20">
          <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-8">
              Connect & Chat
            </h1>
            <p className="text-2xl text-white/90 max-w-4xl mx-auto mb-12">
              Connect with verified exchange students and find your swap community
            </p>
          </div>
        </section>

        {/* 30% - Secondary Content: Main Navigation */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <Tabs defaultValue="connect" className="space-y-8">
              <TabsList className="grid w-full max-w-lg mx-auto grid-cols-3">
                <TabsTrigger value="connect" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Connect
                  {hasAccess && isEmailVerified && <Crown className="h-3 w-3 text-yellow-500" />}
                </TabsTrigger>
                <TabsTrigger value="community" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Chat
                  {hasAccess && isEmailVerified && <Crown className="h-3 w-3 text-yellow-500" />}
                </TabsTrigger>
                <TabsTrigger value="wiki" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Resources
                </TabsTrigger>
              </TabsList>

              {/* Wiki Tab */}
              <TabsContent value="wiki" className="space-y-8">
                <div className="flex flex-col md:flex-row gap-4 items-center">
                  <div className="relative flex-grow">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input 
                      placeholder="Search wiki guides..." 
                      className="pl-10"
                    />
                  </div>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Filter by Category
                  </Button>
                </div>

                {/* Featured Guides */}
                <div>
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Star className="h-6 w-6 text-yellow-500" />
                    Featured Guides
                  </h2>
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    {wikiGuides.filter(guide => guide.featured).map((guide, index) => (
                      <Card key={index} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <Badge variant="secondary">{guide.category}</Badge>
                            <div className="flex items-center gap-1 text-sm text-gray-600">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              {guide.rating}
                            </div>
                          </div>
                          <CardTitle className="text-lg">{guide.title}</CardTitle>
                          <CardDescription>{guide.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {guide.readTime}
                            </div>
                            <div>{guide.views} views</div>
                          </div>
                          <Button className="w-full">Read Guide</Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* All Guides */}
                <div>
                  <h2 className="text-2xl font-bold mb-6">All Guides</h2>
                  <div className="space-y-4">
                    {wikiGuides.map((guide, index) => (
                      <Card key={index} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex-grow">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-lg font-semibold">{guide.title}</h3>
                                <Badge variant="outline" className="text-xs">
                                  {guide.category}
                                </Badge>
                                {guide.featured && (
                                  <Badge variant="default" className="text-xs">
                                    Featured
                                  </Badge>
                                )}
                              </div>
                              <p className="text-gray-600 mb-2">{guide.description}</p>
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {guide.readTime}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                  {guide.rating}
                                </div>
                                <div>{guide.views} views</div>
                              </div>
                            </div>
                            <Button variant="outline">Read</Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Connect Tab */}
              <TabsContent value="connect" className="space-y-8">
                {!hasAccess ? (
                  <div className="text-center py-12">
                    <Card className="max-w-2xl mx-auto">
                      <CardHeader>
                        <div className="flex items-center justify-center mb-4">
                          <div className="bg-swap-lightBlue p-4 rounded-full">
                            <Users className="h-8 w-8 text-swap-blue" />
                          </div>
                        </div>
                        <CardTitle className="text-2xl mb-2">Members Only Forums</CardTitle>
                        <CardDescription className="text-lg">
                          Connect with other exchange students before your stay
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Alert className="mb-6">
                          <Crown className="h-4 w-4" />
                          <AlertDescription>
                            Access exclusive forums to connect with verified students, find travel buddies, and get destination-specific advice from locals.
                          </AlertDescription>
                        </Alert>
                        <div className="space-y-4">
                          <h4 className="font-semibold">Connect Features:</h4>
                          <ul className="text-left space-y-2 text-sm text-gray-600">
                            <li>• Destination-specific forums</li>
                            <li>• Find students going to your city</li>
                            <li>• Connect before your exchange</li>
                            <li>• Local recommendations and tips</li>
                            <li>• Travel buddy matching</li>
                          </ul>
                        </div>
                        <div className="mt-8 space-y-4">
                          <Button asChild size="lg" className="w-full">
                            <Link to="/signup">Upgrade to Premium</Link>
                          </Button>
                          <Button variant="outline" asChild className="w-full">
                            <Link to="/help-tips">Browse Free Resources</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ) : !isEmailVerified ? (
                  <div className="text-center py-12">
                    <Card className="max-w-2xl mx-auto">
                      <CardHeader>
                        <div className="flex items-center justify-center mb-4">
                          <div className="bg-orange-100 p-4 rounded-full">
                            <Mail className="h-8 w-8 text-orange-600" />
                          </div>
                        </div>
                        <CardTitle className="text-2xl mb-2">Email Verification Required</CardTitle>
                        <CardDescription className="text-lg">
                          Please verify your email address to access the Connect forums
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Alert className="mb-6">
                          <Mail className="h-4 w-4" />
                          <AlertDescription>
                            To ensure community safety and authenticity, you must verify your email address before accessing premium community features.
                          </AlertDescription>
                        </Alert>
                        <div className="space-y-4">
                          <p className="text-gray-600">
                            Check your email inbox for a verification link. If you haven't received it, you can request a new one.
                          </p>
                        </div>
                        <div className="mt-8 space-y-4">
                          <Button onClick={handleResendVerification} size="lg" className="w-full">
                            Resend Verification Email
                          </Button>
                          <Button variant="outline" asChild className="w-full">
                            <Link to="/help-tips">Browse Free Resources</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ) : (
                  <ConnectForums />
                )}
              </TabsContent>

              {/* Community Chat Tab */}
              <TabsContent value="community" className="space-y-8">
                {!hasAccess ? (
                  <div className="text-center py-12">
                    <Card className="max-w-2xl mx-auto">
                      <CardHeader>
                        <div className="flex items-center justify-center mb-4">
                          <div className="bg-swap-lightBlue p-4 rounded-full">
                            <Lock className="h-8 w-8 text-swap-blue" />
                          </div>
                        </div>
                        <CardTitle className="text-2xl mb-2">Premium Feature</CardTitle>
                        <CardDescription className="text-lg">
                          Community chat is available for premium subscribers only
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Alert className="mb-6">
                          <Crown className="h-4 w-4" />
                          <AlertDescription>
                            Join our premium community to connect with verified students, share experiences, and get real-time help from fellow swappers.
                          </AlertDescription>
                        </Alert>
                        <div className="space-y-4">
                          <h4 className="font-semibold">Premium Community Features:</h4>
                          <ul className="text-left space-y-2 text-sm text-gray-600">
                            <li>• Real-time chat with verified students</li>
                            <li>• Ask questions and get instant answers</li>
                            <li>• Share your swap experiences</li>
                            <li>• Get tips from experienced swappers</li>
                            <li>• Priority support from our team</li>
                          </ul>
                        </div>
                        <div className="mt-8 space-y-4">
                          <Button asChild size="lg" className="w-full">
                            <Link to="/signup">Upgrade to Premium</Link>
                          </Button>
                          <Button variant="outline" asChild className="w-full">
                            <Link to="/help-tips">Browse Free Resources</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ) : !isEmailVerified ? (
                  <div className="text-center py-12">
                    <Card className="max-w-2xl mx-auto">
                      <CardHeader>
                        <div className="flex items-center justify-center mb-4">
                          <div className="bg-orange-100 p-4 rounded-full">
                            <Mail className="h-8 w-8 text-orange-600" />
                          </div>
                        </div>
                        <CardTitle className="text-2xl mb-2">Email Verification Required</CardTitle>
                        <CardDescription className="text-lg">
                          Please verify your email address to access the Community Chat
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Alert className="mb-6">
                          <Mail className="h-4 w-4" />
                          <AlertDescription>
                            To ensure community safety and authenticity, you must verify your email address before accessing premium community features.
                          </AlertDescription>
                        </Alert>
                        <div className="space-y-4">
                          <p className="text-gray-600">
                            Check your email inbox for a verification link. If you haven't received it, you can request a new one.
                          </p>
                        </div>
                        <div className="mt-8 space-y-4">
                          <Button onClick={handleResendVerification} size="lg" className="w-full">
                            Resend Verification Email
                          </Button>
                          <Button variant="outline" asChild className="w-full">
                            <Link to="/help-tips">Browse Free Resources</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ) : (
                  <>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex items-center gap-2">
                          <Users className="h-6 w-6 text-blue-600 flex-shrink-0" />
                          <Crown className="h-4 w-4 text-yellow-500" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                            Premium Community Guidelines
                          </h3>
                          <p className="text-blue-700 text-sm">
                            Welcome to our premium community! This is a safe space for verified subscribers to share experiences and help fellow students. 
                            Please be respectful, helpful, and keep discussions relevant to accommodation swaps.
                          </p>
                        </div>
                      </div>
                    </div>

                    <CommunityChat />
                  </>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* 10% - Accent Content: Support CTA */}
        <section className="bg-gray-50 py-12">
          <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
            <h2 className="text-xl font-bold mb-3">Need More Help?</h2>
            <p className="text-gray-600 mb-4">
              Can't find what you're looking for? Our support team and AI assistant are here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild>
                <Link to="/support">Contact Support</Link>
              </Button>
              <Dialog open={isChatOpen} onOpenChange={setIsChatOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Bot className="h-4 w-4" />
                    Chat with Pubert
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl h-[80vh] p-0">
                  <DialogHeader className="p-6 pb-0">
                    <DialogTitle>Chat with Pubert - AI Assistant</DialogTitle>
                  </DialogHeader>
                  <div className="flex-grow p-6 pt-0">
                    <PubertChat className="h-full" />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Community;
