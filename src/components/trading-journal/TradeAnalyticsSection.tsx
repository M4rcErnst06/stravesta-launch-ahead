
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Zap, Target, BarChart3 } from 'lucide-react';
import JournalAnalyticsAnimation from './JournalAnalyticsAnimation';

const TradeAnalyticsSection = () => {
  const analyticsFeatures = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: "KI-Pattern Erkennung",
      description: "Automatische Analyse Ihrer Trading-Gewohnheiten und Erfolgspatterns",
      color: "#17E6C8"
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Emotion-Tracking",
      description: "Korrelation zwischen Emotionen und Trading-Performance",
      color: "#10B981"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Performance-Optimierung",
      description: "Konkrete Handlungsempfehlungen zur Verbesserung Ihrer Ergebnisse",
      color: "#F59E0B"
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Predictive Analytics",
      description: "KI-basierte Vorhersagen für zukünftige Trading-Entscheidungen",
      color: "#8B5CF6"
    }
  ];

  return (
    <section className="py-20 bg-stravesta-dark relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-stravesta-teal/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16" data-animate>
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-stravesta-teal/20 to-blue-500/20 p-4 rounded-full">
              <Brain className="h-12 w-12 text-stravesta-teal" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            KI Trading Journal Analytics
          </h2>
          <p className="text-xl text-stravesta-lightGray max-w-3xl mx-auto mb-4">
            Lassen Sie KI Ihre Trading-Performance analysieren und optimieren
          </p>
          <div className="flex justify-center gap-2">
            <Badge className="bg-stravesta-teal/20 text-stravesta-teal border-stravesta-teal/30">
              KI-Powered
            </Badge>
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
              Predictive Analytics
            </Badge>
          </div>
        </div>

        {/* Live Animation Demo */}
        <div className="mb-20" data-animate>
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">
              Sehen Sie die KI in Aktion
            </h3>
            <p className="text-stravesta-lightGray">
              Live-Demo: Wie unsere KI Ihr Trading Journal analysiert und strategische Insights liefert
            </p>
          </div>
          <JournalAnalyticsAnimation />
        </div>

        {/* Problem Statement */}
        <div className="mb-16" data-animate>
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Das Problem: Oberflächliche Selbstanalyse
            </h3>
            <p className="text-lg text-stravesta-lightGray max-w-2xl mx-auto">
              Die meisten Trader analysieren ihre Trades nur oberflächlich und verpassen 
              wichtige Patterns, die den Unterschied zwischen Gewinn und Verlust ausmachen.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="bg-red-500/10 border-red-500/30 border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Target className="h-5 w-5 text-red-400" />
                  Ohne KI-Analyse
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="text-stravesta-lightGray text-sm flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0"></div>
                    Vage Notizen ohne Erkenntnisse
                  </li>
                  <li className="text-stravesta-lightGray text-sm flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0"></div>
                    Wiederholung derselben Fehler
                  </li>
                  <li className="text-stravesta-lightGray text-sm flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0"></div>
                    Keine strategische Optimierung
                  </li>
                  <li className="text-stravesta-lightGray text-sm flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0"></div>
                    Emotionale Entscheidungen
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-green-500/10 border-green-500/30 border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Brain className="h-5 w-5 text-green-400" />
                  Mit Stravesta KI
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="text-stravesta-lightGray text-sm flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0"></div>
                    Tiefe Pattern-Erkennung
                  </li>
                  <li className="text-stravesta-lightGray text-sm flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0"></div>
                    Konkrete Handlungsempfehlungen
                  </li>
                  <li className="text-stravesta-lightGray text-sm flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0"></div>
                    Kontinuierliche Optimierung
                  </li>
                  <li className="text-stravesta-lightGray text-sm flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0"></div>
                    Emotionale Kontrolle
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-16" data-animate>
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Intelligente Journal-Analyse
            </h3>
            <p className="text-lg text-stravesta-lightGray max-w-2xl mx-auto">
              Unsere KI erkennt Patterns in Ihren Trades, die für das menschliche Auge unsichtbar sind.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {analyticsFeatures.map((feature, index) => (
              <Card 
                key={index}
                className="bg-stravesta-navy/50 border-stravesta-teal/20 hover:border-stravesta-teal/60 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-stravesta-teal/20 relative overflow-hidden"
                style={{ backdropFilter: 'blur(10px)' }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-stravesta-teal/0 via-stravesta-teal/10 to-stravesta-teal/0 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
                
                <CardHeader className="relative z-10">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${feature.color}20` }}
                  >
                    <div style={{ color: feature.color }}>
                      {feature.icon}
                    </div>
                  </div>
                  <CardTitle className="text-lg text-white">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-stravesta-lightGray">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="text-center" data-animate>
          <div className="bg-stravesta-navy/80 backdrop-blur-sm rounded-2xl p-8 border border-stravesta-teal/20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-stravesta-teal mb-2">89%</div>
                <div className="text-stravesta-lightGray">Pattern-Erkennungsgenauigkeit</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-stravesta-teal mb-2">35%</div>
                <div className="text-stravesta-lightGray">Durchschnittliche Performance-Steigerung</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-stravesta-teal mb-2">24/7</div>
                <div className="text-stravesta-lightGray">Kontinuierliche Analyse</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TradeAnalyticsSection;
