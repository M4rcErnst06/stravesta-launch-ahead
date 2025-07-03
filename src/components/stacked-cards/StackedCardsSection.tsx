
import React, { useEffect, useRef, useState } from 'react';
import { Brain, Target, TrendingUp } from 'lucide-react';
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
}

const StackedCardsSection = () => {
  const [activeCard, setActiveCard] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

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
      ]
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
      ]
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
      ]
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

      // Calculate which card should be active based on scroll position
      const scrollProgress = (scrollY - containerTop + windowHeight * 0.5) / containerHeight;
      const cardIndex = Math.floor(scrollProgress * cardData.length);
      const clampedIndex = Math.max(0, Math.min(cardData.length - 1, cardIndex));

      setActiveCard(clampedIndex);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [cardData.length]);

  return (
    <section className="py-20 bg-stravesta-dark relative overflow-hidden" ref={containerRef}>
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-stravesta-teal/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16" data-animate>
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
        <div className="relative" style={{ height: '200vh' }}>
          <div className="sticky top-20 h-screen flex items-center justify-center">
            <div className="relative w-full max-w-4xl mx-auto" style={{ height: '600px' }}>
              {cardData.map((card, index) => {
                const isActive = index === activeCard;
                const isPast = index < activeCard;
                const isFuture = index > activeCard;

                return (
                  <Card
                    key={card.id}
                    ref={el => cardsRef.current[index] = el!}
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
                    <CardContent className="p-8 h-full flex flex-col justify-center">
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

                      {/* Features Grid */}
                      <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                        {card.features.map((feature, idx) => (
                          <div 
                            key={idx}
                            className={`
                              bg-stravesta-dark/50 rounded-lg p-4 text-center
                              transition-all duration-500 delay-${idx * 100}
                              ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-60'}
                            `}
                          >
                            <div className={`font-bold text-lg ${card.color} mb-1`}>
                              {feature.includes('%') || feature.includes('<') || feature.includes('/') ? 
                                feature.split(' ')[0] : '✓'
                              }
                            </div>
                            <div className="text-stravesta-lightGray text-sm">
                              {feature.includes('%') || feature.includes('<') || feature.includes('/') ? 
                                feature.split(' ').slice(1).join(' ') : feature
                              }
                            </div>
                          </div>
                        ))}
                      </div>
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
