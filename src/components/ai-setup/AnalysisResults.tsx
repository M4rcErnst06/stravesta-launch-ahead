
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, Minus, Target, Shield, DollarSign, Brain, Zap } from 'lucide-react';
import { SetupAnalysis } from '@/pages/AISetupRecognition';

interface AnalysisResultsProps {
  analysis: SetupAnalysis | null;
  isAnalyzing: boolean;
  uploadedImage: string | null;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ analysis, isAnalyzing, uploadedImage }) => {
  if (isAnalyzing) {
    return (
      <Card className="bg-stravesta-navy/50 border-stravesta-teal/20">
        <CardContent className="flex flex-col items-center justify-center p-12">
          <div className="animate-spin mb-4">
            <Brain className="h-12 w-12 text-stravesta-teal" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">KI analysiert Chart...</h3>
          <p className="text-stravesta-lightGray text-center">
            Bitte warten Sie, während unsere KI Ihr Chart analysiert und Trading-Setups identifiziert.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (!uploadedImage) {
    return (
      <Card className="bg-stravesta-navy/50 border-stravesta-teal/20">
        <CardContent className="flex flex-col items-center justify-center p-12">
          <Zap className="h-12 w-12 text-stravesta-lightGray mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Bereit für Analyse</h3>
          <p className="text-stravesta-lightGray text-center">
            Laden Sie ein Chart-Bild hoch, um mit der KI-Analyse zu beginnen.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (!analysis) {
    return (
      <Card className="bg-stravesta-navy/50 border-stravesta-teal/20">
        <CardContent className="flex flex-col items-center justify-center p-12">
          <Target className="h-12 w-12 text-stravesta-lightGray mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Chart hochgeladen</h3>
          <p className="text-stravesta-lightGray text-center">
            Klicken Sie auf "Chart analysieren", um die KI-Analyse zu starten.
          </p>
        </CardContent>
      </Card>
    );
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'bullish':
        return <TrendingUp className="h-5 w-5 text-green-500" />;
      case 'bearish':
        return <TrendingDown className="h-5 w-5 text-red-500" />;
      default:
        return <Minus className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'bullish':
        return 'text-green-500';
      case 'bearish':
        return 'text-red-500';
      default:
        return 'text-yellow-500';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 70) return 'text-green-500';
    if (confidence >= 50) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="space-y-6">
      {/* Main Analysis Card */}
      <Card className="bg-stravesta-navy/50 border-stravesta-teal/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Brain className="h-5 w-5 text-stravesta-teal" />
            Analyse-Ergebnisse
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Pattern & Confidence */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-stravesta-lightGray mb-2">Erkanntes Pattern</h4>
              <Badge className="bg-stravesta-teal/10 text-stravesta-teal border-stravesta-teal/30">
                {analysis.pattern}
              </Badge>
            </div>
            <div>
              <h4 className="text-sm font-medium text-stravesta-lightGray mb-2">Konfidenz</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`font-semibold ${getConfidenceColor(analysis.confidence)}`}>
                    {analysis.confidence}%
                  </span>
                </div>
                <Progress value={analysis.confidence} className="h-2" />
              </div>
            </div>
          </div>

          {/* Trend */}
          <div>
            <h4 className="text-sm font-medium text-stravesta-lightGray mb-2">Trend-Richtung</h4>
            <div className="flex items-center gap-2">
              {getTrendIcon(analysis.trend)}
              <span className={`font-semibold capitalize ${getTrendColor(analysis.trend)}`}>
                {analysis.trend === 'bullish' ? 'Bullisch' : analysis.trend === 'bearish' ? 'Bärisch' : 'Seitwärts'}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trading Levels */}
      {(analysis.entry_price || analysis.stop_loss || analysis.take_profit) && (
        <Card className="bg-stravesta-navy/50 border-stravesta-teal/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Target className="h-5 w-5 text-stravesta-teal" />
              Trading Levels
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {analysis.entry_price && (
              <div className="bg-stravesta-darkGray/50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium text-stravesta-lightGray">Entry</span>
                </div>
                <span className="text-lg font-bold text-white">{analysis.entry_price}</span>
              </div>
            )}
            
            {analysis.stop_loss && (
              <div className="bg-stravesta-darkGray/50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-4 w-4 text-red-500" />
                  <span className="text-sm font-medium text-stravesta-lightGray">Stop Loss</span>
                </div>
                <span className="text-lg font-bold text-white">{analysis.stop_loss}</span>
              </div>
            )}
            
            {analysis.take_profit && (
              <div className="bg-stravesta-darkGray/50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium text-stravesta-lightGray">Take Profit</span>
                </div>
                <span className="text-lg font-bold text-white">{analysis.take_profit}</span>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Risk/Reward Ratio */}
      {analysis.risk_reward_ratio && (
        <Card className="bg-stravesta-navy/50 border-stravesta-teal/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-stravesta-lightGray">Risk/Reward Ratio</span>
              <span className="text-lg font-bold text-stravesta-teal">
                1:{analysis.risk_reward_ratio.toFixed(1)}
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Support/Resistance Levels */}
      {(analysis.support_levels.length > 0 || analysis.resistance_levels.length > 0) && (
        <Card className="bg-stravesta-navy/50 border-stravesta-teal/20">
          <CardHeader>
            <CardTitle className="text-white text-sm">Key Levels</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {analysis.resistance_levels.length > 0 && (
              <div>
                <h5 className="text-sm font-medium text-red-400 mb-2">Resistance</h5>
                <div className="flex flex-wrap gap-2">
                  {analysis.resistance_levels.map((level, index) => (
                    <Badge key={index} variant="outline" className="border-red-500/30 text-red-400">
                      {level}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            {analysis.support_levels.length > 0 && (
              <div>
                <h5 className="text-sm font-medium text-green-400 mb-2">Support</h5>
                <div className="flex flex-wrap gap-2">
                  {analysis.support_levels.map((level, index) => (
                    <Badge key={index} variant="outline" className="border-green-500/30 text-green-400">
                      {level}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Analysis Details */}
      <Card className="bg-stravesta-navy/50 border-stravesta-teal/20">
        <CardHeader>
          <CardTitle className="text-white text-sm">Detaillierte Analyse</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-stravesta-lightGray text-sm leading-relaxed">
            {analysis.analysis_text}
          </p>
          <p className="text-xs text-stravesta-darkGray mt-4">
            Analysiert am: {new Date(analysis.timestamp).toLocaleString('de-DE')}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalysisResults;
