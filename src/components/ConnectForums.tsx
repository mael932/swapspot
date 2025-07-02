
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  MapPin, 
  Users, 
  Calendar,
  Search,
  Plus,
  MessageSquare,
  Globe,
  Plane,
  Clock
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ForumPost {
  id: string;
  title: string;
  author: {
    name: string;
    avatar?: string;
    university: string;
    destination: string;
  };
  content: string;
  timestamp: string;
  replies: number;
  category: string;
}

interface Forum {
  id: string;
  name: string;
  description: string;
  location: string;
  country: string;
  members: number;
  posts: number;
  lastActivity: string;
  featured?: boolean;
}

const ConnectForums: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const forums: Forum[] = [
    {
      id: "paris",
      name: "Paris Exchange Students",
      description: "Connect with students heading to Paris for study abroad",
      location: "Paris",
      country: "France",
      members: 234,
      posts: 1456,
      lastActivity: "2 hours ago",
      featured: true
    },
    {
      id: "london",
      name: "London Student Community",
      description: "Find your tribe in London - accommodation, social events, and tips",
      location: "London",
      country: "UK",
      members: 187,
      posts: 892,
      lastActivity: "4 hours ago",
      featured: true
    },
    {
      id: "barcelona",
      name: "Barcelona Erasmus Hub",
      description: "Spanish adventure awaits! Connect before you arrive",
      location: "Barcelona",
      country: "Spain",
      members: 156,
      posts: 743,
      lastActivity: "1 hour ago",
      featured: true
    },
    {
      id: "amsterdam",
      name: "Amsterdam International Students",
      description: "Bikes, canals, and great company in Amsterdam",
      location: "Amsterdam",
      country: "Netherlands",
      members: 98,
      posts: 456,
      lastActivity: "6 hours ago"
    },
    {
      id: "rome",
      name: "Rome Study Abroad",
      description: "When in Rome... connect with fellow students!",
      location: "Rome",
      country: "Italy",
      members: 123,
      posts: 567,
      lastActivity: "3 hours ago"
    },
    {
      id: "berlin",
      name: "Berlin Exchange Network",
      description: "Alternative culture and student life in Berlin",
      location: "Berlin",
      country: "Germany",
      members: 89,
      posts: 334,
      lastActivity: "5 hours ago"
    }
  ];

  const recentPosts: ForumPost[] = [
    {
      id: "1",
      title: "Looking for roommate in 6th arrondissement - January start",
      author: {
        name: "Sophie Chen",
        university: "Sciences Po Paris",
        destination: "Paris, France"
      },
      content: "Hi everyone! I'm starting my exchange at Sciences Po in January and looking for someone to share a 2-bedroom apartment in the 6th. Budget around €800/month each. I'm tidy, social, and love exploring the city!",
      timestamp: "2 hours ago",
      replies: 7,
      category: "Housing"
    },
    {
      id: "2",
      title: "Best neighborhoods for students in London?",
      author: {
        name: "Marcus Johnson",
        university: "King's College London",
        destination: "London, UK"
      },
      content: "Starting at KCL in September. What are the best areas to look for accommodation? Considering Elephant & Castle, Bermondsey, or further south. Any advice on commute times and student life?",
      timestamp: "4 hours ago",
      replies: 12,
      category: "General"
    },
    {
      id: "3",
      title: "Beach trip to Costa Brava - who's in?",
      author: {
        name: "Lucia Martinez",
        university: "Universitat de Barcelona",
        destination: "Barcelona, Spain"
      },
      content: "Planning a weekend trip to Costa Brava beaches in October. Looking for 3-4 people to share accommodation and travel costs. Perfect way to explore Catalonia together!",
      timestamp: "1 hour ago",
      replies: 5,
      category: "Travel"
    }
  ];

  const categories = [
    { id: "all", name: "All Posts", count: 24 },
    { id: "housing", name: "Housing", count: 8 },
    { id: "travel", name: "Travel Buddies", count: 6 },
    { id: "general", name: "General", count: 7 },
    { id: "social", name: "Social Events", count: 3 }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
      <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
        <Users className="h-8 w-8 text-swap-blue" />
        Connect with Fellow Students
      </h2>
      <p className="text-gray-600 max-w-2xl mx-auto">
        Join destination-specific group chats to connect with other exchange students, find travel buddies, 
        and get insider tips before your stay begins. All chats are free for verified students!
      </p>
      </div>

      <Tabs defaultValue="chats" className="space-y-6">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
          <TabsTrigger value="chats">Exchange Chats</TabsTrigger>
          <TabsTrigger value="posts">Recent Messages</TabsTrigger>
        </TabsList>

        {/* Chats Tab */}
        <TabsContent value="chats" className="space-y-6">
          {/* Search */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search destinations..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Request New Chat Room
            </Button>
          </div>

          {/* Featured Chat Rooms */}
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Globe className="h-5 w-5 text-swap-blue" />
              Popular Exchange Destinations
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {forums.filter(forum => forum.featured).map((forum) => (
                <Card key={forum.id} className="hover:shadow-lg transition-shadow border-l-4 border-l-swap-blue">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-swap-blue" />
                          {forum.name}
                        </CardTitle>
                        <p className="text-sm text-gray-600 mt-1">{forum.location}, {forum.country}</p>
                      </div>
                      <Badge variant="secondary">Featured</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-700">{forum.description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {forum.members}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" />
                          {forum.posts}
                        </span>
                      </div>
                      <span className="text-xs">{forum.lastActivity}</span>
                     </div>
                     <Button className="w-full">Join Chat</Button>
                   </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* All Chat Rooms */}
          <div>
            <h3 className="text-xl font-semibold mb-4">All Chat Rooms</h3>
            <div className="space-y-4">
              {forums.map((forum) => (
                <Card key={forum.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-grow">
                        <div className="bg-swap-lightBlue p-3 rounded-lg">
                          <MapPin className="h-5 w-5 text-swap-blue" />
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold">{forum.name}</h4>
                            {forum.featured && <Badge variant="outline" className="text-xs">Featured</Badge>}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{forum.description}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span>{forum.location}, {forum.country}</span>
                            <span>•</span>
                            <span>{forum.members} members</span>
                            <span>•</span>
                            <span>Active {forum.lastActivity}</span>
                          </div>
                        </div>
                       </div>
                       <Button variant="outline">Join Chat</Button>
                     </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Recent Messages Tab */}
        <TabsContent value="posts" className="space-y-6">
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center gap-1"
              >
                {category.name}
                <Badge variant="secondary" className="ml-1 text-xs">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>

          {/* Posts */}
          <div className="space-y-4">
            {recentPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar>
                      <AvatarImage src={post.author.avatar} />
                      <AvatarFallback>
                        {post.author.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-grow">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-lg mb-1">{post.title}</h4>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <span className="font-medium">{post.author.name}</span>
                            <span>•</span>
                            <span>{post.author.university}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Plane className="h-3 w-3" />
                              {post.author.destination}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {post.category}
                          </Badge>
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {post.timestamp}
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-4">{post.content}</p>
                      
                      <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" className="text-gray-600">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          {post.replies} replies
                        </Button>
                        <Button size="sm">Reply</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center pt-4">
            <Button variant="outline">Load More Posts</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConnectForums;
