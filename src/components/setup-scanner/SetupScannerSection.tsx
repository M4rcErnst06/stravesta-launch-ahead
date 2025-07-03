
import React from 'react';
import { Brain, Zap, Target, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import TradingChartAnimation from './TradingChartAnimation';
import { useLanguage } from '@/contexts/LanguageContext';

const SetupScannerSection = () => {
  const { t } = useLanguage();

  const scannerFeatures = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: "KI-basierte Erkennung",
      description: "Automatische Identifikation von Fibonacci-Retracements, Support/Resistance und Chart-Patterns",
      color: "#17E6C8"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Echtzeit-Alerts",
      description: "Sofortige Benachrichtigungen wenn Ihr Setup sich entwickelt - per App, E-Mail oder SMS",
      color: "#FFB800"
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Präzise Entry-Points",
      description: "Exakte Ein- und Ausstiegspunkte basierend auf technischer Analyse und Marktstruktur",
      color: "#00C851"
    }
  ];

  const tradingScenarios = [
    {
      icon: <AlertCircle className="h-5 w-5 text-red-400" />,
      title: "Ohne Stravesta",
      points: [
        "Setups werden übersehen",
        "Emotionale Entscheidungen",
        "Verpasste Gelegenheiten",
        "Inkonsistente Ergebnisse"
      ],
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/30"
    },
    {
      icon: <CheckCircle className="h-5 w-5 text-green-400" />,
      title: "Mit Stravesta",
      points: [
        "Alle Setups erfasst",
        "Systematischer Ansatz",
        "Keine verpassten Trades",
        "Konsistente Performance"
      ],
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/30"
    }
  ];

  return (
    <section className="py-20 bg-stravesta-dark relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-stravesta-teal/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-stravesta-teal/5 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16" data-animate>
          <div className="flex justify-center mb-6">
            <div className="bg-stravesta-teal/10 p-4 rounded-full">
              <Brain className="h-12 w-12 text-stravesta-teal" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            KI Setup Scanner
          </h2>
          <p className="text-xl text-stravesta-lightGray max-w-3xl mx-auto mb-4">
            Verpassen Sie nie wieder profitable Trading-Setups
          </p>
          <Badge className="bg-stravesta-teal/20 text-stravesta-teal border-stravesta-teal/30">
            AI-Powered • Echtzeit-Analyse
          </Badge>
        </div>

        {/* Chart Animation */}
        <div className="mb-20" data-animate>
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">
              Sehen Sie selbst: Ein verpasster Trade
            </h3>
            <p className="text-stravesta-lightGray">
              Diese Animation zeigt, wie schnell profitable Setups entstehen und wieder verschwinden
            </p>
          </div>
          <TradingChartAnimation />
        </div>

        {/* Problem Statement */}
        <div className="mb-16" data-animate>
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Das Problem: Verpasste Gelegenheiten
            </h3>
            <p className="text-lg text-stravesta-lightGray max-w-2xl mx-auto">
              Studien zeigen: Durchschnittliche Trader verpassen 67% aller profitablen Setups, 
              weil sie nicht permanent die Charts überwachen können.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {tradingScenarios.map((scenario, index) => (
              <Card 
                key={index}
                className={`${scenario.bgColor} ${scenario.borderColor} border-2`}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    {scenario.icon}
                    {scenario.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {scenario.points.map((point, idx) => (
                      <li key={idx} className="text-stravesta-lightGray text-sm flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-current flex-shrink-0"></div>
                        {point}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-16" data-animate>
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Intelligente Setup-Erkennung
            </h3>
            <p className="text-lg text-stravesta-lightGray max-w-2xl mx-auto">
              Unsere KI analysiert kontinuierlich die Märkte und erkennt profitable Trading-Setups 
              basierend auf Ihrer individuellen Strategie.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {scannerFeatures.map((feature, index) => (
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
                <div className="text-4xl font-bold text-stravesta-teal mb-2">95%</div>
                <div className="text-stravesta-lightGray">Setup-Erkennungsrate</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-stravesta-teal mb-2">&lt;3s</div>
                <div className="text-stravesta-lightGray">Durchschnittliche Reaktionszeit</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-stravesta-teal mb-2">24/7</div>
                <div className="text-stravesta-lightGray">Marktüberwachung</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SetupScannerSection;
