import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, ArrowLeft } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

interface ChatRoom {
  id: string;
  city: string;
  country: string;
  description: string;
}

interface ChatMessage {
  id: string;
  user_name: string;
  message: string;
  created_at: string;
  user_id: string;
}

interface CityChatProps {
  room: ChatRoom;
  onBack: () => void;
  currentUser: any;
}

export default function CityChat({ room, onBack, currentUser }: CityChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    loadMessages();
    setupRealtimeSubscription();
  }, [room.id]);

  const loadMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('chat_room_id', room.id)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error loading messages:', error);
      toast.error('Failed to load messages');
    } finally {
      setIsLoading(false);
    }
  };

  const setupRealtimeSubscription = () => {
    const channel = supabase
      .channel(`chat-${room.id}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `chat_room_id=eq.${room.id}`
        },
        (payload) => {
          const newMessage = payload.new as ChatMessage;
          setMessages(current => [...current, newMessage]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !currentUser || isSending) return;

    setIsSending(true);
    try {
      const { error } = await supabase
        .from('chat_messages')
        .insert({
          chat_room_id: room.id,
          user_id: currentUser.id,
          user_name: currentUser.user_metadata?.full_name || currentUser.email?.split('@')[0] || 'Anonymous',
          message: newMessage.trim()
        });

      if (error) throw error;
      setNewMessage("");
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="border-b">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <CardTitle className="text-lg">{room.city}, {room.country}</CardTitle>
            <p className="text-sm text-gray-600">{room.description}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-swap-blue"></div>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-center">
              <div>
                <p className="text-gray-500 mb-2">No messages yet</p>
                <p className="text-sm text-gray-400">Be the first to start the conversation!</p>
              </div>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.user_id === currentUser?.id ? 'flex-row-reverse' : ''
                }`}
              >
                <Avatar className="h-8 w-8 mt-1">
                  <AvatarFallback className="text-xs">
                    {message.user_name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`max-w-[70%] ${
                    message.user_id === currentUser?.id
                      ? 'bg-swap-blue text-white'
                      : 'bg-gray-100'
                  } rounded-lg p-3`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`font-medium text-sm ${
                      message.user_id === currentUser?.id ? 'text-white' : 'text-gray-900'
                    }`}>
                      {message.user_name}
                    </span>
                    <span className={`text-xs ${
                      message.user_id === currentUser?.id ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}
                    </span>
                  </div>
                  <p className={`text-sm ${
                    message.user_id === currentUser?.id ? 'text-white' : 'text-gray-800'
                  }`}>
                    {message.message}
                  </p>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="border-t p-4">
          <div className="flex gap-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              disabled={isSending}
              className="flex-1"
            />
            <Button 
              onClick={sendMessage} 
              disabled={!newMessage.trim() || isSending}
              size="sm"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}