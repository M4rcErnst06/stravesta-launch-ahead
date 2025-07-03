
import React, { useEffect, useRef, useState } from 'react';
import { Brain, Target, TrendingUp, AlertTriangle, Globe, BarChart3 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface CardData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgGradient: string;
  features: string[];
  animationType: 'scanner' | 'journal' | 'analysis' | 'news';
}

const StackedCardsSection = () => {
  const [activeCard, setActiveCard] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);
  const [newsActiveAlert, setNewsActiveAlert] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const newsAlerts = [
    {
      id: 'snb-rate',
      title: 'SNB Zinssenkung auf 1.0%',
      impact: 'high' as const,
      category: 'Zentralbank',
      time: '14:30',
      currency: 'CHF',
      description: 'Schweizerische Nationalbank senkt Leitzins um 25 Basispunkte'
    },
    {
      id: 'hormuz-strait',
      title: 'Hormuz-Straße: Geopolitische Spannungen',
      impact: 'high' as const,
      category: 'Geopolitik',
      time: '16:45',
      currency: 'USD/EUR',
      description: 'Iran-Israel Konflikt bedroht wichtige Handelsroute'
    },
    {
      id: 'usdchf-analysis',
      title: 'USD/CHF Fundamentalanalyse',
      impact: 'medium' as const,
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

  const cardData: CardData[] = [
    {
      id: 'setup-scanner',
      title: 'KI Setup Scanner',
      subtitle: 'Verpassen Sie nie wieder profitable Trading-Setups',
      description: 'Unsere KI analysiert kontinuierlich die Märkte und erkennt profitable Trading-Setups basierend auf Ihrer individuellen Strategie.',
      icon: <Target className="h-8 w-8" />,
      color: 'text-stravesta-teal',
      bgGradient: 'from-stravesta-teal/20 to-stravesta-teal/5',
      features: [
        '95% Setup-Erkennungsrate',
        '<3s Durchschnittliche Reaktionszeit',
        '24/7 Marktüberwachung',
        'Echtzeit-Alerts per App, E-Mail oder SMS'
      ],
      animationType: 'scanner'
    },
    {
      id: 'journal-analytics',
      title: 'KI Trading Journal Analytics',
      subtitle: 'Lassen Sie KI Ihre Trading-Performance analysieren',
      description: 'Automatische MetaTrader Integration mit intelligenter Analyse Ihrer Trading-Patterns und Performance-Optimierung.',
      icon: <Brain className="h-8 w-8" />,
      color: 'text-blue-400',
      bgGradient: 'from-blue-500/20 to-blue-500/5',
      features: [
        '89% Pattern-Erkennungsgenauigkeit',
        '35% Durchschnittliche Performance-Steigerung',
        'Automatische MetaTrader Synchronisation',
        'Kontinuierliche KI-Analyse'
      ],
      animationType: 'journal'
    },
    {
      id: 'ai-analysis',
      title: 'KI-Analyse in Aktion',
      subtitle: 'Strategische Insights für bessere Trading-Entscheidungen',
      description: 'Live-Demo unserer KI-Analysefähigkeiten mit Emotion-Erkennung, Pattern-Analyse und strategischen Handlungsempfehlungen.',
      icon: <TrendingUp className="h-8 w-8" />,
      color: 'text-green-400',
      bgGradient: 'from-green-500/20 to-green-500/5',
      features: [
        'Emotion-Alert System',
        'Pattern-basierte Optimierungen',
        'Timing-Insights für bessere Entries',
        'Personalisierte Handlungsempfehlungen'
      ],
      animationType: 'analysis'
    },
    {
      id: 'news-fundamental',
      title: 'KI News & Fundamentalanalyse',
      subtitle: 'Echtzeit-Marktanalyse mit KI-gestützter Fundamentalanalyse',
      description: 'Live News Integration mit automatischer Bewertung der Marktauswirkungen und fundamentaler Analyse.',
      icon: <AlertTriangle className="h-8 w-8" />,
      color: 'text-red-400',
      bgGradient: 'from-red-500/20 to-orange-500/5',
      features: [
        'Live News aus 200+ Quellen',
        'Automatische Impact-Bewertung',
        'KI-Fundamentalanalyse',
        'Geopolitische Risiko-Analyse'
      ],
      animationType: 'news'
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const containerTop = container.offsetTop;
      const containerHeight = container.offsetHeight;
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      const scrollProgress = (scrollY - containerTop + windowHeight * 0.5) / containerHeight;
      const cardIndex = Math.floor(scrollProgress * cardData.length);
      const clampedIndex = Math.max(0, Math.min(cardData.length - 1, cardIndex));

      setActiveCard(clampedIndex);
      setShowAnimation(scrollProgress > 0.1);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [cardData.length]);

  // News alerts rotation for the news card
  useEffect(() => {
    if (activeCard === 3) { // News card is active
      const alertInterval = setInterval(() => {
        setNewsActiveAlert((prev) => (prev + 1) % newsAlerts.length);
      }, 3000);
      return () => clearInterval(alertInterval);
    }
  }, [activeCard, newsAlerts.length]);

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

  const renderCardContent = (card: CardData) => {
    const isActive = cardData.indexOf(card) === activeCard;

    switch (card.animationType) {
      case 'scanner':
        return (
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-bold text-white mb-4">Intelligente Setup-Erkennung</h4>
              <div className="space-y-4">
                {[
                  { title: 'KI-basierte Erkennung', desc: 'Fibonacci-Retracements, Support/Resistance' },
                  { title: 'Echtzeit-Alerts', desc: 'App, E-Mail oder SMS Benachrichtigungen' },
                  { title: 'Präzise Entry-Points', desc: 'Exakte Ein- und Ausstiegspunkte' }
                ].map((feature, idx) => (
                  <div 
                    key={idx}
                    className={`p-3 bg-stravesta-darkGray/30 rounded-lg transition-all duration-500 delay-${idx * 200} ${
                      isActive ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                    }`}
                  >
                    <h5 className="font-medium text-stravesta-teal">{feature.title}</h5>
                    <p className="text-sm text-stravesta-lightGray">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-stravesta-navy/50 rounded-lg p-6">
              <h4 className="text-lg font-bold text-white mb-6">Performance Statistiken</h4>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { label: 'Setup-Erkennungsrate', value: '95%' },
                  { label: 'Reaktionszeit', value: '<3s' },
                  { label: 'Marktüberwachung', value: '24/7' }
                ].map((stat, idx) => (
                  <div key={idx} className="text-center">
                    <div className={`text-2xl font-bold text-stravesta-teal mb-1 transition-all duration-700 delay-${idx * 300} ${
                      isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                    }`}>
                      {stat.value}
                    </div>
                    <div className="text-stravesta-lightGray text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'journal':
        return (
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 rounded-lg p-6">
              <h4 className="text-xl font-bold text-white mb-4">MetaTrader Integration</h4>
              <div className="space-y-3">
                {[
                  'Automatische Synchronisation',
                  'Echtzeit-Datenübertragung',
                  'Pattern-Erkennung',
                  'Performance-Tracking'
                ].map((feature, idx) => (
                  <div 
                    key={idx}
                    className={`flex items-center gap-3 transition-all duration-500 delay-${idx * 150} ${
                      isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                    }`}
                  >
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-stravesta-lightGray">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xl font-bold text-white mb-4">KI-Analytics Dashboard</h4>
              <div className="space-y-4">
                {[
                  { metric: 'Win Rate Improvement', value: '+35%', color: 'text-green-400' },
                  { metric: 'Risk Management Score', value: '8.7/10', color: 'text-blue-400' },
                  { metric: 'Pattern Recognition', value: '89%', color: 'text-stravesta-teal' }
                ].map((item, idx) => (
                  <div 
                    key={idx}
                    className={`bg-stravesta-darkGray/30 p-4 rounded-lg transition-all duration-700 delay-${idx * 200} ${
                      isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-stravesta-lightGray">{item.metric}</span>
                      <span className={`font-bold ${item.color}`}>{item.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'analysis':
        return (
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-bold text-white mb-4">Emotionale Analyse</h4>
              <div className="space-y-4">
                {[
                  { emotion: 'Fear & Greed Index', level: 75, color: 'bg-red-500' },
                  { emotion: 'Market Sentiment', level: 60, color: 'bg-yellow-500' },
                  { emotion: 'Volatility Stress', level: 40, color: 'bg-green-500' }
                ].map((item, idx) => (
                  <div 
                    key={idx}
                    className={`transition-all duration-700 delay-${idx * 200} ${
                      isActive ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                    }`}
                  >
                    <div className="flex justify-between mb-2">
                      <span className="text-stravesta-lightGray">{item.emotion}</span>
                      <span className="text-white">{item.level}%</span>
                    </div>
                    <div className="h-2 bg-stravesta-darkGray rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${item.color} transition-all duration-1000 delay-${idx * 300}`}
                        style={{ width: isActive ? `${item.level}%` : '0%' }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 rounded-lg p-6">
              <h4 className="text-xl font-bold text-white mb-4">KI-Empfehlungen</h4>
              <div className="space-y-3">
                {[
                  { action: 'Position Size', recommendation: 'Reduzieren um 25%', impact: 'high' },
                  { action: 'Entry Timing', recommendation: 'Warten auf Pullback', impact: 'medium' },
                  { action: 'Risk Management', recommendation: 'Stop Loss anpassen', impact: 'high' }
                ].map((rec, idx) => (
                  <div 
                    key={idx}
                    className={`p-3 bg-stravesta-darkGray/30 rounded-lg transition-all duration-500 delay-${idx * 150} ${
                      isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="font-medium text-green-400">{rec.action}</h5>
                        <p className="text-sm text-stravesta-lightGray">{rec.recommendation}</p>
                      </div>
                      <Badge className={`${rec.impact === 'high' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'} text-xs`}>
                        {rec.impact}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'news':
        return (
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                Live Markt-Alerts
              </h4>
              <div className="space-y-4">
                {newsAlerts.map((alert, index) => (
                  <div
                    key={alert.id}
                    className={`p-4 rounded-lg border transition-all duration-700 ${
                      index === newsActiveAlert && isActive
                        ? 'opacity-100 scale-100 translate-y-0 border-stravesta-teal/40 bg-stravesta-teal/10' 
                        : index < newsActiveAlert 
                          ? 'opacity-40 scale-95 -translate-y-2 border-stravesta-darkGray/20 bg-stravesta-darkGray/20'
                          : 'opacity-20 scale-105 translate-y-2 border-stravesta-darkGray/10 bg-stravesta-darkGray/10'
                    }`}
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
                        <h5 className="font-semibold text-white mb-1">{alert.title}</h5>
                        <p className="text-sm text-stravesta-lightGray">{alert.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xl font-bold text-white mb-4">USD/CHF Fundamentalanalyse</h4>
              <div className="space-y-4">
                {fundamentalFactors.map((factor, index) => (
                  <div
                    key={factor.factor}
                    className={`p-4 rounded-lg bg-stravesta-darkGray/30 border border-stravesta-darkGray/20 transition-all duration-700 delay-${index * 200} ${
                      isActive ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-white">{factor.factor}</h5>
                      <Badge className={`${
                        factor.impact.includes('Bullish') ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                        factor.impact.includes('Bearish') ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                        'bg-gray-500/20 text-gray-400 border-gray-500/30'
                      } text-xs`}>
                        {factor.impact}
                      </Badge>
                    </div>
                    <p className="text-sm text-stravesta-lightGray mb-3">{factor.description}</p>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-stravesta-lightGray min-w-[60px]">Stärke:</span>
                      <div className="flex-1 h-2 bg-stravesta-darkGray rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${getStrengthColor(factor.strength)} transition-all duration-1000 delay-${index * 300}`}
                          style={{ width: isActive ? `${factor.strength}%` : '0%' }}
                        ></div>
                      </div>
                      <span className="text-xs text-stravesta-lightGray min-w-[30px]">{factor.strength}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section className="py-20 bg-stravesta-dark relative overflow-hidden" ref={containerRef}>
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-stravesta-teal/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            KI-Powered Trading Features
          </h2>
          <p className="text-xl text-stravesta-lightGray max-w-3xl mx-auto mb-6">
            Entdecken Sie unsere innovativen KI-Features für erfolgreiches Trading
          </p>
          <Badge className="bg-stravesta-teal/20 text-stravesta-teal border-stravesta-teal/30">
            Scroll-gesteuerte Animation
          </Badge>
        </div>

        {/* Stacked Cards Container */}
        <div className="relative" style={{ height: '300vh' }}>
          <div className="sticky top-20 h-screen flex items-center justify-center">
            <div className="relative w-full max-w-6xl mx-auto" style={{ height: '700px' }}>
              {cardData.map((card, index) => {
                const isActive = index === activeCard;
                const isPast = index < activeCard;
                const isFuture = index > activeCard;

                return (
                  <Card
                    key={card.id}
                    className={`
                      absolute inset-0 transition-all duration-700 ease-out
                      ${isActive ? 'z-30 scale-100 opacity-100' : ''}
                      ${isPast ? 'z-10 scale-95 opacity-60 -translate-y-4' : ''}
                      ${isFuture ? 'z-20 scale-105 opacity-40 translate-y-4' : ''}
                      bg-gradient-to-br ${card.bgGradient} backdrop-blur-sm
                      border border-stravesta-teal/20 hover:border-stravesta-teal/40
                    `}
                    style={{
                      transform: `
                        scale(${isActive ? 1 : isPast ? 0.95 : 1.05})
                        translateY(${isPast ? '-16px' : isFuture ? '16px' : '0px'})
                        rotateX(${isPast ? '2deg' : isFuture ? '-2deg' : '0deg'})
                      `,
                      transformOrigin: 'center center',
                    }}
                  >
                    <CardContent className="p-8 h-full overflow-y-auto">
                      <div className="text-center mb-8">
                        <div className={`inline-flex p-4 rounded-full bg-gradient-to-r ${card.bgGradient} mb-6`}>
                          <div className={card.color}>
                            {card.icon}
                          </div>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                          {card.title}
                        </h3>
                        <p className="text-lg text-stravesta-lightGray mb-6 max-w-2xl mx-auto">
                          {card.subtitle}
                        </p>
                        <p className="text-stravesta-lightGray mb-8 max-w-3xl mx-auto">
                          {card.description}
                        </p>
                      </div>

                      {/* Dynamic Content based on card type */}
                      {renderCardContent(card)}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center mt-8 space-x-3">
          {cardData.map((_, index) => (
            <div
              key={index}
              className={`
                w-3 h-3 rounded-full transition-all duration-300
                ${index === activeCard ? 'bg-stravesta-teal scale-125' : 'bg-stravesta-darkGray'}
              `}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StackedCardsSection;
