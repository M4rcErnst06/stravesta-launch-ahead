
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const TestimonialSection = () => {
  const testimonials = [
    {
      name: "Alex M.",
      role: "Daytrader",
      content: "Die KI erkennt meine Setups besser als ich selbst. Seit Beta +127% Performance!",
      avatar: "🚀"
    },
    {
      name: "Sarah K.",
      role: "Swing Trader",
      content: "Endlich eine Platform die versteht wie ich trade. Die Alerts sind Gold wert.",
      avatar: "⭐"
    },
    {
      name: "Marcus L.",
      role: "Trading Coach",
      content: "Perfekt für meine Schüler. Das Dashboard zeigt alle wichtigen Statistiken.",
      avatar: "📈"
    }
  ];

  return (
    <section className="py-20 bg-stravesta-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            Beta-Tester sind begeistert
          </h2>
          <p className="text-xl text-stravesta-lightGray">
            Echte Erfahrungen von echten Tradern
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-stravesta-navy/30 border-stravesta-teal/20 hover:border-stravesta-teal/40 transition-all duration-300 hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="text-2xl mr-3">{testimonial.avatar}</div>
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-sm text-stravesta-teal">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-stravesta-lightGray italic">
                  "{testimonial.content}"
                </p>
                <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-stravesta-teal">⭐</span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
