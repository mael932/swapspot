
import React from "react";
import ContactFormDialog from "@/components/shared/ContactFormDialog";
import FavoriteButton from "@/components/shared/FavoriteButton";

interface AuPairContactFormProps {
  userName: string;
}

const AuPairContactForm = ({ userName }: AuPairContactFormProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
      <h3 className="font-semibold text-lg mb-4">Interested in this opportunity?</h3>
      <p className="text-gray-600 mb-6">
        Contact {userName} to discuss the details of this au pair arrangement
      </p>
      <ContactFormDialog 
        recipientName={userName}
        buttonColor="bg-purple-600 hover:bg-purple-700 mb-3"
        placeholder="I'm interested in your au pair opportunity. I would like to discuss..."
      />
      <FavoriteButton itemName="au pair opportunity" />
    </div>
  );
};

export default AuPairContactForm;
