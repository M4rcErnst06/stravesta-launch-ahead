
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Target, DollarSign, Calendar, BarChart3 } from 'lucide-react';

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

interface TradeDashboardProps {
  trades: Trade[];
}

const TradeDashboard: React.FC<TradeDashboardProps> = ({ trades }) => {
  const closedTrades = trades.filter(trade => trade.status === 'closed');
  const openTrades = trades.filter(trade => trade.status === 'open');
  
  const totalPnL = closedTrades.reduce((sum, trade) => sum + (trade.pnl || 0), 0);
  const winningTrades = closedTrades.filter(trade => (trade.pnl || 0) > 0);
  const losingTrades = closedTrades.filter(trade => (trade.pnl || 0) < 0);
  const winRate = closedTrades.length > 0 ? (winningTrades.length / closedTrades.length) * 100 : 0;
  
  const avgWin = winningTrades.length > 0 
    ? winningTrades.reduce((sum, trade) => sum + (trade.pnl || 0), 0) / winningTrades.length 
    : 0;
  
  const avgLoss = losingTrades.length > 0 
    ? Math.abs(losingTrades.reduce((sum, trade) => sum + (trade.pnl || 0), 0) / losingTrades.length)
    : 0;

  const profitFactor = avgLoss > 0 ? avgWin / avgLoss : 0;

  const recentTrades = [...trades].sort((a, b) => 
    new Date(b.entry_date).getTime() - new Date(a.entry_date).getTime()
  ).slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Hero Performance Overview */}
      <div className="bg-gradient-to-br from-stravesta-navy/80 via-stravesta-navy/60 to-stravesta-dark/80 backdrop-blur-sm rounded-2xl p-8 border border-stravesta-teal/30">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">Performance Overview</h2>
          <p className="text-stravesta-lightGray">Ihre Trading-Leistung auf einen Blick</p>
        </div>
        
        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-stravesta-dark/50 backdrop-blur-sm rounded-xl p-6 border border-stravesta-teal/20 hover:border-stravesta-teal/40 transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-green-500/20 to-green-600/10 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-400" />
              </div>
              <div className="text-right">
                <div className={`text-2xl font-bold ${totalPnL >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  ${totalPnL.toFixed(2)}
                </div>
                <p className="text-sm text-stravesta-lightGray">Gesamt P&L</p>
              </div>
            </div>
            <div className="flex items-center text-sm text-stravesta-lightGray">
              <span>{closedTrades.length} Trades abgeschlossen</span>
            </div>
          </div>

          <div className="bg-stravesta-dark/50 backdrop-blur-sm rounded-xl p-6 border border-stravesta-teal/20 hover:border-stravesta-teal/40 transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-stravesta-teal/20 to-stravesta-teal/10 rounded-lg">
                <Target className="h-6 w-6 text-stravesta-teal" />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">
                  {winRate.toFixed(1)}%
                </div>
                <p className="text-sm text-stravesta-lightGray">Win Rate</p>
              </div>
            </div>
            <div className="flex items-center text-sm text-stravesta-lightGray">
              <span className="text-green-400">{winningTrades.length}W</span>
              <span className="mx-2">/</span>
              <span className="text-red-400">{losingTrades.length}L</span>
            </div>
          </div>

          <div className="bg-stravesta-dark/50 backdrop-blur-sm rounded-xl p-6 border border-stravesta-teal/20 hover:border-stravesta-teal/40 transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-green-500/20 to-green-600/10 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-400" />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-400">
                  ${avgWin.toFixed(2)}
                </div>
                <p className="text-sm text-stravesta-lightGray">Ø Gewinn</p>
              </div>
            </div>
            <div className="flex items-center text-sm text-stravesta-lightGray">
              <span>Pro Gewinn-Trade</span>
            </div>
          </div>

          <div className="bg-stravesta-dark/50 backdrop-blur-sm rounded-xl p-6 border border-stravesta-teal/20 hover:border-stravesta-teal/40 transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-red-500/20 to-red-600/10 rounded-lg">
                <TrendingDown className="h-6 w-6 text-red-400" />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-red-400">
                  ${avgLoss.toFixed(2)}
                </div>
                <p className="text-sm text-stravesta-lightGray">Ø Verlust</p>
              </div>
            </div>
            <div className="flex items-center text-sm text-stravesta-lightGray">
              <span>Pro Verlust-Trade</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Trades - Enhanced */}
        <Card className="bg-stravesta-navy/60 backdrop-blur-sm border-stravesta-teal/30 hover:border-stravesta-teal/50 transition-all duration-200">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-3 text-xl">
              <div className="p-2 bg-stravesta-teal/20 rounded-lg">
                <Calendar className="h-6 w-6 text-stravesta-teal" />
              </div>
              Aktuelle Trades
            </CardTitle>
            <CardDescription className="text-stravesta-lightGray text-base">
              Ihre letzten 3 Trades im Überblick
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {recentTrades.map((trade, index) => (
              <div 
                key={trade.id} 
                className="flex items-center justify-between p-5 bg-stravesta-dark/40 rounded-xl border border-stravesta-darkGray/50 hover:bg-stravesta-dark/60 transition-all duration-200"
              >
                <div className="flex items-center gap-4">
                  <div className="w-3 h-16 rounded-full bg-gradient-to-b from-stravesta-teal to-stravesta-teal/50"></div>
                  <div>
                    <div className="font-bold text-white text-xl mb-1">{trade.symbol}</div>
                    <div className="text-sm text-stravesta-lightGray flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-lg text-xs font-medium ${
                        trade.type === 'long' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                      }`}>
                        {trade.type === 'long' ? '📈 LONG' : '📉 SHORT'}
                      </span>
                      <span className="text-stravesta-lightGray">
                        {new Date(trade.entry_date).toLocaleDateString('de-DE')}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-bold text-xl ${
                    trade.status === 'open' 
                      ? 'text-stravesta-teal' 
                      : (trade.pnl || 0) >= 0 
                        ? 'text-green-400' 
                        : 'text-red-400'
                  }`}>
                    {trade.status === 'open' 
                      ? 'OFFEN' 
                      : `$${(trade.pnl || 0).toFixed(2)}`
                    }
                  </div>
                  <div className="text-sm text-stravesta-lightGray capitalize mt-1">
                    {trade.status === 'open' ? 'Aktiv' : 'Abgeschlossen'}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Enhanced Quick Stats */}
        <Card className="bg-stravesta-navy/60 backdrop-blur-sm border-stravesta-teal/30 hover:border-stravesta-teal/50 transition-all duration-200">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-3 text-xl">
              <div className="p-2 bg-stravesta-teal/20 rounded-lg">
                <BarChart3 className="h-6 w-6 text-stravesta-teal" />
              </div>
              Zusätzliche Metriken
            </CardTitle>
            <CardDescription className="text-stravesta-lightGray text-base">
              Weitere wichtige Performance-Kennzahlen
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-between items-center p-4 bg-stravesta-dark/40 rounded-xl border border-stravesta-darkGray/50">
              <span className="text-stravesta-lightGray font-medium">Offene Trades:</span>
              <span className="text-white font-bold text-lg">{openTrades.length}</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-stravesta-dark/40 rounded-xl border border-stravesta-darkGray/50">
              <span className="text-stravesta-lightGray font-medium">Profit Factor:</span>
              <span className="text-white font-bold text-lg">{profitFactor.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-stravesta-dark/40 rounded-xl border border-stravesta-darkGray/50">
              <span className="text-stravesta-lightGray font-medium">Beste Trade:</span>
              <span className="text-green-400 font-bold text-lg">
                ${Math.max(...closedTrades.map(t => t.pnl || 0)).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center p-4 bg-stravesta-dark/40 rounded-xl border border-stravesta-darkGray/50">
              <span className="text-stravesta-lightGray font-medium">Schlechteste Trade:</span>
              <span className="text-red-400 font-bold text-lg">
                ${Math.min(...closedTrades.map(t => t.pnl || 0)).toFixed(2)}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TradeDashboard;
