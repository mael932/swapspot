
import React from "react";

interface AuPairAccommodationInfoProps {
  title: string;
  benefits: string;
  description: string;
}

const AuPairAccommodationInfo = ({ title, benefits, description }: AuPairAccommodationInfoProps) => {
  return (
    <div className="bg-purple-50 rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">ACCOMMODATION OFFERED</h2>
      <div className="mb-3">
        <p className="font-medium text-lg mb-2">{title}</p>
        <p className="text-gray-700 mb-4">{benefits}</p>
        <p className="text-gray-700">{description}</p>
      </div>
    </div>
  );
};

export default AuPairAccommodationInfo;
