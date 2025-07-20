import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, TrendingUp, Target, Zap, BarChart3, Clock, Shield, Search, Lightbulb, Award } from 'lucide-react';
import JournalAnalyticsAnimation from './JournalAnalyticsAnimation';
import MetaTraderSyncAnimation from './MetaTraderSyncAnimation';

const TradeAnalyticsSection = () => {
  const capabilities = [
    {
      icon: <Search className="h-8 w-8" />,
      title: "Pattern Recognition",
      description: "Entdeckt versteckte Muster in Ihren Trades"
    },
    {
      icon: <Brain className="h-8 w-8" />,
      title: "Emotionsanalyse",
      description: "Analysiert emotionale Einflüsse auf Ihre Performance"
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Setup-Optimierung",
      description: "Verbessert Ihre Trading-Setups kontinuierlich"
    },
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: "Smart Insights",
      description: "Liefert actionable Handlungsempfehlungen"
    }
  ];

  const problemSolutions = [
    {
      problem: "Oberflächliche Analyse",
      solution: "Tiefe KI-gestützte Pattern-Erkennung",
      icon: <Search className="h-5 w-5" />
    },
    {
      problem: "Wiederholte Fehler",
      solution: "Präventive Fehlererkennung und Warnsystem",
      icon: <Shield className="h-5 w-5" />
    },
    {
      problem: "Emotional Trading",
      solution: "Datenbasierte Entscheidungsunterstützung",
      icon: <Brain className="h-5 w-5" />
    },
    {
      problem: "Stagnation",
      solution: "Kontinuierliche Performance-Optimierung",
      icon: <TrendingUp className="h-5 w-5" />
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        
        {/* Hero Section */}
        <div className="text-center mb-20" data-animate>
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-stravesta-teal to-blue-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
              <div className="relative bg-gradient-to-r from-stravesta-teal to-blue-500 p-8 rounded-full">
                <Brain className="h-20 w-20 text-white" />
              </div>
            </div>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-stravesta-teal to-blue-400 bg-clip-text text-transparent">
            KI Trading Analytics
          </h2>
          
          <p className="text-2xl md:text-3xl text-stravesta-lightGray max-w-5xl mx-auto mb-12 leading-relaxed">
            Revolutionäre KI-Technologie analysiert Ihre Trades und entdeckt versteckte Patterns 
            für maximale Trading-Performance
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Badge className="bg-stravesta-teal/20 text-stravesta-teal border-stravesta-teal/30 px-6 py-3 text-lg">
              🧠 Deep Learning
            </Badge>
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 px-6 py-3 text-lg">
              ⚡ Real-time Analysis
            </Badge>
            <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 px-6 py-3 text-lg">
              🎯 Smart Insights
            </Badge>
          </div>
        </div>

        {/* Capabilities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24" data-animate>
          {capabilities.map((capability, index) => (
            <Card 
              key={index}
              className="bg-gradient-to-br from-stravesta-navy/60 to-stravesta-dark/80 border-stravesta-teal/20 hover:border-stravesta-teal/60 transition-all duration-500 hover:scale-105 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-stravesta-teal/0 via-stravesta-teal/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <CardContent className="p-8 text-center relative z-10">
                <div className="bg-stravesta-teal/20 p-6 rounded-full inline-flex mb-6 group-hover:bg-stravesta-teal/30 transition-colors duration-300">
                  <div className="text-stravesta-teal">
                    {capability.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{capability.title}</h3>
                <p className="text-stravesta-lightGray text-lg">{capability.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Live Analytics Demo */}
        <div className="mb-24" data-animate>
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Live KI-Analyse Demo
            </h3>
            <p className="text-xl text-stravesta-lightGray max-w-4xl mx-auto">
              Erleben Sie live, wie unsere KI Ihr Trading Journal analysiert und strategische Insights liefert
            </p>
          </div>
          <div style={{ minHeight: '600px' }}>
            <JournalAnalyticsAnimation />
          </div>
        </div>

        {/* MetaTrader Integration */}
        <div className="mb-24" data-animate>
          <div className="text-center mb-16">
            <div className="flex justify-center items-center gap-6 mb-8">
              <div className="bg-blue-500/20 p-6 rounded-full">
                <BarChart3 className="h-12 w-12 text-blue-400" />
              </div>
              <h3 className="text-4xl md:text-5xl font-bold text-white">
                Automatische MetaTrader Sync
              </h3>
            </div>
            <p className="text-xl text-stravesta-lightGray max-w-4xl mx-auto">
              Ihre MetaTrader Trades werden automatisch synchronisiert und von unserer KI in Echtzeit analysiert
            </p>
          </div>
          <div style={{ minHeight: '600px' }}>
            <MetaTraderSyncAnimation />
          </div>
        </div>

        {/* Problem vs Solution */}
        <div className="mb-24" data-animate>
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Von Problemen zu Lösungen
            </h3>
            <p className="text-xl text-stravesta-lightGray max-w-4xl mx-auto">
              Verwandeln Sie typische Trading-Herausforderungen in strategische Vorteile
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {problemSolutions.map((item, index) => (
              <Card 
                key={index}
                className="bg-gradient-to-br from-stravesta-navy/60 to-stravesta-dark/80 border-stravesta-teal/20 hover:border-stravesta-teal/60 transition-all duration-500 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-stravesta-teal/0 via-stravesta-teal/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <CardContent className="p-8 relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-red-500/20 p-4 rounded-full">
                      <div className="text-red-400">
                        {item.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-red-400 mb-2">Problem</h4>
                      <p className="text-stravesta-lightGray text-lg">{item.problem}</p>
                    </div>
                  </div>
                  
                  <div className="h-px bg-gradient-to-r from-red-500/30 via-stravesta-teal/30 to-green-500/30 mb-6"></div>
                  
                  <div className="flex items-center gap-4">
                    <div className="bg-green-500/20 p-4 rounded-full">
                      <div className="text-green-400">
                        {item.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-green-400 mb-2">Lösung</h4>
                      <p className="text-stravesta-lightGray text-lg">{item.solution}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Advanced Features */}
        <div className="mb-24" data-animate>
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Erweiterte KI-Features
            </h3>
            <p className="text-xl text-stravesta-lightGray max-w-4xl mx-auto">
              Professionelle Analytics-Tools für maximale Trading-Effizienz
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border-purple-500/30 border-2">
              <CardHeader>
                <div className="bg-purple-500/20 p-4 rounded-full w-fit">
                  <Clock className="h-8 w-8 text-purple-400" />
                </div>
                <CardTitle className="text-2xl text-purple-400">Timing Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-stravesta-lightGray text-lg">
                  Identifiziert optimale Entry- und Exit-Zeitpunkte basierend auf historischen Daten und Marktmustern.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/30 border-2">
              <CardHeader>
                <div className="bg-green-500/20 p-4 rounded-full w-fit">
                  <Shield className="h-8 w-8 text-green-400" />
                </div>
                <CardTitle className="text-2xl text-green-400">Risk Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-stravesta-lightGray text-lg">
                  Bewertete Risikofaktoren und empfiehlt optimale Position-Sizing und Stop-Loss Strategien.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-500/10 to-yellow-500/10 border-orange-500/30 border-2">
              <CardHeader>
                <div className="bg-orange-500/20 p-4 rounded-full w-fit">
                  <Award className="h-8 w-8 text-orange-400" />
                </div>
                <CardTitle className="text-2xl text-orange-400">Performance Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-stravesta-lightGray text-lg">
                  Überwacht kontinuierlich Ihre Trading-Performance und liefert personalisierte Verbesserungsvorschläge.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center" data-animate>
          <div className="bg-gradient-to-br from-stravesta-navy/80 to-stravesta-dark/90 rounded-3xl p-16 border border-stravesta-teal/20 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-stravesta-teal/5 via-blue-500/5 to-purple-500/5 opacity-50"></div>
            
            <div className="relative z-10 max-w-4xl mx-auto">
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-8">
                Bereit für intelligentes Trading?
              </h3>
              <p className="text-2xl text-stravesta-lightGray mb-12">
                Entdecken Sie das Potenzial Ihrer Trading-Daten mit modernster KI-Technologie
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button className="px-12 py-6 bg-gradient-to-r from-stravesta-teal to-blue-500 text-white font-bold text-xl rounded-xl hover:shadow-2xl hover:shadow-stravesta-teal/30 transition-all duration-300 hover:scale-105">
                  Jetzt starten
                </button>
                <button className="px-12 py-6 border-2 border-stravesta-teal text-stravesta-teal font-bold text-xl rounded-xl hover:bg-stravesta-teal hover:text-white transition-all duration-300">
                  Live Demo ansehen
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TradeAnalyticsSection;