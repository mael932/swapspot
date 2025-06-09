
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Calendar, MapPin, Clock } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

interface MessagingDialogProps {
  recipientName: string;
  listingTitle: string;
  listingLocation: string;
  listingDates?: {
    startDate: string;
    endDate: string;
  };
  userDates?: {
    startDate: string;
    endDate: string;
  };
  buttonVariant?: "default" | "outline" | "destructive" | "secondary" | "ghost" | "link";
  buttonText?: string;
  className?: string;
}

export default function MessagingDialog({
  recipientName,
  listingTitle,
  listingLocation,
  listingDates,
  userDates,
  buttonVariant = "default",
  buttonText = "Send Message",
  className
}: MessagingDialogProps) {
  const { toast } = useToast();
  const [message, setMessage] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");

  const messageTemplates = [
    {
      id: "interested",
      label: "General Interest",
      icon: <MessageCircle className="h-4 w-4" />,
      template: `Hi ${recipientName}! I'm interested in your ${listingTitle} listing in ${listingLocation}. I'd love to learn more about the space and discuss a potential swap.`
    },
    {
      id: "dates",
      label: "Date-Specific Interest", 
      icon: <Calendar className="h-4 w-4" />,
      template: userDates ? 
        `Hi ${recipientName}! I'll be studying abroad from ${new Date(userDates.startDate).toLocaleDateString()} to ${new Date(userDates.endDate).toLocaleDateString()} and would love to swap with your ${listingTitle} in ${listingLocation}. Let me know if these dates work for you!` :
        `Hi ${recipientName}! I'm planning to study abroad and would love to swap with your ${listingTitle} in ${listingLocation}. Let me know what dates work best for you!`
    },
    {
      id: "questions",
      label: "Ask Questions",
      icon: <Clock className="h-4 w-4" />,
      template: `Hi ${recipientName}! Your ${listingTitle} looks perfect for my study abroad plans. I have a few questions about the space and would love to chat. When would be a good time to connect?`
    },
    {
      id: "offer",
      label: "Make an Offer",
      icon: <MapPin className="h-4 w-4" />,
      template: `Hi ${recipientName}! I have a place to offer in exchange for your ${listingTitle}. I think it could be a great match! Let me share some details about my location and we can discuss further.`
    }
  ];

  const handleTemplateSelect = (template: string) => {
    setMessage(template);
    setSelectedTemplate(template);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      toast({
        title: "Message Required",
        description: "Please enter a message before sending.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Message Sent!",
      description: `Your message has been sent to ${recipientName}. They will receive it in their inbox and can respond directly.`
    });
    
    setMessage("");
    setSelectedTemplate("");
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
          <DialogTitle>Message {recipientName}</DialogTitle>
          <DialogDescription>
            Send a message about "{listingTitle}" in {listingLocation}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Quick Templates */}
          <div>
            <label className="text-sm font-medium mb-3 block">Quick Message Templates</label>
            <div className="grid grid-cols-2 gap-2">
              {messageTemplates.map((template) => (
                <Button
                  key={template.id}
                  variant="outline"
                  size="sm"
                  onClick={() => handleTemplateSelect(template.template)}
                  className="h-auto p-3 flex flex-col items-start gap-1"
                >
                  <div className="flex items-center gap-2">
                    {template.icon}
                    <span className="text-xs font-medium">{template.label}</span>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          {/* Date compatibility info */}
          {listingDates && userDates && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">Date Compatibility</span>
              </div>
              <div className="space-y-1 text-xs">
                <div>
                  <span className="text-gray-600">Your dates: </span>
                  <span className="font-medium">
                    {new Date(userDates.startDate).toLocaleDateString()} - {new Date(userDates.endDate).toLocaleDateString()}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Their dates: </span>
                  <span className="font-medium">
                    {new Date(listingDates.startDate).toLocaleDateString()} - {new Date(listingDates.endDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Message form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="message" className="text-sm font-medium mb-2 block">
                Your Message
              </label>
              <Textarea
                id="message"
                placeholder="Type your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
                className="w-full"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Your contact information will be shared so they can respond directly.
              </p>
            </div>

            <DialogFooter>
              <Button type="submit" className="w-full">
                <MessageCircle className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
