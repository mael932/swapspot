
import React from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
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

interface ContactFormDialogProps {
  recipientName: string;
  buttonVariant?: "default" | "outline" | "destructive" | "secondary" | "ghost" | "link";
  buttonColor?: string;
  placeholder?: string;
  successMessage?: string;
}

const ContactFormDialog = ({
  recipientName,
  buttonVariant = "default", 
  buttonColor = "",
  placeholder = "I'm interested in this opportunity. I would like to discuss...",
  successMessage,
}: ContactFormDialogProps) => {
  const { toast } = useToast();

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent",
      description: successMessage || `Your message has been sent to ${recipientName}. They will get back to you soon.`,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={buttonVariant} className={`w-full ${buttonColor}`}>
          <MessageCircle className="h-4 w-4 mr-2" />
          Send a Message
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Message {recipientName}</DialogTitle>
          <DialogDescription>
            Send a message about this opportunity. We'll share your contact information so they can respond directly.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleContactSubmit} className="space-y-4 py-4">
          <div className="grid w-full items-center gap-1.5">
            <label htmlFor="contact-name" className="text-sm font-medium">Your Name</label>
            <input 
              id="contact-name" 
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
              required
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <label htmlFor="contact-email" className="text-sm font-medium">Your Email</label>
            <input 
              id="contact-email" 
              type="email" 
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
              required
            />
          </div>
          <div className="grid w-full gap-1.5">
            <label htmlFor="contact-message" className="text-sm font-medium">Message</label>
            <textarea 
              id="contact-message" 
              rows={4} 
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
              placeholder={placeholder}
              required
            ></textarea>
          </div>
          <DialogFooter>
            <Button type="submit">Send Message</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactFormDialog;
