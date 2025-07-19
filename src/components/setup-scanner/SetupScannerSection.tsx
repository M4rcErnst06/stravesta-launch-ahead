
import React from 'react';
import { Brain, Zap, Target, TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import TradingChartAnimation from './TradingChartAnimation';

const SetupScannerSection = () => {
  const features = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: "KI-Powered Erkennung",
      description: "Automatische Identifikation von Chart-Patterns und Setup-Formationen",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Echtzeit-Alerts",
      description: "Sofortige Benachrichtigungen bei entstehenden Trading-Gelegenheiten",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Präzise Entry-Points",
      description: "Exakte Ein- und Ausstiegspunkte für maximale Profitabilität",
      color: "from-green-500 to-emerald-500"
    }
  ];


  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Hero Header */}
        <div className="text-center mb-16" data-animate>
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-gradient-to-r from-stravesta-teal/20 to-blue-500/20 rounded-full border border-stravesta-teal/30">
            <Brain className="h-5 w-5 text-stravesta-teal" />
            <span className="text-sm font-medium text-stravesta-teal">AI-Powered Trading</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
            KI Setup Scanner
          </h2>
          <p className="text-xl text-stravesta-lightGray max-w-3xl mx-auto mb-8">
            Verpassen Sie nie wieder profitable Trading-Setups. Unsere KI überwacht die Märkte 24/7 
            und erkennt automatisch Ihre individuellen Trading-Strategien.
          </p>
          
        </div>

        {/* Problem/Solution Section */}
        <div className="mb-20" data-animate>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Problem */}
            <Card className="bg-red-500/10 border-red-500/30 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-orange-500"></div>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-red-300">
                  <AlertCircle className="h-6 w-6" />
                  Das Problem
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="text-lg font-semibold text-white mb-3">
                  Warum Trader Geld verlieren
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-stravesta-lightGray">Viele profitable Setups werden übersehen</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-stravesta-lightGray">Emotionale Entscheidungen führen zu Verlusten</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-stravesta-lightGray">Inkonsistente Ausführung der Strategie</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Solution */}
            <Card className="bg-green-500/10 border-green-500/30 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-500"></div>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-green-300">
                  <CheckCircle2 className="h-6 w-6" />
                  Die Lösung
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="text-lg font-semibold text-white mb-3">
                  Stravesta KI Setup Scanner
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-stravesta-lightGray">Alle Setups werden erfasst und analysiert</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-stravesta-lightGray">Systematischer, emotionsfreier Ansatz</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-stravesta-lightGray">Konsistente Performance durch KI-Unterstützung</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Chart Animation */}
        <div className="mb-20" data-animate>
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Sehen Sie die KI in Aktion
            </h3>
            <p className="text-stravesta-lightGray max-w-2xl mx-auto">
              Diese Animation zeigt, wie unsere KI profitable Setups in Echtzeit erkennt und Sie sofort benachrichtigt
            </p>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-stravesta-teal/5 to-blue-500/5 rounded-2xl blur-xl"></div>
            <div className="relative bg-stravesta-navy/50 backdrop-blur-sm rounded-2xl p-8 border border-stravesta-teal/20">
              <div style={{ minHeight: '500px' }}>
                <TradingChartAnimation />
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-16" data-animate>
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              Intelligente Trading-Unterstützung
            </h3>
            <p className="text-lg text-stravesta-lightGray max-w-2xl mx-auto">
              Drei Kern-Features, die Ihr Trading revolutionieren werden
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="bg-stravesta-navy/50 border-stravesta-teal/20 hover:border-stravesta-teal/60 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-stravesta-teal/20 relative overflow-hidden group"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                <CardHeader className="relative z-10 text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${feature.color} flex items-center justify-center text-white`}>
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl text-white mb-2">
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

        {/* CTA Section */}
        <div className="text-center" data-animate>
          <div className="bg-gradient-to-r from-stravesta-teal/10 to-blue-500/10 rounded-2xl p-8 border border-stravesta-teal/30">
            <h3 className="text-2xl font-bold text-white mb-4">
              Bereit für professionelles Trading?
            </h3>
            <p className="text-stravesta-lightGray mb-6 max-w-2xl mx-auto">
              Schließen Sie sich über 10.000 Tradern an, die bereits mit Stravesta erfolgreich handeln.
            </p>
            <Badge className="bg-stravesta-teal text-stravesta-dark font-semibold px-6 py-2">
              Früher Zugang sichern
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SetupScannerSection;
