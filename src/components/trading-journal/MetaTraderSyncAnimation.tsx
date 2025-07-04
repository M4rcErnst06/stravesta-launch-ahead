
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
      ticket: '2024.01.15 08:30:15',
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
      ticket: '2024.01.15 14:15:42',
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
      ticket: '2024.01.15 16:45:33',
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
    <div className="max-w-7xl mx-auto bg-gradient-to-br from-stravesta-navy/80 to-stravesta-dark/90 rounded-2xl p-8 backdrop-blur-sm border border-stravesta-teal/20 min-h-[500px]">
      {/* Main content container */}
      <div className="grid lg:grid-cols-2 gap-8 h-full">
        {/* MetaTrader History */}
        <div className="space-y-6 flex flex-col">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-blue-500/20 p-3 rounded-lg">
              <BarChart3 className="h-7 w-7 text-blue-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">MetaTrader 5 History</h3>
              <p className="text-stravesta-lightGray text-base">Ihre geschlossenen Trades</p>
            </div>
            {currentStep === 2 && (
              <Button 
                size="sm" 
                className="ml-auto bg-stravesta-teal hover:bg-stravesta-teal/80 animate-pulse text-base px-4 py-2"
                disabled
              >
                <Download className="h-5 w-5 mr-2" />
                Sync läuft...
              </Button>
            )}
          </div>

          {/* MetaTrader Table */}
          <div className={`
            bg-stravesta-dark/80 rounded-lg border border-stravesta-darkGray p-6 transition-all duration-700 flex-1
            ${currentStep >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}>
            <div className="space-y-4 h-full">
              <div className="grid grid-cols-7 gap-3 text-sm text-stravesta-lightGray font-medium border-b border-stravesta-darkGray pb-3">
                <span>Time</span>
                <span>Type</span>
                <span>Size</span>
                <span>Symbol</span>
                <span>Price</span>
                <span>S/L</span>
                <span>Profit</span>
              </div>
              
              {metaTraderTrades.map((trade, index) => (
                <div 
                  key={trade.ticket}
                  className={`
                    grid grid-cols-7 gap-3 text-sm py-4 px-2 rounded transition-all duration-500
                    ${syncingTrades.includes(trade.ticket) ? 'bg-stravesta-teal/20 border border-stravesta-teal animate-pulse' : ''}
                    ${currentStep >= 1 ? 'opacity-100' : 'opacity-0'}
                  `}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <span className="text-stravesta-lightGray font-medium">{trade.time}</span>
                  <span className={`font-semibold ${trade.type === 'buy' ? 'text-green-400' : 'text-red-400'}`}>
                    {trade.type.toUpperCase()}
                  </span>
                  <span className="text-white font-medium">{trade.size}</span>
                  <span className="text-white font-bold text-base">{trade.symbol}</span>
                  <span className="text-stravesta-lightGray font-medium">{trade.price}</span>
                  <span className="text-stravesta-lightGray font-medium">{trade.sl}</span>
                  <span className={`font-bold text-lg ${trade.profit > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    ${trade.profit}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {currentStep === 2 && (
            <div className="text-center p-4 bg-stravesta-teal/10 rounded-lg border border-stravesta-teal/30 animate-fade-in">
              <Zap className="h-7 w-7 text-stravesta-teal mx-auto mb-3 animate-pulse" />
              <p className="text-stravesta-teal font-medium text-base">Automatische Synchronisation gestartet...</p>
            </div>
          )}
        </div>

        {/* Stravesta Journal */}
        <div className="space-y-6 flex flex-col">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-gradient-to-r from-stravesta-teal to-blue-500 p-3 rounded-lg">
              <TrendingUp className="h-7 w-7 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">Stravesta Journal</h3>
              <p className="text-stravesta-lightGray text-base">Automatisch synchronisiert</p>
            </div>
            {currentStep >= 3 && (
              <Badge className="ml-auto bg-green-500/20 text-green-400 border-green-500/30 text-sm px-3 py-1">
                {journalEntries.length} Trades importiert
              </Badge>
            )}
          </div>

          {/* Journal entries */}
          <div className="flex-1 space-y-4 overflow-hidden">
            {journalEntries.map((entry, index) => (
              <Card 
                key={entry.id}
                className={`
                  bg-stravesta-dark/50 border-stravesta-darkGray transition-all duration-700
                  ${entry.status === 'syncing' ? 'border-stravesta-teal shadow-lg shadow-stravesta-teal/20 scale-105' : ''}
                  opacity-0 translate-x-8 animate-[fade-in_0.5s_ease-out_forwards]
                `}
                style={{ animationDelay: `${index * 300}ms` }}
              >
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-white text-xl">{entry.symbol}</span>
                      <Badge variant={entry.type === 'buy' ? 'default' : 'secondary'} className="text-sm px-2 py-1">
                        {entry.type.toUpperCase()}
                      </Badge>
                      <span className="text-sm text-stravesta-lightGray font-medium">{entry.time}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`font-bold text-xl ${entry.profit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        ${entry.profit}
                      </span>
                      {entry.status === 'complete' && (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex flex-col gap-2">
                      <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-sm w-fit px-2 py-1">
                        {entry.category}
                      </Badge>
                      <span className="text-stravesta-lightGray text-sm font-medium">{entry.session}</span>
                    </div>
                    <span className="text-stravesta-lightGray font-medium">Size: {entry.size}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Sync Indicator */}
      <div className="flex justify-center items-center mt-8 pt-6 border-t border-stravesta-darkGray">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 text-base text-stravesta-lightGray">
            <div className="w-4 h-4 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <BarChart3 className="h-3 w-3 text-blue-400" />
            </div>
            MetaTrader 5
          </div>
          
          <div className={`transition-all duration-1000 ${currentStep >= 2 ? 'animate-pulse' : ''}`}>
            <ArrowRight className="h-6 w-6 text-stravesta-teal" />
          </div>
          
          <div className="flex items-center gap-3 text-base text-stravesta-lightGray">
            <div className="w-4 h-4 rounded-lg bg-gradient-to-r from-stravesta-teal to-blue-500 flex items-center justify-center">
              <TrendingUp className="h-3 w-3 text-white" />
            </div>
            Stravesta Journal
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="flex justify-center mt-6 space-x-3">
        {[0, 1, 2, 3, 4].map((step) => (
          <div
            key={step}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentStep >= step ? 'bg-stravesta-teal' : 'bg-stravesta-darkGray'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default MetaTraderSyncAnimation;
