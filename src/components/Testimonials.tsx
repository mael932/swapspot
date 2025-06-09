
import { Quote } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      quote: "Swapped with a student from Milan—seamless and stress-free! Our dates matched perfectly and we both saved hundreds on accommodation.",
      name: "Emma Thompson",
      role: "Exchange Student, King's College London",
      avatar: "https://i.pravatar.cc/150?img=32"
    },
    {
      id: 2,
      quote: "Found my perfect match in just 3 days. We swapped our apartments for the entire semester—no fees, no points, just a direct exchange.",
      name: "Marco Rodriguez",
      role: "Study Abroad Student, Universitat Pompeu Fabra",
      avatar: "https://i.pravatar.cc/150?img=53"
    },
    {
      id: 3,
      quote: "The verification process made me feel safe, and the swap worked exactly as promised. I got to experience Vienna while a local student enjoyed London.",
      name: "Sophie Chen",
      role: "International Student, LSE",
      avatar: "https://i.pravatar.cc/150?img=20"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Real Student Swap Stories</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Hear from students who found their perfect housing matches through direct swaps.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-6 rounded-lg relative shadow-sm">
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
