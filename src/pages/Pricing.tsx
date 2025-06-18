
import React from 'react';
import Navigation from '@/components/Navigation';
import PricingSection from '@/components/PricingSection';

const Pricing = () => {
  return (
    <div className="min-h-screen bg-stravesta-dark">
      <Navigation />
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gradient page-title px-4">
            Preise & Pakete
          </h1>
          <p className="text-xl md:text-2xl text-stravesta-lightGray max-w-4xl mx-auto px-4 leading-relaxed">
            Wähle das perfekte Paket für dein Trading
          </p>
        </div>
        <PricingSection />
      </div>
    </div>
  );
};

export default Pricing;
