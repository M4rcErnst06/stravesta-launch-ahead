
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, TrendingUp, TrendingDown, DollarSign, Percent, PieChart, BarChart3, Target, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, LineChart, Line, Area, AreaChart } from 'recharts';

// Mock data for portfolio analysis
const portfolioData = {
  totalValue: 125840.50,
  dailyChange: 2840.20,
  dailyChangePercent: 2.31,
  weeklyChange: -1240.80,
  weeklyChangePercent: -0.98,
  monthlyChange: 8950.30,
  monthlyChangePercent: 7.66,
  yearlyChange: 18750.90,
  yearlyChangePercent: 17.52
};

const holdings = [
  { symbol: 'AAPL', name: 'Apple Inc.', shares: 50, price: 185.20, value: 9260, allocation: 7.36, change: 2.1 },
  { symbol: 'MSFT', name: 'Microsoft Corp.', shares: 30, price: 420.10, value: 12603, allocation: 10.02, change: 1.8 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', shares: 25, price: 142.80, value: 3570, allocation: 2.84, change: -0.9 },
  { symbol: 'TSLA', name: 'Tesla Inc.', shares: 40, price: 248.50, value: 9940, allocation: 7.90, change: 3.2 },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', shares: 15, price: 875.60, value: 13134, allocation: 10.44, change: 4.1 },
  { symbol: 'AMD', name: 'Advanced Micro Devices', shares: 80, price: 142.30, value: 11384, allocation: 9.05, change: 2.8 },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', shares: 35, price: 155.20, value: 5432, allocation: 4.32, change: 1.5 },
  { symbol: 'META', name: 'Meta Platforms Inc.', shares: 25, price: 485.20, value: 12130, allocation: 9.64, change: -1.2 }
];

const sectorAllocation = [
  { name: 'Technologie', value: 45.2, color: '#17E6C8' },
  { name: 'Gesundheitswesen', value: 15.8, color: '#10B981' },
  { name: 'Finanzen', value: 12.4, color: '#F59E0B' },
  { name: 'Energie', value: 8.9, color: '#EF4444' },
  { name: 'Immobilien', value: 7.2, color: '#8B5CF6' },
  { name: 'Sonstige', value: 10.5, color: '#6B7280' }
];

const performanceHistory = [
  { date: 'Jan 24', value: 95000, benchmark: 92000 },
  { date: 'Feb 24', value: 98500, benchmark: 94500 },
  { date: 'Mar 24', value: 102000, benchmark: 97000 },
  { date: 'Apr 24', value: 105200, benchmark: 99800 },
  { date: 'Mai 24', value: 108900, benchmark: 102200 },
  { date: 'Jun 24', value: 112400, benchmark: 104600 },
  { date: 'Jul 24', value: 118200, benchmark: 107800 },
  { date: 'Aug 24', value: 122600, benchmark: 110400 },
  { date: 'Sep 24', value: 119800, benchmark: 108900 },
  { date: 'Okt 24', value: 123400, benchmark: 112100 },
  { date: 'Nov 24', value: 125800, benchmark: 114300 },
  { date: 'Dez 24', value: 125840, benchmark: 115200 }
];

const riskMetrics = {
  sharpeRatio: 1.24,
  beta: 1.08,
  volatility: 18.5,
  maxDrawdown: -12.3,
  var95: -2840.50
};

const PortfolioAnalysis = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'holdings' | 'performance' | 'risk'>('overview');

  const chartConfig = {
    value: {
      label: "Portfolio",
      color: "#17E6C8",
    },
    benchmark: {
      label: "Benchmark",
      color: "#6B7280",
    },
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-stravesta-navy/50 border-stravesta-teal/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-stravesta-lightGray">
              Gesamtwert
            </CardTitle>
            <DollarSign className="h-4 w-4 text-stravesta-teal" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              ${portfolioData.totalValue.toLocaleString()}
            </div>
            <div className={`text-xs flex items-center ${portfolioData.dailyChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {portfolioData.dailyChange >= 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
              ${Math.abs(portfolioData.dailyChange).toFixed(2)} ({portfolioData.dailyChangePercent >= 0 ? '+' : ''}{portfolioData.dailyChangePercent}%) heute
            </div>
          </CardContent>
        </Card>

        <Card className="bg-stravesta-navy/50 border-stravesta-teal/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-stravesta-lightGray">
              Monatsrendite
            </CardTitle>
            <Percent className="h-4 w-4 text-stravesta-teal" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">
              +{portfolioData.monthlyChangePercent}%
            </div>
            <p className="text-xs text-stravesta-lightGray">
              ${portfolioData.monthlyChange.toLocaleString()}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-stravesta-navy/50 border-stravesta-teal/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-stravesta-lightGray">
              Jahresrendite
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">
              +{portfolioData.yearlyChangePercent}%
            </div>
            <p className="text-xs text-stravesta-lightGray">
              ${portfolioData.yearlyChange.toLocaleString()}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-stravesta-navy/50 border-stravesta-teal/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-stravesta-lightGray">
              Sharpe Ratio
            </CardTitle>
            <Target className="h-4 w-4 text-stravesta-teal" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {riskMetrics.sharpeRatio}
            </div>
            <p className="text-xs text-stravesta-lightGray">
              Risikoadjustierte Rendite
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Chart */}
        <Card className="bg-stravesta-navy/50 border-stravesta-teal/20">
          <CardHeader>
            <CardTitle className="text-white">Portfolio Performance</CardTitle>
            <CardDescription className="text-stravesta-lightGray">
              Vergleich mit Benchmark über 12 Monate
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" />
                  <XAxis dataKey="date" stroke="#E0E5EB" fontSize={12} />
                  <YAxis stroke="#E0E5EB" fontSize={12} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="benchmark"
                    stackId="1"
                    stroke="#6B7280"
                    fill="#6B7280"
                    fillOpacity={0.3}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stackId="2"
                    stroke="#17E6C8"
                    fill="#17E6C8"
                    fillOpacity={0.5}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Sector Allocation */}
        <Card className="bg-stravesta-navy/50 border-stravesta-teal/20">
          <CardHeader>
            <CardTitle className="text-white">Sektor Allokation</CardTitle>
            <CardDescription className="text-stravesta-lightGray">
              Diversifikation nach Branchen
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={sectorAllocation}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {sectorAllocation.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </RechartsPieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderHoldings = () => (
    <Card className="bg-stravesta-navy/50 border-stravesta-teal/20">
      <CardHeader>
        <CardTitle className="text-white">Portfolio Holdings</CardTitle>
        <CardDescription className="text-stravesta-lightGray">
          Aktuelle Positionen und Allokation
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {holdings.map((holding) => (
            <div key={holding.symbol} className="flex items-center justify-between p-4 bg-stravesta-dark/50 rounded-lg border border-stravesta-darkGray">
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <div>
                    <p className="font-medium text-white">{holding.symbol}</p>
                    <p className="text-sm text-stravesta-lightGray">{holding.name}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-6 text-right">
                <div>
                  <p className="text-sm text-stravesta-lightGray">Shares</p>
                  <p className="font-medium text-white">{holding.shares}</p>
                </div>
                <div>
                  <p className="text-sm text-stravesta-lightGray">Preis</p>
                  <p className="font-medium text-white">${holding.price}</p>
                </div>
                <div>
                  <p className="text-sm text-stravesta-lightGray">Wert</p>
                  <p className="font-medium text-white">${holding.value.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-stravesta-lightGray">Allokation</p>
                  <p className="font-medium text-white">{holding.allocation}%</p>
                </div>
                <div>
                  <p className="text-sm text-stravesta-lightGray">Änderung</p>
                  <p className={`font-medium ${holding.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {holding.change >= 0 ? '+' : ''}{holding.change}%
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const renderRiskAnalysis = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-stravesta-navy/50 border-stravesta-teal/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-stravesta-lightGray">
              Beta
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-stravesta-teal" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{riskMetrics.beta}</div>
            <p className="text-xs text-stravesta-lightGray">
              Marktkorrelation
            </p>
          </CardContent>
        </Card>

        <Card className="bg-stravesta-navy/50 border-stravesta-teal/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-stravesta-lightGray">
              Volatilität
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{riskMetrics.volatility}%</div>
            <p className="text-xs text-stravesta-lightGray">
              Jährliche Schwankung
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
            <div className="text-2xl font-bold text-red-500">{riskMetrics.maxDrawdown}%</div>
            <p className="text-xs text-stravesta-lightGray">
              Größter Verlust
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-stravesta-navy/50 border-stravesta-teal/20">
        <CardHeader>
          <CardTitle className="text-white">Value at Risk (VaR 95%)</CardTitle>
          <CardDescription className="text-stravesta-lightGray">
            Maximaler erwarteter Verlust in 95% der Fälle
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-red-500 mb-4">
            ${Math.abs(riskMetrics.var95).toLocaleString()}
          </div>
          <p className="text-stravesta-lightGray">
            Basierend auf historischen Daten der letzten 252 Handelstage
          </p>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-stravesta-dark">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
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
              <h1 className="text-3xl font-bold text-white">Portfolio Analyse</h1>
              <p className="text-stravesta-lightGray">Umfassende Analyse Ihres Portfolios</p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8 bg-stravesta-navy/30 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeTab === 'overview'
                ? 'bg-stravesta-teal text-black font-medium'
                : 'text-stravesta-lightGray hover:text-white'
            }`}
          >
            Übersicht
          </button>
          <button
            onClick={() => setActiveTab('holdings')}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeTab === 'holdings'
                ? 'bg-stravesta-teal text-black font-medium'
                : 'text-stravesta-lightGray hover:text-white'
            }`}
          >
            Holdings
          </button>
          <button
            onClick={() => setActiveTab('performance')}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeTab === 'performance'
                ? 'bg-stravesta-teal text-black font-medium'
                : 'text-stravesta-lightGray hover:text-white'
            }`}
          >
            Performance
          </button>
          <button
            onClick={() => setActiveTab('risk')}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeTab === 'risk'
                ? 'bg-stravesta-teal text-black font-medium'
                : 'text-stravesta-lightGray hover:text-white'
            }`}
          >
            Risiko
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'holdings' && renderHoldings()}
        {activeTab === 'performance' && renderOverview()} {/* Same as overview for now */}
        {activeTab === 'risk' && renderRiskAnalysis()}
      </div>
    </div>
  );
};

export default PortfolioAnalysis;
