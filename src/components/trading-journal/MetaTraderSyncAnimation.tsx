
import React, { useEffect, useState } from 'react';

const MetaTraderSyncAnimation = () => {
  const [syncStep, setSyncStep] = useState(0);
  const [trades, setTrades] = useState([
    { id: 1, symbol: 'EUR/USD', type: 'BUY', lots: 0.1, profit: 0, status: 'open' },
    { id: 2, symbol: 'GBP/USD', type: 'SELL', lots: 0.05, profit: 0, status: 'open' },
    { id: 3, symbol: 'USD/JPY', type: 'BUY', lots: 0.2, profit: 0, status: 'open' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSyncStep((prev) => {
        const next = (prev + 1) % 4;
        
        // Update trades based on sync step
        if (next === 1) {
          setTrades(prev => prev.map(trade => ({
            ...trade,
            profit: Math.random() > 0.5 ? Math.random() * 100 : -Math.random() * 50
          })));
        } else if (next === 2) {
          setTrades(prev => prev.map((trade, index) => ({
            ...trade,
            status: index === 0 ? 'closed' : trade.status,
            profit: index === 0 ? 125.50 : trade.profit
          })));
        } else if (next === 3) {
          setTrades(prev => [
            ...prev,
            { id: 4, symbol: 'AUD/USD', type: 'BUY', lots: 0.15, profit: 0, status: 'open' }
          ]);
        }
        
        return next;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const getStepInfo = () => {
    switch (syncStep) {
      case 0:
        return {
          title: "MetaTrader Verbindung",
          subtitle: "Automatische Synchronisation mit MT4/MT5",
          action: "Verbindung hergestellt"
        };
      case 1:
        return {
          title: "Live Trade Updates",
          subtitle: "Echtzeit Profit/Loss Tracking",
          action: "Positionen aktualisiert"
        };
      case 2:
        return {
          title: "Trade Abschluss",
          subtitle: "Automatische Journal-Erfassung",
          action: "Trade dokumentiert"
        };
      case 3:
        return {
          title: "Neue Position",
          subtitle: "Sofortige Erfassung neuer Trades",
          action: "Position hinzugefügt"
        };
      default:
        return {
          title: "MetaTrader Sync",
          subtitle: "Kontinuierliche Überwachung",
          action: "Bereit"
        };
    }
  };

  const stepInfo = getStepInfo();

  return (
    <div className="w-full" style={{ height: '600px' }}>
      {/* Fixed height container */}
      <div className="bg-stravesta-navy/50 backdrop-blur-sm rounded-2xl border border-stravesta-teal/20 p-6 h-full">
        {/* Header with fixed height */}
        <div className="mb-6" style={{ height: '80px' }}>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xl font-bold text-white">{stepInfo.title}</h4>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-400">{stepInfo.action}</span>
            </div>
          </div>
          <p className="text-stravesta-lightGray">{stepInfo.subtitle}</p>
        </div>

        {/* Content area with fixed dimensions */}
        <div className="relative" style={{ height: '400px' }}>
          {/* MetaTrader connection visual */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500/20 rounded-lg flex items-center justify-center mb-2">
                  <span className="text-2xl font-bold text-blue-400">MT</span>
                </div>
                <span className="text-sm text-stravesta-lightGray">MetaTrader</span>
              </div>
              
              <div className="flex items-center space-x-2">
                {[1, 2, 3].map((dot) => (
                  <div
                    key={dot}
                    className={`w-2 h-2 rounded-full transition-all duration-500 ${
                      syncStep >= dot - 1 ? 'bg-stravesta-teal animate-pulse' : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-stravesta-teal/20 rounded-lg flex items-center justify-center mb-2">
                  <span className="text-2xl font-bold text-stravesta-teal">S</span>
                </div>
                <span className="text-sm text-stravesta-lightGray">Stravesta</span>
              </div>
            </div>
          </div>

          {/* Trades table */}
          <div className="bg-stravesta-dark/50 rounded-lg overflow-hidden">
            <div className="grid grid-cols-5 gap-4 p-3 bg-stravesta-teal/10 text-sm font-medium text-stravesta-teal">
              <div>Symbol</div>
              <div>Type</div>
              <div>Lots</div>
              <div>P&L</div>
              <div>Status</div>
            </div>
            
            <div className="divide-y divide-stravesta-teal/10">
              {trades.slice(0, 4).map((trade, index) => (
                <div 
                  key={trade.id} 
                  className={`grid grid-cols-5 gap-4 p-3 text-sm transition-all duration-500 ${
                    trade.status === 'closed' ? 'bg-green-500/10' : ''
                  } ${
                    syncStep === 3 && index === 3 ? 'animate-pulse bg-stravesta-teal/10' : ''
                  }`}
                >
                  <div className="text-white">{trade.symbol}</div>
                  <div className={trade.type === 'BUY' ? 'text-green-400' : 'text-red-400'}>
                    {trade.type}
                  </div>
                  <div className="text-stravesta-lightGray">{trade.lots}</div>
                  <div className={`font-mono ${
                    trade.profit > 0 ? 'text-green-400' : 
                    trade.profit < 0 ? 'text-red-400' : 'text-stravesta-lightGray'
                  }`}>
                    {trade.profit !== 0 ? `$${trade.profit.toFixed(2)}` : '$0.00'}
                  </div>
                  <div className={`capitalize ${
                    trade.status === 'closed' ? 'text-green-400' : 'text-yellow-400'
                  }`}>
                    {trade.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom info with fixed height */}
        <div className="mt-4 text-center" style={{ height: '60px' }}>
          <div className="flex justify-center space-x-1 mb-2">
            {[0, 1, 2, 3].map((step) => (
              <div
                key={step}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  step === syncStep ? 'bg-stravesta-teal' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-stravesta-lightGray">
            Nahtlose Integration mit MetaTrader 4 & 5
          </p>
        </div>
      </div>
    </div>
  );
};

export default MetaTraderSyncAnimation;
