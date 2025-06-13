
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Star, Zap } from 'lucide-react';
import CountdownTimer from './CountdownTimer';
import EmailSubscribeForm from './EmailSubscribeForm';

const HeroSection = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-stravesta-dark via-stravesta-navy to-stravesta-dark relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-tech-pattern opacity-10"></div>
      <div className="absolute top-20 left-10 w-64 h-64 bg-stravesta-teal/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-stravesta-teal/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* Navigation */}
        <nav className="flex justify-between items-center mb-16">
          <div className="flex items-center space-x-2">
            <Zap className="h-8 w-8 text-stravesta-teal" />
            <span className="text-2xl font-bold text-gradient">Stravesta</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="outline" className="border-stravesta-teal text-stravesta-teal hover:bg-stravesta-teal hover:text-stravesta-dark">
                Anmelden
              </Button>
            </Link>
          </div>
        </nav>

        <div className="text-center max-w-5xl mx-auto">
          {/* Beta Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-stravesta-teal/10 border border-stravesta-teal/20 mb-8">
            <Star className="h-4 w-4 text-stravesta-teal mr-2" />
            <span className="text-sm font-medium text-stravesta-teal">Beta verfügbar</span>
            <span className="ml-2 text-xs text-stravesta-lightGray">• Limitierte Plätze</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="text-white">Trading mit</span>
            <br />
            <span className="text-gradient">KI-Power</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-stravesta-lightGray mb-8 max-w-3xl mx-auto leading-relaxed">
            Revolutioniere dein Trading mit automatischer Setup-Erkennung, 
            personalisierten AI-Bots und intelligenter Community.
          </p>

          {/* Value Proposition */}
          <div className="flex flex-wrap justify-center gap-6 mb-12 text-sm">
            <div className="flex items-center text-stravesta-lightGray">
              <div className="w-2 h-2 bg-stravesta-teal rounded-full mr-2"></div>
              AI-Setup-Erkennung
            </div>
            <div className="flex items-center text-stravesta-lightGray">
              <div className="w-2 h-2 bg-stravesta-teal rounded-full mr-2"></div>
              24/7 Marktüberwachung
            </div>
            <div className="flex items-center text-stravesta-lightGray">
              <div className="w-2 h-2 bg-stravesta-teal rounded-full mr-2"></div>
              Trading-Journal
            </div>
            <div className="flex items-center text-stravesta-lightGray">
              <div className="w-2 h-2 bg-stravesta-teal rounded-full mr-2"></div>
              Community & Coaching
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link to="/login">
              <Button 
                size="lg" 
                className="bg-stravesta-teal hover:bg-stravesta-teal/90 text-stravesta-dark font-semibold px-8 py-4 text-lg group"
              >
                Jetzt Beta-Zugang sichern
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="border-stravesta-teal text-stravesta-teal hover:bg-stravesta-teal hover:text-stravesta-dark px-8 py-4 text-lg group"
            >
              <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Demo ansehen
            </Button>
          </div>

          {/* Countdown Timer */}
          <div className="mb-12">
            <h3 className="text-lg font-semibold text-white mb-4">
              🔥 Beta-Launch endet in:
            </h3>
            <CountdownTimer />
          </div>

          {/* Email Subscription */}
          <div className="max-w-md mx-auto">
            <EmailSubscribeForm />
          </div>

          {/* Social Proof */}
          <div className="mt-16 text-center">
            <p className="text-sm text-stravesta-lightGray mb-4">Vertraut von Beta-Testern weltweit</p>
            <div className="flex justify-center items-center space-x-8 opacity-60">
              <div className="text-stravesta-lightGray font-medium">500+ Beta-Tester</div>
              <div className="w-1 h-1 bg-stravesta-lightGray rounded-full"></div>
              <div className="text-stravesta-lightGray font-medium">95% Setup-Genauigkeit</div>
              <div className="w-1 h-1 bg-stravesta-lightGray rounded-full"></div>
              <div className="text-stravesta-lightGray font-medium">24/7 Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
