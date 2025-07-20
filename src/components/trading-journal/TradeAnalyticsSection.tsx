import React from 'react';
import { Brain, TrendingUp, Zap, Shield, Target, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import JournalAnalyticsAnimation from './JournalAnalyticsAnimation';
import MetaTraderSyncAnimation from './MetaTraderSyncAnimation';

const TradeAnalyticsSection = () => {
  const benefits = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: "89% Pattern-Genauigkeit",
      description: "KI erkennt versteckte Trading-Patterns",
      gradient: "from-purple-500 to-indigo-600"
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "35% Performance-Boost",
      description: "Messbare Verbesserung Ihrer Winrate",
      gradient: "from-green-500 to-emerald-600"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Echtzeit-Analyse",
      description: "Sofortige Insights nach jedem Trade",
      gradient: "from-yellow-500 to-orange-600"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Risiko-Management",
      description: "Intelligente Stop-Loss Optimierung",
      gradient: "from-blue-500 to-cyan-600"
    }
  ];

  const features = [
    {
      title: "Emotion-Tracking",
      description: "KI analysiert den Zusammenhang zwischen Ihren Emotionen und Trading-Performance",
      icon: <Brain className="h-5 w-5" />,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
      border: "border-purple-500/30"
    },
    {
      title: "Pattern Recognition",
      description: "Automatische Erkennung erfolgreicher Trading-Setups und Wiederholungsstrategien",
      icon: <Target className="h-5 w-5" />,
      color: "text-green-400", 
      bg: "bg-green-500/10",
      border: "border-green-500/30"
    },
    {
      title: "Performance Analytics",
      description: "Detaillierte Analyse Ihrer Stärken und Schwächen mit konkreten Verbesserungsvorschlägen",
      icon: <TrendingUp className="h-5 w-5" />,
      color: "text-blue-400",
      bg: "bg-blue-500/10", 
      border: "border-blue-500/30"
    },
    {
      title: "Predictive Insights",
      description: "KI-basierte Vorhersagen für optimale Entry- und Exit-Zeitpunkte",
      icon: <Clock className="h-5 w-5" />,
      color: "text-orange-400",
      bg: "bg-orange-500/10",
      border: "border-orange-500/30"
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Hero Section */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16" data-animate>
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-stravesta-teal to-blue-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>
              <div className="relative bg-gradient-to-r from-stravesta-teal to-blue-500 p-6 rounded-full">
                <Brain className="h-16 w-16 text-white" />
              </div>
            </div>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-stravesta-teal to-blue-400 bg-clip-text text-transparent">
            KI Trading Journal Analytics
          </h2>
          
          <p className="text-xl md:text-2xl text-stravesta-lightGray max-w-4xl mx-auto mb-8 leading-relaxed">
            Revolutionäre KI-Technologie analysiert Ihre Trades und deckt verborgene Patterns auf, 
            die Ihre Trading-Performance um bis zu 35% steigern können
          </p>
          
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <Badge className="bg-stravesta-teal/20 text-stravesta-teal border-stravesta-teal/30 px-4 py-2 text-sm">
              🧠 KI-Powered Analytics
            </Badge>
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 px-4 py-2 text-sm">
              📊 Real-time Insights
            </Badge>
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30 px-4 py-2 text-sm">
              🎯 Pattern Recognition
            </Badge>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20" data-animate>
          {benefits.map((benefit, index) => (
            <Card 
              key={index}
              className="bg-stravesta-navy/60 border-stravesta-teal/20 hover:border-stravesta-teal/60 transition-all duration-500 hover:scale-105 relative overflow-hidden group"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              <CardContent className="p-6 text-center relative z-10">
                <div className={`inline-flex p-4 rounded-full bg-gradient-to-br ${benefit.gradient} mb-4`}>
                  <div className="text-white">
                    {benefit.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
                <p className="text-stravesta-lightGray text-sm">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Live Demo Section */}
        <div className="mb-20" data-animate>
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Live KI-Analyse Demo
            </h3>
            <p className="text-lg text-stravesta-lightGray max-w-3xl mx-auto">
              Sehen Sie live, wie unsere KI Ihr Trading Journal analysiert und strategische Insights liefert
            </p>
          </div>
          <div style={{ minHeight: '600px' }}>
            <JournalAnalyticsAnimation />
          </div>
        </div>

        {/* MetaTrader Integration */}
        <div className="mb-20" data-animate>
          <div className="text-center mb-12">
            <div className="flex justify-center items-center gap-4 mb-6">
              <div className="bg-blue-500/20 p-4 rounded-full">
                <TrendingUp className="h-10 w-10 text-blue-400" />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white">
                Automatische MetaTrader Synchronisation
              </h3>
            </div>
            <p className="text-lg text-stravesta-lightGray max-w-3xl mx-auto">
              Ihre MetaTrader Trades werden automatisch synchronisiert und von unserer KI in Echtzeit analysiert
            </p>
          </div>
          <div style={{ minHeight: '600px' }}>
            <MetaTraderSyncAnimation />
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-20" data-animate>
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Intelligente Analytics Features
            </h3>
            <p className="text-lg text-stravesta-lightGray max-w-3xl mx-auto">
              Unsere KI erkennt Patterns in Ihren Trades, die für das menschliche Auge unsichtbar sind
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className={`${feature.bg} ${feature.border} border-2 hover:scale-105 transition-all duration-500 relative overflow-hidden group`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="relative z-10">
                  <div className="flex items-center gap-4 mb-3">
                    <div className={`${feature.color} p-3 rounded-full bg-white/10`}>
                      {feature.icon}
                    </div>
                    <CardTitle className={`text-xl ${feature.color}`}>
                      {feature.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 relative z-10">
                  <p className="text-stravesta-lightGray leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Problem vs Solution */}
        <div className="mb-20" data-animate>
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Von oberflächlicher Analyse zu tiefen Insights
            </h3>
            <p className="text-lg text-stravesta-lightGray max-w-3xl mx-auto">
              Die meisten Trader analysieren ihre Trades nur oberflächlich und verpassen kritische Patterns
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Problem */}
            <Card className="bg-red-500/10 border-red-500/30 border-2 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-red-500"></div>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-white text-xl">
                  <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                    <span className="text-red-400 text-lg">✗</span>
                  </div>
                  Ohne KI-Analyse
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    "Vage Notizen ohne konkrete Erkenntnisse",
                    "Wiederholung derselben Trading-Fehler", 
                    "Keine strategische Performance-Optimierung",
                    "Emotionale statt datenbasierte Entscheidungen",
                    "Verborgene Patterns bleiben unentdeckt"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-red-400 flex-shrink-0"></div>
                      <span className="text-stravesta-lightGray">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Solution */}
            <Card className="bg-green-500/10 border-green-500/30 border-2 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-green-500"></div>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-white text-xl">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                    <span className="text-green-400 text-lg">✓</span>
                  </div>
                  Mit Stravesta KI
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    "Tiefe Pattern-Erkennung mit 89% Genauigkeit",
                    "Konkrete, umsetzbare Handlungsempfehlungen",
                    "Kontinuierliche Performance-Optimierung",
                    "Emotionale Kontrolle durch datenbasierte Insights",
                    "Predictive Analytics für bessere Entscheidungen"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0"></div>
                      <span className="text-stravesta-lightGray">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center" data-animate>
          <div className="bg-gradient-to-r from-stravesta-navy/80 to-stravesta-dark/90 rounded-3xl p-12 border border-stravesta-teal/20 backdrop-blur-sm">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Bereit für KI-optimiertes Trading?
              </h3>
              <p className="text-xl text-stravesta-lightGray mb-8">
                Starten Sie noch heute und erleben Sie, wie KI-Analytics Ihre Trading-Performance revolutioniert
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-gradient-to-r from-stravesta-teal to-blue-500 text-white font-semibold rounded-lg hover:shadow-2xl hover:shadow-stravesta-teal/30 transition-all duration-300 hover:scale-105">
                  Kostenlos testen
                </button>
                <button className="px-8 py-4 border border-stravesta-teal text-stravesta-teal font-semibold rounded-lg hover:bg-stravesta-teal hover:text-white transition-all duration-300">
                  Mehr erfahren
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