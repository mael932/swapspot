import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  MessageSquare, 
  Users, 
  Star,
  Clock,
  ThumbsUp,
  Search,
  Filter,
  Bot
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import PubertChat from "@/components/PubertChat";
import { useState } from "react";

const Community = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  
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

  const forumDiscussions = [
    {
      title: "Best cities for student exchanges in Europe?",
      author: "Sarah M.",
      replies: 23,
      lastActivity: "2 hours ago",
      category: "General Discussion",
      pinned: true
    },
    {
      title: "Tips for swapping with someone from a different culture",
      author: "Miguel R.",
      replies: 15,
      lastActivity: "4 hours ago",
      category: "Cultural Exchange"
    },
    {
      title: "How to handle time zone differences for communication",
      author: "Emma L.",
      replies: 8,
      lastActivity: "6 hours ago",
      category: "Communication"
    },
    {
      title: "Emergency contact lists - what to include?",
      author: "David K.",
      replies: 12,
      lastActivity: "1 day ago",
      category: "Safety"
    },
    {
      title: "Packing essentials for a 6-month swap",
      author: "Lisa P.",
      replies: 31,
      lastActivity: "2 days ago",
      category: "Preparation"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-swap-blue py-16">
          <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Community & Support
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              Learn from experienced swappers and share your own knowledge
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                Browse Wiki Guides
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-swap-blue">
                Join Discussion
              </Button>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <Tabs defaultValue="wiki" className="space-y-8">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
                <TabsTrigger value="wiki" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Swap Wiki
                </TabsTrigger>
                <TabsTrigger value="community" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Community Chat
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

              {/* Community Tab */}
              <TabsContent value="community" className="space-y-8">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <Users className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-blue-800 mb-2">Community Guidelines</h3>
                      <p className="text-blue-700 text-sm">
                        This is a safe space for sharing experiences and helping fellow students. 
                        Please be respectful, helpful, and keep discussions relevant to accommodation swaps.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4 items-center">
                  <div className="relative flex-grow">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input 
                      placeholder="Search discussions..." 
                      className="pl-10"
                    />
                  </div>
                  <Button className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Start New Discussion
                  </Button>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-6">Recent Discussions</h2>
                  <div className="space-y-4">
                    {forumDiscussions.map((discussion, index) => (
                      <Card key={index} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-grow">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-lg font-semibold hover:text-swap-blue cursor-pointer">
                                  {discussion.title}
                                </h3>
                                {discussion.pinned && (
                                  <Badge variant="default" className="text-xs">
                                    Pinned
                                  </Badge>
                                )}
                                <Badge variant="outline" className="text-xs">
                                  {discussion.category}
                                </Badge>
                              </div>
                              <p className="text-gray-600 text-sm mb-2">
                                Started by {discussion.author}
                              </p>
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                <div className="flex items-center gap-1">
                                  <MessageSquare className="h-3 w-3" />
                                  {discussion.replies} replies
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {discussion.lastActivity}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm">
                                <ThumbsUp className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                Reply
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <div className="text-center">
                  <Button variant="outline" size="lg">
                    Load More Discussions
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Support CTA */}
        <section className="bg-gray-50 py-16">
          <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Need More Help?</h2>
            <p className="text-gray-600 mb-6">
              Can't find what you're looking for? Our support team and AI assistant are here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
