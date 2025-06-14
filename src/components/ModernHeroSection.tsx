
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Star, Zap, ChevronDown } from 'lucide-react';
import CountdownTimer from './CountdownTimer';
import EmailSubscribeForm from './EmailSubscribeForm';

const ModernHeroSection = () => {
  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-stravesta-dark via-stravesta-navy to-stravesta-dark relative overflow-hidden flex flex-col">
      {/* Navigation */}
      <nav className="relative z-20 flex justify-between items-center p-6 animate-fade-in">
        <div className="flex items-center space-x-2 group">
          <div className="relative">
            <Zap className="h-8 w-8 text-stravesta-teal group-hover:scale-110 transition-transform duration-300" />
            <div className="absolute inset-0 bg-stravesta-teal/20 rounded-full blur-lg group-hover:scale-150 transition-transform duration-300"></div>
          </div>
          <span className="text-2xl font-bold text-gradient">Stravesta</span>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/login">
            <Button 
              variant="outline" 
              className="border-stravesta-teal text-stravesta-teal hover:bg-stravesta-teal hover:text-stravesta-dark transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-stravesta-teal/20"
            >
              Anmelden
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center">
        <div className="text-center max-w-6xl mx-auto px-6">
          {/* Beta Badge */}
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-stravesta-teal/10 to-blue-500/10 border border-stravesta-teal/30 mb-8 animate-fade-in hover:scale-105 transition-transform duration-300 backdrop-blur-sm">
            <Star className="h-4 w-4 text-stravesta-teal mr-2 animate-pulse" />
            <span className="text-sm font-medium text-stravesta-teal">Beta verfügbar</span>
            <span className="ml-2 text-xs text-stravesta-lightGray">• Limitierte Plätze</span>
          </div>

          {/* Main Headline with enhanced animations */}
          <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
              <span className="text-white block animate-fade-in" style={{ animationDelay: '0.4s' }}>Trading mit</span>
              <span className="text-gradient block animate-fade-in bg-gradient-to-r from-stravesta-teal via-cyan-400 to-blue-500 bg-[length:200%_200%] animate-gradient-shift" style={{ animationDelay: '0.6s' }}>
                KI-Power
              </span>
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl text-stravesta-lightGray mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.8s' }}>
            Revolutioniere dein Trading mit automatischer Setup-Erkennung, 
            personalisierten AI-Bots und intelligenter Community.
          </p>

          {/* Enhanced Value Proposition */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto">
            {[
              { icon: "🤖", text: "AI-Setup-Erkennung" },
              { icon: "⚡", text: "24/7 Marktüberwachung" },
              { icon: "📊", text: "Trading-Journal" },
              { icon: "👥", text: "Community & Coaching" }
            ].map((item, index) => (
              <div 
                key={index}
                className="flex flex-col items-center p-4 rounded-xl bg-stravesta-navy/30 backdrop-blur-sm border border-stravesta-teal/20 hover:border-stravesta-teal/40 transition-all duration-300 hover:scale-105 animate-fade-in group"
                style={{ animationDelay: `${1 + index * 0.1}s` }}
              >
                <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                <span className="text-sm text-stravesta-lightGray group-hover:text-white transition-colors duration-300">{item.text}</span>
              </div>
            ))}
          </div>

          {/* Enhanced CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 animate-fade-in" style={{ animationDelay: '1.4s' }}>
            <Link to="/login">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-stravesta-teal to-cyan-500 hover:from-cyan-500 hover:to-stravesta-teal text-stravesta-dark font-semibold px-10 py-6 text-lg group relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-stravesta-teal/30"
              >
                <div className="absolute inset-0 bg-white/20 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
                <span className="relative z-10">Jetzt Beta-Zugang sichern</span>
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
              </Button>
            </Link>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-stravesta-teal text-stravesta-teal hover:bg-stravesta-teal hover:text-stravesta-dark px-10 py-6 text-lg group relative overflow-hidden transition-all duration-300 hover:scale-105 backdrop-blur-sm"
            >
              <Play className="mr-2 h-5 w-5 group-hover:scale-125 transition-transform duration-300" />
              <span>Demo ansehen</span>
            </Button>
          </div>

          {/* Enhanced Countdown */}
          <div className="mb-16 animate-fade-in" style={{ animationDelay: '1.6s' }}>
            <div className="bg-gradient-to-r from-stravesta-navy/50 to-stravesta-dark/50 backdrop-blur-sm rounded-2xl p-8 border border-stravesta-teal/20 max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center justify-center gap-2">
                <span className="text-2xl animate-pulse">🔥</span>
                Beta-Launch endet in:
              </h3>
              <CountdownTimer />
            </div>
          </div>

          {/* Enhanced Email Subscription */}
          <div className="max-w-md mx-auto animate-fade-in" style={{ animationDelay: '1.8s' }}>
            <EmailSubscribeForm />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="relative z-10 pb-8 flex justify-center animate-fade-in" style={{ animationDelay: '2s' }}>
        <button 
          onClick={scrollToFeatures}
          className="p-3 rounded-full border border-stravesta-teal/30 hover:border-stravesta-teal/60 transition-all duration-300 hover:scale-110 group"
        >
          <ChevronDown className="h-6 w-6 text-stravesta-teal animate-bounce group-hover:scale-110 transition-transform duration-300" />
        </button>
      </div>

      {/* Enhanced Social Proof */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center animate-fade-in" style={{ animationDelay: '2.2s' }}>
        <p className="text-sm text-stravesta-lightGray mb-4">Vertraut von Beta-Testern weltweit</p>
        <div className="flex justify-center items-center space-x-8 opacity-60">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-stravesta-teal rounded-full animate-pulse"></div>
            <span className="text-stravesta-lightGray font-medium text-sm">500+ Beta-Tester</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-stravesta-teal rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <span className="text-stravesta-lightGray font-medium text-sm">95% Setup-Genauigkeit</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-stravesta-teal rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            <span className="text-stravesta-lightGray font-medium text-sm">24/7 Support</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernHeroSection;
