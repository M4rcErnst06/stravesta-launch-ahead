
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Rocket } from 'lucide-react';
import EmailSubscribeForm from './EmailSubscribeForm';
import FeedbackModal from './FeedbackModal';

const HeroSection = () => {
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  const handleFeedbackClick = () => {
    setFeedbackOpen(true);
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start' 
      });
    }
  };

  return (
    <section className="min-h-screen bg-stravesta-dark bg-gradient-to-br from-stravesta-dark via-stravesta-navy to-stravesta-dark relative overflow-hidden flex items-center">
      <div className="absolute top-20 left-10 w-64 h-64 bg-stravesta-teal/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-stravesta-teal/5 rounded-full blur-3xl animate-pulse"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight animate-fade-in">
            <span className="text-white">Trading mit</span>
            <br />
            <span className="text-gradient">KI-Power</span>
          </h1>
          
          <p className="text-lg md:text-xl text-stravesta-lightGray mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in-delay">
            Revolutioniere dein Trading mit automatischer Setup-Erkennung, 
            personalisierten AI-Bots und intelligenter Analyse.
          </p>

          {/* CTA Button */}
          <div className="flex justify-center items-center mb-12 animate-scale-in">
            <Button 
              onClick={() => scrollToSection('#early-access')}
              size="lg" 
              className="bg-stravesta-teal hover:bg-stravesta-teal/90 text-black font-semibold px-8 py-4 text-lg hover:scale-105 transition-all duration-300 shadow-lg shadow-stravesta-teal/25"
            >
              Jetzt Early Access sichern
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Early Access Notification */}
          <div className="bg-stravesta-navy/40 backdrop-blur-sm rounded-xl p-6 border border-stravesta-teal/20 max-w-xl mx-auto mb-8 animate-slide-in-up">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Rocket className="h-5 w-5 text-stravesta-teal animate-bounce" />
              <h3 className="text-lg font-bold text-white">Early Access aktiv</h3>
            </div>
            <p className="text-stravesta-lightGray text-sm mb-4">
              Exklusiver Zugang zu Stravesta mit kontinuierlichen Updates und direktem Entwickler-Kontakt
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                onClick={handleFeedbackClick}
                size="sm"
                className="bg-stravesta-teal text-black font-semibold border-none hover:bg-stravesta-teal/90 hover:scale-105 transition-all duration-300"
              > 
                Feedback geben
              </Button>
              <Button 
                onClick={() => scrollToSection('#about')}
                size="sm"
                className="bg-stravesta-teal/10 text-stravesta-teal border border-stravesta-teal/30 hover:bg-stravesta-teal/20 hover:scale-105 transition-all duration-300"
              >
                Mehr erfahren
              </Button>
            </div>
          </div>

          {/* Email Subscription */}
          <div className="max-w-md mx-auto animate-fade-in-delay-2">
            <EmailSubscribeForm />
          </div>
        </div>
      </div>

      {/* Feedback Modal */}
      <FeedbackModal open={feedbackOpen} onOpenChange={setFeedbackOpen} />
    </section>
  );
};

export default HeroSection;
