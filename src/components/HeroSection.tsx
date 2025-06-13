
import React from 'react';
import { Button } from '@/components/ui/button';
import EmailSubscribeForm from '@/components/EmailSubscribeForm';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-stravesta-dark via-stravesta-navy to-stravesta-dark"></div>
      <div className="absolute top-20 -left-40 w-96 h-96 bg-stravesta-teal/5 rounded-full blur-[120px] animate-pulse-slow"></div>
      <div className="absolute -top-20 -right-40 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] animate-pulse-slow"></div>
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-stravesta-teal/3 rounded-full blur-[150px]"></div>
      
      {/* Tech Pattern Overlay */}
      <div className="absolute inset-0 bg-tech-pattern opacity-30"></div>
      
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-stravesta-teal/10 border border-stravesta-teal/20 text-stravesta-teal text-sm font-medium mb-8 animate-float">
            <span className="w-2 h-2 bg-stravesta-teal rounded-full mr-2 animate-pulse"></span>
            Launching Soon - Early Access Available
          </div>
          
          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-white">Trading mit </span>
            <span className="text-gradient">KI-Power</span>
            <br />
            <span className="text-white">für </span>
            <span className="text-gradient">höhere Ziele</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-stravesta-lightGray mb-8 max-w-4xl mx-auto leading-relaxed">
            Stravesta revolutioniert dein Trading mit KI-basierten Setups, automatisierten Bots und einer intelligenten Community-Plattform.
          </p>
          
          {/* Key Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
            <div className="bg-stravesta-navy/30 backdrop-blur-sm rounded-lg p-6 border border-stravesta-teal/10">
              <div className="text-3xl mb-2">🤖</div>
              <h3 className="font-semibold text-white mb-2">KI-Trading Bots</h3>
              <p className="text-sm text-stravesta-lightGray">Personalisierte AI-Assistenten lernen deinen Trading-Stil</p>
            </div>
            <div className="bg-stravesta-navy/30 backdrop-blur-sm rounded-lg p-6 border border-stravesta-teal/10">
              <div className="text-3xl mb-2">📊</div>
              <h3 className="font-semibold text-white mb-2">Smart Analytics</h3>
              <p className="text-sm text-stravesta-lightGray">Automatisches Journaling und Performance-Tracking</p>
            </div>
            <div className="bg-stravesta-navy/30 backdrop-blur-sm rounded-lg p-6 border border-stravesta-teal/10">
              <div className="text-3xl mb-2">🚀</div>
              <h3 className="font-semibold text-white mb-2">Live Alerts</h3>
              <p className="text-sm text-stravesta-lightGray">Realtime Setup-Erkennung und Telegram Integration</p>
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="bg-stravesta-navy/40 backdrop-blur-sm rounded-2xl p-8 border border-stravesta-teal/20 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Sichere dir frühen Zugang
            </h3>
            <p className="text-stravesta-lightGray mb-6">
              Werde Teil der ersten Trading-Community mit KI-Power
            </p>
            <EmailSubscribeForm />
            <p className="text-xs text-stravesta-lightGray mt-4">
              Keine Spam-E-Mails. Exklusive Updates und Early-Access-Benefits.
            </p>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-stravesta-teal rounded-full flex justify-center">
          <div className="w-1 h-3 bg-stravesta-teal rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
