
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import "@/styles/animations.css";

interface FavoriteButtonProps {
  itemName: string;
  variant?: "default" | "outline" | "destructive" | "secondary" | "ghost" | "link";
  colorClass?: string;
}

const FavoriteButton = ({ 
  itemName, 
  variant = "outline",
  colorClass = ""
}: FavoriteButtonProps) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [hearts, setHearts] = useState<{id: number, left: string}[]>([]);
  const { toast } = useToast();

  const handleFavoriteClick = () => {
    if (!isFavorited) {
      // Add multiple hearts with slightly different positions for a more dynamic effect
      const newHearts = Array(5).fill(0).map((_, index) => ({
        id: Date.now() + index,
        left: `${48 + (Math.random() * 6 - 3)}%`
      }));
      setHearts([...hearts, ...newHearts]);
      
      // Remove hearts after animation completes
      setTimeout(() => {
        setHearts(prev => prev.filter(heart => !newHearts.some(h => h.id === heart.id)));
      }, 1000);
      
      setIsFavorited(true);
      toast({
        title: "Added to Favorites",
        description: `This ${itemName} has been added to your favorites.`,
      });
    } else {
      setIsFavorited(false);
      toast({
        title: "Removed from Favorites",
        description: `This ${itemName} has been removed from your favorites.`,
      });
    }
  };

  return (
    <div className="relative">
      <Button 
        variant={variant} 
        className={`w-full relative ${isFavorited ? 'bg-opacity-50 text-red-600 border-red-200' : ''} ${colorClass}`}
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
      
      {hearts.map((heart) => (
        <Heart 
          key={heart.id}
          className="animate-float-up absolute bottom-full transform -translate-x-1/2 text-red-500 fill-red-500"
          style={{
            left: heart.left,
            opacity: 1,
          }}
          size={20}
        />
      ))}
    </div>
  );
};

export default FavoriteButton;
