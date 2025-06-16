
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import HeroSection from '@/components/HeroSection';
import StatsSection from '@/components/StatsSection';
import TestimonialSection from '@/components/TestimonialSection';
import PricingSection from '@/components/PricingSection';
import CTASection from '@/components/CTASection';
import { ArrowRight, Star, TrendingUp, Users, Zap } from 'lucide-react';

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
        {/* Hero Section */}
        <HeroSection />
        
        {/* Stats Section */}
        <StatsSection />
        
        {/* Feature Preview Section */}
        <section className="py-20 bg-stravesta-navy relative">
          <div className="absolute inset-0 bg-gradient-to-r from-stravesta-teal/5 via-transparent to-stravesta-teal/5"></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">
              Entdecke unsere Features
            </h2>
            <p className="text-xl text-stravesta-lightGray mb-12 max-w-3xl mx-auto">
              KI-gestützte Tools für professionelles Trading
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-stravesta-dark/50 rounded-2xl p-8 border border-stravesta-teal/20 hover:border-stravesta-teal/40 transition-colors">
                <Zap className="h-12 w-12 text-stravesta-teal mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">AI & Automatisierung</h3>
                <p className="text-stravesta-lightGray">Intelligente Setup-Erkennung und personalisierte Trading-Bots</p>
              </div>
              <div className="bg-stravesta-dark/50 rounded-2xl p-8 border border-stravesta-teal/20 hover:border-stravesta-teal/40 transition-colors">
                <TrendingUp className="h-12 w-12 text-stravesta-teal mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Analyse & Tools</h3>
                <p className="text-stravesta-lightGray">Trading-Journal, Community und professionelle Analyse-Tools</p>
              </div>
              <div className="bg-stravesta-dark/50 rounded-2xl p-8 border border-stravesta-teal/20 hover:border-stravesta-teal/40 transition-colors">
                <Users className="h-12 w-12 text-stravesta-teal mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Integrationen</h3>
                <p className="text-stravesta-lightGray">Nahtlose Verbindung zu Brokern und Trading-Plattformen</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/features">
                <Button size="lg" className="bg-stravesta-teal hover:bg-stravesta-teal/90 text-black font-semibold px-8 py-4">
                  Alle Features entdecken
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/integrations">
                <Button size="lg" variant="outline" className="border-stravesta-teal text-stravesta-teal hover:bg-stravesta-teal hover:text-black px-8 py-4">
                  Integrationen ansehen
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <TestimonialSection />
        
        {/* Pricing Section */}
        <PricingSection />
        
        {/* Final CTA */}
        <CTASection />
        
        {/* Footer */}
        <footer className="bg-stravesta-navy border-t border-stravesta-teal/20 py-12 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-stravesta-dark/50 to-transparent"></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gradient mb-2">Stravesta</h3>
              <p className="text-stravesta-lightGray">Trading mit KI-Power für höhere Ziele</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div>
                <h4 className="font-semibold text-white mb-4">Produkt</h4>
                <ul className="space-y-2 text-sm text-stravesta-lightGray">
                  <li><Link to="/features" className="hover:text-stravesta-teal transition-colors">Features</Link></li>
                  <li className="hover:text-stravesta-teal transition-colors cursor-pointer">Preise</li>
                  <li className="hover:text-stravesta-teal transition-colors cursor-pointer">Beta-Zugang</li>
                  <li><Link to="/roadmap" className="hover:text-stravesta-teal transition-colors">Roadmap</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-4">Tools</h4>
                <ul className="space-y-2 text-sm text-stravesta-lightGray">
                  <li><Link to="/integrations" className="hover:text-stravesta-teal transition-colors">Integrationen</Link></li>
                  <li className="hover:text-stravesta-teal transition-colors cursor-pointer">AI-Setup</li>
                  <li className="hover:text-stravesta-teal transition-colors cursor-pointer">Trading Journal</li>
                  <li className="hover:text-stravesta-teal transition-colors cursor-pointer">Backtesting</li>
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
