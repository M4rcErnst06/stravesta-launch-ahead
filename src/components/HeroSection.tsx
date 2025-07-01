
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';
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
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
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
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
