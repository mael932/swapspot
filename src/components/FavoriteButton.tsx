
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FavoriteButtonProps {
  listingId: string;
  variant?: "default" | "outline" | "destructive" | "secondary" | "ghost" | "link";
  className?: string;
}

const FavoriteButton = ({ 
  listingId, 
  variant = "outline",
  className = ""
}: FavoriteButtonProps) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const { toast } = useToast();

  const handleFavoriteClick = () => {
    if (!isFavorited) {
      setIsFavorited(true);
      toast({
        title: "Added to Favorites",
        description: "This listing has been added to your favorites.",
      });
    } else {
      setIsFavorited(false);
      toast({
        title: "Removed from Favorites", 
        description: "This listing has been removed from your favorites.",
      });
    }
  };

  return (
    <Button 
      variant={variant} 
      className={`${isFavorited ? 'bg-opacity-50 text-red-600 border-red-200' : ''} ${className}`}
      onClick={handleFavoriteClick}
    >
      {isFavorited ? (
        <>
          <Heart className="h-4 w-4 mr-2 text-red-500 fill-red-500" />
          Saved to Favorites
        </>
      ) : (
        <>
          <Heart className="h-4 w-4 mr-2" />
          Save to Favorites
        </>
      )}
    </Button>
  );
};

export default FavoriteButton;
