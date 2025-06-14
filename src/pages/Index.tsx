
import React from 'react';
import AnimatedBackground from '@/components/AnimatedBackground';
import ModernHeroSection from '@/components/ModernHeroSection';
import StatsSection from '@/components/StatsSection';
import EnhancedFeatureSection from '@/components/EnhancedFeatureSection';
import TestimonialSection from '@/components/TestimonialSection';
import PricingSection from '@/components/PricingSection';
import CTASection from '@/components/CTASection';

const Index = () => {
  // AI & Automatisierung Features mit Gradienten
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
      badge: "KI-Power",
      gradient: "bg-gradient-to-br from-blue-500/20 to-cyan-500/20"
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
      badge: "Smart",
      gradient: "bg-gradient-to-br from-purple-500/20 to-pink-500/20"
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
      badge: "Live",
      gradient: "bg-gradient-to-br from-yellow-500/20 to-orange-500/20"
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
      badge: "Instant",
      gradient: "bg-gradient-to-br from-green-500/20 to-emerald-500/20"
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
      badge: "Automatisch",
      gradient: "bg-gradient-to-br from-indigo-500/20 to-blue-500/20"
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
      badge: "Social",
      gradient: "bg-gradient-to-br from-pink-500/20 to-red-500/20"
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
      badge: "Pro",
      gradient: "bg-gradient-to-br from-violet-500/20 to-purple-500/20"
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
      badge: "Connect",
      gradient: "bg-gradient-to-br from-teal-500/20 to-cyan-500/20"
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
      badge: "Charts",
      gradient: "bg-gradient-to-br from-emerald-500/20 to-green-500/20"
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
      badge: "Überall",
      gradient: "bg-gradient-to-br from-orange-500/20 to-yellow-500/20"
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
      badge: "Data",
      gradient: "bg-gradient-to-br from-slate-500/20 to-gray-500/20"
    }
  ];

  return (
    <div className="min-h-screen bg-stravesta-dark overflow-hidden">
      {/* Enhanced Animated Background */}
      <AnimatedBackground />

      <div className="relative z-10">
        {/* Modern Hero Section */}
        <ModernHeroSection />
        
        {/* Enhanced Stats Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-stravesta-dark via-stravesta-navy/50 to-stravesta-dark"></div>
          <div className="relative z-10">
            <StatsSection />
          </div>
        </div>
        
        {/* AI & Automatisierung */}
        <EnhancedFeatureSection
          title="🤖 AI & Automatisierung"
          subtitle="Lass künstliche Intelligenz dein Trading auf das nächste Level bringen"
          features={aiFeatures}
          className="bg-gradient-to-br from-stravesta-navy via-stravesta-dark to-stravesta-navy"
        />
        
        {/* Analyse & Lernen */}
        <EnhancedFeatureSection
          title="📘 Analyse & Lernen"
          subtitle="Verstehe dein Trading besser und entwickle dich kontinuierlich weiter"
          features={analysisFeatures}
          className="bg-gradient-to-br from-stravesta-dark via-stravesta-navy/80 to-stravesta-dark"
        />
        
        {/* Enhanced Testimonials */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-stravesta-navy via-stravesta-dark to-stravesta-navy"></div>
          <div className="relative z-10">
            <TestimonialSection />
          </div>
        </div>
        
        {/* Integrationen */}
        <EnhancedFeatureSection
          title="🛠️ Integrationen & Erweiterungen"
          subtitle="Verbinde Stravesta nahtlos mit deinen bestehenden Trading-Tools"
          features={integrationFeatures}
          className="bg-gradient-to-br from-stravesta-dark via-stravesta-navy/60 to-stravesta-dark"
        />
        
        {/* Enhanced Pricing Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-stravesta-navy via-stravesta-dark/80 to-stravesta-navy"></div>
          <div className="relative z-10">
            <PricingSection />
          </div>
        </div>
        
        {/* Enhanced Final CTA */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-stravesta-dark via-stravesta-navy/40 to-stravesta-dark"></div>
          <div className="relative z-10">
            <CTASection />
          </div>
        </div>
        
        {/* Enhanced Footer */}
        <footer className="bg-gradient-to-br from-stravesta-navy via-stravesta-dark to-stravesta-navy border-t border-stravesta-teal/30 py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-tech-pattern opacity-5"></div>
          <div className="container mx-auto px-6 text-center relative z-10">
            <div className="mb-12 animate-fade-in">
              <h3 className="text-3xl font-bold text-gradient mb-4">Stravesta</h3>
              <p className="text-stravesta-lightGray text-lg">Trading mit KI-Power für höhere Ziele</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 max-w-4xl mx-auto">
              <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <h4 className="font-semibold text-white mb-6 text-lg">Produkt</h4>
                <ul className="space-y-3 text-stravesta-lightGray">
                  <li className="hover:text-stravesta-teal transition-colors cursor-pointer transform hover:scale-105 duration-300">Features</li>
                  <li className="hover:text-stravesta-teal transition-colors cursor-pointer transform hover:scale-105 duration-300">Preise</li>
                  <li className="hover:text-stravesta-teal transition-colors cursor-pointer transform hover:scale-105 duration-300">Beta-Zugang</li>
                  <li className="hover:text-stravesta-teal transition-colors cursor-pointer transform hover:scale-105 duration-300">Roadmap</li>
                </ul>
              </div>
              <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <h4 className="font-semibold text-white mb-6 text-lg">Community</h4>
                <ul className="space-y-3 text-stravesta-lightGray">
                  <li className="hover:text-stravesta-teal transition-colors cursor-pointer transform hover:scale-105 duration-300">Discord</li>
                  <li className="hover:text-stravesta-teal transition-colors cursor-pointer transform hover:scale-105 duration-300">Telegram</li>
                  <li className="hover:text-stravesta-teal transition-colors cursor-pointer transform hover:scale-105 duration-300">Trading Forum</li>
                  <li className="hover:text-stravesta-teal transition-colors cursor-pointer transform hover:scale-105 duration-300">Beta-Tester</li>
                </ul>
              </div>
              <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
                <h4 className="font-semibold text-white mb-6 text-lg">Legal</h4>
                <ul className="space-y-3 text-stravesta-lightGray">
                  <li className="hover:text-stravesta-teal transition-colors cursor-pointer transform hover:scale-105 duration-300">Datenschutz</li>
                  <li className="hover:text-stravesta-teal transition-colors cursor-pointer transform hover:scale-105 duration-300">Impressum</li>
                  <li className="hover:text-stravesta-teal transition-colors cursor-pointer transform hover:scale-105 duration-300">AGB</li>
                  <li className="hover:text-stravesta-teal transition-colors cursor-pointer transform hover:scale-105 duration-300">Risikohinweis</li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-stravesta-teal/30 pt-12 animate-fade-in" style={{ animationDelay: '0.8s' }}>
              <p className="text-stravesta-lightGray leading-relaxed">
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
