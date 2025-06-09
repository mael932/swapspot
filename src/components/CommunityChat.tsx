
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  MessageSquare, 
  Send, 
  ThumbsUp, 
  MoreVertical,
  Flag,
  Reply
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Message {
  id: string;
  author: {
    name: string;
    avatar?: string;
    university: string;
    verified: boolean;
  };
  content: string;
  timestamp: string;
  likes: number;
  replies: number;
  isReply?: boolean;
  parentId?: string;
}

const CommunityChat: React.FC = () => {
  const [newMessage, setNewMessage] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");

  const sampleMessages: Message[] = [
    {
      id: "1",
      author: {
        name: "Sarah M.",
        university: "University of Amsterdam",
        verified: true
      },
      content: "Just completed my first swap in Barcelona! The experience was amazing. My advice: communicate early and often with your swap partner about house rules and expectations.",
      timestamp: "2 hours ago",
      likes: 12,
      replies: 3
    },
    {
      id: "2",
      author: {
        name: "Miguel R.",
        university: "Universidad Complutense Madrid",
        verified: true
      },
      content: "Looking for tips on handling cultural differences. My swap partner and I have very different cleaning standards. How do you navigate this diplomatically?",
      timestamp: "4 hours ago",
      likes: 8,
      replies: 7
    },
    {
      id: "3",
      author: {
        name: "Emma L.",
        university: "King's College London",
        verified: false
      },
      content: "PSA: Always take photos before and after your stay! Saved me from a potential dispute about a stain that was already there.",
      timestamp: "6 hours ago",
      likes: 15,
      replies: 2
    }
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  const handleSendReply = (messageId: string) => {
    if (replyContent.trim()) {
      console.log("Sending reply to:", messageId, replyContent);
      setReplyContent("");
      setReplyingTo(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* New Message */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Share Your Experience
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Ask a question, share a tip, or tell us about your swap experience..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="min-h-[100px]"
          />
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Be respectful and helpful to fellow students
            </p>
            <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
              <Send className="h-4 w-4 mr-2" />
              Post Message
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Messages */}
      <div className="space-y-4">
        {sampleMessages.map((message) => (
          <Card key={message.id}>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarImage src={message.author.avatar} />
                  <AvatarFallback>
                    {message.author.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold">{message.author.name}</h4>
                    {message.author.verified && (
                      <Badge variant="secondary" className="text-xs">
                        Verified Student
                      </Badge>
                    )}
                    <span className="text-sm text-gray-500">
                      {message.author.university}
                    </span>
                    <span className="text-sm text-gray-400">•</span>
                    <span className="text-sm text-gray-400">{message.timestamp}</span>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{message.content}</p>
                  
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" className="text-gray-600">
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      {message.likes}
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-gray-600"
                      onClick={() => setReplyingTo(message.id)}
                    >
                      <Reply className="h-4 w-4 mr-1" />
                      Reply ({message.replies})
                    </Button>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>
                          <Flag className="h-4 w-4 mr-2" />
                          Report
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  
                  {/* Reply Input */}
                  {replyingTo === message.id && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <div className="flex gap-3">
                        <Textarea
                          placeholder="Write your reply..."
                          value={replyContent}
                          onChange={(e) => setReplyContent(e.target.value)}
                          className="flex-grow"
                          rows={2}
                        />
                        <div className="flex flex-col gap-2">
                          <Button 
                            size="sm" 
                            onClick={() => handleSendReply(message.id)}
                            disabled={!replyContent.trim()}
                          >
                            Send
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => setReplyingTo(null)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CommunityChat;
