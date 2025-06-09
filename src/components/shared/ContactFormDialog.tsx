
import React from "react";
import MessagingDialog from "../MessagingDialog";

interface ContactFormDialogProps {
  recipientName: string;
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
  buttonColor?: string;
  placeholder?: string;
  successMessage?: string;
}

const ContactFormDialog = ({
  recipientName,
  listingTitle = "this opportunity",
  listingLocation = "the location",
  listingDates,
  userDates,
  buttonVariant = "default", 
  buttonColor = "",
}: ContactFormDialogProps) => {
  return (
    <MessagingDialog
      recipientName={recipientName}
      listingTitle={listingTitle}
      listingLocation={listingLocation}
      listingDates={listingDates}
      userDates={userDates}
      buttonVariant={buttonVariant}
      className={buttonColor}
    />
  );
};

export default ContactFormDialog;
