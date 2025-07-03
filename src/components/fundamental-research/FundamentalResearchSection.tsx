
import React, { useEffect, useState } from 'react';
import { TrendingUp, AlertTriangle, Globe, BarChart3 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface NewsAlert {
  id: string;
  title: string;
  impact: 'high' | 'medium' | 'low';
  category: string;
  time: string;
  currency: string;
  description: string;
}

const FundamentalResearchSection = () => {
  const [activeAlert, setActiveAlert] = useState(0);
  const [showAnalysis, setShowAnalysis] = useState(false);

  const newsAlerts: NewsAlert[] = [
    {
      id: 'snb-rate',
      title: 'SNB Zinssenkung auf 1.0%',
      impact: 'high',
      category: 'Zentralbank',
      time: '14:30',
      currency: 'CHF',
      description: 'Schweizerische Nationalbank senkt Leitzins um 25 Basispunkte'
    },
    {
      id: 'hormuz-strait',
      title: 'Hormuz-Straße: Geopolitische Spannungen',
      impact: 'high',
      category: 'Geopolitik',
      time: '16:45',
      currency: 'USD/EUR',
      description: 'Iran-Israel Konflikt bedroht wichtige Handelsroute'
    },
    {
      id: 'usdchf-analysis',
      title: 'USD/CHF Fundamentalanalyse',
      impact: 'medium',
      category: 'Währungsanalyse',
      time: '18:20',
      currency: 'USD/CHF',
      description: 'Technische und fundamentale Faktoren für USD/CHF Prognose'
    }
  ];

  const fundamentalFactors = [
    {
      factor: 'SNB Geldpolitik',
      impact: 'Bearish CHF',
      strength: 85,
      description: 'Zinssenkung schwächt Schweizer Franken'
    },
    {
      factor: 'Geopolitische Risiken',
      impact: 'Bullish USD',
      strength: 78,
      description: 'Safe Haven Nachfrage steigt'
    },
    {
      factor: 'Handelsbilanz',
      impact: 'Neutral USD/CHF',
      strength: 45,
      description: 'Ausgeglichene Handelsdaten'
    },
    {
      factor: 'Inflationsdifferenz',
      impact: 'Bullish USD',
      strength: 62,
      description: 'US Inflation über CH Inflation'
    }
  ];

  useEffect(() => {
    const alertInterval = setInterval(() => {
      setActiveAlert((prev) => (prev + 1) % newsAlerts.length);
    }, 4000);

    const analysisTimer = setTimeout(() => {
      setShowAnalysis(true);
    }, 2000);

    return () => {
      clearInterval(alertInterval);
      clearTimeout(analysisTimer);
    };
  }, [newsAlerts.length]);

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'low': return 'text-green-400 bg-green-500/20 border-green-500/30';
      default: return 'text-stravesta-lightGray bg-stravesta-darkGray/20 border-stravesta-darkGray/30';
    }
  };

  const getStrengthColor = (strength: number) => {
    if (strength >= 70) return 'bg-red-500';
    if (strength >= 50) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <section className="py-20 bg-stravesta-dark relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-stravesta-teal/5 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            KI News & Fundamentalanalyse
          </h2>
          <p className="text-xl text-stravesta-lightGray max-w-3xl mx-auto mb-6">
            Echtzeit-Marktanalyse mit KI-gestützter Fundamentalanalyse und Nachrichtenbewertung
          </p>
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
            Live News Integration
          </Badge>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Live News Alerts */}
          <Card className="bg-gradient-to-br from-stravesta-darkGray/80 to-stravesta-darkGray/40 backdrop-blur-sm border border-stravesta-teal/20 hover:border-stravesta-teal/40 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-full bg-gradient-to-r from-red-500/20 to-orange-500/20">
                  <AlertTriangle className="h-6 w-6 text-red-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Live Markt-Alerts</h3>
                <div className="flex-1"></div>
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              </div>

              {/* News Alert Animation */}
              <div className="space-y-4 min-h-[300px]">
                {newsAlerts.map((alert, index) => (
                  <div
                    key={alert.id}
                    className={`
                      p-4 rounded-lg border transition-all duration-700 transform
                      ${index === activeAlert 
                        ? 'opacity-100 scale-100 translate-y-0 border-stravesta-teal/40 bg-stravesta-teal/10' 
                        : index < activeAlert 
                          ? 'opacity-40 scale-95 -translate-y-2 border-stravesta-darkGray/20 bg-stravesta-darkGray/20'
                          : 'opacity-20 scale-105 translate-y-2 border-stravesta-darkGray/10 bg-stravesta-darkGray/10'
                      }
                    `}
                  >
                    <div className="flex items-start gap-3">
                      <Badge className={`${getImpactColor(alert.impact)} text-xs px-2 py-1`}>
                        {alert.impact.toUpperCase()}
                      </Badge>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm text-stravesta-lightGray">{alert.time}</span>
                          <Badge variant="outline" className="text-xs border-stravesta-teal/30 text-stravesta-teal">
                            {alert.currency}
                          </Badge>
                        </div>
                        <h4 className="font-semibold text-white mb-1">{alert.title}</h4>
                        <p className="text-sm text-stravesta-lightGray">{alert.description}</p>
                        <div className="mt-2">
                          <Badge variant="outline" className="text-xs border-blue-500/30 text-blue-400">
                            {alert.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Fundamental Analysis */}
          <Card className="bg-gradient-to-br from-blue-500/20 to-blue-500/5 backdrop-blur-sm border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20">
                  <BarChart3 className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white">USD/CHF Fundamentalanalyse</h3>
              </div>

              {/* Analysis Factors */}
              <div className={`space-y-4 transition-all duration-1000 ${showAnalysis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                {fundamentalFactors.map((factor, index) => (
                  <div
                    key={factor.factor}
                    className={`
                      p-4 rounded-lg bg-stravesta-darkGray/30 border border-stravesta-darkGray/20
                      transition-all duration-700 delay-${index * 200}
                      ${showAnalysis ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}
                    `}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-white">{factor.factor}</h4>
                      <Badge className={`${
                        factor.impact.includes('Bullish') ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                        factor.impact.includes('Bearish') ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                        'bg-gray-500/20 text-gray-400 border-gray-500/30'
                      } text-xs`}>
                        {factor.impact}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-stravesta-lightGray mb-3">{factor.description}</p>
                    
                    {/* Strength Bar */}
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-stravesta-lightGray min-w-[60px]">Stärke:</span>
                      <div className="flex-1 h-2 bg-stravesta-darkGray rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${getStrengthColor(factor.strength)} transition-all duration-1000 delay-${index * 300}`}
                          style={{ 
                            width: showAnalysis ? `${factor.strength}%` : '0%'
                          }}
                        ></div>
                      </div>
                      <span className="text-xs text-stravesta-lightGray min-w-[30px]">{factor.strength}%</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Analysis Summary */}
              <div className={`mt-6 p-4 rounded-lg bg-gradient-to-r from-stravesta-teal/20 to-blue-500/20 border border-stravesta-teal/30 transition-all duration-1000 delay-1000 ${showAnalysis ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-5 w-5 text-stravesta-teal" />
                  <h4 className="font-semibold text-white">KI-Prognose</h4>
                </div>
                <p className="text-stravesta-lightGray text-sm">
                  Basierend auf aktuellen fundamentalen Faktoren zeigt USD/CHF eine 
                  <span className="text-green-400 font-medium"> bullische Tendenz</span> mit 
                  Zielbereich 0.8950-0.9100. SNB-Zinssenkung und geopolitische Risiken unterstützen USD-Stärke.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Key Features */}
        <div className="mt-12 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            {
              icon: <Globe className="h-6 w-6" />,
              title: 'Globale News Integration',
              description: 'Echtzeit-Nachrichten aus über 200 Quellen'
            },
            {
              icon: <BarChart3 className="h-6 w-6" />,
              title: 'KI-Fundamentalanalyse',
              description: 'Automatische Bewertung von Wirtschaftsfaktoren'
            },
            {
              icon: <AlertTriangle className="h-6 w-6" />,
              title: 'Impact-Bewertung',
              description: 'Sofortige Einschätzung der Marktauswirkungen'
            }
          ].map((feature, index) => (
            <div
              key={feature.title}
              className={`text-center p-4 transition-all duration-700 delay-${index * 200} ${showAnalysis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <div className={`inline-flex p-3 rounded-full bg-gradient-to-r from-stravesta-teal/20 to-blue-500/20 mb-3 ${feature.title.includes('KI') ? 'text-stravesta-teal' : 'text-blue-400'}`}>
                {feature.icon}
              </div>
              <h4 className="font-semibold text-white mb-2">{feature.title}</h4>
              <p className="text-sm text-stravesta-lightGray">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FundamentalResearchSection;
