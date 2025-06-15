import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Play, TrendingUp, BarChart3, Target, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BacktestResults from '@/components/backtesting/BacktestResults';
import BacktestForm from '@/components/backtesting/BacktestForm';

interface BacktestConfig {
  symbol: string;
  strategy: string;
  startDate: string;
  endDate: string;
  initialCapital: number;
  riskPerTrade: number;
}

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

const BacktestingEngine = () => {
  const navigate = useNavigate();
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<BacktestResult | null>(null);
  const [config, setConfig] = useState<BacktestConfig>({
    symbol: 'EURUSD',
    strategy: 'moving-average',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    initialCapital: 10000,
    riskPerTrade: 2
  });

  const runBacktest = async () => {
    setIsRunning(true);
    
    // Simuliere Backtesting (später mit echten Journal-Daten)
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock Ergebnisse (später aus echten Berechnungen)
    const mockResults: BacktestResult = {
      totalTrades: Math.floor(Math.random() * 100) + 50,
      winRate: Math.random() * 30 + 50, // 50-80%
      totalReturn: (Math.random() * 30 + 5), // 5-35%
      maxDrawdown: -(Math.random() * 15 + 5), // -5% bis -20%
      sharpeRatio: Math.random() * 1.5 + 0.5, // 0.5-2.0
      profitFactor: Math.random() * 1.5 + 1.0, // 1.0-2.5
      avgWin: Math.random() * 50 + 20, // $20-70
      avgLoss: -(Math.random() * 30 + 10) // -$10-40
    };
    
    setResults(mockResults);
    setIsRunning(false);
  };

  return (
    <div className="min-h-screen bg-stravesta-dark relative">
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
                    Backtesting Engine
                  </h1>
                  <p className="text-stravesta-lightGray">Testen Sie Ihre Trading-Strategien mit historischen Daten</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Configuration Panel */}
            <div className="lg:col-span-1">
              <BacktestForm 
                config={config} 
                setConfig={setConfig} 
                onRun={runBacktest}
                isRunning={isRunning}
              />
            </div>

            {/* Results Panel */}
            <div className="lg:col-span-2">
              {isRunning && (
                <Card className="bg-stravesta-navy/50 border-stravesta-teal/20">
                  <CardContent className="p-8 text-center">
                    <div className="flex flex-col items-center space-y-4">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-stravesta-teal"></div>
                      <h3 className="text-lg font-semibold text-white">Backtesting läuft...</h3>
                      <p className="text-stravesta-lightGray">Analysiere historische Daten und berechne Performance-Metriken</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {results && !isRunning && (
                <BacktestResults results={results} config={config} />
              )}

              {!results && !isRunning && (
                <Card className="bg-stravesta-navy/50 border-stravesta-teal/20">
                  <CardContent className="p-8 text-center">
                    <div className="flex flex-col items-center space-y-4">
                      <BarChart3 className="h-16 w-16 text-stravesta-teal/50" />
                      <h3 className="text-lg font-semibold text-white">Bereit für Backtesting</h3>
                      <p className="text-stravesta-lightGray">
                        Konfigurieren Sie Ihre Parameter und starten Sie den Test
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Info Section */}
          <div className="mt-8">
            <Card className="bg-stravesta-navy/50 border-stravesta-teal/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-stravesta-teal" />
                  Integration mit Trading Journal
                </CardTitle>
                <CardDescription className="text-stravesta-lightGray">
                  Zukünftige Features und Integrationen
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-stravesta-dark/50 rounded-lg border border-stravesta-darkGray">
                    <h4 className="font-semibold text-white mb-2">📊 Journal-Daten Integration</h4>
                    <p className="text-sm text-stravesta-lightGray">
                      Automatische Analyse Ihrer Trading Journal Einträge für realistische Backtests
                    </p>
                  </div>
                  <div className="p-4 bg-stravesta-dark/50 rounded-lg border border-stravesta-darkGray">
                    <h4 className="font-semibold text-white mb-2">🎯 Setup-Erkennung</h4>
                    <p className="text-sm text-stravesta-lightGray">
                      AI-basierte Erkennung Ihrer erfolgreichsten Trading-Setups aus dem Journal
                    </p>
                  </div>
                  <div className="p-4 bg-stravesta-dark/50 rounded-lg border border-stravesta-darkGray">
                    <h4 className="font-semibold text-white mb-2">📈 Realtime-Daten</h4>
                    <p className="text-sm text-stravesta-lightGray">
                      Integration mit Live-Marktdaten für präzise historische Tests
                    </p>
                  </div>
                  <div className="p-4 bg-stravesta-dark/50 rounded-lg border border-stravesta-darkGray">
                    <h4 className="font-semibold text-white mb-2">🔄 Optimierung</h4>
                    <p className="text-sm text-stravesta-lightGray">
                      Automatische Parameter-Optimierung basierend auf Journal-Performance
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BacktestingEngine;
