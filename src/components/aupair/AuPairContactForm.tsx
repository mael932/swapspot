
import React from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Heart } from "lucide-react";
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

interface AuPairContactFormProps {
  userName: string;
}

const AuPairContactForm = ({ userName }: AuPairContactFormProps) => {
  const [showHeart, setShowHeart] = React.useState(false);
  const [isFavorited, setIsFavorited] = React.useState(false);
  const { toast } = useToast();

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent",
      description: `Your message has been sent to ${userName}. They will get back to you soon.`,
    });
  };

  const handleFavoriteClick = () => {
    if (!isFavorited) {
      setShowHeart(true);
      setTimeout(() => {
        setShowHeart(false);
      }, 1000);
      setIsFavorited(true);
      toast({
        title: "Added to Favorites",
        description: "This au pair opportunity has been added to your favorites.",
      });
    } else {
      setIsFavorited(false);
      toast({
        title: "Removed from Favorites",
        description: "This au pair opportunity has been removed from your favorites.",
      });
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
      <h3 className="font-semibold text-lg mb-4">Interested in this opportunity?</h3>
      <p className="text-gray-600 mb-6">
        Contact {userName} to discuss the details of this au pair arrangement
      </p>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full bg-purple-600 hover:bg-purple-700 mb-3">
            <MessageCircle className="h-4 w-4 mr-2" />
            Send a Message
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Message {userName}</DialogTitle>
            <DialogDescription>
              Send a message about this au pair opportunity. We'll share your contact information so they can respond directly.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleContactSubmit} className="space-y-4 py-4">
            <div className="grid w-full items-center gap-1.5">
              <label htmlFor="aupair-name" className="text-sm font-medium">Your Name</label>
              <input 
                id="aupair-name" 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                required
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <label htmlFor="aupair-email" className="text-sm font-medium">Your Email</label>
              <input 
                id="aupair-email" 
                type="email" 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                required
              />
            </div>
            <div className="grid w-full gap-1.5">
              <label htmlFor="aupair-message" className="text-sm font-medium">Message</label>
              <textarea 
                id="aupair-message" 
                rows={4} 
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                placeholder="I'm interested in your au pair opportunity. I would like to discuss..."
                required
              ></textarea>
            </div>
            <DialogFooter>
              <Button type="submit">Send Message</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <div className="relative">
        <Button 
          variant="outline" 
          className={`w-full ${isFavorited ? 'bg-purple-50 text-purple-600 border-purple-200' : ''}`}
          onClick={handleFavoriteClick}
        >
          {isFavorited ? 'Saved to Favorites' : 'Save to Favorites'}
        </Button>
        {showHeart && (
          <Heart 
            className="absolute left-1/2 transform -translate-x-1/2 text-red-500 animate-[fade-in_0.3s_ease-out,float_3s_ease-in-out_infinite] opacity-0"
            fill="red"
            size={20}
          />
        )}
      </div>
    </div>
  );
};

export default AuPairContactForm;
