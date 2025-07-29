import React from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import TradingChartAnimation from './TradingChartAnimation';

const SetupScannerSection = () => {
  const features = [
    {
      title: 'Automatic Setup Detection',
      description: 'Stravesta finds your best patterns. You stay focused.',
      color: 'from-stravesta-teal/20 to-stravesta-teal/20'
    },
    {
      title: 'Real-Time Alerts',
      description: 'Get notified the second your strategy conditions are met.',
      color: 'from-stravesta-teal/20 to-stravesta-teal/20'
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16" data-animate>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
            Meet your AI Trading Assistant
          </h2>
          <p className="text-xl text-stravesta-lightGray max-w-3xl mx-auto mb-8">
            Let AI monitor the charts while you focus on execution
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 gap-6 container mx-auto px-4 mb-20" data-animate>
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-stravesta-navy/50 border-stravesta-teal/20 hover:border-stravesta-teal/60 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-stravesta-teal/20 relative overflow-hidden group"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
              <CardHeader className="relative z-10 text-center">
                <CardTitle className="text-xl text-white mb-2">{feature.title}</CardTitle>
                <CardDescription className="text-stravesta-lightGray">{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Animation */}
        <div className="mb-20 container mx-auto px-4" data-animate>
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">See the AI in Action</h3>
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

        {/* Problem & Solution */}
        <div className="container mx-auto px-4" data-animate>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-red-500/10 border-red-500/30 border-2">
              <CardHeader>
                <CardTitle className="text-white">The Problem</CardTitle>
                <p className="text-white text-lg font-medium">Why Most Traders Struggle</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="text-stravesta-lightGray text-sm flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0 mt-1.5"></div>
                    They miss great setups because they can't watch their watchlist 24/7.
                  </li>
                  <li className="text-stravesta-lightGray text-sm flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0 mt-1.5"></div>
                    Emotions take over fear, doubt, hesitation.
                  </li>
                  <li className="text-stravesta-lightGray text-sm flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0 mt-1.5"></div>
                    Inconsistent execution ruins performance.
                  </li>
                  <li className="text-stravesta-lightGray text-sm flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0 mt-1.5"></div>
                    Even solid strategies fail without structure, timing and discipline.
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-green-500/10 border-green-500/30 border-2">
              <CardHeader>
                <CardTitle className="text-white">The Solution</CardTitle>
                <p className="text-white text-lg font-medium">How Stravesta Helps You Win</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="text-stravesta-lightGray text-sm flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0 mt-1.5"></div>
                    AI scans all markets constantly – no missed setups.
                  </li>
                  <li className="text-stravesta-lightGray text-sm flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0 mt-1.5"></div>
                    Instant alerts based on your criteria – no second-guessing.
                  </li>
                  <li className="text-stravesta-lightGray text-sm flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0 mt-1.5"></div>
                    Data-driven decisions, not emotions.
                  </li>
                  <li className="text-stravesta-lightGray text-sm flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0 mt-1.5"></div>
                    Learns from your best trades and improves over time.
                  </li>
                  <li className="text-stravesta-lightGray text-sm flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0 mt-1.5"></div>
                    With Stravesta, you trade with confidence – not chaos.
                  </li>
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
