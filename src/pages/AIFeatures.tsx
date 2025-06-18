
import React from 'react';
import Navigation from '@/components/Navigation';
import FeatureSection from '@/components/FeatureSection';
import { Bot, Target, Zap, Bell } from 'lucide-react';

const AIFeatures = () => {
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

  return (
    <div className="min-h-screen bg-stravesta-dark">
      <Navigation />
      
      <div className="container mx-auto px-8 py-16">
        <div className="text-center mb-20">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gradient page-title">
              AI & Automatisierung
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-stravesta-lightGray max-w-4xl mx-auto px-6 leading-relaxed">
            Lass künstliche Intelligenz dein Trading auf das nächste Level bringen
          </p>
        </div>

        <FeatureSection
          title="Intelligente Trading-Assistenten"
          subtitle="Modernste KI-Technologie für optimale Trading-Ergebnisse"
          features={aiFeatures}
          className="py-12"
        />
      </div>
    </div>
  );
};

export default AIFeatures;
