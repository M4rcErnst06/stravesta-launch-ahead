
import React, { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import GroupedFeatureSection from '@/components/GroupedFeatureSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import SetupScannerSection from '@/components/setup-scanner/SetupScannerSection';
import TradeAnalyticsSection from '@/components/trading-journal/TradeAnalyticsSection';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';

const IndexContent = () => {
  const { t } = useLanguage();

  useEffect(() => {
    // Smooth scrolling for all links
    const handleSmoothScroll = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = target.getAttribute('href')?.substring(1);
        const element = document.getElementById(id || '');
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start' 
          });
        }
      }
    };

    document.addEventListener('click', handleSmoothScroll);
    return () => document.removeEventListener('click', handleSmoothScroll);
  }, []);

  useEffect(() => {
    // Animation for About Section
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          entry.target.classList.remove('opacity-0', 'translate-y-8');
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('[data-animate]');
    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Empty featureGroups array to remove the sections
  const featureGroups: any[] = [];

  return (
    <div className="min-h-screen">
      {/* Static Background for fixed elements */}
      <div className="fixed inset-0 z-0 bg-stravesta-dark">
        <div className="absolute top-10 left-10 w-96 h-96 bg-stravesta-teal/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-stravesta-teal/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-stravesta-teal/5 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10">
        <Navigation />
        
        {/* Hero Section - Dark Background */}
        <section id="home" className="pt-20 bg-stravesta-dark">
          <HeroSection />
        </section>
        
        {/* KI Setup Scanner Section - Navy Blue Background */}
        <section id="setup-scanner" className="scroll-mt-20 bg-stravesta-navy relative">
          {/* Section-specific background effects */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-96 h-96 bg-stravesta-teal/3 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/3 rounded-full blur-3xl animate-pulse"></div>
          </div>
          <div className="relative z-10">
            <SetupScannerSection />
          </div>
        </section>
        
        {/* KI Trading Journal Analytics Section - Dark Gray Background */}
        <section id="journal-analytics" className="scroll-mt-20 bg-stravesta-darkGray relative">
          {/* Section-specific background effects */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-96 h-96 bg-green-500/3 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-stravesta-teal/3 rounded-full blur-3xl animate-pulse"></div>
          </div>
          <div className="relative z-10">
            <TradeAnalyticsSection />
          </div>
        </section>
        
        {/* Features Section - Hidden since featureGroups is empty */}
        {featureGroups.length > 0 && (
          <section id="features" className="scroll-mt-20 bg-stravesta-dark">
            <div className="flex justify-center">
              <div className="w-full max-w-7xl">
                <GroupedFeatureSection
                  title={t('features.title')}
                  subtitle={t('features.subtitle')}
                  featureGroups={featureGroups}
                  className="bg-stravesta-dark"
                />
              </div>
            </div>
          </section>
        )}

        {/* About Section - Light Navy Background */}
        <section id="about" className="py-20 scroll-mt-20 bg-stravesta-navy/30 relative">
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-64 h-64 bg-stravesta-teal/5 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient opacity-0 translate-y-8 transition-all duration-700" data-animate>
                {t('about.title')}
              </h2>
              <div className="text-lg text-stravesta-lightGray space-y-6">
                <p className="opacity-0 translate-y-8 transition-all duration-700 delay-200" data-animate>
                  {t('about.paragraph1')}
                </p>
                <p className="opacity-0 translate-y-8 transition-all duration-700 delay-400" data-animate>
                  {t('about.paragraph2')}
                </p>
                <p className="opacity-0 translate-y-8 transition-all duration-700 delay-600" data-animate>
                  {t('about.paragraph3')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Early Access Section - Dark Background */}
        <section id="early-access" className="scroll-mt-20 bg-stravesta-dark">
          <CTASection />
        </section>

        {/* Footer - Dark Background */}
        <div className="bg-stravesta-dark">
          <Footer />
        </div>
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <LanguageProvider>
      <IndexContent />
    </LanguageProvider>
  );
};

export default Index;
