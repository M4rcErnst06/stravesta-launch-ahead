
import React, { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import SetupScannerSection from '@/components/setup-scanner/SetupScannerSection';
import TradeAnalyticsSection from '@/components/trading-journal/TradeAnalyticsSection';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Activity, BarChart3 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

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
    // Animation for sections
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

  return (
    <div className="min-h-screen bg-stravesta-dark">
      {/* Static Background */}
      <div className="fixed inset-0 z-0 bg-stravesta-dark">
        <div className="absolute top-10 left-10 w-96 h-96 bg-stravesta-teal/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-stravesta-teal/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-stravesta-teal/5 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10 bg-stravesta-dark">
        <Navigation />
        
        {/* Hero Section */}
        <section id="home" className="pt-20 bg-stravesta-dark">
          <HeroSection />
        </section>

        {/* KI-Analyse in Aktion Section */}
        <section id="ki-analyse" className="py-20 scroll-mt-20 bg-stravesta-dark">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16" data-animate>
              <div className="flex justify-center mb-6">
                <div className="bg-stravesta-teal/10 p-4 rounded-full">
                  <Brain className="h-12 w-12 text-stravesta-teal" />
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
                KI-Analyse in Aktion
              </h2>
              <p className="text-xl text-stravesta-lightGray max-w-3xl mx-auto mb-4">
                Erleben Sie live, wie unsere künstliche Intelligenz Ihre Trading-Daten analysiert und wertvolle Erkenntnisse liefert
              </p>
              <Badge className="bg-stravesta-teal/20 text-stravesta-teal border-stravesta-teal/30">
                Live-Demo • Echtzeit-Analyse
              </Badge>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <Card className="bg-stravesta-navy/50 border-stravesta-teal/20 hover:border-stravesta-teal/60 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Activity className="h-5 w-5 text-stravesta-teal" />
                    Pattern-Erkennung
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-stravesta-lightGray text-sm">
                    Automatische Identifikation von profitablen Trading-Mustern in Ihren historischen Daten
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-stravesta-navy/50 border-stravesta-teal/20 hover:border-stravesta-teal/60 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-stravesta-teal" />
                    Performance-Optimierung
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-stravesta-lightGray text-sm">
                    KI-basierte Empfehlungen zur Verbesserung Ihrer Trading-Performance
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-stravesta-navy/50 border-stravesta-teal/20 hover:border-stravesta-teal/60 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Brain className="h-5 w-5 text-stravesta-teal" />
                    Risiko-Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-stravesta-lightGray text-sm">
                    Intelligente Analyse Ihres Risikoprofils mit personalisierten Handlungsempfehlungen
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* KI Setup Scanner Section */}
        <section id="setup-scanner" className="scroll-mt-20">
          <SetupScannerSection />
        </section>
        
        {/* KI Trading Journal Analytics Section */}
        <section id="journal-analytics" className="scroll-mt-20">
          <TradeAnalyticsSection />
        </section>

        {/* About Section */}
        <section id="about" className="py-20 scroll-mt-20 bg-stravesta-dark">
          <div className="container mx-auto px-4">
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

        {/* Early Access Section */}
        <section id="early-access" className="scroll-mt-20 bg-stravesta-dark">
          <CTASection />
        </section>

        {/* Footer */}
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
