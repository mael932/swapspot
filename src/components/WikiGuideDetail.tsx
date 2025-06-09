
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Clock, 
  Star, 
  CheckCircle, 
  AlertCircle, 
  Info,
  ArrowLeft,
  Share,
  Bookmark
} from "lucide-react";

interface WikiGuideDetailProps {
  guide: {
    title: string;
    category: string;
    readTime: string;
    rating: number;
    views: number;
    lastUpdated: string;
    content: Array<{
      type: 'heading' | 'paragraph' | 'checklist' | 'tip' | 'warning';
      content: string | string[];
    }>;
  };
  onBack: () => void;
}

const WikiGuideDetail: React.FC<WikiGuideDetailProps> = ({ guide, onBack }) => {
  const renderContent = (item: any, index: number) => {
    switch (item.type) {
      case 'heading':
        return (
          <h2 key={index} className="text-xl font-semibold mt-6 mb-3">
            {item.content}
          </h2>
        );
      
      case 'paragraph':
        return (
          <p key={index} className="mb-4 text-gray-700 leading-relaxed">
            {item.content}
          </p>
        );
      
      case 'checklist':
        return (
          <div key={index} className="mb-6">
            <ul className="space-y-2">
              {(item.content as string[]).map((listItem, listIndex) => (
                <li key={listIndex} className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{listItem}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      
      case 'tip':
        return (
          <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-800 mb-1">Tip</h4>
                <p className="text-blue-700 text-sm">{item.content}</p>
              </div>
            </div>
          </div>
        );
      
      case 'warning':
        return (
          <div key={index} className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-yellow-800 mb-1">Important</h4>
                <p className="text-yellow-700 text-sm">{item.content}</p>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Wiki
            </Button>
            <div className="flex items-center gap-2 ml-auto">
              <Button variant="outline" size="sm">
                <Share className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Bookmark className="h-4 w-4 mr-2" />
                Save
              </Button>
            </div>
          </div>
          
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="secondary">{guide.category}</Badge>
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              {guide.rating}
            </div>
          </div>
          
          <CardTitle className="text-2xl">{guide.title}</CardTitle>
          
          <div className="flex items-center gap-6 text-sm text-gray-600 mt-4">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {guide.readTime}
            </div>
            <div>{guide.views} views</div>
            <div>Updated {guide.lastUpdated}</div>
          </div>
        </CardHeader>
        
        <CardContent className="prose max-w-none">
          {guide.content.map((item, index) => renderContent(item, index))}
        </CardContent>
      </Card>
    </div>
  );
};

export default WikiGuideDetail;
