
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText, Download, Shield } from "lucide-react";
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
import { Separator } from "@/components/ui/separator";

interface SwapAgreementDialogProps {
  recipientName?: string;
  listingTitle?: string;
  listingLocation?: string;
  listingDates?: {
    startDate: string;
    endDate: string;
  };
  userDates?: {
    startDate: string;
    endDate: string;
  };
  buttonVariant?: "default" | "outline" | "destructive" | "secondary" | "ghost" | "link";
  className?: string;
}

export default function SwapAgreementDialog({
  recipientName = "",
  listingTitle = "",
  listingLocation = "",
  listingDates,
  userDates,
  buttonVariant = "default",
  className
}: SwapAgreementDialogProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    party1Name: "",
    party1Email: "",
    party1Phone: "",
    party1Address: "",
    party2Name: recipientName,
    party2Email: "",
    party2Phone: "",
    party2Address: listingLocation,
    swapStartDate: userDates?.startDate || "",
    swapEndDate: userDates?.endDate || "",
    deposit: "",
    emergencyContact1: "",
    emergencyContact2: "",
    additionalTerms: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateAgreement = () => {
    const agreementText = `
STUDENT SWAP AGREEMENT

This Student Swap Agreement ("Agreement") is entered into on ${new Date().toLocaleDateString()} between:

PARTY 1: ${formData.party1Name}
Email: ${formData.party1Email}
Phone: ${formData.party1Phone}
Current Address: ${formData.party1Address}

PARTY 2: ${formData.party2Name}
Email: ${formData.party2Email}
Phone: ${formData.party2Phone}
Current Address: ${formData.party2Address}

SWAP DETAILS:
Property 1: ${formData.party1Address}
Property 2: ${formData.party2Address}
Swap Period: ${new Date(formData.swapStartDate).toLocaleDateString()} to ${new Date(formData.swapEndDate).toLocaleDateString()}
Security Deposit: $${formData.deposit} (if applicable)

TERMS AND CONDITIONS:

1. PROPERTY CONDITION
Both parties agree to maintain the exchanged property in the same condition as received, normal wear and tear excepted.

2. UTILITIES AND EXPENSES
Each party is responsible for utilities and ongoing expenses during their stay unless otherwise agreed.

3. SECURITY DEPOSIT
${formData.deposit ? `A security deposit of $${formData.deposit} will be held and returned within 14 days after the swap period ends, provided no damage has occurred.` : 'No security deposit has been agreed upon.'}

4. CANCELLATION
Either party may cancel this agreement with at least 30 days written notice. Emergency cancellations will be handled on a case-by-case basis.

5. EMERGENCY CONTACTS
Party 1 Emergency Contact: ${formData.emergencyContact1}
Party 2 Emergency Contact: ${formData.emergencyContact2}

6. LIABILITY
Each party assumes responsibility for their own belongings and actions during the swap period.

7. DISPUTE RESOLUTION
Any disputes will first be addressed through direct communication. If unresolved, parties agree to use SwapSpot's dispute resolution resources.

8. ADDITIONAL TERMS
${formData.additionalTerms || 'None specified.'}

By signing below, both parties agree to the terms outlined in this agreement.

Party 1 Signature: _________________________ Date: _________
${formData.party1Name}

Party 2 Signature: _________________________ Date: _________
${formData.party2Name}

Generated via SwapSpot on ${new Date().toLocaleString()}
`;

    // Create and download the agreement
    const blob = new Blob([agreementText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `student-swap-agreement-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Agreement Generated!",
      description: "Your Student Swap Agreement has been downloaded. Please review and sign with both parties."
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={buttonVariant} className={className}>
          <FileText className="h-4 w-4 mr-2" />
          Generate Swap Agreement
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-600" />
            Student Swap Agreement Generator
          </DialogTitle>
          <DialogDescription>
            Create a legal template for your student accommodation swap. Fill in the details below to generate a downloadable agreement.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-medium text-blue-800 mb-2">Why use an agreement?</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Protects both parties legally</li>
              <li>• Clarifies expectations and responsibilities</li>
              <li>• Provides dispute resolution framework</li>
              <li>• Documents important contact information</li>
            </ul>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-3">Your Information (Party 1)</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="party1Name">Full Name *</Label>
                  <Input
                    id="party1Name"
                    value={formData.party1Name}
                    onChange={(e) => handleInputChange('party1Name', e.target.value)}
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="party1Email">Email *</Label>
                  <Input
                    id="party1Email"
                    type="email"
                    value={formData.party1Email}
                    onChange={(e) => handleInputChange('party1Email', e.target.value)}
                    placeholder="your.email@university.edu"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="party1Phone">Phone Number</Label>
                  <Input
                    id="party1Phone"
                    value={formData.party1Phone}
                    onChange={(e) => handleInputChange('party1Phone', e.target.value)}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div>
                  <Label htmlFor="party1Address">Your Current Address *</Label>
                  <Input
                    id="party1Address"
                    value={formData.party1Address}
                    onChange={(e) => handleInputChange('party1Address', e.target.value)}
                    placeholder="123 University St, City, State"
                    required
                  />
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-medium mb-3">Other Party Information (Party 2)</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="party2Name">Full Name *</Label>
                  <Input
                    id="party2Name"
                    value={formData.party2Name}
                    onChange={(e) => handleInputChange('party2Name', e.target.value)}
                    placeholder="Other party's full name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="party2Email">Email *</Label>
                  <Input
                    id="party2Email"
                    type="email"
                    value={formData.party2Email}
                    onChange={(e) => handleInputChange('party2Email', e.target.value)}
                    placeholder="their.email@university.edu"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="party2Phone">Phone Number</Label>
                  <Input
                    id="party2Phone"
                    value={formData.party2Phone}
                    onChange={(e) => handleInputChange('party2Phone', e.target.value)}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div>
                  <Label htmlFor="party2Address">Their Current Address *</Label>
                  <Input
                    id="party2Address"
                    value={formData.party2Address}
                    onChange={(e) => handleInputChange('party2Address', e.target.value)}
                    placeholder="456 College Ave, City, State"
                    required
                  />
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-medium mb-3">Swap Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="swapStartDate">Start Date *</Label>
                  <Input
                    id="swapStartDate"
                    type="date"
                    value={formData.swapStartDate}
                    onChange={(e) => handleInputChange('swapStartDate', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="swapEndDate">End Date *</Label>
                  <Input
                    id="swapEndDate"
                    type="date"
                    value={formData.swapEndDate}
                    onChange={(e) => handleInputChange('swapEndDate', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="deposit">Security Deposit (Optional)</Label>
                  <Input
                    id="deposit"
                    type="number"
                    value={formData.deposit}
                    onChange={(e) => handleInputChange('deposit', e.target.value)}
                    placeholder="500"
                  />
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-medium mb-3">Emergency Contacts</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="emergencyContact1">Your Emergency Contact</Label>
                  <Input
                    id="emergencyContact1"
                    value={formData.emergencyContact1}
                    onChange={(e) => handleInputChange('emergencyContact1', e.target.value)}
                    placeholder="Parent/Guardian Name & Phone"
                  />
                </div>
                <div>
                  <Label htmlFor="emergencyContact2">Their Emergency Contact</Label>
                  <Input
                    id="emergencyContact2"
                    value={formData.emergencyContact2}
                    onChange={(e) => handleInputChange('emergencyContact2', e.target.value)}
                    placeholder="Parent/Guardian Name & Phone"
                  />
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="additionalTerms">Additional Terms (Optional)</Label>
              <Input
                id="additionalTerms"
                value={formData.additionalTerms}
                onChange={(e) => handleInputChange('additionalTerms', e.target.value)}
                placeholder="Any specific agreements or house rules..."
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={generateAgreement} className="w-full">
            <Download className="h-4 w-4 mr-2" />
            Generate & Download Agreement
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
