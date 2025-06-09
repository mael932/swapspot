
import React from "react";
import { Crown } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PremiumBadgeProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

export default function PremiumBadge({ size = "md", showText = true, className }: PremiumBadgeProps) {
  const iconSize = {
    sm: "h-3 w-3",
    md: "h-4 w-4", 
    lg: "h-5 w-5"
  }[size];

  return (
    <Badge variant="secondary" className={`bg-yellow-100 text-yellow-800 border-yellow-300 ${className}`}>
      <Crown className={`${iconSize} ${showText ? 'mr-1' : ''}`} />
      {showText && "Premium"}
    </Badge>
  );
}
