
import React from 'react';
import Navigation from '@/components/Navigation';
import StatsSection from '@/components/StatsSection';

const Stats = () => {
  return (
    <div className="min-h-screen bg-stravesta-dark">
      <Navigation />
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gradient page-title px-4">
            Statistiken
          </h1>
          <p className="text-xl md:text-2xl text-stravesta-lightGray max-w-4xl mx-auto px-4 leading-relaxed">
            Einblicke in unsere Community und Performance
          </p>
        </div>
        <StatsSection />
      </div>
    </div>
  );
};

export default Stats;
