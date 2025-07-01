
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';
import CountdownTimer from './CountdownTimer';
import { useLanguage } from '@/contexts/LanguageContext';

const HeroSection = () => {
  const { t } = useLanguage();

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start' 
      });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-stravesta-dark relative overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-stravesta-teal/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-stravesta-teal/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-stravesta-teal/5 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-5xl mx-auto">
          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
            <span className="text-white">{t('hero.title').split(' ').slice(0, -2).join(' ')} </span>
            <span className="text-gradient">{t('hero.title').split(' ').slice(-2).join(' ')}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-stravesta-lightGray mb-8 max-w-3xl mx-auto leading-relaxed">
            {t('hero.subtitle')}
          </p>

          {/* Description */}
          <p className="text-lg text-stravesta-lightGray mb-12 max-w-4xl mx-auto leading-relaxed">
            {t('hero.description')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button 
              onClick={() => scrollToSection('#early-access')}
              className="bg-stravesta-teal hover:bg-stravesta-teal/90 text-black font-semibold px-8 py-4 text-lg rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-stravesta-teal/25"
            >
              {t('hero.cta')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => scrollToSection('#features')}
              className="border-stravesta-teal/50 text-stravesta-teal hover:bg-stravesta-teal/10 px-8 py-4 text-lg rounded-xl transition-all duration-300 hover:scale-105"
            >
              <Play className="mr-2 h-5 w-5" />
              {t('hero.learnMore')}
            </Button>
          </div>

          {/* Countdown Timer */}
          <div className="bg-stravesta-navy/40 backdrop-blur-sm rounded-2xl p-8 border border-stravesta-teal/20 max-w-2xl mx-auto">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">Early Access Launch</h3>
              <p className="text-stravesta-lightGray">Sichere dir deinen Platz - limitierte Beta-Phase</p>
            </div>
            <CountdownTimer />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
