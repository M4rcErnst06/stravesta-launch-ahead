
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
      icon: <div className="text-5xl">🤖</div>,
      title: "AI-Setup-Erkennung",
      description: "Intelligente Mustererkennung für deine erfolgreichen Trading-Strategien",
      features: [
        "Automatische Pattern-Erkennung",
        "Erfolgsbasierte Lernalgorithmen", 
        "Realtime Setup-Scanning",
        "Historische Datenanalyse"
      ],
      badge: "KI-Power"
    },
    {
      icon: <div className="text-5xl">🎯</div>,
      title: "Persönliche AI-Bots",
      description: "Maßgeschneiderte Trading-Assistenten die deinen Stil verstehen",
      features: [
        "Individuelle Lernalgorithmen",
        "Kontextbasierte Empfehlungen",
        "Adaptives Verhalten",
        "24/7 Marktüberwachung"
      ],
      badge: "Smart"
    },
    {
      icon: <div className="text-5xl">⚡</div>,
      title: "Live-Scan & Backtesting",
      description: "Echtzeitanalyse kombiniert mit historischer Strategiebewertung",
      features: [
        "Realtime Marktscanning",
        "Automatisches Backtesting",
        "Performance-Validierung",
        "Risiko-Assessment"
      ],
      badge: "Live"
    },
    {
      icon: <div className="text-5xl">🔔</div>,
      title: "Smart Alerts",
      description: "Intelligente Benachrichtigungen für perfekte Entry-Points",
      features: [
        "Regelbasierte Alerts",
        "AI-basierte Signale",
        "Telegram/Discord Integration",
        "Mobile Push-Notifications"
      ],
      badge: "Instant"
    }
  ];

  // Analyse & Lernen Features
  const analysisFeatures = [
    {
      icon: <div className="text-5xl">📊</div>,
      title: "Trading-Journal",
      description: "Vollautomatische Erfassung und Analyse deiner Trades",
      features: [
        "Automatische Trade-Erfassung",
        "KPI-Dashboard",
        "Emotionale Analyse",
        "Screenshot-Integration",
        "Performance-Tracking"
      ],
      badge: "Automatisch"
    },
    {
      icon: <div className="text-5xl">👥</div>,
      title: "Community-Modul",
      description: "Vernetze dich mit gleichgesinnten Tradern und teile Strategien",
      features: [
        "Setup-Sharing Platform",
        "Community Diskussionen",
        "Leaderboards",
        "Gruppenchats",
        "Kommentar-System"
      ],
      badge: "Social"
    },
    {
      icon: <div className="text-5xl">🎓</div>,
      title: "Coach-Dashboard",
      description: "Professionelle Tools für Trading-Coaches und Mentoren",
      features: [
        "Schüler-Statistiken",
        "Fortschritts-Tracking",
        "Performance-Bewertung",
        "Individuelle Analyse",
        "Coaching-Tools"
      ],
      badge: "Pro"
    }
  ];

  // Integrationen & Erweiterungen
  const integrationFeatures = [
    {
      icon: <div className="text-5xl">🔗</div>,
      title: "Broker-Anbindung",
      description: "Nahtlose Integration mit deinen bestehenden Trading-Plattformen",
      features: [
        "MetaTrader Integration",
        "Binance API-Anbindung",
        "Automatische Trade-Erfassung",
        "Multi-Broker Support"
      ],
      badge: "Connect"
    },
    {
      icon: <div className="text-5xl">📈</div>,
      title: "TradingView Integration",
      description: "Direkte Chartanalyse und Setup-Visualisierung",
      features: [
        "Live-Chart Integration",
        "Setup-Overlay",
        "Indikator-Synchronisation",
        "One-Click Trading"
      ],
      badge: "Charts"
    },
    {
      icon: <div className="text-5xl">📱</div>,
      title: "Multi-Platform Alerts",
      description: "Erhalte wichtige Signale auf allen deinen Geräten",
      features: [
        "Telegram Bot Integration",
        "Discord Notifications",
        "Email Alerts",
        "Mobile App Notifications"
      ],
      badge: "Überall"
    },
    {
      icon: <div className="text-5xl">🌍</div>,
      title: "Marktdaten & Sentiment",
      description: "Umfassende Marktanalyse für bessere Trading-Entscheidungen",
      features: [
        "Sentiment-Analyse",
        "Wirtschaftskalender",
        "News-Integration",
        "Market-Flow Daten"
      ],
      badge: "Data"
    }
  ];

  return (
    <div className="min-h-screen bg-stravesta-dark overflow-hidden">
      {/* Static Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-10 left-10 w-96 h-96 bg-stravesta-teal/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-stravesta-teal/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-stravesta-teal/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Stats Section */}
        <StatsSection />
        
        {/* AI & Automatisierung */}
        <section className="py-20 bg-stravesta-navy relative">
          <div className="absolute inset-0 bg-gradient-to-r from-stravesta-teal/5 via-transparent to-stravesta-teal/5"></div>
          <div className="relative z-10">
            <FeatureSection
              title="🤖 AI & Automatisierung"
              subtitle="Lass künstliche Intelligenz dein Trading auf das nächste Level bringen"
              features={aiFeatures}
            />
          </div>
        </section>
        
        {/* Analyse & Lernen */}
        <section className="py-20 bg-stravesta-dark relative">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-stravesta-teal to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-stravesta-teal to-transparent"></div>
          </div>
          <div className="relative z-10">
            <FeatureSection
              title="📘 Analyse & Lernen"
              subtitle="Verstehe dein Trading besser und entwickle dich kontinuierlich weiter"
              features={analysisFeatures}
            />
          </div>
        </section>
        
        {/* Testimonials */}
        <TestimonialSection />
        
        {/* Integrationen */}
        <section className="py-20 bg-stravesta-dark relative">
          <div className="absolute inset-0 bg-gradient-to-b from-stravesta-navy/20 to-transparent"></div>
          <div className="relative z-10">
            <FeatureSection
              title="🛠️ Integrationen & Erweiterungen"
              subtitle="Verbinde Stravesta nahtlos mit deinen bestehenden Trading-Tools"
              features={integrationFeatures}
            />
          </div>
        </section>
        
        {/* Pricing Section */}
        <PricingSection />
        
        {/* Final CTA */}
        <CTASection />
        
        {/* Footer */}
        <footer className="bg-stravesta-navy border-t border-stravesta-teal/20 py-12 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-stravesta-dark/50 to-transparent"></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gradient mb-2">Stravesta</h3>
              <p className="text-stravesta-lightGray">Trading mit KI-Power für höhere Ziele</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <h4 className="font-semibold text-white mb-4">Produkt</h4>
                <ul className="space-y-2 text-sm text-stravesta-lightGray">
                  <li className="hover:text-stravesta-teal transition-colors cursor-pointer">Features</li>
                  <li className="hover:text-stravesta-teal transition-colors cursor-pointer">Preise</li>
                  <li className="hover:text-stravesta-teal transition-colors cursor-pointer">Beta-Zugang</li>
                  <li className="hover:text-stravesta-teal transition-colors cursor-pointer">Roadmap</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-4">Community</h4>
                <ul className="space-y-2 text-sm text-stravesta-lightGray">
                  <li className="hover:text-stravesta-teal transition-colors cursor-pointer">Discord</li>
                  <li className="hover:text-stravesta-teal transition-colors cursor-pointer">Telegram</li>
                  <li className="hover:text-stravesta-teal transition-colors cursor-pointer">Trading Forum</li>
                  <li className="hover:text-stravesta-teal transition-colors cursor-pointer">Beta-Tester</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-4">Legal</h4>
                <ul className="space-y-2 text-sm text-stravesta-lightGray">
                  <li className="hover:text-stravesta-teal transition-colors cursor-pointer">Datenschutz</li>
                  <li className="hover:text-stravesta-teal transition-colors cursor-pointer">Impressum</li>
                  <li className="hover:text-stravesta-teal transition-colors cursor-pointer">AGB</li>
                  <li className="hover:text-stravesta-teal transition-colors cursor-pointer">Risikohinweis</li>
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
    </div>
  );
};

export default Index;
