
import React, { useState, useEffect } from "react";
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
  Clock,
  MessageCircle
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import CityChat from "./CityChat";

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

interface ChatRoom {
  id: string;
  city: string;
  country: string;
  description: string;
  created_at: string;
  updated_at: string;
}

const ConnectForums: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<ChatRoom | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthAndLoadRooms();
  }, []);

  const checkAuthAndLoadRooms = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      setCurrentUser(session?.user || null);
      
      const { data: rooms, error } = await supabase
        .from('chat_rooms')
        .select('*')
        .order('city');
        
      if (error) throw error;
      setChatRooms(rooms || []);
    } catch (error) {
      console.error('Error loading chat rooms:', error);
      toast.error('Failed to load chat rooms');
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoinChat = (room: ChatRoom) => {
    if (!currentUser) {
      toast.error('Please log in to join the chat');
      return;
    }
    setSelectedRoom(room);
  };

  const filteredRooms = chatRooms.filter(room => 
    room.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (selectedRoom) {
    return (
      <CityChat 
        room={selectedRoom} 
        onBack={() => setSelectedRoom(null)}
        currentUser={currentUser}
      />
    );
  }

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-6 flex items-center justify-center gap-3">
          <MessageCircle className="h-10 w-10 text-swap-blue" />
          Connect with Fellow Students
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Join city-based group chats to connect with other exchange students in real-time. 
          Chat freely with verified students heading to your destination!
        </p>
        {!currentUser && (
          <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg max-w-md mx-auto">
            <p className="text-orange-700 font-medium">Please log in to join the chats</p>
          </div>
        )}
      </div>

      <Tabs defaultValue="chats" className="space-y-8">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-1 h-14 bg-white shadow-md">
          <TabsTrigger value="chats" className="text-lg font-semibold py-4">City Chats</TabsTrigger>
        </TabsList>

        {/* Chats Tab */}
        <TabsContent value="chats" className="space-y-8">
          {/* Search */}
          <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
              <Input 
                placeholder="Search cities..." 
                className="pl-12 h-12 text-lg border-2 focus:border-swap-blue"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-swap-blue"></div>
            </div>
          ) : (
            <div>
              <h3 className="text-2xl font-bold mb-8 text-center text-gray-800">Available Chat Rooms</h3>
              <div className="grid gap-6 max-w-4xl mx-auto">
                {filteredRooms.map((room) => (
                  <Card key={room.id} className="hover:shadow-xl transition-all duration-300 border-2 hover:border-swap-blue group">
                    <CardContent className="p-8">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6 flex-grow">
                          <div className="relative">
                            <img 
                              src="https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=100&h=100&q=80"
                              alt="Monument"
                              className="w-16 h-16 rounded-full object-cover border-3 border-swap-blue shadow-lg group-hover:scale-110 transition-transform duration-300"
                            />
                            <div className="absolute -bottom-1 -right-1 bg-green-500 w-5 h-5 rounded-full border-2 border-white"></div>
                          </div>
                          <div className="flex-grow">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="text-xl font-bold text-gray-800 group-hover:text-swap-blue transition-colors">
                                {room.city}, {room.country}
                              </h4>
                              <Badge className="bg-green-100 text-green-800 border-green-300 px-3 py-1">
                                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                                Live
                              </Badge>
                            </div>
                            <p className="text-gray-600 mb-3 text-lg">{room.description}</p>
                            <div className="flex items-center gap-6 text-sm text-gray-500">
                              <span className="flex items-center gap-2">
                                <MessageCircle className="h-4 w-4 text-swap-blue" />
                                Real-time messaging
                              </span>
                              <span>•</span>
                              <span className="flex items-center gap-2">
                                <Users className="h-4 w-4 text-swap-blue" />
                                Exchange students only
                              </span>
                            </div>
                          </div>
                        </div>
                        <Button 
                          size="lg"
                          className="bg-swap-blue hover:bg-swap-darkBlue text-white px-8 py-3 text-lg font-semibold"
                          onClick={() => handleJoinChat(room)}
                          disabled={!currentUser}
                        >
                          {currentUser ? 'Join Chat' : 'Login to Join'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConnectForums;
