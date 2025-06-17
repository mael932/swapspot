
import React from "react";
import ContactFormDialog from "@/components/shared/ContactFormDialog";
import FavoriteButton from "@/components/shared/FavoriteButton";

interface AuPairContactFormProps {
  userName: string;
}

const AuPairContactForm = ({ userName }: AuPairContactFormProps) => {
  const mockContactInfo = {
    instagram: "au_pair_marie",
    whatsapp: "+33 6 12 34 56 78",
    snapchat: "marie_aupair",
    email: "marie@university-paris.fr"
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
      <h3 className="font-semibold text-lg mb-4">Interested in this opportunity?</h3>
      <p className="text-gray-600 mb-6">
        Get {userName}'s contact information to discuss this au pair arrangement directly
      </p>
      <ContactFormDialog 
        recipientName={userName}
        listingTitle="au pair opportunity"
        listingLocation="Paris"
        contactInfo={mockContactInfo}
        buttonColor="bg-purple-600 hover:bg-purple-700 mb-3"
      />
      <FavoriteButton itemName="au pair opportunity" />
    </div>
  );
};

export default AuPairContactForm;
