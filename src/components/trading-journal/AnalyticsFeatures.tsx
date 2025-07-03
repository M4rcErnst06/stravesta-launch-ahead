
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Zap, Target, BarChart3 } from 'lucide-react';

const AnalyticsFeatures = () => {
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
  );
};

export default AnalyticsFeatures;
