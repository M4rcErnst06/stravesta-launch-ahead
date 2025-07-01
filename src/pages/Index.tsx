
import React, { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import GroupedFeatureSection from '@/components/GroupedFeatureSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import { Brain, BarChart3, Bot, Target, TrendingUp, Users } from 'lucide-react';

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

  // Grouped Features
  const featureGroups = [
    {
      groupTitle: t('features.group1.title'),
      groupDescription: t('features.group1.description'),
      color: "#00F5D4",
      features: [
        {
          icon: <Brain className="h-10 w-10" />,
          title: t('feature.aiSetup.title'),
          description: t('feature.aiSetup.description'),
          features: [
            t('feature.aiSetup.feature1'),
            t('feature.aiSetup.feature2'),
            t('feature.aiSetup.feature3'),
            t('feature.aiSetup.feature4')
          ],
          badge: "AI-Powered"
        },
        {
          icon: <Bot className="h-10 w-10" />,
          title: t('feature.tradingBots.title'),
          description: t('feature.tradingBots.description'),
          features: [
            t('feature.tradingBots.feature1'),
            t('feature.tradingBots.feature2'),
            t('feature.tradingBots.feature3'),
            t('feature.tradingBots.feature4')
          ],
          badge: "Automation"
        },
        {
          icon: <Target className="h-10 w-10" />,
          title: t('feature.setupScanner.title'),
          description: t('feature.setupScanner.description'),
          features: [
            t('feature.setupScanner.feature1'),
            t('feature.setupScanner.feature2'),
            t('feature.setupScanner.feature3'),
            t('feature.setupScanner.feature4')
          ],
          badge: "Scanner"
        }
      ]
    },
    {
      groupTitle: t('features.group2.title'),
      groupDescription: t('features.group2.description'),
      color: "#00D4F5",
      features: [
        {
          icon: <BarChart3 className="h-10 w-10" />,
          title: t('feature.analytics.title'),
          description: t('feature.analytics.description'),
          features: [
            t('feature.analytics.feature1'),
            t('feature.analytics.feature2'),
            t('feature.analytics.feature3'),
            t('feature.analytics.feature4')
          ],
          badge: "Analytics"
        },
        {
          icon: <TrendingUp className="h-10 w-10" />,
          title: t('feature.portfolio.title'),
          description: t('feature.portfolio.description'),
          features: [
            t('feature.portfolio.feature1'),
            t('feature.portfolio.feature2'),
            t('feature.portfolio.feature3'),
            t('feature.portfolio.feature4')
          ],
          badge: "Portfolio"
        },
        {
          icon: <Users className="h-10 w-10" />,
          title: t('feature.journal.title'),
          description: t('feature.journal.description'),
          features: [
            t('feature.journal.feature1'),
            t('feature.journal.feature2'),
            t('feature.journal.feature3'),
            t('feature.journal.feature4')
          ],
          badge: "Journal"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-stravesta-dark overflow-hidden">
      {/* Static Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-10 left-10 w-96 h-96 bg-stravesta-teal/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-stravesta-teal/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-stravesta-teal/5 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10">
        <Navigation />
        
        {/* Hero Section */}
        <section id="home" className="pt-20">
          <HeroSection />
        </section>
        
        {/* Features Section - Centered */}
        <section id="features" className="scroll-mt-20">
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

        {/* About Section - Uniform background */}
        <section id="about" className="py-20 scroll-mt-20">
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

        {/* Early Access Section - Uniform background */}
        <section id="early-access" className="scroll-mt-20">
          <CTASection />
        </section>

        {/* Footer */}
        <Footer />
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
