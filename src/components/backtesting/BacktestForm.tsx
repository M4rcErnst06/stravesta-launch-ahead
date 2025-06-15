
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Play, Settings } from 'lucide-react';

interface BacktestConfig {
  symbol: string;
  strategy: string;
  startDate: string;
  endDate: string;
  initialCapital: number;
  riskPerTrade: number;
}

interface BacktestFormProps {
  config: BacktestConfig;
  setConfig: (config: BacktestConfig) => void;
  onRun: () => void;
  isRunning: boolean;
}

const BacktestForm: React.FC<BacktestFormProps> = ({ config, setConfig, onRun, isRunning }) => {
  const updateConfig = (field: keyof BacktestConfig, value: string | number) => {
    setConfig({ ...config, [field]: value });
  };

  return (
    <Card className="bg-stravesta-navy/50 border-stravesta-teal/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Settings className="h-5 w-5 text-stravesta-teal" />
          Backtest Konfiguration
        </CardTitle>
        <CardDescription className="text-stravesta-lightGray">
          Parameter für Ihren Strategietest
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="symbol" className="text-stravesta-lightGray">Symbol</Label>
          <Select value={config.symbol} onValueChange={(value) => updateConfig('symbol', value)}>
            <SelectTrigger className="bg-stravesta-dark border-stravesta-darkGray text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-stravesta-dark border-stravesta-darkGray">
              <SelectItem value="EURUSD">EUR/USD</SelectItem>
              <SelectItem value="GBPUSD">GBP/USD</SelectItem>
              <SelectItem value="USDJPY">USD/JPY</SelectItem>
              <SelectItem value="AUDUSD">AUD/USD</SelectItem>
              <SelectItem value="USDCAD">USD/CAD</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="strategy" className="text-stravesta-lightGray">Strategie</Label>
          <Select value={config.strategy} onValueChange={(value) => updateConfig('strategy', value)}>
            <SelectTrigger className="bg-stravesta-dark border-stravesta-darkGray text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-stravesta-dark border-stravesta-darkGray">
              <SelectItem value="moving-average">Moving Average Crossover</SelectItem>
              <SelectItem value="rsi-divergence">RSI Divergence</SelectItem>
              <SelectItem value="support-resistance">Support/Resistance</SelectItem>
              <SelectItem value="breakout">Breakout Strategy</SelectItem>
              <SelectItem value="journal-based">Journal-basiert (coming soon)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="startDate" className="text-stravesta-lightGray">Start Datum</Label>
            <Input
              id="startDate"
              type="date"
              value={config.startDate}
              onChange={(e) => updateConfig('startDate', e.target.value)}
              className="bg-stravesta-dark border-stravesta-darkGray text-white"
            />
          </div>
          <div>
            <Label htmlFor="endDate" className="text-stravesta-lightGray">End Datum</Label>
            <Input
              id="endDate"
              type="date"
              value={config.endDate}
              onChange={(e) => updateConfig('endDate', e.target.value)}
              className="bg-stravesta-dark border-stravesta-darkGray text-white"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="initialCapital" className="text-stravesta-lightGray">Startkapital ($)</Label>
          <Input
            id="initialCapital"
            type="number"
            value={config.initialCapital}
            onChange={(e) => updateConfig('initialCapital', parseFloat(e.target.value))}
            className="bg-stravesta-dark border-stravesta-darkGray text-white"
            min="1000"
            step="1000"
          />
        </div>

        <div>
          <Label htmlFor="riskPerTrade" className="text-stravesta-lightGray">Risiko pro Trade (%)</Label>
          <Input
            id="riskPerTrade"
            type="number"
            value={config.riskPerTrade}
            onChange={(e) => updateConfig('riskPerTrade', parseFloat(e.target.value))}
            className="bg-stravesta-dark border-stravesta-darkGray text-white"
            min="0.1"
            max="10"
            step="0.1"
          />
        </div>

        <Button 
          onClick={onRun}
          disabled={isRunning}
          className="w-full bg-stravesta-teal hover:bg-stravesta-teal/90 text-stravesta-dark font-semibold"
        >
          {isRunning ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-stravesta-dark mr-2"></div>
              Läuft...
            </>
          ) : (
            <>
              <Play className="h-4 w-4 mr-2" />
              Backtest starten
            </>
          )}
        </Button>

        <div className="mt-4 p-3 bg-stravesta-dark/50 rounded-lg border border-stravesta-darkGray">
          <p className="text-xs text-stravesta-lightGray">
            💡 <strong>Hinweis:</strong> Diese Version nutzt simulierte Daten. 
            Die vollständige Integration mit dem Trading Journal und echten Marktdaten folgt bald.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BacktestForm;
