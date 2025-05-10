
import React from "react";

interface AuPairRequirementsProps {
  hours: string;
  tasks: string;
  language: string;
  additional: string;
}

const AuPairRequirements = ({ hours, tasks, language, additional }: AuPairRequirementsProps) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-xl font-semibold mb-4">REQUIREMENTS</h2>
      <div className="mb-3">
        <p className="text-gray-700"><span className="font-medium">Hours:</span> {hours}</p>
        <p className="text-gray-700 mt-2"><span className="font-medium">Tasks:</span> {tasks}</p>
        <p className="text-gray-700 mt-2"><span className="font-medium">Language:</span> {language}</p>
        <p className="text-gray-700 mt-4">{additional}</p>
      </div>
    </div>
  );
};

export default AuPairRequirements;
