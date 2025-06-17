
import React from 'react';
import Navigation from '@/components/Navigation';
import FeatureSection from '@/components/FeatureSection';
import { Link, TrendingUp, Smartphone, Globe } from 'lucide-react';

const Integrations = () => {
  const integrationFeatures = [
    {
      icon: <Link className="h-12 w-12 text-stravesta-teal" />,
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
      icon: <TrendingUp className="h-12 w-12 text-stravesta-teal" />,
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
      icon: <Smartphone className="h-12 w-12 text-stravesta-teal" />,
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
      icon: <Globe className="h-12 w-12 text-stravesta-teal" />,
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
    <div className="min-h-screen bg-stravesta-dark">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
            Integrationen
          </h1>
          <p className="text-xl text-stravesta-lightGray max-w-3xl mx-auto">
            Verbinde Stravesta nahtlos mit deinen bestehenden Trading-Tools
          </p>
        </div>

        <FeatureSection
          title="Integrationen & Erweiterungen"
          subtitle="Alle wichtigen Tools an einem Ort"
          features={integrationFeatures}
          className="py-12"
        />
      </div>
    </div>
  );
};

export default Integrations;
