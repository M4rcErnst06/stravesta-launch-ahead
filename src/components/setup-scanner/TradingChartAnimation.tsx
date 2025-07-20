import React, { useEffect, useRef, useState } from 'react';
import { Brain, Target, TrendingUp, AlertTriangle, Zap, CheckCircle2 } from 'lucide-react';

interface CandleData {
  open: number;
  high: number;
  low: number;
  close: number;
  timestamp: number;
  volume: number;
}

interface VolumeProfile {
  price: number;
  volume: number;
}

const TradingChartAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [animationStep, setAnimationStep] = useState(0);
  const [patternDetected, setPatternDetected] = useState(false);
  const [alertTriggered, setAlertTriggered] = useState(false);
  const [entryExecuted, setEntryExecuted] = useState(false);
  const [aiAnalyzing, setAiAnalyzing] = useState(false);
  const [confidence, setConfidence] = useState(0);

  // Chart data showing a bullish flag pattern with deeper pullback
  const candleData: CandleData[] = [
    { open: 1.0850, high: 1.0890, low: 1.0840, close: 1.0875, timestamp: 1, volume: 1250 },
    { open: 1.0875, high: 1.0920, low: 1.0860, close: 1.0915, timestamp: 2, volume: 1580 },
    { open: 1.0915, high: 1.0950, low: 1.0900, close: 1.0940, timestamp: 3, volume: 1820 },
    { open: 1.0940, high: 1.0965, low: 1.0920, close: 1.0955, timestamp: 4, volume: 2100 },
    { open: 1.0955, high: 1.0960, low: 1.0925, close: 1.0930, timestamp: 5, volume: 1350 }, // Start deeper pullback
    { open: 1.0930, high: 1.0940, low: 1.0910, close: 1.0920, timestamp: 6, volume: 1680 }, // Deeper red candle
    { open: 1.0920, high: 1.0935, low: 1.0895, close: 1.0915, timestamp: 7, volume: 1420 }, // Even deeper pullback
    { open: 1.0915, high: 1.0930, low: 1.0900, close: 1.0925, timestamp: 8, volume: 1200 }, // Recovery starts
    { open: 1.0925, high: 1.0970, low: 1.0920, close: 1.0965, timestamp: 9, volume: 2500 }, // Breakout
    { open: 1.0965, high: 1.1020, low: 1.0960, close: 1.1015, timestamp: 10, volume: 2800 },
  ];

  // Pattern recognition points
  const flagPole = { start: 1, end: 4 };
  const flagConsolidation = { start: 4, end: 8 };
  const breakout = { timestamp: 9, price: 1.0965 };
  
  // Fibonacci retracement levels
  const fibLevels = {
    high: 1.0955, // High of flagpole
    low: 1.0895,  // Low of pullback
    levels: [
      { level: 0.236, price: 1.0941, label: '23.6%' },
      { level: 0.382, price: 1.0932, label: '38.2%' },
      { level: 0.618, price: 1.0918, label: '61.8%' },
      { level: 0.786, price: 1.0908, label: '78.6%' }
    ]
  };
  
  // Entry and target points
  const entryPoint = { price: 1.0965, timestamp: 9 };
  const targetPoint = { price: 1.1015, timestamp: 10 };

  // Calculate EMAs
  const calculateEMA = (data: CandleData[], period: number) => {
    const multiplier = 2 / (period + 1);
    const emaValues: number[] = [];
    
    if (data.length === 0) return emaValues;
    
    // First EMA is SMA
    let sum = 0;
    for (let i = 0; i < Math.min(period, data.length); i++) {
      sum += data[i].close;
    }
    emaValues[Math.min(period - 1, data.length - 1)] = sum / Math.min(period, data.length);
    
    // Calculate subsequent EMAs
    for (let i = period; i < data.length; i++) {
      emaValues[i] = (data[i].close - emaValues[i - 1]) * multiplier + emaValues[i - 1];
    }
    
    return emaValues;
  };

  const ema20 = calculateEMA(candleData, 5); // Shortened for animation
  const ema50 = calculateEMA(candleData, 8); // Shortened for animation

  // Volume Profile data
  const volumeProfile: VolumeProfile[] = [
    { price: 1.0895, volume: 1200 },
    { price: 1.0910, volume: 1800 },
    { price: 1.0925, volume: 2200 }, // High volume area
    { price: 1.0940, volume: 1600 },
    { price: 1.0955, volume: 1900 },
    { price: 1.0970, volume: 1400 },
    { price: 1.0985, volume: 1100 },
    { price: 1.1000, volume: 1300 },
  ];

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

      // Draw EMAs
      if (animationStep >= 3) {
        const visibleCandles = Math.min(animationStep + 1, candleData.length);
        
        // EMA 20 (fast)
        if (ema20.length > 1) {
          ctx.strokeStyle = '#00C851';
          ctx.lineWidth = 2;
          ctx.beginPath();
          let started = false;
          for (let i = 0; i < visibleCandles && i < ema20.length; i++) {
            if (ema20[i] !== undefined) {
              const x = timestampToX(i + 1);
              const y = priceToY(ema20[i]);
              if (!started) {
                ctx.moveTo(x, y);
                started = true;
              } else {
                ctx.lineTo(x, y);
              }
            }
          }
          ctx.stroke();
        }

        // EMA 50 (slow)
        if (ema50.length > 1) {
          ctx.strokeStyle = '#FF6B35';
          ctx.lineWidth = 2;
          ctx.beginPath();
          let started = false;
          for (let i = 0; i < visibleCandles && i < ema50.length; i++) {
            if (ema50[i] !== undefined) {
              const x = timestampToX(i + 1);
              const y = priceToY(ema50[i]);
              if (!started) {
                ctx.moveTo(x, y);
                started = true;
              } else {
                ctx.lineTo(x, y);
              }
            }
          }
          ctx.stroke();
        }
      }

      // Draw Volume Profile
      if (animationStep >= 4) {
        const maxVolume = Math.max(...volumeProfile.map(v => v.volume));
        const profileWidth = 60;
        
        volumeProfile.forEach(level => {
          const y = priceToY(level.price);
          const barWidth = (level.volume / maxVolume) * profileWidth;
          
          // Volume bar
          ctx.fillStyle = level.volume === Math.max(...volumeProfile.map(v => v.volume)) 
            ? 'rgba(255, 107, 53, 0.4)' // Highest volume in orange
            : 'rgba(23, 230, 200, 0.3)'; // Other volumes in teal
          ctx.fillRect(chartRight - profileWidth - 10, y - 3, barWidth, 6);
          
          // Volume border
          ctx.strokeStyle = level.volume === Math.max(...volumeProfile.map(v => v.volume)) 
            ? '#FF6B35' 
            : '#17E6C8';
          ctx.lineWidth = 1;
          ctx.strokeRect(chartRight - profileWidth - 10, y - 3, barWidth, 6);
        });
        
        // Volume profile label
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '10px Arial';
        ctx.fillText('Vol Profile', chartRight - profileWidth - 5, chartTop + 15);
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

      // Draw Fibonacci retracement
      if (patternDetected && animationStep >= 6) {
        ctx.strokeStyle = '#FFB800';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.font = '10px Arial';
        
        // Draw fibonacci levels
        fibLevels.levels.forEach((fib, index) => {
          const y = priceToY(fib.price);
          const startX = timestampToX(4);
          const endX = timestampToX(8);
          
          // Set color based on importance
          if (fib.level === 0.618) {
            ctx.strokeStyle = '#FF6B35'; // Golden ratio in orange
            ctx.lineWidth = 2;
          } else if (fib.level === 0.382) {
            ctx.strokeStyle = '#FFB800'; // Important level in yellow
            ctx.lineWidth = 1.5;
          } else {
            ctx.strokeStyle = '#888888'; // Other levels in gray
            ctx.lineWidth = 1;
          }
          
          ctx.beginPath();
          ctx.moveTo(startX, y);
          ctx.lineTo(endX, y);
          ctx.stroke();
          
          // Draw level label
          ctx.fillStyle = ctx.strokeStyle;
          ctx.fillText(`${fib.label} (${fib.price.toFixed(4)})`, endX + 5, y + 3);
        });
        
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
        ctx.roundRect(chartRight + 10, chartTop + 140, 100, 140, 8);
        ctx.fill();
        ctx.stroke();
        
        ctx.fillStyle = '#17E6C8';
        ctx.font = 'bold 12px Arial';
        ctx.fillText('KI ANALYSE', chartRight + 20, chartTop + 160);
        
        ctx.font = '10px Arial';
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText('Pattern: Analyzing...', chartRight + 15, chartTop + 180);
        ctx.fillText('EMA 20/50: Bullish', chartRight + 15, chartTop + 195);
        ctx.fillText('Volume: Rising', chartRight + 15, chartTop + 210);
        ctx.fillText('VP Support: 1.0925', chartRight + 15, chartTop + 225);
        ctx.fillText('Signal: Strong', chartRight + 15, chartTop + 240);
        
        // EMA Legend
        ctx.fillStyle = '#00C851';
        ctx.fillRect(chartRight + 15, chartTop + 250, 15, 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText('EMA 20', chartRight + 35, chartTop + 255);
        
        ctx.fillStyle = '#FF6B35';
        ctx.fillRect(chartRight + 15, chartTop + 265, 15, 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText('EMA 50', chartRight + 35, chartTop + 270);
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
      <div className="bg-stravesta-navy/80 backdrop-blur-sm rounded-b-lg border-l border-r border-b border-stravesta-teal/20">
        <div className="p-6">
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