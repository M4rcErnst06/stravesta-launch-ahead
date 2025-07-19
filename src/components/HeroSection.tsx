
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Rocket } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import EmailSubscribeForm from './EmailSubscribeForm';
import FeedbackModal from './FeedbackModal';
import AnimatedTradingChart from './AnimatedTradingChart';

const HeroSection = () => {
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const { t } = useLanguage();

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
      {/* Background effects */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-stravesta-teal/8 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-stravesta-teal/8 rounded-full blur-3xl animate-pulse"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Trading Chart - positioned above the title */}
          <div className="mb-8 flex justify-center">
            <div className="w-full max-w-3xl h-64 bg-stravesta-navy/30 rounded-xl border border-stravesta-teal/20 backdrop-blur-sm overflow-hidden">
              <AnimatedTradingChart />
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight animate-fade-in">
            <span className="text-white">{t('hero.title')}</span>
            <br />
            <span className="text-gradient">{t('hero.titleHighlight')}</span>
          </h1>
          
          <p className="text-lg md:text-xl text-stravesta-lightGray mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in-delay">
            {t('hero.subtitle')}
          </p>

          {/* CTA Button */}
          <div className="flex justify-center items-center mb-12 animate-scale-in">
            <Button 
              onClick={() => scrollToSection('#early-access')}
              size="lg" 
              className="bg-stravesta-teal hover:bg-stravesta-teal/90 text-black font-semibold px-8 py-4 text-lg hover:scale-105 transition-all duration-300 shadow-lg shadow-stravesta-teal/25"
            >
              {t('hero.cta')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Early Access Notification */}
          <div className="bg-stravesta-navy/80 backdrop-blur-sm rounded-xl p-6 border border-stravesta-teal/30 max-w-xl mx-auto mb-8 animate-slide-in-up">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Rocket className="h-5 w-5 text-stravesta-teal animate-bounce" />
              <h3 className="text-lg font-bold text-white">{t('hero.earlyAccess.title')}</h3>
            </div>
            <p className="text-stravesta-lightGray text-sm mb-4">
              {t('hero.earlyAccess.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                onClick={handleFeedbackClick}
                size="sm"
                className="bg-stravesta-teal text-black font-semibold border-none hover:bg-stravesta-teal/90 hover:scale-105 transition-all duration-300"
              > 
                {t('hero.earlyAccess.feedback')}
              </Button>
              <Button 
                onClick={() => scrollToSection('#about')}
                size="sm"
                className="bg-stravesta-teal/10 text-stravesta-teal border border-stravesta-teal/30 hover:bg-stravesta-teal/20 hover:scale-105 transition-all duration-300"
              >
                {t('hero.earlyAccess.learnMore')}
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
