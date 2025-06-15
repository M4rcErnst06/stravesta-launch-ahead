
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, TrendingDown, Target, DollarSign, BarChart3, Award } from 'lucide-react';

interface BacktestResult {
  totalTrades: number;
  winRate: number;
  totalReturn: number;
  maxDrawdown: number;
  sharpeRatio: number;
  profitFactor: number;
  avgWin: number;
  avgLoss: number;
}

interface BacktestConfig {
  symbol: string;
  strategy: string;
  startDate: string;
  endDate: string;
  initialCapital: number;
  riskPerTrade: number;
}

interface BacktestResultsProps {
  results: BacktestResult;
  config: BacktestConfig;
}

const BacktestResults: React.FC<BacktestResultsProps> = ({ results, config }) => {
  // Mock Equity Curve Data
  const equityCurveData = Array.from({ length: 12 }, (_, i) => ({
    month: `${i + 1}`,
    equity: config.initialCapital + (config.initialCapital * (results.totalReturn / 100) * (i + 1) / 12),
    drawdown: Math.random() * results.maxDrawdown
  }));

  // Mock Monthly Returns
  const monthlyReturns = Array.from({ length: 12 }, (_, i) => ({
    month: `M${i + 1}`,
    return: (Math.random() - 0.5) * 10
  }));

  const chartConfig = {
    equity: {
      label: "Equity",
      color: "#17E6C8",
    },
    return: {
      label: "Return",
      color: "#17E6C8",
    },
  };

  return (
    <div className="space-y-6">
      {/* Performance Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-stravesta-navy/50 border-stravesta-teal/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-stravesta-lightGray">
              Gesamt Return
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-stravesta-teal" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${results.totalReturn >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {results.totalReturn.toFixed(2)}%
            </div>
            <p className="text-xs text-stravesta-lightGray">
              ${(config.initialCapital * (results.totalReturn / 100)).toFixed(0)} Gewinn
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
              {results.winRate.toFixed(1)}%
            </div>
            <p className="text-xs text-stravesta-lightGray">
              {Math.round(results.totalTrades * results.winRate / 100)} von {results.totalTrades} Trades
            </p>
          </CardContent>
        </Card>

        <Card className="bg-stravesta-navy/50 border-stravesta-teal/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-stravesta-lightGray">
              Max Drawdown
            </CardTitle>
            <TrendingDown className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">
              {results.maxDrawdown.toFixed(2)}%
            </div>
            <p className="text-xs text-stravesta-lightGray">
              Maximaler Verlust
            </p>
          </CardContent>
        </Card>

        <Card className="bg-stravesta-navy/50 border-stravesta-teal/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-stravesta-lightGray">
              Profit Factor
            </CardTitle>
            <Award className="h-4 w-4 text-stravesta-teal" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {results.profitFactor.toFixed(2)}
            </div>
            <p className="text-xs text-stravesta-lightGray">
              Gewinn/Verlust Verhältnis
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Equity Curve */}
        <Card className="bg-stravesta-navy/50 border-stravesta-teal/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-stravesta-teal" />
              Equity Curve
            </CardTitle>
            <CardDescription className="text-stravesta-lightGray">
              Kapitalentwicklung über Zeit
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={equityCurveData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" />
                  <XAxis 
                    dataKey="month" 
                    stroke="#E0E5EB"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="#E0E5EB"
                    fontSize={12}
                  />
                  <ChartTooltip 
                    content={<ChartTooltipContent />}
                    cursor={{ stroke: '#17E6C8', strokeWidth: 1 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="equity" 
                    stroke="#17E6C8" 
                    strokeWidth={2}
                    dot={{ fill: '#17E6C8', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Monthly Returns */}
        <Card className="bg-stravesta-navy/50 border-stravesta-teal/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-stravesta-teal" />
              Monatliche Returns
            </CardTitle>
            <CardDescription className="text-stravesta-lightGray">
              Performance nach Monaten
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyReturns}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" />
                  <XAxis 
                    dataKey="month" 
                    stroke="#E0E5EB"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="#E0E5EB"
                    fontSize={12}
                  />
                  <ChartTooltip 
                    content={<ChartTooltipContent />}
                    cursor={{ fill: 'rgba(23, 230, 200, 0.1)' }}
                  />
                  <Bar 
                    dataKey="return" 
                    fill="#17E6C8"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Stats */}
      <Card className="bg-stravesta-navy/50 border-stravesta-teal/20">
        <CardHeader>
          <CardTitle className="text-white">Detaillierte Statistiken</CardTitle>
          <CardDescription className="text-stravesta-lightGray">
            Vollständige Performance-Analyse für {config.strategy} auf {config.symbol}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-stravesta-dark/50 rounded-lg border border-stravesta-darkGray">
              <div className="text-sm text-stravesta-lightGray">Sharpe Ratio</div>
              <div className="text-xl font-bold text-white">{results.sharpeRatio.toFixed(2)}</div>
            </div>
            <div className="p-4 bg-stravesta-dark/50 rounded-lg border border-stravesta-darkGray">
              <div className="text-sm text-stravesta-lightGray">Ø Gewinn</div>
              <div className="text-xl font-bold text-green-500">${results.avgWin.toFixed(2)}</div>
            </div>
            <div className="p-4 bg-stravesta-dark/50 rounded-lg border border-stravesta-darkGray">
              <div className="text-sm text-stravesta-lightGray">Ø Verlust</div>
              <div className="text-xl font-bold text-red-500">${results.avgLoss.toFixed(2)}</div>
            </div>
            <div className="p-4 bg-stravesta-dark/50 rounded-lg border border-stravesta-darkGray">
              <div className="text-sm text-stravesta-lightGray">Gesamt Trades</div>
              <div className="text-xl font-bold text-white">{results.totalTrades}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BacktestResults;
