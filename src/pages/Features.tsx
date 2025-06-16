
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Bot, Target, Zap, Bell, BarChart3, Users, GraduationCap, TrendingUp, Smartphone, Globe, ChevronRight } from 'lucide-react';
import FeatureSection from '@/components/FeatureSection';

const Features = () => {
  // AI & Automatisierung Features
  const aiFeatures = [
    {
      icon: <Bot className="h-12 w-12 text-stravesta-teal" />,
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
      icon: <Target className="h-12 w-12 text-stravesta-teal" />,
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
      icon: <Zap className="h-12 w-12 text-stravesta-teal" />,
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
      icon: <Bell className="h-12 w-12 text-stravesta-teal" />,
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
      icon: <BarChart3 className="h-12 w-12 text-stravesta-teal" />,
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
      icon: <Users className="h-12 w-12 text-stravesta-teal" />,
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
      icon: <GraduationCap className="h-12 w-12 text-stravesta-teal" />,
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

  return (
    <div className="min-h-screen bg-stravesta-dark">
      {/* Header */}
      <header className="bg-stravesta-navy border-b border-stravesta-teal/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <ArrowLeft className="h-5 w-5 text-stravesta-teal" />
              <span className="text-stravesta-lightGray hover:text-white transition-colors">Zurück zur Startseite</span>
            </Link>
            <Link to="/login">
              <Button className="bg-stravesta-teal hover:bg-stravesta-teal/90 text-black font-semibold">
                Anmelden
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-stravesta-dark via-stravesta-navy to-stravesta-dark relative overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-stravesta-teal/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-stravesta-teal/5 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient">
            Alle Features im Überblick
          </h1>
          <p className="text-xl text-stravesta-lightGray max-w-3xl mx-auto mb-8">
            Entdecke die vollständige Palette unserer KI-gestützten Trading-Tools
          </p>
        </div>
      </section>

      {/* AI & Automatisierung */}
      <section className="py-20 bg-stravesta-navy relative">
        <div className="absolute inset-0 bg-gradient-to-r from-stravesta-teal/5 via-transparent to-stravesta-teal/5"></div>
        <div className="relative z-10">
          <FeatureSection
            title="AI & Automatisierung"
            subtitle="Lass künstliche Intelligenz dein Trading auf das nächste Level bringen"
            features={aiFeatures}
          />
        </div>
      </section>

      {/* Analyse & Tools */}
      <section className="py-20 bg-stravesta-dark relative">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-stravesta-teal to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-stravesta-teal to-transparent"></div>
        </div>
        <div className="relative z-10">
          <FeatureSection
            title="Analyse & Lernen"
            subtitle="Verstehe dein Trading besser und entwickle dich kontinuierlich weiter"
            features={analysisFeatures}
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-stravesta-navy text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">
            Bereit für professionelles Trading?
          </h2>
          <p className="text-xl text-stravesta-lightGray mb-8 max-w-2xl mx-auto">
            Starte noch heute mit unserem Beta-Zugang und erlebe die Zukunft des Tradings
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login">
              <Button size="lg" className="bg-stravesta-teal hover:bg-stravesta-teal/90 text-black font-semibold px-8 py-4">
                Beta-Zugang sichern
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/integrations">
              <Button size="lg" variant="outline" className="border-stravesta-teal text-stravesta-teal hover:bg-stravesta-teal hover:text-black px-8 py-4">
                Integrationen ansehen
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
