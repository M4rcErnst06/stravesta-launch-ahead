
import React from 'react';
import Navigation from '@/components/Navigation';
import FeatureSection from '@/components/FeatureSection';
import { BarChart3, Users, GraduationCap } from 'lucide-react';

const AnalysisFeatures = () => {
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
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
            Analyse & Lernen
          </h1>
          <p className="text-xl text-stravesta-lightGray max-w-3xl mx-auto">
            Verstehe dein Trading besser und entwickle dich kontinuierlich weiter
          </p>
        </div>

        <FeatureSection
          title="Datenbasierte Verbesserung"
          subtitle="Nutze umfassende Analysen für kontinuierliche Weiterentwicklung"
          features={analysisFeatures}
          className="py-12"
        />
      </div>
    </div>
  );
};

export default AnalysisFeatures;
