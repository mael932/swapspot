
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Phone, 
  MessageCircle, 
  FileText, 
  AlertTriangle, 
  CheckCircle,
  ExternalLink,
  Users,
  Clock
} from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";

interface InsuranceSupportProps {
  className?: string;
}

export default function InsuranceSupport({ className }: InsuranceSupportProps) {
  const supportOptions = [
    {
      title: "24/7 Emergency Support",
      description: "Get immediate help for urgent issues during your swap",
      icon: <Phone className="h-5 w-5" />,
      badge: "Available Now",
      badgeVariant: "default" as const,
      action: "Call Support",
      details: [
        "Locked out of accommodation",
        "Emergency maintenance issues", 
        "Safety concerns",
        "Medical emergencies"
      ]
    },
    {
      title: "Dispute Resolution",
      description: "Professional mediation for swap-related conflicts",
      icon: <Users className="h-5 w-5" />,
      badge: "Free Service",
      badgeVariant: "secondary" as const,
      action: "Start Resolution",
      details: [
        "Property damage disputes",
        "Cleaning disagreements",
        "Communication issues",
        "Agreement violations"
      ]
    },
    {
      title: "Insurance Partners",
      description: "Optional coverage for damages and cancellations",
      icon: <Shield className="h-5 w-5" />,
      badge: "Partner Rates",
      badgeVariant: "outline" as const,
      action: "View Options",
      details: [
        "Property damage protection",
        "Trip cancellation coverage",
        "Personal belongings insurance",
        "Liability protection"
      ]
    }
  ];

  const disputeSteps = [
    {
      step: 1,
      title: "Direct Communication",
      description: "Try to resolve the issue directly with the other party first",
      icon: <MessageCircle className="h-4 w-4" />,
      timeframe: "24-48 hours"
    },
    {
      step: 2, 
      title: "Document the Issue",
      description: "Take photos, save messages, and gather evidence",
      icon: <FileText className="h-4 w-4" />,
      timeframe: "As needed"
    },
    {
      step: 3,
      title: "Contact SwapSpot Support",
      description: "Submit a dispute report with your documentation",
      icon: <AlertTriangle className="h-4 w-4" />,
      timeframe: "Within 72 hours"
    },
    {
      step: 4,
      title: "Professional Mediation",
      description: "Our trained mediators will help find a fair solution",
      icon: <CheckCircle className="h-4 w-4" />,
      timeframe: "5-7 business days"
    }
  ];

  return (
    <div className={className}>
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Safety & Support</h2>
          <p className="text-gray-600">We're here to help ensure your swap goes smoothly</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {supportOptions.map((option, index) => (
            <Card key={index} className="relative">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {option.icon}
                    <Badge variant={option.badgeVariant}>{option.badge}</Badge>
                  </div>
                </div>
                <CardTitle className="text-lg">{option.title}</CardTitle>
                <CardDescription>{option.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="text-sm space-y-1">
                  {option.details.map((detail, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-600 flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full">
                  {option.action}
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Dispute Resolution Process
            </CardTitle>
            <CardDescription>
              If issues arise during your swap, follow these steps for the best outcome
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {disputeSteps.map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      {step.icon}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium">Step {step.step}: {step.title}</h3>
                      <Badge variant="outline" className="text-xs">
                        <Clock className="h-3 w-3 mr-1" />
                        {step.timeframe}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-green-800">Prevention is the best protection</h3>
              <p className="text-sm text-green-700 mt-1">
                Most issues can be avoided by creating a detailed swap agreement, communicating clearly about expectations, and taking photos before and after your stay.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
