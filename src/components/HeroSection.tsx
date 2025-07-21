
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Rocket } from 'lucide-react';
import EmailSubscribeForm from './EmailSubscribeForm';
import FeedbackModal from './FeedbackModal';
import AnimatedTradingChart from './AnimatedTradingChart';

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
    <section className="min-h-screen bg-transparent relative overflow-hidden flex items-center">
      {/* Remove background effects to let chart show through */}
      
      <div className="relative z-20 container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight animate-fade-in">
            <span className="text-white">Trading with</span>
            <br />
            <span className="text-gradient">AI-Power</span>
          </h1>
          
          <p className="text-lg md:text-xl text-stravesta-lightGray mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in-delay">
            Stravesta is for traders and investors who aim higher
          </p>

          {/* CTA Button */}
          <div className="flex justify-center items-center mb-12 animate-scale-in">
            <Button 
              onClick={() => scrollToSection('#early-access')}
              size="lg" 
              className="bg-stravesta-teal hover:bg-stravesta-teal/90 text-black font-semibold px-8 py-4 text-lg hover:scale-105 transition-all duration-300 shadow-lg shadow-stravesta-teal/25"
            >
              Secure Early Access Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

        </div>
      </div>

      {/* Feedback Modal */}
      <FeedbackModal open={feedbackOpen} onOpenChange={setFeedbackOpen} />
    </section>
  );
};

export default HeroSection;
