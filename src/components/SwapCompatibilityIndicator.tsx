
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CalendarCheck, AlertTriangle, CheckCircle } from "lucide-react";

interface SwapCompatibilityIndicatorProps {
  userStartDate?: Date;
  userEndDate?: Date;
  swapStartDate?: Date;
  swapEndDate?: Date;
  compatibility?: number;
  variant?: "default" | "compact";
  className?: string;
}

export default function SwapCompatibilityIndicator({
  userStartDate,
  userEndDate,
  swapStartDate,
  swapEndDate,
  compatibility,
  variant = "default",
  className
}: SwapCompatibilityIndicatorProps) {
  // If compatibility score is provided directly, use it
  if (compatibility !== undefined) {
    const getCompatibilityStatus = () => {
      if (compatibility >= 90) {
        return {
          color: "bg-green-50 text-green-700 border-green-200",
          icon: <CheckCircle className="h-3 w-3" />,
          text: "Excellent match"
        };
      } else if (compatibility >= 70) {
        return {
          color: "bg-yellow-50 text-yellow-700 border-yellow-200",
          icon: <CalendarCheck className="h-3 w-3" />,
          text: "Good match"
        };
      } else {
        return {
          color: "bg-orange-50 text-orange-700 border-orange-200",
          icon: <AlertTriangle className="h-3 w-3" />,
          text: "Partial match"
        };
      }
    };

    const status = getCompatibilityStatus();

    if (variant === "compact") {
      return (
        <div className={className}>
          <Badge variant="secondary" className={`${status.color} flex items-center gap-1`}>
            {status.icon}
            {compatibility}%
          </Badge>
        </div>
      );
    }

    return (
      <div className={className}>
        <div className="space-y-2">
          <Badge variant="secondary" className={`${status.color} flex items-center gap-1`}>
            {status.icon}
            {compatibility}% compatibility • {status.text}
          </Badge>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <Progress value={compatibility} className="flex-1 h-2" />
            <span>{compatibility}%</span>
          </div>
        </div>
      </div>
    );
  }

  // Original date-based logic
  if (!userStartDate || !userEndDate || !swapStartDate || !swapEndDate) {
    return (
      <div className={className}>
        <Badge variant="outline" className="bg-gray-50 text-gray-600">
          <CalendarCheck className="h-3 w-3 mr-1" />
          Select your dates to see compatibility
        </Badge>
      </div>
    );
  }

  // Calculate overlap
  const overlapStart = new Date(Math.max(userStartDate.getTime(), swapStartDate.getTime()));
  const overlapEnd = new Date(Math.min(userEndDate.getTime(), swapEndDate.getTime()));
  
  const hasOverlap = overlapStart <= overlapEnd;
  
  if (!hasOverlap) {
    return (
      <div className={className}>
        <Badge variant="destructive" className="flex items-center gap-1">
          <AlertTriangle className="h-3 w-3" />
          No overlap with your dates
        </Badge>
      </div>
    );
  }

  // Calculate percentage overlap
  const userStayDuration = userEndDate.getTime() - userStartDate.getTime();
  const overlapDuration = overlapEnd.getTime() - overlapStart.getTime();
  const overlapPercentage = Math.round((overlapDuration / userStayDuration) * 100);

  const getCompatibilityStatus = () => {
    if (overlapPercentage >= 90) {
      return {
        color: "bg-green-50 text-green-700 border-green-200",
        icon: <CheckCircle className="h-3 w-3" />,
        text: "Excellent match"
      };
    } else if (overlapPercentage >= 70) {
      return {
        color: "bg-yellow-50 text-yellow-700 border-yellow-200",
        icon: <CalendarCheck className="h-3 w-3" />,
        text: "Good match"
      };
    } else {
      return {
        color: "bg-orange-50 text-orange-700 border-orange-200",
        icon: <AlertTriangle className="h-3 w-3" />,
        text: "Partial match"
      };
    }
  };

  const status = getCompatibilityStatus();

  return (
    <div className={className}>
      <div className="space-y-2">
        <Badge variant="secondary" className={`${status.color} flex items-center gap-1`}>
          {status.icon}
          {overlapPercentage}% overlap • {status.text}
        </Badge>
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <Progress value={overlapPercentage} className="flex-1 h-2" />
          <span>{overlapPercentage}%</span>
        </div>
        <p className="text-xs text-gray-500">
          Your dates overlap for {Math.ceil(overlapDuration / (1000 * 60 * 60 * 24))} days
        </p>
      </div>
    </div>
  );
}
