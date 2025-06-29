
import React, { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import GroupedFeatureSection from '@/components/GroupedFeatureSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import { Brain, BarChart3, Bot, Target, TrendingUp, Zap, Shield, Users } from 'lucide-react';

const Index = () => {
  useEffect(() => {
    // Smooth scrolling für alle Links
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
    // Animation für About Section
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

  // Gruppierte Features
  const featureGroups = [
    {
      groupTitle: "KI & Automatisierung",
      groupDescription: "Modernste KI-Technologie für intelligentes Trading",
      color: "#00F5D4",
      features: [
        {
          icon: <Brain className="h-10 w-10" />,
          title: "KI-Setup-Erkennung",
          description: "Automatische Erkennung deiner Trading-Patterns mit fortschrittlicher KI",
          features: [
            "Pattern-Erkennung in Echtzeit",
            "Personalisierte Setup-Alerts",
            "Backtesting deiner Strategien",
            "Performance-Optimierung"
          ],
          badge: "AI-Powered"
        },
        {
          icon: <Bot className="h-10 w-10" />,
          title: "Trading-Bots",
          description: "Automatisierte Trading-Assistenten für verschiedene Strategien",
          features: [
            "Scalping-Bot",
            "Swing-Trading Bot",
            "Risk-Management",
            "24/7 Monitoring"
          ],
          badge: "Automation"
        },
        {
          icon: <Target className="h-10 w-10" />,
          title: "Setup-Scanner",
          description: "Automatisches Scannen der Märkte nach deinen bevorzugten Setups",
          features: [
            "Multi-Timeframe Analyse",
            "Custom Setup-Filter",
            "Alert-System",
            "Markt-Überwachung"
          ],
          badge: "Scanner"
        }
      ]
    },
    {
      groupTitle: "Analyse & Tracking",
      groupDescription: "Professionelle Tools für detaillierte Marktanalyse",
      color: "#00D4F5",
      features: [
        {
          icon: <BarChart3 className="h-10 w-10" />,
          title: "Smart Analytics",
          description: "Detaillierte Analyse deiner Trading-Performance",
          features: [
            "Erweiterte Statistiken",
            "Risk-Management Tools",
            "Performance-Tracking",
            "Verlust-Analyse"
          ],
          badge: "Analytics"
        },
        {
          icon: <TrendingUp className="h-10 w-10" />,
          title: "Portfolio-Analyse",
          description: "Umfassende Analyse deines Trading-Portfolios",
          features: [
            "Diversifikations-Analyse",
            "Risk-Reward Optimierung",
            "Correlation Analysis",
            "Performance-Benchmarks"
          ],
          badge: "Portfolio"
        },
        {
          icon: <Users className="h-10 w-10" />,
          title: "Trading-Journal",
          description: "Digitales Journal zur Dokumentation aller Trades",
          features: [
            "Automatische Trade-Erfassung",
            "Screenshot-Integration",
            "Emotion-Tracking",
            "Performance-Reports"
          ],
          badge: "Journal"
        }
      ]
    },
    {
      groupTitle: "Sicherheit & Alerts",
      groupDescription: "Professionelles Risikomanagement und Echtzeit-Benachrichtigungen",
      color: "#17E6C8",
      features: [
        {
          icon: <Shield className="h-10 w-10" />,
          title: "Risk-Management",
          description: "Professionelle Tools für optimales Risikomanagement",
          features: [
            "Position-Sizing",
            "Stop-Loss Optimierung",
            "Drawdown-Kontrolle",
            "Portfolio-Hedging"
          ],
          badge: "Safety"
        },
        {
          icon: <Zap className="h-10 w-10" />,
          title: "Live-Alerts",
          description: "Sofortige Benachrichtigungen für Trading-Gelegenheiten",
          features: [
            "Push-Notifications",
            "Email-Alerts",
            "Custom Trigger",
            "Multi-Device Sync"
          ],
          badge: "Real-time"
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
        
        {/* Features Section */}
        <section id="features" className="scroll-mt-20">
          <GroupedFeatureSection
            title="Revolutionäre Trading-Tools"
            subtitle="Alles was du für erfolgreiches Trading brauchst - powered by KI"
            featureGroups={featureGroups}
            className="bg-stravesta-dark"
          />
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-stravesta-navy/30 scroll-mt-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient opacity-0 translate-y-8 transition-all duration-700" data-animate>
                Die Zukunft des Tradings
              </h2>
              <div className="text-lg text-stravesta-lightGray space-y-6">
                <p className="opacity-0 translate-y-8 transition-all duration-700 delay-200" data-animate>
                  Stravesta kombiniert modernste KI-Technologie mit bewährten Trading-Strategien, 
                  um dir einen entscheidenden Vorteil an den Märkten zu verschaffen.
                </p>
                <p className="opacity-0 translate-y-8 transition-all duration-700 delay-400" data-animate>
                  Unsere Platform lernt von deinem Trading-Stil und hilft dir dabei, 
                  konsistente Gewinne zu erzielen und Risiken zu minimieren.
                </p>
                <p className="opacity-0 translate-y-8 transition-all duration-700 delay-600" data-animate>
                  Von der automatischen Setup-Erkennung bis hin zu intelligenten Trading-Bots - 
                  Stravesta ist dein persönlicher Trading-Assistent.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Early Access Section */}
        <section id="early-access" className="scroll-mt-20">
          <CTASection />
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Index;
