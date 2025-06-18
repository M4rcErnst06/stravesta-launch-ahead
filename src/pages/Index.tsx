
import React from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-stravesta-dark overflow-hidden">
      {/* Static Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-10 left-10 w-96 h-96 bg-stravesta-teal/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-stravesta-teal/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-stravesta-teal/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        <Navigation />
        <HeroSection />
      </div>
    </div>
  );
};

export default Index;
