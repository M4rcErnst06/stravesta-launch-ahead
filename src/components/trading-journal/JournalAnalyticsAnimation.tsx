
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface TradeEntry {
  id: string;
  symbol: string;
  type: 'long' | 'short';
  pnl: number;
  emotion: string;
  time: string;
  note: string;
}

const JournalAnalyticsAnimation = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [scanningTrade, setScanningTrade] = useState<string | null>(null);
  const [visibleInsights, setVisibleInsights] = useState<number[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const mockTrades: TradeEntry[] = [
    {
      id: '1',
      symbol: 'EURUSD',
      type: 'long',
      pnl: -45,
      emotion: 'FOMO',
      time: '08:30',
      note: 'Entry zu früh, keine Bestätigung'
    },
    {
      id: '2',
      symbol: 'GBPUSD',
      type: 'short',
      pnl: 120,
      emotion: 'Discipline',
      time: '14:15',
      note: 'Perfect London breakout'
    },
    {
      id: '3',
      symbol: 'USDJPY',
      type: 'long',
      pnl: -32,
      emotion: 'Fear',
      time: '20:45',
      note: 'Stop Loss zu eng gesetzt'
    },
    {
      id: '4',
      symbol: 'EURUSD',
      type: 'short',
      pnl: 89,
      emotion: 'Discipline',
      time: '15:30',
      note: 'Fibonacci 0.618 Retracement'
    }
  ];

  const aiInsights = [
    {
      title: "Pattern erkannt",
      message: "Ihre besten Trades (89% Winrate) entstehen bei London Session zwischen 14:00-16:00",
      color: "text-green-400",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/30"
    },
    {
      title: "Emotion-Alert",
      message: "FOMO-Trades haben 73% niedrigere Winrate - warten Sie auf Setup-Bestätigung",
      color: "text-red-400",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/30"
    },
    {
      title: "Optimierung",
      message: "Stop Loss Optimierung: Bei Breakouts 1.5x ATR statt 1x für bessere RRR",
      color: "text-stravesta-teal",
      bgColor: "bg-stravesta-teal/10",
      borderColor: "border-stravesta-teal/30"
    },
    {
      title: "Timing-Insight",
      message: "Fibonacci-Setups: 0.618 Level zeigt 67% höhere Erfolgsrate als 0.5",
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30"
    }
  ];

  useEffect(() => {
    const animationSequence = async () => {
      // Step 1: Show journal
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCurrentStep(1);
      
      // Step 2: Start AI analysis
      await new Promise(resolve => setTimeout(resolve, 1500));
      setCurrentStep(2);
      setIsAnalyzing(true);
      
      // Step 3: Scan each trade
      for (let i = 0; i < mockTrades.length; i++) {
        setScanningTrade(mockTrades[i].id);
        await new Promise(resolve => setTimeout(resolve, 800));
      }
      setScanningTrade(null);
      setIsAnalyzing(false);
      
      // Step 4: Show insights one by one
      setCurrentStep(3);
      for (let i = 0; i < aiInsights.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 1200));
        setVisibleInsights(prev => [...prev, i]);
      }
      
      // Reset animation after 5 seconds
      await new Promise(resolve => setTimeout(resolve, 5000));
      setCurrentStep(0);
      setScanningTrade(null);
      setVisibleInsights([]);
      setIsAnalyzing(false);
    };

    const interval = setInterval(animationSequence, 12000);
    animationSequence(); // Start immediately

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-6xl mx-auto bg-gradient-to-br from-stravesta-navy/80 to-stravesta-dark/90 rounded-2xl p-8 backdrop-blur-sm border border-dashed border-stravesta-teal/30">
      {/* Wireframe Preview Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-lg mb-4">
          <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
          <span className="text-yellow-400 text-sm font-medium">Preview - Coming Soon in English</span>
        </div>
        <p className="text-stravesta-lightGray text-sm">This shows how the AI analytics will look when completed</p>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Trading Journal */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-stravesta-teal/20 border border-dashed border-stravesta-teal/30 p-2 rounded-lg">
              <div className="h-6 w-6 bg-stravesta-teal rounded opacity-80"></div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white opacity-90">Trading Journal (Preview)</h3>
              <p className="text-stravesta-lightGray text-sm opacity-80">Your recent trades</p>
            </div>
            {isAnalyzing && (
              <Badge className="ml-auto bg-stravesta-teal/20 text-stravesta-teal border border-dashed border-stravesta-teal/30 animate-pulse">
                AI analyzing...
              </Badge>
            )}
          </div>

          <div className="space-y-3">
            {mockTrades.map((trade) => (
              <Card 
                key={trade.id}
                className={`
                  bg-stravesta-dark/30 border border-dashed border-stravesta-darkGray/50 transition-all duration-500
                  ${scanningTrade === trade.id ? 'border-stravesta-teal shadow-lg shadow-stravesta-teal/20 scale-105' : ''}
                  ${currentStep >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                `}
                style={{ transitionDelay: `${mockTrades.indexOf(trade) * 200}ms` }}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-white">{trade.symbol}</span>
                      <Badge variant={trade.type === 'long' ? 'default' : 'secondary'} className="text-xs">
                        {trade.type.toUpperCase()}
                      </Badge>
                      <span className="text-xs text-stravesta-lightGray">{trade.time}</span>
                    </div>
                    <div className={`font-bold ${trade.pnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      ${trade.pnl}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-stravesta-lightGray">{trade.note}</span>
                    <Badge 
                      className={`text-xs ${
                        trade.emotion === 'Discipline' 
                          ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                          : 'bg-red-500/20 text-red-400 border-red-500/30'
                      }`}
                    >
                      {trade.emotion}
                    </Badge>
                  </div>
                  {scanningTrade === trade.id && (
                    <div className="absolute inset-0 bg-stravesta-teal/10 animate-pulse rounded-lg"></div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* AI Insights */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-r from-stravesta-teal/50 to-blue-500/50 border border-dashed border-blue-500/30 p-2 rounded-lg">
              <div className="h-6 w-6 bg-white rounded opacity-80"></div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white opacity-90">AI Analysis (Preview)</h3>
              <p className="text-stravesta-lightGray text-sm opacity-80">Strategic Insights</p>
            </div>
          </div>

          <div className="space-y-4">
            {aiInsights.map((insight, index) => (
              <Card 
                key={index}
                className={`
                  ${insight.bgColor} border border-dashed ${insight.borderColor} transition-all duration-700
                  ${visibleInsights.includes(index) ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}
                `}
                style={{ transitionDelay: `${index * 300}ms` }}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <h4 className={`font-semibold ${insight.color} mb-1`}>
                        {insight.title}
                      </h4>
                      <p className="text-stravesta-lightGray text-sm leading-relaxed">
                        {insight.message}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {currentStep >= 3 && visibleInsights.length === aiInsights.length && (
              <div className="text-center pt-4 animate-fade-in">
                <div className="bg-gradient-to-r from-stravesta-teal/20 to-blue-500/20 rounded-lg p-4 border border-stravesta-teal/30">
                  <h4 className="text-white font-semibold mb-2">🎯 Performance-Boost erkannt!</h4>
                  <p className="text-stravesta-lightGray text-sm">
                    Mit diesen Optimierungen könnten Sie Ihre Winrate um <span className="text-stravesta-teal font-bold">35%</span> steigern
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="flex justify-center mt-8 space-x-2">
        {[0, 1, 2, 3].map((step) => (
          <div
            key={step}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentStep >= step ? 'bg-stravesta-teal' : 'bg-stravesta-darkGray'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default JournalAnalyticsAnimation;
