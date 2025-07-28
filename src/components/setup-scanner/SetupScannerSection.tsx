
import React from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import TradingChartAnimation from './TradingChartAnimation';

const SetupScannerSection = () => {
  const features = [
    {
      title: "AI-Powered Recognition", 
      description: "Our sophisticated machine learning algorithms automatically identify and analyze complex chart patterns, support and resistance levels, and trading formations across all major markets with 89% accuracy.",
      color: "from-stravesta-teal/20 to-stravesta-teal/20",
      iconColor: "#17E6C8"
    },
    {
      title: "Real-time Alerts",
      description: "Receive instant notifications via mobile app, email, or desktop whenever high-probability trading opportunities emerge that match your specific criteria and risk parameters.", 
      color: "from-stravesta-teal/20 to-stravesta-teal/20",
      iconColor: "#17E6C8"
    },
    {
      title: "Precise Entry Points",
      description: "Get mathematically calculated entry and exit points with precise stop-loss and take-profit levels, optimized for your risk tolerance and designed to maximize your profit potential.",
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
            Stravesta scans the markets 24/7 finds your best setups and keeps you ahead.
          </p>
          
        </div>

        {/* Features Grid */}
        <div className="mb-16" data-animate>
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              Intelligent Trading Support
            </h3>
            <p className="text-lg text-stravesta-lightGray max-w-2xl mx-auto">
              Three core features that will revolutionize your trading
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

        {/* Problem/Solution Section */}
        <div className="mb-20" data-animate>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Problem */}
            <Card className="bg-red-500/10 border-red-500/30 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-orange-500"></div>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-red-300">
                  <AlertCircle className="h-6 w-6" />
                  The Problem
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="text-lg font-semibold text-white mb-3">
                  Why Traders Lose Money
                </h3>
                 <div className="space-y-4 text-stravesta-lightGray leading-relaxed">
                   <p>
                     Traders constantly miss profitable trading opportunities because they cannot monitor all markets simultaneously. 
                     The human eye simply cannot process the vast amount of market data required to identify every potential setup.
                   </p>
                   <p>
                     Emotional decision-making destroys trading accounts faster than any other factor. Fear and greed override 
                     rational analysis, leading to premature exits from winning trades and holding onto losing positions too long.
                   </p>
                   <p>
                     Without systematic execution, even the best trading strategies fail. Manual trading leads to inconsistent 
                     application of rules, missed entries, and poorly timed exits that erode profitability over time.
                   </p>
                 </div>
              </CardContent>
            </Card>

            {/* Solution */}
            <Card className="bg-green-500/10 border-green-500/30 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-500"></div>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-green-300">
                  <CheckCircle2 className="h-6 w-6" />
                  The Solution
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="text-lg font-semibold text-white mb-3">
                  Stravesta AI Setup Scanner
                </h3>
                 <div className="space-y-4 text-stravesta-lightGray leading-relaxed">
                   <p>
                     Our advanced AI system monitors thousands of instruments across multiple timeframes simultaneously, 
                     ensuring that every profitable trading setup is captured and analyzed with mathematical precision.
                   </p>
                   <p>
                     By removing human emotion from the equation, our AI provides systematic and objective analysis 
                     of market conditions, executing trades based purely on statistical probabilities and proven patterns.
                   </p>
                   <p>
                     Achieve consistent trading performance through intelligent AI support that learns from your successful 
                     trades and continuously optimizes your strategy for maximum profitability and minimal risk exposure.
                   </p>
                 </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Chart Animation */}
        <div className="mb-20" data-animate>
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              See the AI in Action
            </h3>
            <p className="text-stravesta-lightGray max-w-2xl mx-auto">
              This animation shows how our AI recognizes profitable setups in real-time and notifies you instantly
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

      </div>
    </section>
  );
};

export default SetupScannerSection;
