
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { MailCheck } from "lucide-react";

interface MagicLinkSentProps {
  email: string;
}

const MagicLinkSent = ({ email }: MagicLinkSentProps) => {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-md">
      <div className="text-center space-y-6 p-6 border border-blue-100 rounded-lg bg-blue-50">
        <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-blue-100">
          <MailCheck className="h-6 w-6 text-blue-600" />
        </div>
        <h2 className="text-xl font-medium text-blue-800">Magic Link Sent!</h2>
        <p className="text-gray-600">
          We've sent a secure login link to <span className="font-medium">{email}</span>.
        </p>
        <p className="text-gray-600">
          Please check your email inbox and click the link to log in.
        </p>
        <Button variant="outline" onClick={() => navigate("/")} className="mt-4">
          Return to Home
        </Button>
      </div>
    </div>
  );
};

export default MagicLinkSent;
