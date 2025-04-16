
import { Quote } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      quote: "SwapSpot made my exchange semester in Barcelona possible. I found an amazing apartment and saved so much money compared to other options!",
      name: "Olivia Chen",
      role: "Exchange Student, Amsterdam University",
      avatar: "https://i.pravatar.cc/150?img=32"
    },
    {
      id: 2,
      quote: "The matching process was incredibly smooth. I swapped my London flat for a place in Vienna for a semester and couldn't be happier with the experience.",
      name: "Thomas Miller",
      role: "Graduate Student, LSE",
      avatar: "https://i.pravatar.cc/150?img=53"
    },
    {
      id: 3,
      quote: "As someone on a tight budget, SwapSpot was a game-changer. I found a perfect match that fit my budget and location preferences within a week.",
      name: "Sophia Rodriguez",
      role: "International Student, HEC Paris",
      avatar: "https://i.pravatar.cc/150?img=20"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Hear from students who found their perfect accommodation matches through SwapSpot.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-gray-50 p-6 rounded-lg relative">
              <Quote className="h-10 w-10 text-swap-blue/20 absolute top-6 left-6" />
              
              <div className="pt-8">
                <p className="text-gray-700 mb-6 relative z-10">"{testimonial.quote}"</p>
                
                <div className="flex items-center gap-3">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
