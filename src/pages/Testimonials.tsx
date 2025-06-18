
import React from 'react';
import Navigation from '@/components/Navigation';
import TestimonialSection from '@/components/TestimonialSection';

const Testimonials = () => {
  return (
    <div className="min-h-screen bg-stravesta-dark">
      <Navigation />
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gradient page-title px-4">
            Erfahrungsberichte
          </h1>
          <p className="text-xl md:text-2xl text-stravesta-lightGray max-w-4xl mx-auto px-4 leading-relaxed">
            Was unsere Community über Stravesta sagt
          </p>
        </div>
        <TestimonialSection />
      </div>
    </div>
  );
};

export default Testimonials;
