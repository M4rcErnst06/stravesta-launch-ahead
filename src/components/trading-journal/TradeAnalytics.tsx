
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { BarChart3, PieChart as PieChartIcon, TrendingUp, Brain } from 'lucide-react';

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

interface TradeAnalyticsProps {
  trades: Trade[];
}

const TradeAnalytics: React.FC<TradeAnalyticsProps> = ({ trades }) => {
  const closedTrades = trades.filter(trade => trade.status === 'closed');

  // Monthly P&L Data
  const monthlyData = closedTrades.reduce((acc, trade) => {
    const month = new Date(trade.entry_date).toLocaleDateString('de-DE', { 
      year: 'numeric', 
      month: 'short' 
    });
    
    if (!acc[month]) {
      acc[month] = { month, pnl: 0, trades: 0 };
    }
    
    acc[month].pnl += trade.pnl || 0;
    acc[month].trades += 1;
    return acc;
  }, {} as Record<string, { month: string; pnl: number; trades: number }>);

  const monthlyChartData = Object.values(monthlyData);

  // Symbol Performance
  const symbolData = closedTrades.reduce((acc, trade) => {
    if (!acc[trade.symbol]) {
      acc[trade.symbol] = { symbol: trade.symbol, pnl: 0, trades: 0 };
    }
    
    acc[trade.symbol].pnl += trade.pnl || 0;
    acc[trade.symbol].trades += 1;
    return acc;
  }, {} as Record<string, { symbol: string; pnl: number; trades: number }>);

  const symbolChartData = Object.values(symbolData)
    .sort((a, b) => Math.abs(b.pnl) - Math.abs(a.pnl))
    .slice(0, 10);

  // Emotion Analysis
  const emotionData = closedTrades.reduce((acc, trade) => {
    const emotion = trade.emotion || 'neutral';
    if (!acc[emotion]) {
      acc[emotion] = { emotion, count: 0, pnl: 0 };
    }
    
    acc[emotion].count += 1;
    acc[emotion].pnl += trade.pnl || 0;
    return acc;
  }, {} as Record<string, { emotion: string; count: number; pnl: number }>);

  const emotionChartData = Object.values(emotionData).map(item => ({
    name: item.emotion === 'discipline' ? 'Disziplin' :
          item.emotion === 'fear' ? 'Angst' :
          item.emotion === 'greed' ? 'Gier' :
          item.emotion === 'fomo' ? 'FOMO' : 'Neutral',
    value: item.count,
    pnl: item.pnl
  }));

  const COLORS = ['#17E6C8', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  // Cumulative P&L
  const cumulativeData = closedTrades
    .sort((a, b) => new Date(a.entry_date).getTime() - new Date(b.entry_date).getTime())
    .reduce((acc, trade, index) => {
      const cumulative = index === 0 ? (trade.pnl || 0) : acc[index - 1].cumulative + (trade.pnl || 0);
      acc.push({
        date: new Date(trade.entry_date).toLocaleDateString('de-DE'),
        cumulative,
        trade: index + 1
      });
      return acc;
    }, [] as Array<{ date: string; cumulative: number; trade: number }>);

  const chartConfig = {
    pnl: {
      label: "P&L",
      color: "#17E6C8",
    },
    cumulative: {
      label: "Kumulativ",
      color: "#17E6C8",
    },
  };

  return (
    <div className="space-y-6">
      {/* Monthly Performance */}
      <Card className="bg-stravesta-navy/50 border-stravesta-teal/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-stravesta-teal" />
            Monatliche Performance
          </CardTitle>
          <CardDescription className="text-stravesta-lightGray">
            P&L Entwicklung nach Monaten
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyChartData}>
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
                  dataKey="pnl" 
                  fill="#17E6C8"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Symbol Performance */}
        <Card className="bg-stravesta-navy/50 border-stravesta-teal/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-stravesta-teal" />
              Symbol Performance
            </CardTitle>
            <CardDescription className="text-stravesta-lightGray">
              Top 10 gehandelte Symbole
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={symbolChartData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" />
                  <XAxis 
                    type="number"
                    stroke="#E0E5EB"
                    fontSize={12}
                  />
                  <YAxis 
                    type="category"
                    dataKey="symbol" 
                    stroke="#E0E5EB"
                    fontSize={12}
                    width={60}
                  />
                  <ChartTooltip 
                    content={<ChartTooltipContent />}
                    cursor={{ fill: 'rgba(23, 230, 200, 0.1)' }}
                  />
                  <Bar 
                    dataKey="pnl" 
                    fill="#17E6C8"
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Emotion Analysis */}
        <Card className="bg-stravesta-navy/50 border-stravesta-teal/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Brain className="h-5 w-5 text-stravesta-teal" />
              Emotion Analysis
            </CardTitle>
            <CardDescription className="text-stravesta-lightGray">
              Verteilung der Trading-Emotionen
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={emotionChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {emotionChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Cumulative P&L */}
      <Card className="bg-stravesta-navy/50 border-stravesta-teal/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-stravesta-teal" />
            Kumulative P&L Entwicklung
          </CardTitle>
          <CardDescription className="text-stravesta-lightGray">
            Entwicklung des Gesamtgewinns über Zeit
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={cumulativeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" />
                <XAxis 
                  dataKey="date" 
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
                  dataKey="cumulative" 
                  stroke="#17E6C8" 
                  strokeWidth={2}
                  dot={{ fill: '#17E6C8', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#17E6C8', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default TradeAnalytics;
