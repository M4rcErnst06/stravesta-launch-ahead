import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar, Area, AreaChart, Cell } from 'recharts';
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
  // Enhanced Equity Curve Data with gradual growth
  const equityCurveData = Array.from({ length: 12 }, (_, i) => {
    const progress = (i + 1) / 12;
    const totalGrowth = config.initialCapital * (results.totalReturn / 100);
    const volatility = Math.sin(i * 0.8) * (totalGrowth * 0.1);
    return {
      month: `${String(i + 1).padStart(2, '0')}`,
      equity: Math.round(config.initialCapital + (totalGrowth * progress) + volatility),
      drawdown: Math.random() * results.maxDrawdown * 0.8
    };
  });

  // Enhanced Monthly Returns with more realistic data
  const monthlyReturns = Array.from({ length: 12 }, (_, i) => {
    const baseReturn = results.totalReturn / 12;
    const variation = (Math.random() - 0.5) * 8;
    const returnValue = baseReturn + variation;
    return {
      month: `M${i + 1}`,
      return: parseFloat(returnValue.toFixed(2)),
      fill: returnValue >= 0 ? '#10B981' : '#EF4444'
    };
  });

  const chartConfig = {
    equity: {
      label: "Kapital",
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
        <Card className="bg-gradient-to-br from-stravesta-navy/80 to-stravesta-navy/50 border-stravesta-teal/30 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-stravesta-lightGray">
              Gesamt Return
            </CardTitle>
            <div className="p-2 bg-stravesta-teal/20 rounded-full">
              <TrendingUp className="h-4 w-4 text-stravesta-teal" />
            </div>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${results.totalReturn >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {results.totalReturn >= 0 ? '+' : ''}{results.totalReturn.toFixed(2)}%
            </div>
            <p className="text-xs text-stravesta-lightGray mt-1">
              ${(config.initialCapital * (results.totalReturn / 100)).toFixed(0)} Gewinn
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-stravesta-navy/80 to-stravesta-navy/50 border-stravesta-teal/30 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-stravesta-lightGray">
              Win Rate
            </CardTitle>
            <div className="p-2 bg-blue-500/20 rounded-full">
              <Target className="h-4 w-4 text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-400">
              {results.winRate.toFixed(1)}%
            </div>
            <p className="text-xs text-stravesta-lightGray mt-1">
              {Math.round(results.totalTrades * results.winRate / 100)} von {results.totalTrades} Trades
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-stravesta-navy/80 to-stravesta-navy/50 border-stravesta-teal/30 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-stravesta-lightGray">
              Max Drawdown
            </CardTitle>
            <div className="p-2 bg-red-500/20 rounded-full">
              <TrendingDown className="h-4 w-4 text-red-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-400">
              {results.maxDrawdown.toFixed(2)}%
            </div>
            <p className="text-xs text-stravesta-lightGray mt-1">
              Maximaler Verlust
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-stravesta-navy/80 to-stravesta-navy/50 border-stravesta-teal/30 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-stravesta-lightGray">
              Profit Factor
            </CardTitle>
            <div className="p-2 bg-yellow-500/20 rounded-full">
              <Award className="h-4 w-4 text-yellow-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-400">
              {results.profitFactor.toFixed(2)}
            </div>
            <p className="text-xs text-stravesta-lightGray mt-1">
              Gewinn/Verlust Verhältnis
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enhanced Equity Curve */}
        <Card className="bg-gradient-to-br from-stravesta-navy/80 to-stravesta-navy/50 border-stravesta-teal/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <div className="p-2 bg-stravesta-teal/20 rounded-lg">
                <BarChart3 className="h-5 w-5 text-stravesta-teal" />
              </div>
              Equity Curve
            </CardTitle>
            <CardDescription className="text-stravesta-lightGray">
              Kapitalentwicklung über Zeit
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={equityCurveData}>
                  <defs>
                    <linearGradient id="equityGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#17E6C8" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#17E6C8" stopOpacity={0.05}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" opacity={0.5} />
                  <XAxis 
                    dataKey="month" 
                    stroke="#94A3B8"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="#94A3B8"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${(value/1000).toFixed(0)}k`}
                  />
                  <ChartTooltip 
                    content={<ChartTooltipContent />}
                    cursor={{ stroke: '#17E6C8', strokeWidth: 1, strokeDasharray: '5 5' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="equity"
                    stroke="#17E6C8"
                    strokeWidth={3}
                    fill="url(#equityGradient)"
                    dot={{ fill: '#17E6C8', strokeWidth: 2, r: 5, stroke: '#0F172A' }}
                    activeDot={{ r: 7, stroke: '#17E6C8', strokeWidth: 2, fill: '#0F172A' }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Enhanced Monthly Returns */}
        <Card className="bg-gradient-to-br from-stravesta-navy/80 to-stravesta-navy/50 border-stravesta-teal/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <div className="p-2 bg-emerald-500/20 rounded-lg">
                <DollarSign className="h-5 w-5 text-emerald-400" />
              </div>
              Monatliche Returns
            </CardTitle>
            <CardDescription className="text-stravesta-lightGray">
              Performance nach Monaten
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyReturns} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" opacity={0.5} />
                  <XAxis 
                    dataKey="month" 
                    stroke="#94A3B8"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="#94A3B8"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <ChartTooltip 
                    content={<ChartTooltipContent />}
                    cursor={{ fill: 'rgba(23, 230, 200, 0.1)' }}
                  />
                  <Bar dataKey="return" radius={[4, 4, 0, 0]}>
                    {monthlyReturns.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Detailed Stats */}
      <Card className="bg-gradient-to-br from-stravesta-navy/80 to-stravesta-navy/50 border-stravesta-teal/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <BarChart3 className="h-5 w-5 text-purple-400" />
            </div>
            Detaillierte Statistiken
          </CardTitle>
          <CardDescription className="text-stravesta-lightGray">
            Vollständige Performance-Analyse für {config.strategy} auf {config.symbol}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-gradient-to-br from-stravesta-dark/80 to-stravesta-dark/40 rounded-xl border border-stravesta-darkGray/50 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-stravesta-lightGray">Sharpe Ratio</div>
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              </div>
              <div className="text-xl font-bold text-blue-400">{results.sharpeRatio.toFixed(2)}</div>
            </div>
            <div className="p-4 bg-gradient-to-br from-stravesta-dark/80 to-stravesta-dark/40 rounded-xl border border-stravesta-darkGray/50 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-stravesta-lightGray">Ø Gewinn</div>
                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
              </div>
              <div className="text-xl font-bold text-emerald-400">${results.avgWin.toFixed(2)}</div>
            </div>
            <div className="p-4 bg-gradient-to-br from-stravesta-dark/80 to-stravesta-dark/40 rounded-xl border border-stravesta-darkGray/50 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-stravesta-lightGray">Ø Verlust</div>
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
              </div>
              <div className="text-xl font-bold text-red-400">${results.avgLoss.toFixed(2)}</div>
            </div>
            <div className="p-4 bg-gradient-to-br from-stravesta-dark/80 to-stravesta-dark/40 rounded-xl border border-stravesta-darkGray/50 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-stravesta-lightGray">Gesamt Trades</div>
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              </div>
              <div className="text-xl font-bold text-yellow-400">{results.totalTrades}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BacktestResults;
