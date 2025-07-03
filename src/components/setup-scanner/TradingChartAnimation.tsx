
import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, ReferenceLine } from 'recharts';

const TradingChartAnimation = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [animationData, setAnimationData] = useState<any[]>([]);

  // Base chart data
  const baseData = [
    { time: '09:00', price: 1850 },
    { time: '10:00', price: 1847 },
    { time: '11:00', price: 1852 },
    { time: '12:00', price: 1849 },
    { time: '13:00', price: 1855 },
    { time: '14:00', price: 1858 },
    { time: '15:00', price: 1862 },
    { time: '16:00', price: 1865 },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % 4);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Always show the same data, just highlight different aspects
    setAnimationData(baseData);
  }, [currentStep]);

  const getStepInfo = () => {
    switch (currentStep) {
      case 0:
        return {
          title: "Normaler Markt",
          subtitle: "Keine besonderen Signale erkennbar",
          highlight: null
        };
      case 1:
        return {
          title: "Fibonacci-Retracement erkannt",
          subtitle: "61.8% Retracement-Level erreicht",
          highlight: "fibonacci"
        };
      case 2:
        return {
          title: "Breakout-Signal identifiziert",
          subtitle: "Ausbruch über Widerstandslinie",
          highlight: "breakout"
        };
      case 3:
        return {
          title: "Setup verpasst!",
          subtitle: "Der Trade ist bereits gelaufen",
          highlight: "missed"
        };
      default:
        return {
          title: "Markt-Analyse",
          subtitle: "Kontinuierliche Überwachung",
          highlight: null
        };
    }
  };

  const stepInfo = getStepInfo();

  return (
    <div className="w-full" style={{ height: '600px' }}>
      {/* Fixed height container to prevent layout shifts */}
      <div className="bg-stravesta-navy/50 backdrop-blur-sm rounded-2xl border border-stravesta-teal/20 p-6 h-full">
        {/* Status header with fixed height */}
        <div className="mb-6" style={{ height: '80px' }}>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xl font-bold text-white">{stepInfo.title}</h4>
            <div className={`px-3 py-1 rounded-full text-sm transition-all duration-500 ${
              currentStep === 3 
                ? 'bg-red-500/20 text-red-400' 
                : currentStep > 0 
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-gray-500/20 text-gray-400'
            }`}>
              {currentStep === 3 ? 'VERPASST' : currentStep > 0 ? 'SIGNAL' : 'ÜBERWACHUNG'}
            </div>
          </div>
          <p className="text-stravesta-lightGray">{stepInfo.subtitle}</p>
        </div>

        {/* Chart container with fixed dimensions */}
        <div className="relative" style={{ height: '400px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={animationData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <XAxis 
                dataKey="time" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#B0B0B8', fontSize: 12 }}
              />
              <YAxis 
                domain={['dataMin - 5', 'dataMax + 5']}
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#B0B0B8', fontSize: 12 }}
              />
              
              {/* Fibonacci level */}
              {stepInfo.highlight === 'fibonacci' && (
                <ReferenceLine 
                  y={1856} 
                  stroke="#FFB800" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  label={{ value: "61.8% Fibonacci", position: "top", fill: "#FFB800" }}
                />
              )}
              
              {/* Resistance level */}
              {stepInfo.highlight === 'breakout' && (
                <ReferenceLine 
                  y={1860} 
                  stroke="#17E6C8" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  label={{ value: "Widerstand", position: "top", fill: "#17E6C8" }}
                />
              )}
              
              <Line
                type="monotone"
                dataKey="price"
                stroke={currentStep === 3 ? "#ef4444" : currentStep > 0 ? "#17E6C8" : "#6B7280"}
                strokeWidth={3}
                dot={false}
                activeDot={{ 
                  r: 6, 
                  fill: currentStep === 3 ? "#ef4444" : currentStep > 0 ? "#17E6C8" : "#6B7280",
                  strokeWidth: 0
                }}
              />
            </LineChart>
          </ResponsiveContainer>

          {/* Overlay indicators with fixed positioning */}
          <div className="absolute inset-0 pointer-events-none">
            {stepInfo.highlight === 'fibonacci' && (
              <div className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
                <div className="bg-yellow-500/20 border border-yellow-500/40 rounded-lg p-2 backdrop-blur-sm">
                  <div className="text-yellow-400 text-sm font-medium">Fibonacci 61.8%</div>
                </div>
              </div>
            )}
            
            {stepInfo.highlight === 'breakout' && (
              <div className="absolute top-1/4 right-1/4 transform translate-x-1/2 -translate-y-1/2">
                <div className="bg-stravesta-teal/20 border border-stravesta-teal/40 rounded-lg p-2 backdrop-blur-sm">
                  <div className="text-stravesta-teal text-sm font-medium">Breakout!</div>
                </div>
              </div>
            )}
            
            {stepInfo.highlight === 'missed' && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="bg-red-500/20 border border-red-500/40 rounded-lg p-3 backdrop-blur-sm">
                  <div className="text-red-400 text-lg font-bold">+15% verpasst!</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom info with fixed height */}
        <div className="mt-4 text-center" style={{ height: '60px' }}>
          <div className="flex justify-center space-x-1">
            {[0, 1, 2, 3].map((step) => (
              <div
                key={step}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  step === currentStep ? 'bg-stravesta-teal' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-stravesta-lightGray mt-2">
            Stravesta erkennt profitable Setups automatisch
          </p>
        </div>
      </div>
    </div>
  );
};

export default TradingChartAnimation;
