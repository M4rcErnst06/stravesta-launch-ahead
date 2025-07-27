
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
    <section className="min-h-screen bg-transparent relative overflow-hidden flex flex-col pt-32">
      {/* Remove background effects to let chart show through */}
      
      <div className="relative z-20 container mx-auto px-4">
        <div className="text-center max-w-5xl mx-auto">
          {/* Main Headline - Etwas kleiner gemacht */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight animate-fade-in">
            <span className="text-white">Trading with</span>
            <br />
            <span className="text-gradient">AI-Power</span>
          </h1>
        </div>
      </div>
      
      {/* Content in mittlerer Position - nicht ganz unten */}
      <div className="relative z-20 container mx-auto px-4 mt-32">
        <div className="text-center max-w-4xl mx-auto">
          <p className="text-xl md:text-2xl lg:text-3xl text-stravesta-lightGray mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in-delay font-medium">
            Stravesta is for traders and investors who aim higher
          </p>

          {/* CTA Button */}
          <div className="flex justify-center items-center animate-scale-in">
            <Button 
              onClick={() => scrollToSection('#early-access')}
              size="lg" 
              className="bg-stravesta-teal hover:bg-stravesta-teal/90 text-black font-bold px-12 py-6 text-xl lg:text-2xl hover:scale-105 transition-all duration-300 shadow-lg shadow-stravesta-teal/25 rounded-xl"
            >
              Secure Early Access Now
              <ArrowRight className="ml-3 h-6 w-6 lg:h-7 lg:w-7" />
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
