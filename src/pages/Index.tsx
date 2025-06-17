
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
        
        {/* Footer */}
        <footer className="bg-stravesta-navy border-t border-stravesta-teal/20 py-8 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-stravesta-dark/50 to-transparent"></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gradient mb-2">Stravesta</h3>
              <p className="text-stravesta-lightGray text-sm">Trading mit KI-Power für höhere Ziele</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 text-sm">
              <div>
                <h4 className="font-semibold text-white mb-3">Produkt</h4>
                <ul className="space-y-1 text-stravesta-lightGray">
                  <li className="hover:text-stravesta-teal transition-colors cursor-pointer">Features</li>
                  <li className="hover:text-stravesta-teal transition-colors cursor-pointer">Beta-Zugang</li>
                  <li className="hover:text-stravesta-teal transition-colors cursor-pointer">Roadmap</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-3">Community</h4>
                <ul className="space-y-1 text-stravesta-lightGray">
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
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-3">Legal</h4>
                <ul className="space-y-1 text-stravesta-lightGray">
                  <li className="hover:text-stravesta-teal transition-colors cursor-pointer">Datenschutz</li>
                  <li className="hover:text-stravesta-teal transition-colors cursor-pointer">Impressum</li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-stravesta-teal/20 pt-4">
              <p className="text-xs text-stravesta-lightGray">
                &copy; {new Date().getFullYear()} Stravesta. Alle Rechte vorbehalten.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
