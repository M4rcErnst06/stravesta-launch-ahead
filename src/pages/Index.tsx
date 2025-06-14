
import React from 'react';
import HeroSection from '@/components/HeroSection';
import StatsSection from '@/components/StatsSection';
import FeatureSection from '@/components/FeatureSection';
import TestimonialSection from '@/components/TestimonialSection';
import PricingSection from '@/components/PricingSection';
import CTASection from '@/components/CTASection';

const Index = () => {
  // AI & Automatisierung Features
  const aiFeatures = [
    {
      icon: <div className="text-4xl">🤖</div>,
      title: "AI-Setup-Erkennung",
      description: "Intelligente Mustererkennung für deine erfolgreichen Trading-Strategien",
      features: [
        "Automatische Pattern-Erkennung",
        "Erfolgsbasierte Lernalgorithmen", 
        "Realtime Setup-Scanning",
        "Historische Datenanalyse"
      ]
    },
    {
      icon: <div className="text-4xl">🎯</div>,
      title: "Persönliche AI-Bots",
      description: "Maßgeschneiderte Trading-Assistenten die deinen Stil verstehen",
      features: [
        "Individuelle Lernalgorithmen",
        "Kontextbasierte Empfehlungen",
        "Adaptives Verhalten",
        "24/7 Marktüberwachung"
      ]
    },
    {
      icon: <div className="text-4xl">⚡</div>,
      title: "Live-Scan & Backtesting",
      description: "Echtzeitanalyse kombiniert mit historischer Strategiebewertung",
      features: [
        "Realtime Marktscanning",
        "Automatisches Backtesting",
        "Performance-Validierung",
        "Risiko-Assessment"
      ]
    },
    {
      icon: <div className="text-4xl">🔔</div>,
      title: "Smart Alerts",
      description: "Intelligente Benachrichtigungen für perfekte Entry-Points",
      features: [
        "Regelbasierte Alerts",
        "AI-basierte Signale",
        "Telegram/Discord Integration",
        "Mobile Push-Notifications"
      ]
    }
  ];

  // Analyse & Lernen Features
  const analysisFeatures = [
    {
      icon: <div className="text-4xl">📊</div>,
      title: "Trading-Journal",
      description: "Vollautomatische Erfassung und Analyse deiner Trades",
      features: [
        "Automatische Trade-Erfassung",
        "KPI-Dashboard",
        "Emotionale Analyse",
        "Screenshot-Integration",
        "Performance-Tracking"
      ]
    },
    {
      icon: <div className="text-4xl">👥</div>,
      title: "Community-Modul",
      description: "Vernetze dich mit gleichgesinnten Tradern und teile Strategien",
      features: [
        "Setup-Sharing Platform",
        "Community Diskussionen",
        "Leaderboards",
        "Gruppenchats",
        "Kommentar-System"
      ]
    },
    {
      icon: <div className="text-4xl">🎓</div>,
      title: "Coach-Dashboard",
      description: "Professionelle Tools für Trading-Coaches und Mentoren",
      features: [
        "Schüler-Statistiken",
        "Fortschritts-Tracking",
        "Performance-Bewertung",
        "Individuelle Analyse",
        "Coaching-Tools"
      ]
    }
  ];

  // Integrationen & Erweiterungen
  const integrationFeatures = [
    {
      icon: <div className="text-4xl">🔗</div>,
      title: "Broker-Anbindung",
      description: "Nahtlose Integration mit deinen bestehenden Trading-Plattformen",
      features: [
        "MetaTrader Integration",
        "Binance API-Anbindung",
        "Automatische Trade-Erfassung",
        "Multi-Broker Support"
      ]
    },
    {
      icon: <div className="text-4xl">📈</div>,
      title: "TradingView Integration",
      description: "Direkte Chartanalyse und Setup-Visualisierung",
      features: [
        "Live-Chart Integration",
        "Setup-Overlay",
        "Indikator-Synchronisation",
        "One-Click Trading"
      ]
    },
    {
      icon: <div className="text-4xl">📱</div>,
      title: "Multi-Platform Alerts",
      description: "Erhalte wichtige Signale auf allen deinen Geräten",
      features: [
        "Telegram Bot Integration",
        "Discord Notifications",
        "Email Alerts",
        "Mobile App Notifications"
      ]
    },
    {
      icon: <div className="text-4xl">🌍</div>,
      title: "Marktdaten & Sentiment",
      description: "Umfassende Marktanalyse für bessere Trading-Entscheidungen",
      features: [
        "Sentiment-Analyse",
        "Wirtschaftskalender",
        "News-Integration",
        "Market-Flow Daten"
      ]
    }
  ];

  // Marktplatz & Zukunft
  const marketplaceFeatures = [
    {
      icon: <div className="text-4xl">🛒</div>,
      title: "AI-Charaktere Marktplatz",
      description: "Kaufe, verkaufe und teile Trading-Bots mit der Community",
      features: [
        "Bot-Marktplatz",
        "Community-Entwicklung",
        "Bewertungssystem",
        "Monetarisierung"
      ]
    },
    {
      icon: <div className="text-4xl">💎</div>,
      title: "Strategy-Sharing",
      description: "Monetarisiere deine erfolgreichen Trading-Strategien",
      features: [
        "Strategie-Verkauf",
        "Backtesting-Berichte",
        "Performance-Nachweis",
        "Abonnement-Modelle"
      ],
      badge: "Geplant"
    },
    {
      icon: <div className="text-4xl">🏷️</div>,
      title: "White-Label Solution",
      description: "Erstelle deine eigene branded Trading-Plattform",
      features: [
        "Custom Branding",
        "Schüler-Management",
        "Kurs-Integration",
        "Analytics Dashboard"
      ],
      badge: "Geplant"
    },
    {
      icon: <div className="text-4xl">📱</div>,
      title: "Mobile App",
      description: "Trading-Power für unterwegs mit nativer Mobile App",
      features: [
        "iOS & Android App",
        "Offline-Journaling",
        "Push-Notifications",
        "Touch-optimierte UI"
      ],
      badge: "Geplant"
    }
  ];

  return (
    <div className="min-h-screen bg-stravesta-dark">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Stats Section */}
      <StatsSection />
      
      {/* AI & Automatisierung */}
      <FeatureSection
        title="🤖 AI & Automatisierung"
        subtitle="Lass künstliche Intelligenz dein Trading auf das nächste Level bringen"
        features={aiFeatures}
        className="bg-stravesta-navy"
      />
      
      {/* Analyse & Lernen */}
      <FeatureSection
        title="📘 Analyse & Lernen"
        subtitle="Verstehe dein Trading besser und entwickle dich kontinuierlich weiter"
        features={analysisFeatures}
        className="bg-stravesta-dark"
      />
      
      {/* Testimonials */}
      <TestimonialSection />
      
      {/* Integrationen */}
      <FeatureSection
        title="🛠️ Integrationen & Erweiterungen"
        subtitle="Verbinde Stravesta nahtlos mit deinen bestehenden Trading-Tools"
        features={integrationFeatures}
        className="bg-stravesta-dark"
      />
      
      {/* Pricing Section */}
      <PricingSection />
      
      {/* Marktplatz & Zukunft */}
      <FeatureSection
        title="💡 Marktplatz & Zukunft"
        subtitle="Monetarisiere dein Trading-Wissen und erschließe neue Möglichkeiten"
        features={marketplaceFeatures}
        className="bg-stravesta-navy"
      />
      
      {/* Final CTA */}
      <CTASection />
      
      {/* Footer */}
      <footer className="bg-stravesta-navy border-t border-stravesta-teal/20 py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gradient mb-2">Stravesta</h3>
            <p className="text-stravesta-lightGray">Trading mit KI-Power für höhere Ziele</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="font-semibold text-white mb-4">Produkt</h4>
              <ul className="space-y-2 text-sm text-stravesta-lightGray">
                <li>Features</li>
                <li>Preise</li>
                <li>Beta-Zugang</li>
                <li>Roadmap</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Community</h4>
              <ul className="space-y-2 text-sm text-stravesta-lightGray">
                <li>Discord</li>
                <li>Telegram</li>
                <li>Trading Forum</li>
                <li>Beta-Tester</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-stravesta-lightGray">
                <li>Datenschutz</li>
                <li>Impressum</li>
                <li>AGB</li>
                <li>Risikohinweis</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-stravesta-teal/20 pt-8">
            <p className="text-sm text-stravesta-lightGray">
              &copy; {new Date().getFullYear()} Stravesta. Alle Rechte vorbehalten. 
              <br className="md:hidden" />
              <span className="md:ml-2">Keine Finanzberatung • Nur für Bildungszwecke • Risiko-Disclaimer beachten</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
