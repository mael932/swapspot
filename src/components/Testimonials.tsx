
import { Quote, GraduationCap } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      quote: "I was dreading spending weeks searching for a housing swap for my semester in Spain. SwapSpot found my perfect exchange student match in just 3 days without me having to do anything. They literally did all the work while I focused on preparing for my study abroad experience.",
      name: "Marco Rodriguez",
      role: "Business Student, Exchange to Barcelona",
      program: "Universitat Pompeu Fabra Exchange Program",
      avatar: "https://i.pravatar.cc/150?img=53"
    },
    {
      id: 2,
      quote: "Finally, a service that actually works FOR exchange students instead of making us work. I got three perfect student matches delivered to my email for my London semester - no browsing, no endless scrolling. SwapSpot did everything.",
      name: "Sophie Chen",
      role: "International Relations Exchange Student",
      program: "LSE Study Abroad Program", 
      avatar: "https://i.pravatar.cc/150?img=20"
    },
    {
      id: 3,
      quote: "The best part? I literally did nothing except fill out my exchange preferences once. SwapSpot's system found my ideal housing partner for my medical exchange and handled all the matching. I could focus entirely on my studies abroad preparation.",
      name: "Emma Thompson",
      role: "Medical Student Exchange",
      program: "King's College London Exchange",
      avatar: "https://i.pravatar.cc/150?img=32"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <GraduationCap className="h-6 w-6 text-swap-blue" />
            <span className="text-swap-blue font-semibold">Exchange Student Success Stories</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Exchange Students Love How We Work For Them</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from university students who saved dozens of hours by letting SwapSpot handle all the searching and matching work for their study abroad experience.
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
                    <p className="text-xs text-gray-500">{testimonial.program}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="bg-swap-blue rounded-lg p-8 text-white max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              We Do The Heavy Lifting, Exchange Students Get The Results
            </h3>
            <p className="text-lg text-white/90">
              Every day, our system processes thousands of university student profiles, analyzes compatibility factors, and identifies perfect exchange matches. 
              While you sleep, study, or prepare for your study abroad adventure, we're working 24/7 to find your ideal housing partner. 
              <span className="font-semibold"> That's the SwapSpot difference - maximum results with zero effort from exchange students.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
