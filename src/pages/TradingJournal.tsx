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
      entry_date: '2024-01-15',
      exit_date: '2024-01-16',
      pnl: 70,
      status: 'closed',
      notes: 'Breakout nach EZB Entscheidung',
      emotion: 'discipline'
    },
    {
      id: '2',
      symbol: 'GBPUSD',
      type: 'short',
      entry_price: 1.2650,
      exit_price: 1.2580,
      quantity: 500,
      entry_date: '2024-01-18',
      exit_date: '2024-01-18',
      pnl: 35,
      status: 'closed',
      notes: 'Resistance Test erfolgreich',
      emotion: 'discipline'
    },
    {
      id: '3',
      symbol: 'USDJPY',
      type: 'long',
      entry_price: 157.20,
      quantity: 800,
      entry_date: '2024-01-20',
      status: 'open',
      notes: 'Trend-Following Setup',
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
    <div className="min-h-screen bg-stravesta-dark">
      {/* Modern Header */}
      <header className="bg-gradient-to-r from-stravesta-navy via-stravesta-navy/90 to-stravesta-navy border-b border-stravesta-teal/30">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <Button 
                onClick={() => navigate('/dashboard')}
                variant="outline"
                size="sm"
                className="text-stravesta-lightGray border-stravesta-teal/30 bg-stravesta-dark/50 hover:bg-stravesta-teal hover:text-stravesta-dark transition-all duration-200"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Zurück
              </Button>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-stravesta-teal to-white bg-clip-text text-transparent flex items-center gap-3">
                  <Target className="h-8 w-8 text-stravesta-teal" />
                  Trading Journal
                </h1>
                <p className="text-stravesta-lightGray mt-2 text-lg">Professionelle Handelsanalyse und Performance-Tracking</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Main Content */}
      <main className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          {/* Redesigned Tab Navigation */}
          <div className="bg-stravesta-navy/60 backdrop-blur-sm rounded-xl p-2 border border-stravesta-teal/20">
            <TabsList className="grid w-full grid-cols-4 bg-transparent gap-2">
              <TabsTrigger 
                value="dashboard" 
                className="data-[state=active]:bg-stravesta-teal data-[state=active]:text-stravesta-dark data-[state=active]:shadow-lg text-stravesta-lightGray hover:text-white hover:bg-stravesta-navy/50 transition-all duration-200 rounded-lg py-3 font-medium"
              >
                📊 Dashboard
              </TabsTrigger>
              <TabsTrigger 
                value="add-trade" 
                className="data-[state=active]:bg-stravesta-teal data-[state=active]:text-stravesta-dark data-[state=active]:shadow-lg text-stravesta-lightGray hover:text-white hover:bg-stravesta-navy/50 transition-all duration-200 rounded-lg py-3 font-medium"
              >
                ➕ Trade hinzufügen
              </TabsTrigger>
              <TabsTrigger 
                value="trades" 
                className="data-[state=active]:bg-stravesta-teal data-[state=active]:text-stravesta-dark data-[state=active]:shadow-lg text-stravesta-lightGray hover:text-white hover:bg-stravesta-navy/50 transition-all duration-200 rounded-lg py-3 font-medium"
              >
                📋 Alle Trades
              </TabsTrigger>
              <TabsTrigger 
                value="analytics" 
                className="data-[state=active]:bg-stravesta-teal data-[state=active]:text-stravesta-dark data-[state=active]:shadow-lg text-stravesta-lightGray hover:text-white hover:bg-stravesta-navy/50 transition-all duration-200 rounded-lg py-3 font-medium"
              >
                📈 Analytics
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Tab Content with Better Spacing */}
          <div className="space-y-8">
            <TabsContent value="dashboard" className="space-y-8 animate-fade-in">
              <TradeDashboard trades={trades} />
            </TabsContent>

            <TabsContent value="add-trade" className="space-y-8 animate-fade-in">
              <TradeForm onAddTrade={addTrade} />
            </TabsContent>

            <TabsContent value="trades" className="space-y-8 animate-fade-in">
              <TradeList trades={trades} onUpdateTrade={updateTrade} />
            </TabsContent>

            <TabsContent value="analytics" className="space-y-8 animate-fade-in">
              <TradeAnalytics trades={trades} />
            </TabsContent>
          </div>
        </Tabs>
      </main>
    </div>
  );
};

export default TradingJournal;
