
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
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
          <MessageCircle className="h-8 w-8 text-swap-blue" />
          Connect with Fellow Students
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Join city-based group chats to connect with other exchange students in real-time. 
          Chat freely with verified students heading to your destination!
        </p>
        {!currentUser && (
          <p className="text-orange-600 mt-2 font-medium">Please log in to join the chats</p>
        )}
      </div>

      <Tabs defaultValue="chats" className="space-y-6">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-1">
          <TabsTrigger value="chats">City Chats</TabsTrigger>
        </TabsList>

        {/* Chats Tab */}
        <TabsContent value="chats" className="space-y-6">
          {/* Search */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search cities..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-swap-blue"></div>
            </div>
          ) : (
            <>
              {/* Featured Chat Rooms */}
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Globe className="h-5 w-5 text-swap-blue" />
                  Available Chat Rooms
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredRooms.slice(0, 6).map((room) => (
                    <Card key={room.id} className="hover:shadow-lg transition-shadow border-l-4 border-l-swap-blue">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-swap-blue" />
                              {room.city}, {room.country}
                            </CardTitle>
                            <p className="text-sm text-gray-600 mt-1">{room.description}</p>
                          </div>
                          <Badge variant="secondary" className="bg-green-50 text-green-700">Active</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1">
                              <MessageCircle className="h-3 w-3" />
                              Live Chat
                            </span>
                          </div>
                        </div>
                        <Button 
                          className="w-full" 
                          onClick={() => handleJoinChat(room)}
                          disabled={!currentUser}
                        >
                          {currentUser ? 'Join Chat' : 'Login to Join'}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* All Chat Rooms */}
              {filteredRooms.length > 6 && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">All Chat Rooms</h3>
                  <div className="space-y-4">
                    {filteredRooms.slice(6).map((room) => (
                      <Card key={room.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 flex-grow">
                              <div className="bg-swap-lightBlue p-3 rounded-lg">
                                <MapPin className="h-5 w-5 text-swap-blue" />
                              </div>
                              <div className="flex-grow">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="font-semibold">{room.city}, {room.country}</h4>
                                  <Badge variant="outline" className="text-xs bg-green-50 text-green-700">Live</Badge>
                                </div>
                                <p className="text-sm text-gray-600 mb-2">{room.description}</p>
                                <div className="flex items-center gap-4 text-xs text-gray-500">
                                  <span>Real-time messaging</span>
                                  <span>•</span>
                                  <span>Exchange students only</span>
                                </div>
                              </div>
                            </div>
                            <Button 
                              variant="outline" 
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
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConnectForums;
