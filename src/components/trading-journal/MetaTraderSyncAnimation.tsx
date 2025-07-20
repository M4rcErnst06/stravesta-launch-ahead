import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, Zap, CheckCircle, BarChart3, TrendingUp, ArrowRight } from 'lucide-react';

interface MetaTraderTrade {
  ticket: string;
  time: string;
  type: 'buy' | 'sell';
  size: number;
  symbol: string;
  price: number;
  sl: number;
  tp: number;
  profit: number;
}

interface JournalEntry {
  id: string;
  symbol: string;
  type: 'buy' | 'sell';
  size: number;
  profit: number;
  time: string;
  category: string;
  session: string;
  status: 'syncing' | 'complete';
}

const MetaTraderSyncAnimation = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [syncingTrades, setSyncingTrades] = useState<string[]>([]);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);

  // Limit to 3 trades to maintain consistent size
  const metaTraderTrades: MetaTraderTrade[] = [
    {
      ticket: 'mt5_trade_001',
      time: '08:30:15',
      type: 'buy',
      size: 0.04,
      symbol: 'XAUUSD',
      price: 2034.56,
      sl: 2030.00,
      tp: 2040.00,
      profit: 4.72
    },
    {
      ticket: 'mt5_trade_002',
      time: '14:15:42',
      type: 'sell',
      size: 0.24,
      symbol: 'AUDUSD',
      price: 0.6523,
      sl: 0.6540,
      tp: 0.6510,
      profit: 2.64
    },
    {
      ticket: 'mt5_trade_003',
      time: '16:45:33',
      type: 'sell',
      size: 0.42,
      symbol: 'NZDCAD',
      price: 0.8234,
      sl: 0.8250,
      tp: 0.8220,
      profit: 2.46
    }
  ];

  const getCategory = (symbol: string) => {
    if (symbol.includes('XAU') || symbol.includes('XAG')) return 'Precious Metals';
    if (symbol.includes('AUD') || symbol.includes('NZD') || symbol.includes('CAD')) return 'Commodity Currencies';
    return 'Major Pairs';
  };

  const getSession = (time: string) => {
    const hour = parseInt(time.split(':')[0]);
    if (hour >= 8 && hour < 12) return 'London Open';
    if (hour >= 14 && hour < 17) return 'London Session';
    if (hour >= 20 && hour < 24) return 'New York Session';
    return 'Asian Session';
  };

  useEffect(() => {
    const runAnimation = async () => {
      // Step 1: Show MetaTrader history
      setCurrentStep(1);
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Step 2: Start sync process
      setCurrentStep(2);
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Step 3: Sync trades one by one
      setCurrentStep(3);
      for (let i = 0; i < metaTraderTrades.length; i++) {
        const trade = metaTraderTrades[i];
        setSyncingTrades(prev => [...prev, trade.ticket]);
        await new Promise(resolve => setTimeout(resolve, 800));

        // Add to journal
        const journalEntry: JournalEntry = {
          id: trade.ticket,
          symbol: trade.symbol,
          type: trade.type,
          size: trade.size,
          profit: trade.profit,
          time: trade.time,
          category: getCategory(trade.symbol),
          session: getSession(trade.time),
          status: 'syncing'
        };

        setJournalEntries(prev => [...prev, journalEntry]);
        await new Promise(resolve => setTimeout(resolve, 500));

        // Mark as complete
        setJournalEntries(prev => prev.map(entry => 
          entry.id === trade.ticket ? { ...entry, status: 'complete' } : entry
        ));
      }

      setSyncingTrades([]);

      // Step 4: Complete
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCurrentStep(4);

      // Reset after 5 seconds
      await new Promise(resolve => setTimeout(resolve, 5000));
      setCurrentStep(0);
      setSyncingTrades([]);
      setJournalEntries([]);
    };

    const interval = setInterval(runAnimation, 15000);
    runAnimation(); // Start immediately

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-gradient-to-br from-stravesta-navy/80 to-stravesta-dark/90 rounded-2xl p-4 backdrop-blur-sm border border-stravesta-teal/20">
      <div className="text-center mb-4">
        <h2 className="text-lg font-bold text-white mb-2">
          Sehen Sie live, wie Ihre MetaTrader Trades automatisch ins Stravesta Journal synchronisiert und von unserer KI analysiert werden
        </h2>
      </div>

      {/* Fixed layout container - mehr Platz für Journal */}
      <div className="flex flex-col xl:flex-row gap-4 w-full">
        {/* MetaTrader History - Left Side - flexibel */}
        <div className="xl:w-2/5 space-y-3 min-w-0">
          <div className="flex items-center gap-3">
            <div className="bg-blue-500/20 p-2 rounded-lg">
              <BarChart3 className="h-4 w-4 text-blue-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">MetaTrader 5 History</h3>
              <p className="text-stravesta-lightGray text-xs">Ihre geschlossenen Trades</p>
            </div>
          </div>

          {/* MetaTrader Table - Kompakter */}
          <div className={`
            bg-stravesta-dark/80 rounded-lg border border-stravesta-darkGray p-3 h-72 transition-all duration-700 overflow-hidden
            ${currentStep >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}>
            <div className="h-full flex flex-col">
              <div className="grid grid-cols-7 gap-1 text-xs text-stravesta-lightGray font-medium border-b border-stravesta-darkGray pb-2 mb-2">
                <span>Time</span>
                <span>Type</span>
                <span>Size</span>
                <span>Symbol</span>
                <span>Price</span>
                <span>S/L</span>
                <span>Profit</span>
              </div>
              
              <div className="space-y-1 flex-1">
                {metaTraderTrades.map((trade, index) => (
                  <div 
                    key={trade.ticket}
                    className={`
                      grid grid-cols-7 gap-1 text-xs py-2 px-1 rounded transition-all duration-500
                      ${syncingTrades.includes(trade.ticket) ? 'bg-stravesta-teal/20 border border-stravesta-teal/50' : 'bg-stravesta-navy/30'}
                      ${currentStep >= 1 ? 'opacity-100' : 'opacity-0'}
                    `}
                    style={{ transitionDelay: `${index * 200}ms` }}
                  >
                    <span className="text-stravesta-lightGray text-xs">{trade.time}</span>
                    <span className={`font-semibold text-xs ${trade.type === 'buy' ? 'text-green-400' : 'text-red-400'}`}>
                      {trade.type === 'buy' ? 'BUY' : 'SELL'}
                    </span>
                    <span className="text-white text-xs">{trade.size}</span>
                    <span className="text-white font-bold text-xs">{trade.symbol}</span>
                    <span className="text-stravesta-lightGray text-xs">{trade.price}</span>
                    <span className="text-stravesta-lightGray text-xs">{trade.sl}</span>
                    <span className={`font-bold text-xs ${trade.profit > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      ${trade.profit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stravesta Journal - Right Side - mehr Platz */}
        <div className="xl:w-3/5 space-y-3 min-w-0 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-stravesta-teal to-blue-500 p-2 rounded-lg">
              <TrendingUp className="h-4 w-4 text-white" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Stravesta Journal</h3>
              <p className="text-stravesta-lightGray text-xs">Automatisch synchronisiert</p>
            </div>
            {currentStep >= 3 && (
              <Badge className="ml-auto bg-green-500/20 text-green-400 border-green-500/30 text-xs px-2 py-1">
                {Math.min(journalEntries.length, 3)} Trades importiert
              </Badge>
            )}
          </div>

          {/* Journal entries - Viel breiterer Container */}
          <div className="h-72 space-y-2 overflow-hidden w-full">
            {[0, 1, 2].map((slotIndex) => {
              const entry = journalEntries[slotIndex];
              if (!entry) {
                // Empty slot - maintains consistent layout
                return (
                  <div 
                    key={`empty-slot-${slotIndex}`}
                    className="bg-stravesta-dark/20 border border-stravesta-darkGray/30 rounded-lg p-3 h-20 flex items-center justify-center opacity-30 w-full"
                  >
                    <span className="text-stravesta-lightGray text-xs">Warten auf Trade...</span>
                  </div>
                );
              }

              return (
                <div 
                  key={entry.id}
                  className={`
                    bg-stravesta-dark/50 border border-stravesta-darkGray rounded-lg p-3 h-20 transition-all duration-700 w-full
                    ${entry.status === 'syncing' ? 'border-stravesta-teal shadow-lg shadow-stravesta-teal/20' : ''}
                    opacity-0 translate-x-8 animate-[fade-in_0.5s_ease-out_forwards]
                  `}
                  style={{ animationDelay: `${slotIndex * 300}ms` }}
                >
                  <div className="flex items-center justify-between mb-2 w-full overflow-hidden">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <span className="font-bold text-white text-sm flex-shrink-0">{entry.symbol}</span>
                      <Badge 
                        className={`text-xs px-1.5 py-0.5 flex-shrink-0 ${
                          entry.type === 'buy' 
                            ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                            : 'bg-red-500/20 text-red-400 border-red-500/30'
                        }`}
                      >
                        {entry.type.toUpperCase()}
                      </Badge>
                      <span className="text-xs text-stravesta-lightGray truncate">{entry.time}</span>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                      <span className={`font-bold text-base ${entry.profit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        ${entry.profit}
                      </span>
                      {entry.status === 'complete' && (
                        <CheckCircle className="h-3 w-3 text-green-500" />
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs w-full overflow-hidden">
                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs px-1.5 py-0.5 flex-shrink-0">
                      {entry.category}
                    </Badge>
                    <span className="text-stravesta-lightGray text-xs flex-1 text-center mx-1 truncate">{entry.session}</span>
                    <span className="text-stravesta-lightGray text-xs flex-shrink-0 whitespace-nowrap">Size: {entry.size}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sync Indicator */}
      <div className="flex justify-center items-center mt-4 pt-3 border-t border-stravesta-darkGray">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-stravesta-lightGray">
            <div className="w-3 h-3 rounded bg-blue-500/20 flex items-center justify-center">
              <BarChart3 className="h-2 w-2 text-blue-400" />
            </div>
            MetaTrader 5
          </div>
          
          <div className={`transition-all duration-1000 ${currentStep >= 2 ? 'animate-pulse' : ''}`}>
            <ArrowRight className="h-4 w-4 text-stravesta-teal" />
          </div>
          
          <div className="flex items-center gap-2 text-sm text-stravesta-lightGray">
            <div className="w-3 h-3 rounded bg-gradient-to-r from-stravesta-teal to-blue-500 flex items-center justify-center">
              <TrendingUp className="h-2 w-2 text-white" />
            </div>
            Stravesta Journal
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="flex justify-center mt-3 space-x-2">
        {[0, 1, 2, 3, 4].map((step) => (
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

export default MetaTraderSyncAnimation;