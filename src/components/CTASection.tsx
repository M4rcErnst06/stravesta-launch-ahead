
import React from 'react';
import { Button } from '@/components/ui/button';
import EmailSubscribeForm from '@/components/EmailSubscribeForm';

const CTASection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-stravesta-teal/10 via-transparent to-blue-500/10"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-tech-pattern opacity-20"></div>
      
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">Bereit für das </span>
            <span className="text-gradient">nächste Level?</span>
          </h2>
          
          <p className="text-xl text-stravesta-lightGray mb-8 max-w-3xl mx-auto">
            Schließe dich der Trading-Revolution an. Frühe Beta-Zugang, exklusive Features und lebenslanger Discount für Early Adopters.
          </p>
          
          <div className="bg-stravesta-navy/40 backdrop-blur-sm rounded-2xl p-8 border border-stravesta-teal/20 max-w-2xl mx-auto mb-8">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">Early Access Vorteile</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-stravesta-teal rounded-full"></div>
                  <span className="text-sm text-stravesta-lightGray">50% Lifetime Discount</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-stravesta-teal rounded-full"></div>
                  <span className="text-sm text-stravesta-lightGray">Exklusive Beta Features</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-stravesta-teal rounded-full"></div>
                  <span className="text-sm text-stravesta-lightGray">Direkter Entwickler-Kontakt</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-stravesta-teal rounded-full"></div>
                  <span className="text-sm text-stravesta-lightGray">Community Founder Status</span>
                </div>
              </div>
            </div>
            
            <EmailSubscribeForm />
          </div>
          
          <p className="text-sm text-stravesta-lightGray">
            Keine Finanzberatung • DSGVO-konform • Jederzeit kündbar
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
