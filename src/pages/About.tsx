
import React from 'react';
import Navigation from '@/components/Navigation';
import { Target, Zap, Users, TrendingUp, Linkedin, Mail } from 'lucide-react';

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

          {/* About Stravesta Section */}
          <div className="bg-stravesta-navy/40 backdrop-blur-sm rounded-xl p-8 border border-stravesta-teal/20">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gradient mb-6">What is Stravesta</h2>
              <div className="space-y-6 max-w-4xl mx-auto">
                <p className="text-lg text-stravesta-lightGray leading-relaxed">
                  Stravesta combines state-of-the-art AI technology with proven trading strategies to give you a decisive 
                  advantage in the markets.
                </p>
                <p className="text-lg text-stravesta-lightGray leading-relaxed">
                  Our platform learns from your trading style and helps you achieve consistent profits while minimizing risks.
                </p>
                <p className="text-lg text-stravesta-lightGray leading-relaxed">
                  From automatic setup recognition to intelligent trading bots - Stravesta is your personal trading assistant.
                </p>
              </div>
            </div>
          </div>

          {/* About Us Section */}
          <div className="bg-stravesta-navy/40 backdrop-blur-sm rounded-xl p-8 border border-stravesta-teal/20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">About Us</h2>
              <p className="text-stravesta-lightGray max-w-2xl mx-auto">
                Meet the team behind Stravesta - united expertise in trading, technology and AI
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
              {/* Team Member 1 */}
              <div className="text-center group">
                <div className="relative mb-6">
                  <div className="w-48 h-48 mx-auto rounded-2xl overflow-hidden bg-gradient-to-br from-stravesta-teal/20 to-stravesta-blue/20 border-2 border-stravesta-teal/30 group-hover:border-stravesta-teal/50 transition-all duration-300">
                    <img 
                      src="/api/placeholder/192/192" 
                      alt="Team Member"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">[Name]</h3>
                    <p className="text-stravesta-teal font-semibold text-lg">Position</p>
                  </div>
                  
                  <p className="text-stravesta-lightGray leading-relaxed max-w-sm mx-auto">
                    Brief description of expertise and role at Stravesta.
                  </p>
                  
                  <div className="flex justify-center space-x-4 pt-4">
                    <a 
                      href="#" 
                      className="flex items-center space-x-2 bg-stravesta-teal/10 hover:bg-stravesta-teal/20 border border-stravesta-teal/30 rounded-lg px-4 py-2 transition-all duration-300 group"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="h-4 w-4 text-stravesta-teal group-hover:scale-110 transition-transform" />
                      <span className="text-stravesta-teal text-sm font-medium">LinkedIn</span>
                    </a>
                    <a 
                      href="mailto:contact@stravesta.com" 
                      className="flex items-center space-x-2 bg-stravesta-blue/10 hover:bg-stravesta-blue/20 border border-stravesta-blue/30 rounded-lg px-4 py-2 transition-all duration-300 group"
                    >
                      <Mail className="h-4 w-4 text-stravesta-blue group-hover:scale-110 transition-transform" />
                      <span className="text-stravesta-blue text-sm font-medium">Contact</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Team Member 2 */}
              <div className="text-center group">
                <div className="relative mb-6">
                  <div className="w-48 h-48 mx-auto rounded-2xl overflow-hidden bg-gradient-to-br from-stravesta-blue/20 to-stravesta-teal/20 border-2 border-stravesta-teal/30 group-hover:border-stravesta-teal/50 transition-all duration-300">
                    <img 
                      src="/api/placeholder/192/192" 
                      alt="Team Member"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">[Name]</h3>
                    <p className="text-stravesta-teal font-semibold text-lg">Position</p>
                  </div>
                  
                  <p className="text-stravesta-lightGray leading-relaxed max-w-sm mx-auto">
                    Brief description of expertise and role at Stravesta.
                  </p>
                  
                  <div className="flex justify-center space-x-4 pt-4">
                    <a 
                      href="#" 
                      className="flex items-center space-x-2 bg-stravesta-teal/10 hover:bg-stravesta-teal/20 border border-stravesta-teal/30 rounded-lg px-4 py-2 transition-all duration-300 group"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="h-4 w-4 text-stravesta-teal group-hover:scale-110 transition-transform" />
                      <span className="text-stravesta-teal text-sm font-medium">LinkedIn</span>
                    </a>
                    <a 
                      href="mailto:contact@stravesta.com" 
                      className="flex items-center space-x-2 bg-stravesta-blue/10 hover:bg-stravesta-blue/20 border border-stravesta-blue/30 rounded-lg px-4 py-2 transition-all duration-300 group"
                    >
                      <Mail className="h-4 w-4 text-stravesta-blue group-hover:scale-110 transition-transform" />
                      <span className="text-stravesta-blue text-sm font-medium">Contact</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
