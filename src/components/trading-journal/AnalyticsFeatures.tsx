
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';


const AnalyticsFeatures = () => {
  const analyticsFeatures = [
    {
      title: "AI Pattern Recognition",
      description: "Automatic analysis of your trading habits and success patterns",
      color: "#17E6C8"
    },
    {
      title: "Emotion Tracking", 
      description: "Correlation between emotions and trading performance",
      color: "#17E6C8"
    },
    {
      title: "Performance Optimization",
      description: "Concrete action recommendations to improve your results",
      color: "#17E6C8"
    },
    {
      title: "Predictive Analytics",
      description: "AI-based predictions for future trading decisions",
      color: "#17E6C8"
    }
  ];

  return (
    <div className="mb-16" data-animate>
      <div className="text-center mb-12">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Intelligent Journal Analysis
        </h3>
        <p className="text-lg text-stravesta-lightGray max-w-2xl mx-auto">
          Our AI recognizes patterns in your trades that are invisible to the human eye.
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
