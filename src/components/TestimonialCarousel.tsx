
import { useState, useEffect } from "react";

const testimonials = [
  {
    id: 1,
    quote: "Found my Barcelona housing match in 2 days",
    name: "Sarah M."
  },
  {
    id: 2,
    quote: "Perfect London exchange partner - so easy!",
    name: "Alex K."
  },
  {
    id: 3,
    quote: "Saved me weeks of searching in Paris",
    name: "Emma L."
  },
  {
    id: 4,
    quote: "Berlin housing sorted in 24 hours",
    name: "Marco R."
  },
  {
    id: 5,
    quote: "Amazing Rome exchange experience",
    name: "Sophie T."
  }
];

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 max-w-2xl mx-auto border border-gray-200 shadow-sm overflow-hidden">
      <div className="relative h-16">
        {testimonials.map((testimonial, index) => (
          <div
            key={testimonial.id}
            className={`absolute inset-0 transition-all duration-500 ease-in-out ${
              index === currentIndex
                ? "opacity-100 transform translate-x-0"
                : index < currentIndex
                ? "opacity-0 transform -translate-x-full"
                : "opacity-0 transform translate-x-full"
            }`}
          >
            <div className="flex flex-col justify-center h-full">
              <p className="text-gray-800 font-medium text-sm text-center">
                "{testimonial.quote}"
              </p>
              <p className="text-xs text-gray-600 mt-1 text-center">
                - {testimonial.name}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-center mt-2 space-x-1">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors duration-200 ${
              index === currentIndex ? "bg-swap-blue" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
