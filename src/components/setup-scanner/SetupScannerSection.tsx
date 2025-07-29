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
        <div className="mb-16" data-animate>
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
        <div className="mb-20 max-w-5xl mx-auto px-4" data-animate>
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
        <div className="mb-20 max-w-5xl mx-auto px-4" data-animate>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Problem */}
            <Card className="bg-red-500/10 border-red-500/30 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-orange-500"></div>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-red-300">
                  <AlertCircle className="h-6 w-6" />
                  The Problem
                </CardTitle>
              </CardHeader>
              <CardContent>
                <h3 className="text-lg font-semibold text-white mb-3">
                  Why Most Traders Struggle
                </h3>
                <ul className="list-disc list-inside space-y-3 text-stravesta-lightGray leading-relaxed marker:text-red-400">
                  <li>They miss great setups because they can't watch their watchlist 24/7.</li>
                  <li>Emotions take over fear, doubt, hesitation.</li>
                  <li>Inconsistent execution ruins performance.</li>
                  <li>Even solid strategies fail without structure, timing and discipline.</li>
                </ul>
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
              <CardContent>
                <h3 className="text-lg font-semibold text-white mb-3">
                  How Stravesta Helps You Win
                </h3>
                <ul className="list-disc list-inside space-y-3 text-stravesta-lightGray leading-relaxed marker:text-green-400">
                  <li>AI scans all markets constantly – no missed setups.</li>
                  <li>Instant alerts based on your criteria – no second-guessing.</li>
                  <li>Data-driven decisions, not emotions.</li>
                  <li>Learns from your best trades and improves over time.</li>
                  <li>With Stravesta, you trade with confidence – not chaos.</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SetupScannerSection;
