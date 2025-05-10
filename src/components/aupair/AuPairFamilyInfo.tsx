
import React from "react";
import { Badge } from "@/components/ui/badge";

interface AuPairFamilyInfoProps {
  familyDescription: string;
  tags: string[];
}

const AuPairFamilyInfo = ({ familyDescription, tags }: AuPairFamilyInfoProps) => {
  return (
    <>
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">About the Family</h2>
        <p className="text-gray-700">{familyDescription}</p>
      </div>
      
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-3">Features</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag: string, index: number) => (
            <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-800 py-1.5 px-3 text-sm">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </>
  );
};

export default AuPairFamilyInfo;
