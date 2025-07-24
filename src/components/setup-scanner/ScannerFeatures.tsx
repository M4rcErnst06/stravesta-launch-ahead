
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Zap, Target } from 'lucide-react';

const ScannerFeatures = () => {
  const scannerFeatures = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: "AI-based Recognition",
      description: "Automatic identification of Fibonacci retracements, support/resistance and chart patterns",
      color: "#17E6C8"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Real-time Alerts",
      description: "Instant notifications when your setup develops - via app, email or SMS",
      color: "#FFB800"
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Precise Entry Points",
      description: "Exact entry and exit points based on technical analysis and market structure",
      color: "#00C851"
    }
  ];

  return (
    <div className="mb-16" data-animate>
      <div className="text-center mb-12">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Intelligent Setup Recognition
        </h3>
        <p className="text-lg text-stravesta-lightGray max-w-2xl mx-auto">
          Our AI continuously analyzes the markets and recognizes profitable trading setups 
          based on your individual strategy.
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
  );
};

export default ScannerFeatures;
