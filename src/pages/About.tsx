
import React from 'react';
import Navigation from '@/components/Navigation';
import { Target, Zap, Users, TrendingUp, User } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-stravesta-dark">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
            Über Stravesta
          </h1>
          <p className="text-xl text-stravesta-lightGray max-w-3xl mx-auto">
            Trading mit KI-Power für höhere Ziele
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-12">
          <div className="bg-stravesta-navy/40 backdrop-blur-sm rounded-xl p-8 border border-stravesta-teal/20">
            <Target className="h-12 w-12 text-stravesta-teal mb-4 mx-auto" />
            <h2 className="text-2xl font-bold text-white text-center mb-4">Unsere Mission</h2>
            <p className="text-stravesta-lightGray text-center text-lg leading-relaxed">
              Wir revolutionieren das Trading durch intelligente KI-Technologie. 
              Unser Ziel ist es, jedem Trader die Tools zu geben, die er braucht, 
              um erfolgreich und profitabel zu handeln.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <Zap className="h-8 w-8 text-stravesta-teal mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">Innovation</h3>
              <p className="text-stravesta-lightGray text-sm">
                Modernste KI-Algorithmen für präzise Setup-Erkennung
              </p>
            </div>
            
            <div className="text-center">
              <Users className="h-8 w-8 text-stravesta-teal mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">Community</h3>
              <p className="text-stravesta-lightGray text-sm">
                Eine starke Gemeinschaft von erfolgreichen Tradern
              </p>
            </div>
            
            <div className="text-center">
              <TrendingUp className="h-8 w-8 text-stravesta-teal mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">Erfolg</h3>
              <p className="text-stravesta-lightGray text-sm">
                Nachweisbare Verbesserungen deiner Trading-Performance
              </p>
            </div>
          </div>

          <div className="bg-stravesta-navy/40 backdrop-blur-sm rounded-xl p-8 border border-stravesta-teal/20">
            <h2 className="text-2xl font-bold text-white text-center mb-6">Warum Stravesta?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center mb-3">
                  <div className="w-2 h-2 bg-stravesta-teal rounded-full mr-3"></div>
                  <span className="text-white font-medium">95% Genauigkeit bei Setup-Erkennung</span>
                </div>
                <div className="flex items-center mb-3">
                  <div className="w-2 h-2 bg-stravesta-teal rounded-full mr-3"></div>
                  <span className="text-white font-medium">24/7 Marktüberwachung</span>
                </div>
              </div>
              <div>
                <div className="flex items-center mb-3">
                  <div className="w-2 h-2 bg-stravesta-teal rounded-full mr-3"></div>
                  <span className="text-white font-medium">500+ zufriedene Beta-Tester</span>
                </div>
                <div className="flex items-center mb-3">
                  <div className="w-2 h-2 bg-stravesta-teal rounded-full mr-3"></div>
                  <span className="text-white font-medium">Kontinuierliche Weiterentwicklung</span>
                </div>
              </div>
            </div>
          </div>

          {/* Founders Section */}
          <div className="bg-stravesta-navy/40 backdrop-blur-sm rounded-xl p-8 border border-stravesta-teal/20">
            <h2 className="text-2xl font-bold text-white text-center mb-8">Unser Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {/* Founder */}
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-r from-stravesta-teal/20 to-stravesta-blue/20 border-2 border-stravesta-teal/30 flex items-center justify-center">
                  <User className="h-16 w-16 text-stravesta-teal" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Gründer</h3>
                <p className="text-stravesta-teal font-medium mb-2">Founder & CEO</p>
                <p className="text-stravesta-lightGray text-sm leading-relaxed">
                  Visionär mit jahrelanger Erfahrung im Trading und der Entwicklung 
                  innovativer KI-Lösungen für den Finanzmarkt.
                </p>
              </div>

              {/* Co-Founder */}
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-r from-stravesta-blue/20 to-stravesta-teal/20 border-2 border-stravesta-teal/30 flex items-center justify-center">
                  <User className="h-16 w-16 text-stravesta-teal" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Co-Gründer</h3>
                <p className="text-stravesta-teal font-medium mb-2">Co-Founder & CTO</p>
                <p className="text-stravesta-lightGray text-sm leading-relaxed">
                  Tech-Experte und Trading-Spezialist, der die technische Vision 
                  von Stravesta umsetzt und vorantreibt.
                </p>
              </div>
            </div>

            <div className="text-center mt-8 pt-6 border-t border-stravesta-teal/20">
              <p className="text-stravesta-lightGray text-sm">
                Gemeinsam bringen wir über 15 Jahre Erfahrung in Trading, 
                Technologie und KI-Entwicklung mit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
