import React, { useEffect, useRef, useState } from 'react';
import { Brain, Target, TrendingUp, AlertTriangle, Zap, CheckCircle2 } from 'lucide-react';

interface CandleData {
  open: number;
  high: number;
  low: number;
  close: number;
  timestamp: number;
}

const TradingChartAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [animationStep, setAnimationStep] = useState(0);
  const [patternDetected, setPatternDetected] = useState(false);
  const [alertTriggered, setAlertTriggered] = useState(false);
  const [entryExecuted, setEntryExecuted] = useState(false);
  const [aiAnalyzing, setAiAnalyzing] = useState(false);
  const [confidence, setConfidence] = useState(0);

  // Chart data showing a bullish flag pattern
  const candleData: CandleData[] = [
    { open: 1.0850, high: 1.0890, low: 1.0840, close: 1.0875, timestamp: 1 },
    { open: 1.0875, high: 1.0920, low: 1.0860, close: 1.0915, timestamp: 2 },
    { open: 1.0915, high: 1.0950, low: 1.0900, close: 1.0940, timestamp: 3 },
    { open: 1.0940, high: 1.0965, low: 1.0920, close: 1.0955, timestamp: 4 },
    { open: 1.0955, high: 1.0965, low: 1.0940, close: 1.0950, timestamp: 5 },
    { open: 1.0950, high: 1.0960, low: 1.0935, close: 1.0945, timestamp: 6 },
    { open: 1.0945, high: 1.0955, low: 1.0930, close: 1.0940, timestamp: 7 },
    { open: 1.0940, high: 1.0950, low: 1.0925, close: 1.0935, timestamp: 8 },
    { open: 1.0935, high: 1.0970, low: 1.0930, close: 1.0965, timestamp: 9 },
    { open: 1.0965, high: 1.1020, low: 1.0960, close: 1.1015, timestamp: 10 },
  ];

  // Pattern recognition points
  const flagPole = { start: 1, end: 4 };
  const flagConsolidation = { start: 4, end: 8 };
  const breakout = { timestamp: 9, price: 1.0965 };
  
  // Entry and target points
  const entryPoint = { price: 1.0965, timestamp: 9 };
  const targetPoint = { price: 1.1015, timestamp: 10 };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 700;
    canvas.height = 400;

    const drawChart = () => {
      // Clear canvas
      ctx.fillStyle = '#0A1929';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Chart boundaries
      const chartLeft = 80;
      const chartRight = canvas.width - 120;
      const chartTop = 50;
      const chartBottom = canvas.height - 60;
      const chartWidth = chartRight - chartLeft;
      const chartHeight = chartBottom - chartTop;

      // Price range
      const minPrice = 1.0820;
      const maxPrice = 1.1030;
      const priceRange = maxPrice - minPrice;

      // Helper functions
      const priceToY = (price: number) => chartBottom - ((price - minPrice) / priceRange) * chartHeight;
      const timestampToX = (timestamp: number) => chartLeft + ((timestamp - 1) / 9) * chartWidth;

      // Draw grid
      ctx.strokeStyle = '#1A2A3A';
      ctx.lineWidth = 1;
      for (let i = 0; i <= 8; i++) {
        const y = chartTop + (i * chartHeight) / 8;
        ctx.beginPath();
        ctx.moveTo(chartLeft, y);
        ctx.lineTo(chartRight, y);
        ctx.stroke();
      }

      // Draw candlesticks
      const visibleCandles = Math.min(animationStep + 1, candleData.length);
      for (let i = 0; i < visibleCandles; i++) {
        const candle = candleData[i];
        const x = timestampToX(candle.timestamp);
        const openY = priceToY(candle.open);
        const closeY = priceToY(candle.close);
        const highY = priceToY(candle.high);
        const lowY = priceToY(candle.low);

        const candleWidth = 16;
        const isGreen = candle.close > candle.open;

        // Draw wick
        ctx.strokeStyle = isGreen ? '#00C851' : '#FF4444';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x, highY);
        ctx.lineTo(x, lowY);
        ctx.stroke();

        // Draw body
        ctx.fillStyle = isGreen ? '#00C851' : '#FF4444';
        const bodyHeight = Math.abs(closeY - openY);
        const bodyTop = Math.min(openY, closeY);
        ctx.fillRect(x - candleWidth/2, bodyTop, candleWidth, bodyHeight || 2);
      }

      // Draw AI pattern recognition
      if (patternDetected && animationStep >= 5) {
        // Flag pole highlight
        ctx.strokeStyle = '#17E6C8';
        ctx.lineWidth = 3;
        ctx.setLineDash([]);
        
        // Draw flag pole trend line
        const startX = timestampToX(flagPole.start);
        const endX = timestampToX(flagPole.end);
        const startY = priceToY(candleData[flagPole.start - 1].low);
        const endY = priceToY(candleData[flagPole.end - 1].high);
        
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        
        // Pattern label
        ctx.fillStyle = '#17E6C8';
        ctx.font = 'bold 14px Arial';
        ctx.fillText('BULLISH FLAG', endX + 10, endY - 20);
      }

      // Draw consolidation zone
      if (patternDetected && animationStep >= 6) {
        ctx.strokeStyle = '#FFB800';
        ctx.lineWidth = 2;
        ctx.setLineDash([8, 4]);
        
        // Upper consolidation line
        const upperY = priceToY(1.0955);
        ctx.beginPath();
        ctx.moveTo(timestampToX(4), upperY);
        ctx.lineTo(timestampToX(8), upperY);
        ctx.stroke();
        
        // Lower consolidation line
        const lowerY = priceToY(1.0930);
        ctx.beginPath();
        ctx.moveTo(timestampToX(4), lowerY);
        ctx.lineTo(timestampToX(8), lowerY);
        ctx.stroke();
        
        ctx.setLineDash([]);
      }

      // Draw breakout and entry point
      if (entryExecuted && animationStep >= 9) {
        const entryX = timestampToX(entryPoint.timestamp);
        const entryY = priceToY(entryPoint.price);

        // Breakout arrow
        ctx.fillStyle = '#00C851';
        ctx.beginPath();
        ctx.moveTo(entryX, entryY - 30);
        ctx.lineTo(entryX - 12, entryY - 45);
        ctx.lineTo(entryX - 4, entryY - 45);
        ctx.lineTo(entryX - 4, entryY - 55);
        ctx.lineTo(entryX + 4, entryY - 55);
        ctx.lineTo(entryX + 4, entryY - 45);
        ctx.lineTo(entryX + 12, entryY - 45);
        ctx.closePath();
        ctx.fill();

        // Entry label
        ctx.fillStyle = '#00C851';
        ctx.font = 'bold 14px Arial';
        ctx.fillText('ENTRY EXECUTED', entryX - 50, entryY - 60);
        ctx.font = '12px Arial';
        ctx.fillText(entryPoint.price.toFixed(4), entryX - 20, entryY - 20);
      }

      // Draw target point
      if (animationStep >= 10) {
        const targetX = timestampToX(targetPoint.timestamp);
        const targetY = priceToY(targetPoint.price);

        // Target line
        ctx.strokeStyle = '#00C851';
        ctx.lineWidth = 3;
        ctx.setLineDash([6, 6]);
        ctx.beginPath();
        ctx.moveTo(timestampToX(entryPoint.timestamp), priceToY(entryPoint.price));
        ctx.lineTo(targetX, targetY);
        ctx.stroke();
        ctx.setLineDash([]);

        // Target label
        ctx.fillStyle = '#00C851';
        ctx.font = 'bold 14px Arial';
        ctx.fillText('TARGET HIT', targetX - 40, targetY - 20);
        ctx.font = '12px Arial';
        ctx.fillText('+50 PIPS', targetX - 25, targetY - 5);
      }

      // Price labels
      ctx.fillStyle = '#E0E5EB';
      ctx.font = '11px Arial';
      for (let i = 0; i <= 8; i++) {
        const price = maxPrice - (i * priceRange) / 8;
        const y = chartTop + (i * chartHeight) / 8;
        ctx.fillText(price.toFixed(4), 15, y + 4);
      }

      // AI analysis box
      if (aiAnalyzing) {
        ctx.fillStyle = 'rgba(23, 230, 200, 0.1)';
        ctx.strokeStyle = '#17E6C8';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(chartRight + 10, chartTop, 100, 120, 8);
        ctx.fill();
        ctx.stroke();
        
        ctx.fillStyle = '#17E6C8';
        ctx.font = 'bold 12px Arial';
        ctx.fillText('KI ANALYSE', chartRight + 20, chartTop + 20);
        
        ctx.font = '10px Arial';
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText('Pattern: Analyzing...', chartRight + 15, chartTop + 40);
        ctx.fillText('Trend: Bullish', chartRight + 15, chartTop + 55);
        ctx.fillText('Volume: Rising', chartRight + 15, chartTop + 70);
        ctx.fillText('Signal: Strong', chartRight + 15, chartTop + 85);
        
      }
    };

    drawChart();
  }, [animationStep, patternDetected, alertTriggered, entryExecuted, aiAnalyzing, confidence]);

  useEffect(() => {
    const phases = [
      { step: 0, delay: 1000, action: () => setAiAnalyzing(true) },
      { step: 3, delay: 1500, action: () => setConfidence(65) },
      { step: 4, delay: 1000, action: () => setConfidence(78) },
      { step: 5, delay: 1000, action: () => { setPatternDetected(true); setConfidence(89); } },
      { step: 6, delay: 1500, action: () => setAlertTriggered(true) },
      { step: 8, delay: 1000, action: () => setConfidence(94) },
      { step: 9, delay: 1000, action: () => setEntryExecuted(true) }
    ];

    const timer = setInterval(() => {
      setAnimationStep(prev => {
        const nextStep = prev + 1;
        
        // Execute phase actions
        phases.forEach(phase => {
          if (nextStep === phase.step) {
            setTimeout(phase.action, phase.delay);
          }
        });
        
        if (nextStep > 10) {
          // Reset animation
          setTimeout(() => {
            setAnimationStep(0);
            setPatternDetected(false);
            setAlertTriggered(false);
            setEntryExecuted(false);
            setAiAnalyzing(false);
            setConfidence(0);
          }, 3000);
          return 0;
        }
        
        return nextStep;
      });
    }, 1200);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Chart Container */}
      <div className="bg-stravesta-navy/80 backdrop-blur-sm rounded-t-lg p-6 border border-stravesta-teal/20">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Brain className="h-6 w-6 text-stravesta-teal" />
            <span className="text-white font-semibold text-lg">EUR/USD • M15 • KI Setup Scanner</span>
          </div>
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
            entryExecuted 
              ? 'bg-green-500/20 text-green-400' 
              : alertTriggered
                ? 'bg-yellow-500/20 text-yellow-400'
                : patternDetected
                  ? 'bg-stravesta-teal/20 text-stravesta-teal'
                  : 'bg-gray-500/20 text-gray-400'
          }`}>
            {entryExecuted ? (
              <>
                <CheckCircle2 className="h-5 w-5" />
                <span className="font-medium">Entry Executed</span>
              </>
            ) : alertTriggered ? (
              <>
                <Zap className="h-5 w-5 animate-pulse" />
                <span className="font-medium">Alert Triggered</span>
              </>
            ) : patternDetected ? (
              <>
                <Target className="h-5 w-5" />
                <span className="font-medium">Pattern Detected</span>
              </>
            ) : (
              <>
                <Brain className="h-5 w-5" />
                <span className="font-medium">KI Analyzing...</span>
              </>
            )}
          </div>
        </div>

        {/* Chart */}
        <div className="relative">
          <canvas 
            ref={canvasRef}
            className="w-full h-auto border border-stravesta-teal/10 rounded"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </div>
      </div>

      {/* Stats Container - direkt anschließend */}
      <div className="bg-stravesta-navy/80 backdrop-blur-sm rounded-b-lg border-l border-r border-b border-stravesta-teal/20 border-t-0">
        <div className="p-6 pt-0">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-stravesta-dark/50 rounded-lg p-4">
              <div className={`text-lg font-bold transition-colors ${patternDetected ? 'text-stravesta-teal' : 'text-gray-400'}`}>
                {patternDetected ? 'Bullish Flag' : 'Analyzing...'}
              </div>
              <div className="text-stravesta-lightGray text-sm">Pattern</div>
            </div>
            <div className="bg-stravesta-dark/50 rounded-lg p-4">
              <div className={`text-lg font-bold transition-colors ${entryExecuted ? 'text-green-400' : alertTriggered ? 'text-yellow-400' : 'text-gray-400'}`}>
                {entryExecuted ? '1.0965' : alertTriggered ? 'Ready' : 'Waiting'}
              </div>
              <div className="text-stravesta-lightGray text-sm">Entry Point</div>
            </div>
            <div className="bg-stravesta-dark/50 rounded-lg p-4">
              <div className={`text-lg font-bold transition-colors ${animationStep >= 10 ? 'text-green-400' : 'text-gray-400'}`}>
                {animationStep >= 10 ? '+50 Pips' : '+-- Pips'}
              </div>
              <div className="text-stravesta-lightGray text-sm">Potential</div>
            </div>
          </div>
        </div>
      </div>

      {/* Alert notification */}
      {alertTriggered && !entryExecuted && (
        <div className="absolute top-20 right-6 bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-4 animate-pulse">
          <div className="flex items-center gap-3">
            <Zap className="h-6 w-6 text-yellow-400" />
            <div>
              <div className="text-yellow-400 font-bold">Setup Alert!</div>
              <div className="text-yellow-300 text-sm">Bullish Flag - Entry imminent</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TradingChartAnimation;