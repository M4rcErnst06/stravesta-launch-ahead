
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Sparkles, Radar, Activity, AlertTriangle, CheckCircle, Eye, Zap } from 'lucide-react';

const JournalAnalyticsAnimation = () => {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [aiPulse, setAiPulse] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [activeInsights, setActiveInsights] = useState<number[]>([]);
  const [neuralNetwork, setNeuralNetwork] = useState(false);

  const insights = [
    {
      icon: <Eye className="h-5 w-5" />,
      type: "VISION",
      title: "Chart Pattern Detected",
      message: "Double Top Formation auf EURUSD erkannt - 87% Bearish Signal",
      intensity: "high",
      color: "purple"
    },
    {
      icon: <Brain className="h-5 w-5" />,
      type: "NEURAL",
      title: "Behavioral Analysis", 
      message: "Trading-Muster zeigt Überconfidence-Bias in Winning Streaks",
      intensity: "medium",
      color: "cyan"
    },
    {
      icon: <Radar className="h-5 w-5" />,
      type: "RADAR",
      title: "Risk Scanner",
      message: "Position-Sizing 32% über optimaler Allocation - Reduktion empfohlen",
      intensity: "high", 
      color: "orange"
    },
    {
      icon: <Sparkles className="h-5 w-5" />,
      type: "QUANTUM",
      title: "Future Prediction",
      message: "70% Wahrscheinlichkeit für Trend-Reversal in nächsten 4H",
      intensity: "ultra",
      color: "green"
    }
  ];

  useEffect(() => {
    const sequence = async () => {
      // Phase 1: Neural Network aktiviert
      setCurrentPhase(1);
      setNeuralNetwork(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Phase 2: AI Scanning beginnt
      setCurrentPhase(2);
      setAiPulse(true);
      
      // Scan Progress
      for (let i = 0; i <= 100; i += 10) {
        setScanProgress(i);
        await new Promise(resolve => setTimeout(resolve, 150));
      }
      
      // Phase 3: Insights erscheinen
      setCurrentPhase(3);
      for (let i = 0; i < insights.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setActiveInsights(prev => [...prev, i]);
      }
      
      // Phase 4: Hold für 4 Sekunden
      await new Promise(resolve => setTimeout(resolve, 4000));
      
      // Reset
      setCurrentPhase(0);
      setNeuralNetwork(false);
      setAiPulse(false);
      setScanProgress(0);
      setActiveInsights([]);
    };

    const interval = setInterval(sequence, 15000);
    sequence();

    return () => clearInterval(interval);
  }, []);

  const getIntensityClass = (intensity: string) => {
    switch (intensity) {
      case 'ultra': return 'animate-pulse bg-gradient-to-r from-green-500/30 to-emerald-500/30 border-green-400/60';
      case 'high': return 'bg-gradient-to-r from-red-500/20 to-orange-500/20 border-orange-400/50';
      case 'medium': return 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-cyan-400/50';
      default: return 'bg-stravesta-dark/50 border-stravesta-darkGray';
    }
  };

  const getColorClass = (color: string) => {
    switch (color) {
      case 'purple': return 'text-purple-400';
      case 'cyan': return 'text-cyan-400';
      case 'orange': return 'text-orange-400';
      case 'green': return 'text-green-400';
      default: return 'text-white';
    }
  };

  return (
    <div className="relative max-w-7xl mx-auto">
      {/* Neural Network Background */}
      {neuralNetwork && (
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-stravesta-teal rounded-full animate-ping"></div>
          <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-1/4 left-1/2 w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-green-400 rounded-full animate-ping" style={{ animationDelay: '1.5s' }}></div>
        </div>
      )}

      {/* Main Container */}
      <div className="bg-gradient-to-br from-stravesta-navy/90 to-black/80 backdrop-blur-xl rounded-3xl border border-stravesta-teal/30 overflow-hidden">
        
        {/* Header mit AI Brain */}
        <div className="relative p-8 border-b border-stravesta-teal/20">
          <div className="flex items-center justify-center">
            <div className={`relative transition-all duration-1000 ${aiPulse ? 'scale-125' : 'scale-100'}`}>
              <div className="absolute inset-0 bg-gradient-to-r from-stravesta-teal via-blue-500 to-purple-500 rounded-full blur-2xl opacity-40 animate-pulse"></div>
              <div className="relative bg-gradient-to-r from-stravesta-teal to-blue-500 p-8 rounded-full">
                <Brain className={`h-16 w-16 text-white transition-all duration-500 ${aiPulse ? 'animate-pulse' : ''}`} />
              </div>
            </div>
          </div>
          
          <div className="text-center mt-6">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-white via-stravesta-teal to-blue-400 bg-clip-text text-transparent mb-2">
              Quantum AI Neural Scanner
            </h3>
            <p className="text-stravesta-lightGray">
              {currentPhase === 0 && "Initialisierung..."}
              {currentPhase === 1 && "Neural Network Online"}
              {currentPhase === 2 && "Deep Pattern Scanning..."}
              {currentPhase === 3 && "Strategic Insights Generated"}
            </p>
          </div>

          {/* Scan Progress */}
          {currentPhase === 2 && (
            <div className="mt-6 max-w-md mx-auto">
              <div className="flex justify-between text-sm text-stravesta-lightGray mb-2">
                <span>Scanning Trading Data</span>
                <span>{scanProgress}%</span>
              </div>
              <div className="w-full bg-stravesta-dark rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-stravesta-teal to-blue-500 h-2 rounded-full transition-all duration-300 relative overflow-hidden"
                  style={{ width: `${scanProgress}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Content Area */}
        <div className="p-8">
          {/* Phase 1: Aktivierung */}
          {currentPhase === 1 && (
            <div className="text-center space-y-6 animate-fade-in">
              <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
                {[Activity, Radar, Zap].map((Icon, i) => (
                  <div 
                    key={i}
                    className="bg-stravesta-dark/50 rounded-xl p-6 border border-stravesta-teal/20 animate-fade-in"
                    style={{ animationDelay: `${i * 200}ms` }}
                  >
                    <Icon className="h-8 w-8 text-stravesta-teal mx-auto mb-2" />
                    <div className="text-sm text-stravesta-lightGray">
                      {i === 0 && "Pattern Engine"}
                      {i === 1 && "Risk Scanner"}
                      {i === 2 && "Quantum Predictor"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Phase 2: Scanning */}
          {currentPhase === 2 && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Eye className="h-5 w-5 text-stravesta-teal" />
                    Live Chart Analysis
                  </h4>
                  <div className="bg-stravesta-dark/30 rounded-lg p-4 border border-stravesta-teal/20">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-stravesta-lightGray">EURUSD</span>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-stravesta-teal rounded-full animate-ping"></div>
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">1.0847</div>
                    <div className="text-sm text-red-400">-0.0023 (-0.21%)</div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Radar className="h-5 w-5 text-orange-400" />
                    Risk Assessment
                  </h4>
                  <div className="bg-stravesta-dark/30 rounded-lg p-4 border border-orange-400/20">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-4 w-4 text-orange-400" />
                      <span className="text-sm text-orange-400">High Risk Detected</span>
                    </div>
                    <div className="text-sm text-stravesta-lightGray">
                      Portfolio allocation exceeds recommended limits
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Phase 3: Insights */}
          {currentPhase === 3 && (
            <div className="space-y-4">
              <h4 className="text-xl font-bold text-white text-center mb-6">
                Strategic AI Insights
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {insights.map((insight, index) => (
                  <Card 
                    key={index}
                    className={`
                      ${getIntensityClass(insight.intensity)} 
                      border-2 transition-all duration-1000 transform
                      ${activeInsights.includes(index) 
                        ? 'opacity-100 translate-y-0 scale-100' 
                        : 'opacity-0 translate-y-8 scale-95'
                      }
                    `}
                    style={{ transitionDelay: `${index * 200}ms` }}
                  >
                    <CardContent className="p-5">
                      <div className="flex items-start gap-4">
                        <div className={`${getColorClass(insight.color)} bg-black/20 p-3 rounded-lg`}>
                          {insight.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className={`text-xs ${getColorClass(insight.color)} bg-black/30 border-current`}>
                              {insight.type}
                            </Badge>
                            {insight.intensity === 'ultra' && (
                              <Sparkles className="h-4 w-4 text-yellow-400 animate-pulse" />
                            )}
                          </div>
                          <h5 className={`font-bold ${getColorClass(insight.color)} mb-2`}>
                            {insight.title}
                          </h5>
                          <p className="text-stravesta-lightGray text-sm leading-relaxed">
                            {insight.message}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Final Summary */}
              {activeInsights.length === insights.length && (
                <div className="mt-8 text-center animate-fade-in">
                  <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl p-6 border-2 border-green-400/50">
                    <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-3" />
                    <h4 className="text-xl font-bold text-green-400 mb-2">
                      Analysis Complete
                    </h4>
                    <p className="text-stravesta-lightGray">
                      4 kritische Insights identifiziert • Implementierung könnte ROI um 42% steigern
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Status Indicator */}
        <div className="px-8 pb-6">
          <div className="flex justify-center space-x-3">
            {[0, 1, 2, 3].map((phase) => (
              <div
                key={phase}
                className={`h-2 rounded-full transition-all duration-500 ${
                  currentPhase >= phase 
                    ? phase === 3 ? 'w-8 bg-green-400' : 'w-6 bg-stravesta-teal' 
                    : 'w-2 bg-stravesta-darkGray'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JournalAnalyticsAnimation;
