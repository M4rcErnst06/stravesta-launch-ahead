
import React from 'react';
import Navigation from '@/components/Navigation';
import FeatureSection from '@/components/FeatureSection';
import { Bot, Target, Zap, Bell, BarChart3, Users, GraduationCap } from 'lucide-react';

const Features = () => {
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
      <Navigation />
      
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gradient page-title px-4">
            Stravesta Features
          </h1>
          <p className="text-xl md:text-2xl text-stravesta-lightGray max-w-4xl mx-auto px-4 leading-relaxed">
            Entdecke alle Funktionen die dein Trading revolutionieren werden
          </p>
        </div>

        <FeatureSection
          title="AI & Automatisierung"
          subtitle="Lass künstliche Intelligenz dein Trading auf das nächste Level bringen"
          features={aiFeatures}
          className="py-12"
        />
        
        <FeatureSection
          title="Analyse & Lernen"
          subtitle="Verstehe dein Trading besser und entwickle dich kontinuierlich weiter"
          features={analysisFeatures}
          className="py-12"
        />
      </div>
    </div>
  );
};

export default Features;
