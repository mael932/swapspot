
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, GraduationCap, MapPin, Globe, Heart, Music, Camera, BookOpen } from "lucide-react";

interface StudentProfileProps {
  student: {
    id: string;
    name: string;
    avatar: string;
    university: string;
    studyProgram: string;
    yearOfStudy: string;
    currentLocation: string;
    languages: string[];
    interests: string[];
    about: string;
    isVerified: boolean;
    verificationMethod?: string;
    backgroundCheckVerified?: boolean;
  };
  className?: string;
}

export default function StudentProfile({ student, className }: StudentProfileProps) {
  const getInterestIcon = (interest: string) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      "Photography": <Camera className="h-3 w-3" />,
      "Music": <Music className="h-3 w-3" />,
      "Reading": <BookOpen className="h-3 w-3" />,
      "Travel": <Globe className="h-3 w-3" />,
      "Sports": <Heart className="h-3 w-3" />,
    };
    return iconMap[interest] || <Heart className="h-3 w-3" />;
  };

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-start gap-4">
          <img 
            src={student.avatar} 
            alt={student.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-swap-blue"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <CardTitle className="text-xl">{student.name}</CardTitle>
              <div className="flex gap-1">
                {student.isVerified && (
                  <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1">
                    <Shield className="h-3 w-3" />
                    Student Verified
                  </Badge>
                )}
                {student.backgroundCheckVerified && (
                  <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200 flex items-center gap-1">
                    <Shield className="h-3 w-3" />
                    Background Check
                  </Badge>
                )}
              </div>
            </div>
            
            <div className="space-y-1 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <GraduationCap className="h-4 w-4 text-swap-blue" />
                <span>{student.studyProgram} • {student.yearOfStudy}</span>
              </div>
              <div className="flex items-center gap-1">
                <GraduationCap className="h-4 w-4 text-swap-blue" />
                <span>{student.university}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4 text-swap-blue" />
                <span>{student.currentLocation}</span>
              </div>
            </div>

            {student.verificationMethod && (
              <p className="text-xs text-green-600 mt-1">
                Verified via {student.verificationMethod}
              </p>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Languages */}
        <div>
          <h4 className="font-medium text-sm mb-2 flex items-center gap-1">
            <Globe className="h-4 w-4 text-swap-blue" />
            Languages
          </h4>
          <div className="flex flex-wrap gap-1">
            {student.languages.map((language, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {language}
              </Badge>
            ))}
          </div>
        </div>

        {/* Interests */}
        <div>
          <h4 className="font-medium text-sm mb-2">Interests</h4>
          <div className="flex flex-wrap gap-1">
            {student.interests.map((interest, index) => (
              <Badge key={index} variant="secondary" className="bg-swap-lightBlue text-swap-darkBlue text-xs flex items-center gap-1">
                {getInterestIcon(interest)}
                {interest}
              </Badge>
            ))}
          </div>
        </div>

        {/* About */}
        <div>
          <h4 className="font-medium text-sm mb-2">About</h4>
          <p className="text-sm text-gray-700 leading-relaxed">{student.about}</p>
        </div>
      </CardContent>
    </Card>
  );
}
