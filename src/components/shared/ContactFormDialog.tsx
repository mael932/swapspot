
import React from "react";
import MessagingDialog from "../MessagingDialog";

interface ContactFormDialogProps {
  recipientName: string;
  listingTitle?: string;
  listingLocation?: string;
  contactInfo?: {
    instagram?: string;
    whatsapp?: string;
    snapchat?: string;
    email?: string;
  };
  buttonVariant?: "default" | "outline" | "destructive" | "secondary" | "ghost" | "link";
  buttonColor?: string;
  placeholder?: string;
  successMessage?: string;
}

const ContactFormDialog = ({
  recipientName,
  listingTitle = "this opportunity",
  listingLocation = "the location",
  contactInfo = {
    instagram: "student_exchange_eu",
    whatsapp: "+31 6 12345678",
    snapchat: "exchange_student",
    email: "student@university.edu"
  },
  buttonVariant = "default", 
  buttonColor = "",
}: ContactFormDialogProps) => {
  return (
    <MessagingDialog
      recipientName={recipientName}
      listingTitle={listingTitle}
      listingLocation={listingLocation}
      contactInfo={contactInfo}
      buttonVariant={buttonVariant}
      className={buttonColor}
    />
  );
};

export default ContactFormDialog;
