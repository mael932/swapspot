
import React from "react";
import Map from "@/components/Map";

interface AuPairLocationMapProps {
  location: string;
}

const AuPairLocationMap = ({ location }: AuPairLocationMapProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="font-semibold text-lg mb-4">Location</h3>
      <div className="rounded-lg h-48">
        <Map city={location} />
      </div>
      <p className="mt-3 text-sm text-gray-600">
        Note: Only an approximate location is shown for privacy reasons
      </p>
    </div>
  );
};

export default AuPairLocationMap;
