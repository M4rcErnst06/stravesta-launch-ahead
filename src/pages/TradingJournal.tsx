
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ArrowLeft, TrendingUp, TrendingDown, Target, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import TradeDashboard from '@/components/trading-journal/TradeDashboard';
import TradeForm from '@/components/trading-journal/TradeForm';
import TradeList from '@/components/trading-journal/TradeList';
import TradeAnalytics from '@/components/trading-journal/TradeAnalytics';

interface Trade {
  id: string;
  symbol: string;
  type: 'long' | 'short';
  entry_price: number;
  exit_price?: number;
  quantity: number;
  entry_date: string;
  exit_date?: string;
  pnl?: number;
  status: 'open' | 'closed';
  notes?: string;
  emotion?: 'fear' | 'greed' | 'discipline' | 'fomo' | 'neutral';
}

const TradingJournal = () => {
  const navigate = useNavigate();
  const [trades, setTrades] = useState<Trade[]>([
    {
      id: '1',
      symbol: 'EURUSD',
      type: 'long',
      entry_price: 1.0850,
      exit_price: 1.0920,
      quantity: 1000,
      entry_date: '2024-06-10',
      exit_date: '2024-06-11',
      pnl: 70,
      status: 'closed',
      notes: 'Breakout-Setup funktionierte perfekt',
      emotion: 'discipline'
    },
    {
      id: '2',
      symbol: 'GBPUSD',
      type: 'short',
      entry_price: 1.2650,
      exit_price: 1.2580,
      quantity: 500,
      entry_date: '2024-06-12',
      exit_date: '2024-06-12',
      pnl: 35,
      status: 'closed',
      notes: 'Schneller Scalp bei Resistance',
      emotion: 'discipline'
    },
    {
      id: '3',
      symbol: 'USDJPY',
      type: 'long',
      entry_price: 157.20,
      quantity: 800,
      entry_date: '2024-06-13',
      status: 'open',
      notes: 'Warte auf BOJ Entscheidung',
      emotion: 'neutral'
    }
  ]);

  const [activeTab, setActiveTab] = useState('dashboard');

  const addTrade = (newTrade: Omit<Trade, 'id'>) => {
    const trade: Trade = {
      ...newTrade,
      id: Date.now().toString(),
    };
    setTrades(prev => [trade, ...prev]);
  };

  const updateTrade = (id: string, updatedTrade: Partial<Trade>) => {
    setTrades(prev => prev.map(trade => 
      trade.id === id ? { ...trade, ...updatedTrade } : trade
    ));
  };

  return (
    <div className="min-h-screen bg-stravesta-dark bg-tech-pattern relative">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-stravesta-dark/90 pointer-events-none"></div>
      
      <div className="relative z-10">
        {/* Header */}
        <header className="bg-stravesta-navy/80 backdrop-blur-sm border-b border-stravesta-teal/20">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button 
                  onClick={() => navigate('/dashboard')}
                  variant="outline"
                  size="sm"
                  className="text-stravesta-lightGray border-stravesta-darkGray bg-stravesta-navy/50 hover:bg-stravesta-navy hover:text-white hover:border-stravesta-teal"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Zurück
                </Button>
                <div>
                  <h1 className="text-2xl font-bold text-gradient flex items-center gap-2">
                    <Target className="h-7 w-7 text-stravesta-teal" />
                    Trading Journal
                  </h1>
                  <p className="text-stravesta-lightGray">Verfolgen und analysieren Sie Ihre Trades</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-stravesta-navy/50 border border-stravesta-teal/20">
              <TabsTrigger 
                value="dashboard" 
                className="data-[state=active]:bg-stravesta-teal data-[state=active]:text-stravesta-dark text-stravesta-lightGray"
              >
                Dashboard
              </TabsTrigger>
              <TabsTrigger 
                value="add-trade" 
                className="data-[state=active]:bg-stravesta-teal data-[state=active]:text-stravesta-dark text-stravesta-lightGray"
              >
                Trade hinzufügen
              </TabsTrigger>
              <TabsTrigger 
                value="trades" 
                className="data-[state=active]:bg-stravesta-teal data-[state=active]:text-stravesta-dark text-stravesta-lightGray"
              >
                Alle Trades
              </TabsTrigger>
              <TabsTrigger 
                value="analytics" 
                className="data-[state=active]:bg-stravesta-teal data-[state=active]:text-stravesta-dark text-stravesta-lightGray"
              >
                Analytics
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="space-y-6">
              <TradeDashboard trades={trades} />
            </TabsContent>

            <TabsContent value="add-trade" className="space-y-6">
              <TradeForm onAddTrade={addTrade} />
            </TabsContent>

            <TabsContent value="trades" className="space-y-6">
              <TradeList trades={trades} onUpdateTrade={updateTrade} />
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <TradeAnalytics trades={trades} />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default TradingJournal;
