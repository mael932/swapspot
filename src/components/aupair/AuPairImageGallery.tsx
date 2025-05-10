
import React from "react";

interface AuPairImageGalleryProps {
  image: string;
  title: string;
}

const AuPairImageGallery = ({ image, title }: AuPairImageGalleryProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
      <div className="relative aspect-video">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default AuPairImageGallery;
