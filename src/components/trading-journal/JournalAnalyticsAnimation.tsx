
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const JournalAnalyticsAnimation = () => {
  const [currentView, setCurrentView] = useState(0);

  const performanceData = [
    { month: 'Jan', profit: 2500, loss: -800 },
    { month: 'Feb', profit: 3200, loss: -1200 },
    { month: 'Mar', profit: 1800, loss: -600 },
    { month: 'Apr', profit: 4100, loss: -900 },
    { month: 'Mai', profit: 3600, loss: -700 },
    { month: 'Jun', profit: 4800, loss: -1100 },
  ];

  const strategyData = [
    { name: 'Breakout', value: 45, color: '#17E6C8' },
    { name: 'Reversal', value: 30, color: '#FFB800' },
    { name: 'Trend Following', value: 25, color: '#00C851' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentView((prev) => (prev + 1) % 3);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getViewInfo = () => {
    switch (currentView) {
      case 0:
        return {
          title: "Performance Übersicht",
          subtitle: "Monatliche Gewinn- und Verlustentwicklung"
        };
      case 1:
        return {
          title: "Strategie-Verteilung",
          subtitle: "Erfolg nach Trading-Strategien"
        };
      case 2:
        return {
          title: "Risk Management",
          subtitle: "Optimierte Position Sizing"
        };
      default:
        return {
          title: "Analytics Dashboard",
          subtitle: "Vollständige Handelsanalyse"
        };
    }
  };

  const viewInfo = getViewInfo();

  return (
    <div className="w-full" style={{ height: '600px' }}>
      {/* Fixed height container */}
      <div className="bg-stravesta-navy/50 backdrop-blur-sm rounded-2xl border border-stravesta-teal/20 p-6 h-full">
        {/* Header with fixed height */}
        <div className="mb-6" style={{ height: '80px' }}>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xl font-bold text-white">{viewInfo.title}</h4>
            <div className="px-3 py-1 rounded-full text-sm bg-green-500/20 text-green-400">
              LIVE DATA
            </div>
          </div>
          <p className="text-stravesta-lightGray">{viewInfo.subtitle}</p>
        </div>

        {/* Chart container with fixed dimensions */}
        <div className="relative" style={{ height: '400px' }}>
          {currentView === 0 && (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#B0B0B8', fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#B0B0B8', fontSize: 12 }}
                />
                <Bar dataKey="profit" fill="#17E6C8" radius={[4, 4, 0, 0]} />
                <Bar dataKey="loss" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}

          {currentView === 1 && (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={strategyData}
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  innerRadius={60}
                  dataKey="value"
                  startAngle={90}
                  endAngle={450}
                >
                  {strategyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          )}

          {currentView === 2 && (
            <div className="h-full flex items-center justify-center">
              <div className="grid grid-cols-2 gap-8 w-full max-w-md">
                <div className="text-center">
                  <div className="text-3xl font-bold text-stravesta-teal mb-2">2.5%</div>
                  <div className="text-stravesta-lightGray text-sm">Risk per Trade</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">1:3</div>
                  <div className="text-stravesta-lightGray text-sm">Risk/Reward</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">68%</div>
                  <div className="text-stravesta-lightGray text-sm">Win Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-stravesta-teal mb-2">15%</div>
                  <div className="text-stravesta-lightGray text-sm">Monthly ROI</div>
                </div>
              </div>
            </div>
          )}

          {/* Strategy labels for pie chart */}
          {currentView === 1 && (
            <div className="absolute bottom-4 left-4 space-y-2">
              {strategyData.map((strategy, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: strategy.color }}
                  />
                  <span className="text-sm text-stravesta-lightGray">
                    {strategy.name}: {strategy.value}%
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom info with fixed height */}
        <div className="mt-4 text-center" style={{ height: '60px' }}>
          <div className="flex justify-center space-x-1 mb-2">
            {[0, 1, 2].map((view) => (
              <div
                key={view}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  view === currentView ? 'bg-stravesta-teal' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-stravesta-lightGray">
            Automatische Performance-Analyse und Optimierung
          </p>
        </div>
      </div>
    </div>
  );
};

export default JournalAnalyticsAnimation;
