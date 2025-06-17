
import React from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import StatsSection from '@/components/StatsSection';
import TestimonialSection from '@/components/TestimonialSection';
import PricingSection from '@/components/PricingSection';
import CTASection from '@/components/CTASection';

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
        <StatsSection />
        <TestimonialSection />
        <PricingSection />
        <CTASection />
        
        {/* Footer */}
        <footer className="bg-stravesta-navy border-t border-stravesta-teal/20 py-12 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-stravesta-dark/50 to-transparent"></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gradient mb-2">Stravesta</h3>
              <p className="text-stravesta-lightGray">Trading mit KI-Power für höhere Ziele</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <h4 className="font-semibold text-white mb-4">Produkt</h4>
                <ul className="space-y-2 text-sm text-stravesta-lightGray">
                  <li className="hover:text-stravesta-teal transition-colors cursor-pointer">Features</li>
                  <li className="hover:text-stravesta-teal transition-colors cursor-pointer">Preise</li>
                  <li className="hover:text-stravesta-teal transition-colors cursor-pointer">Beta-Zugang</li>
                  <li className="hover:text-stravesta-teal transition-colors cursor-pointer">Roadmap</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-4">Community</h4>
                <ul className="space-y-2 text-sm text-stravesta-lightGray">
                  <li>
                    <a 
                      href="https://discord.gg/eNTjJFJg" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-stravesta-teal transition-colors cursor-pointer"
                    >
                      Discord
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://t.me/stravesta" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-stravesta-teal transition-colors cursor-pointer"
                    >
                      Telegram
                    </a>
                  </li>
                  <li className="hover:text-stravesta-teal transition-colors cursor-pointer">Trading Forum</li>
                  <li className="hover:text-stravesta-teal transition-colors cursor-pointer">Beta-Tester</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-4">Legal</h4>
                <ul className="space-y-2 text-sm text-stravesta-lightGray">
                  <li className="hover:text-stravesta-teal transition-colors cursor-pointer">Datenschutz</li>
                  <li className="hover:text-stravesta-teal transition-colors cursor-pointer">Impressum</li>
                  <li className="hover:text-stravesta-teal transition-colors cursor-pointer">AGB</li>
                  <li className="hover:text-stravesta-teal transition-colors cursor-pointer">Risikohinweis</li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-stravesta-teal/20 pt-8">
              <p className="text-sm text-stravesta-lightGray">
                &copy; {new Date().getFullYear()} Stravesta. Alle Rechte vorbehalten. 
                <br className="md:hidden" />
                <span className="md:ml-2">Keine Finanzberatung • Nur für Bildungszwecke • Risiko-Disclaimer beachten</span>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
