
import React from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import TradingChartAnimation from './TradingChartAnimation';

const SetupScannerSection = () => {
  const features = [
    {
      title: "Your setups detected automatically.", 
      description: "Stravesta recognizes your patterns and chart signals in real-time.",
      color: "from-stravesta-teal/20 to-stravesta-teal/20",
      iconColor: "#17E6C8"
    },
    {
      title: "Alerts that matter.",
      description: "Get notified the moment your rules match real opportunities.", 
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
              Two core features that will revolutionize your trading
            </p>
          </div>

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
                  Why Most Traders Struggle
                </h3>
                 <div className="space-y-4 text-stravesta-lightGray leading-relaxed">
                   <p>
                     They miss great setups because they can't watch their watchlist 24/7.
                   </p>
                   <p>
                     Emotions take over fear, doubt, hesitation.
                   </p>
                   <p>
                     Inconsistent execution ruins performance.
                   </p>
                   <p>
                     Even solid strategies fail without structure, timing and discipline.
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
                  How Stravesta Helps You Win
                </h3>
                 <div className="space-y-4 text-stravesta-lightGray leading-relaxed">
                   <p>
                     AI scans all markets constantly – no missed setups.
                   </p>
                   <p>
                     Instant alerts based on your criteria – no second-guessing.
                   </p>
                   <p>
                     Data-driven decisions, not emotions.
                   </p>
                   <p>
                     Learns from your best trades and improves over time.
                   </p>
                   <p>
                     With Stravesta, you trade with confidence – not chaos.
                   </p>
                 </div>
              </CardContent>
            </Card>
          </div>
        </div>

      </div>
    </section>
  );
};

export default SetupScannerSection;
