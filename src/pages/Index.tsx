
import React from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import FeatureSection from '@/components/FeatureSection';
import CTASection from '@/components/CTASection';
import { Brain, BarChart3, Bot, Target, TrendingUp, Zap, Shield, Users } from 'lucide-react';

const Index = () => {
  const mainFeatures = [
    {
      icon: <Brain className="h-12 w-12" />,
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
      icon: <BarChart3 className="h-12 w-12" />,
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
      icon: <Bot className="h-12 w-12" />,
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
      icon: <Target className="h-12 w-12" />,
      title: "Setup-Scanner",
      description: "Automatisches Scannen der Märkte nach deinen bevorzugten Setups",
      features: [
        "Multi-Timeframe Analyse",
        "Custom Setup-Filter",
        "Alert-System",
        "Markt-Überwachung"
      ],
      badge: "Scanner"
    },
    {
      icon: <TrendingUp className="h-12 w-12" />,
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
      icon: <Zap className="h-12 w-12" />,
      title: "Live-Alerts",
      description: "Sofortige Benachrichtigungen für Trading-Gelegenheiten",
      features: [
        "Push-Notifications",
        "Email-Alerts",
        "Custom Trigger",
        "Multi-Device Sync"
      ],
      badge: "Real-time"
    },
    {
      icon: <Shield className="h-12 w-12" />,
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
      icon: <Users className="h-12 w-12" />,
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
        <HeroSection />
        
        {/* Features Section */}
        <FeatureSection
          title="Revolutionäre Trading-Tools"
          subtitle="Alles was du für erfolgreiches Trading brauchst - powered by KI"
          features={mainFeatures}
          className="py-20 bg-stravesta-dark"
        />

        {/* About Section */}
        <section className="py-20 bg-stravesta-navy/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">
                Die Zukunft des Tradings
              </h2>
              <div className="text-lg text-stravesta-lightGray space-y-6">
                <p>
                  Stravesta kombiniert modernste KI-Technologie mit bewährten Trading-Strategien, 
                  um dir einen entscheidenden Vorteil an den Märkten zu verschaffen.
                </p>
                <p>
                  Unsere Platform lernt von deinem Trading-Stil und hilft dir dabei, 
                  konsistente Gewinne zu erzielen und Risiken zu minimieren.
                </p>
                <p>
                  Von der automatischen Setup-Erkennung bis hin zu intelligenten Trading-Bots - 
                  Stravesta ist dein persönlicher Trading-Assistent.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <CTASection />
      </div>
    </div>
  );
};

export default Index;
