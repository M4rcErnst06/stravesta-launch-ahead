import React from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import TradingChartAnimation from './TradingChartAnimation';

const SetupScannerSection = () => {
  const features = [
    {
      title: "Automatic Setup Detection",
      description: "Stravesta finds your best patterns. You stay focused.",
      color: "from-stravesta-teal/20 to-stravesta-teal/20",
      iconColor: "#17E6C8"
    },
    {
      title: "Real-Time Alerts",
      description: "Get notified the second your strategy conditions are met.",
      color: "from-stravesta-teal/20 to-stravesta-teal/20",
      iconColor: "#17E6C8"
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Hero Header */}
        <div className="text-center mb-16" data-animate>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
            Meet your AI Trading Assistant
          </h2>
          <p className="text-xl text-stravesta-lightGray max-w-3xl mx-auto mb-8">
            Let AI monitor the charts while you focus on execution
          </p>
        </div>

        {/* Features Grid */}
        <div className="mb-16 max-w-4xl mx-auto" data-animate>
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-stravesta-navy/50 border-stravesta-teal/20 hover:border-stravesta-teal/60 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-stravesta-teal/20 relative overflow-hidden group"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>

                <CardHeader className="relative z-10 text-center">
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

        {/* Chart Animation */}
        <div className="mb-20 max-w-4xl mx-auto" data-animate>
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              See the AI in Action
            </h3>
            <p className="text-stravesta-lightGray max-w-2x
