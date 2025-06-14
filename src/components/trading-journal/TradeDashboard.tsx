
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
  ).slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-stravesta-navy/50 border-stravesta-teal/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-stravesta-lightGray">
              Gesamt P&L
            </CardTitle>
            <DollarSign className="h-4 w-4 text-stravesta-teal" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${totalPnL >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              ${totalPnL.toFixed(2)}
            </div>
            <p className="text-xs text-stravesta-lightGray">
              {closedTrades.length} abgeschlossene Trades
            </p>
          </CardContent>
        </Card>

        <Card className="bg-stravesta-navy/50 border-stravesta-teal/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-stravesta-lightGray">
              Win Rate
            </CardTitle>
            <Target className="h-4 w-4 text-stravesta-teal" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {winRate.toFixed(1)}%
            </div>
            <p className="text-xs text-stravesta-lightGray">
              {winningTrades.length}W / {losingTrades.length}L
            </p>
          </CardContent>
        </Card>

        <Card className="bg-stravesta-navy/50 border-stravesta-teal/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-stravesta-lightGray">
              Ø Gewinn
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">
              ${avgWin.toFixed(2)}
            </div>
            <p className="text-xs text-stravesta-lightGray">
              Pro Gewinn-Trade
            </p>
          </CardContent>
        </Card>

        <Card className="bg-stravesta-navy/50 border-stravesta-teal/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-stravesta-lightGray">
              Ø Verlust
            </CardTitle>
            <TrendingDown className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">
              ${avgLoss.toFixed(2)}
            </div>
            <p className="text-xs text-stravesta-lightGray">
              Pro Verlust-Trade
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Trades */}
        <Card className="bg-stravesta-navy/50 border-stravesta-teal/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Calendar className="h-5 w-5 text-stravesta-teal" />
              Aktuelle Trades
            </CardTitle>
            <CardDescription className="text-stravesta-lightGray">
              Ihre letzten 5 Trades
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentTrades.map((trade) => (
              <div 
                key={trade.id} 
                className="flex items-center justify-between p-3 bg-stravesta-dark/50 rounded-lg border border-stravesta-darkGray"
              >
                <div>
                  <div className="font-medium text-white">{trade.symbol}</div>
                  <div className="text-sm text-stravesta-lightGray">
                    {trade.type.toUpperCase()} • {trade.entry_date}
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-bold ${
                    trade.status === 'open' 
                      ? 'text-stravesta-teal' 
                      : (trade.pnl || 0) >= 0 
                        ? 'text-green-500' 
                        : 'text-red-500'
                  }`}>
                    {trade.status === 'open' 
                      ? 'OFFEN' 
                      : `$${(trade.pnl || 0).toFixed(2)}`
                    }
                  </div>
                  <div className="text-sm text-stravesta-lightGray">
                    {trade.status}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className="bg-stravesta-navy/50 border-stravesta-teal/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-stravesta-teal" />
              Zusätzliche Metriken
            </CardTitle>
            <CardDescription className="text-stravesta-lightGray">
              Weitere Performance-Kennzahlen
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-stravesta-lightGray">Offene Trades:</span>
              <span className="text-white font-medium">{openTrades.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-stravesta-lightGray">Profit Factor:</span>
              <span className="text-white font-medium">{profitFactor.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-stravesta-lightGray">Beste Trade:</span>
              <span className="text-green-500 font-medium">
                ${Math.max(...closedTrades.map(t => t.pnl || 0)).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-stravesta-lightGray">Schlechteste Trade:</span>
              <span className="text-red-500 font-medium">
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
