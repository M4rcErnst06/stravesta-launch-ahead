
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Link as LinkIcon, TrendingUp, Smartphone, Globe, ChevronRight } from 'lucide-react';
import FeatureSection from '@/components/FeatureSection';

const Integrations = () => {
  // Integrationen & Erweiterungen
  const integrationFeatures = [
    {
      icon: <LinkIcon className="h-12 w-12 text-stravesta-teal" />,
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
            Integrationen & Erweiterungen
          </h1>
          <p className="text-xl text-stravesta-lightGray max-w-3xl mx-auto mb-8">
            Verbinde Stravesta nahtlos mit deinen bestehenden Trading-Tools und Plattformen
          </p>
        </div>
      </section>

      {/* Integrationen */}
      <section className="py-20 bg-stravesta-dark relative">
        <div className="absolute inset-0 bg-gradient-to-b from-stravesta-navy/20 to-transparent"></div>
        <div className="relative z-10">
          <FeatureSection
            title="Verfügbare Integrationen"
            subtitle="Erweitere deine Trading-Erfahrung mit unseren leistungsstarken Verbindungen"
            features={integrationFeatures}
          />
        </div>
      </section>

      {/* Setup Guide */}
      <section className="py-20 bg-stravesta-navy">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
              Einfache Einrichtung
            </h2>
            <p className="text-xl text-stravesta-lightGray max-w-3xl mx-auto">
              In nur wenigen Schritten sind deine Tools verbunden
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-stravesta-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-stravesta-teal">1</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">API-Keys eingeben</h3>
              <p className="text-stravesta-lightGray">Verbinde deine Broker-Accounts sicher über API-Schlüssel</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-stravesta-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-stravesta-teal">2</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Einstellungen anpassen</h3>
              <p className="text-stravesta-lightGray">Konfiguriere Alerts, Benachrichtigungen und Synchronisation</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-stravesta-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-stravesta-teal">3</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Trading starten</h3>
              <p className="text-stravesta-lightGray">Nutze alle Features nahtlos über eine einzige Plattform</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-stravesta-dark text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">
            Bereit für die Integration?
          </h2>
          <p className="text-xl text-stravesta-lightGray mb-8 max-w-2xl mx-auto">
            Verbinde deine Trading-Tools noch heute und erlebe maximale Effizienz
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login">
              <Button size="lg" className="bg-stravesta-teal hover:bg-stravesta-teal/90 text-black font-semibold px-8 py-4">
                Jetzt starten
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/features">
              <Button size="lg" variant="outline" className="border-stravesta-teal text-stravesta-teal hover:bg-stravesta-teal hover:text-black px-8 py-4">
                Alle Features ansehen
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Integrations;
