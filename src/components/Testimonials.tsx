
import { Quote } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      quote: "SwapSpot connected me with Emma, who was also doing her semester abroad for the first time. We understood each other's anxieties and excitement – it felt like connecting with a friend, not just a housing swap.",
      name: "Marco Rodriguez",
      role: "Business Student, Universitat Pompeu Fabra",
      avatar: "https://i.pravatar.cc/150?img=53"
    },
    {
      id: 2,
      quote: "What I love about SwapSpot is that everyone here shares the same ambition – making the most of their exchange. We're all students who understand the challenges and support each other.",
      name: "Sophie Chen",
      role: "International Relations, LSE",
      avatar: "https://i.pravatar.cc/150?img=20"
    },
    {
      id: 3,
      quote: "Through SwapSpot, I didn't just find accommodation – I found a network of like-minded students. We stay in touch and support each other's academic goals even after our exchanges ended.",
      name: "Emma Thompson",
      role: "Medical Student, King's College London",
      avatar: "https://i.pravatar.cc/150?img=32"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Students Connecting with Students</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from ambitious students who found more than housing – they found a community of peers who understand their journey.
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
        
        <div className="mt-16 text-center">
          <div className="bg-swap-blue rounded-lg p-8 text-white max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Connecting Dreams, Not Just Dorms
            </h3>
            <p className="text-lg text-white/90">
              Every connection on SwapSpot is between students who share your passion for learning, your courage to study abroad, 
              and your determination to make the most of every opportunity. We bridge the gap between like-minded ambitious students worldwide.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
