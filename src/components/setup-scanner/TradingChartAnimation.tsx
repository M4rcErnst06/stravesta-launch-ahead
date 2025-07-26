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

  // Volume Profile data - REMOVED

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size - responsive
    const isMobile = window.innerWidth < 768;
    canvas.width = isMobile ? 320 : 700;
    canvas.height = isMobile ? 240 : 400;

    const drawChart = () => {
      // Clear canvas
      ctx.fillStyle = '#0A1929';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Chart boundaries - responsive
      const isMobile = window.innerWidth < 768;
      const chartLeft = isMobile ? 25 : 80;
      const chartRight = canvas.width - (isMobile ? 15 : 120);
      const chartTop = isMobile ? 20 : 50;
      const chartBottom = canvas.height - (isMobile ? 30 : 60);
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

        const candleWidth = isMobile ? 10 : 16;
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

      // EMAs REMOVED

      // Draw Volume Profile - REMOVED

      // AI pattern recognition - REMOVED bullish flag line

      // Fibonacci retracement - REMOVED

      // Draw breakout and entry point with proper spacing below candle
      if (entryExecuted && animationStep >= 9) {
        const entryX = timestampToX(entryPoint.timestamp);
        const entryY = priceToY(entryPoint.price);

        // Entry arrow (blue, pointing up, well below candle with proper spacing)
        ctx.fillStyle = '#2196F3';
        ctx.strokeStyle = '#1976D2';
        ctx.lineWidth = 1;
        
        // Arrow positioned with mobile responsiveness
        const arrowOffset = isMobile ? 25 : 67;
        ctx.beginPath();
        ctx.moveTo(entryX, entryY + arrowOffset);
        ctx.lineTo(entryX - 4, entryY + arrowOffset + 8);
        ctx.lineTo(entryX - 2, entryY + arrowOffset + 8);
        ctx.lineTo(entryX - 2, entryY + arrowOffset + 15);
        ctx.lineTo(entryX + 2, entryY + arrowOffset + 15);
        ctx.lineTo(entryX + 2, entryY + arrowOffset + 8);
        ctx.lineTo(entryX + 4, entryY + arrowOffset + 8);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Entry label with mobile responsive text - only show if space available
        if (!isMobile || entryY + arrowOffset + 30 < canvas.height) {
          ctx.fillStyle = '#2196F3';
          ctx.font = isMobile ? 'bold 7px Arial' : 'bold 10px Arial';
          ctx.fillText('ENTRY', entryX - (isMobile ? 8 : 15), entryY + arrowOffset + (isMobile ? 20 : 35));
          ctx.font = isMobile ? '6px Arial' : '9px Arial';
          ctx.fillText(entryPoint.price.toFixed(4), entryX - (isMobile ? 10 : 15), entryY + arrowOffset + (isMobile ? 28 : 47));
        }
      }

      // Draw target point with smaller TradingView-style arrow
      if (animationStep >= 10) {
        const targetX = timestampToX(targetPoint.timestamp);
        const targetY = priceToY(targetPoint.price);

        // TP arrow (green, pointing down, above candle)
        ctx.fillStyle = '#4CAF50';
        ctx.strokeStyle = '#388E3C';
        ctx.lineWidth = 1;
        
        // Smaller arrow body
        ctx.beginPath();
        ctx.moveTo(targetX, targetY - 10);
        ctx.lineTo(targetX - 5, targetY - 20);
        ctx.lineTo(targetX - 3, targetY - 20);
        ctx.lineTo(targetX - 3, targetY - 30);
        ctx.lineTo(targetX + 3, targetY - 30);
        ctx.lineTo(targetX + 3, targetY - 20);
        ctx.lineTo(targetX + 5, targetY - 20);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Target line (dashed)
        ctx.strokeStyle = '#4CAF50';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(timestampToX(entryPoint.timestamp), priceToY(entryPoint.price));
        ctx.lineTo(targetX, targetY);
        ctx.stroke();
        ctx.setLineDash([]);

        // Target label with mobile responsiveness - only show if space available  
        if (!isMobile || targetY - 35 > 0) {
          ctx.fillStyle = '#4CAF50';
          ctx.font = isMobile ? 'bold 7px Arial' : 'bold 10px Arial';
          ctx.fillText('TP', targetX - (isMobile ? 5 : 8), targetY - (isMobile ? 25 : 40));
          ctx.font = isMobile ? '6px Arial' : '9px Arial';
          ctx.fillText('+50 PIPS', targetX - (isMobile ? 12 : 18), targetY - (isMobile ? 20 : 32));
        }
      }

      // Price labels - responsive
      ctx.fillStyle = '#E0E5EB';
      ctx.font = isMobile ? '8px Arial' : '11px Arial';
      for (let i = 0; i <= 8; i++) {
        const price = maxPrice - (i * priceRange) / 8;
        const y = chartTop + (i * chartHeight) / 8;
        const labelX = isMobile ? 3 : 15;
        ctx.fillText(price.toFixed(4), labelX, y + 4);
      }

      // AI analysis box - mobile responsive
      if (aiAnalyzing && !isMobile) {
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
        ctx.fillText('Volume: Rising', chartRight + 15, chartTop + 210);
        ctx.fillText('Signal: Strong', chartRight + 15, chartTop + 225);
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
      {/* Wireframe Preview Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-lg mb-4">
          <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
          <span className="text-yellow-400 text-sm font-medium">Preview - Coming Soon in English</span>
        </div>
        <p className="text-stravesta-lightGray text-sm">This shows how the AI scanner will work when completed</p>
      </div>
      
      {/* Chart Container */}
      <div className="bg-stravesta-navy/80 backdrop-blur-sm rounded-t-lg p-6 border border-dashed border-stravesta-teal/30">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Brain className="h-6 w-6 text-stravesta-teal opacity-80" />
            <span className="text-white font-semibold text-lg opacity-90">EUR/USD • M15 • AI Setup Scanner (Preview)</span>
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
                <span className="font-medium">Entry Executed (Preview)</span>
              </>
            ) : alertTriggered ? (
              <>
                <Zap className="h-5 w-5 animate-pulse" />
                <span className="font-medium">Alert Triggered (Preview)</span>
              </>
            ) : patternDetected ? (
              <>
                <Target className="h-5 w-5" />
                <span className="font-medium">Pattern Detected (Preview)</span>
              </>
            ) : (
              <>
                <Brain className="h-5 w-5" />
                <span className="font-medium">AI Analyzing... (Preview)</span>
              </>
            )}
          </div>
        </div>

        {/* Chart */}
        <div className="relative flex justify-center">
          <canvas 
            ref={canvasRef}
            className="border border-dashed border-stravesta-teal/30 rounded opacity-90"
            style={{ width: '700px', height: '400px', maxWidth: '100%' }}
          />
        </div>
      </div>

      {/* Stats Container - direkt anschließend */}
      <div className="bg-stravesta-navy/80 backdrop-blur-sm rounded-b-lg border-l border-r border-b border-dashed border-stravesta-teal/30">
        <div className="p-3 md:p-6">
          <div className="grid grid-cols-3 gap-2 md:gap-4 text-center">
            <div className="bg-stravesta-dark/50 rounded-lg p-2 md:p-4">
              <div className={`text-sm md:text-lg font-bold transition-colors ${patternDetected ? 'text-stravesta-teal' : 'text-gray-400'}`}>
                {patternDetected ? 'Bullish Flag' : 'Analyzing...'}
              </div>
              <div className="text-stravesta-lightGray text-xs md:text-sm">Pattern</div>
            </div>
            <div className="bg-stravesta-dark/50 rounded-lg p-2 md:p-4">
              <div className={`text-sm md:text-lg font-bold transition-colors ${entryExecuted ? 'text-green-400' : alertTriggered ? 'text-yellow-400' : 'text-gray-400'}`}>
                {entryExecuted ? '1.0965' : alertTriggered ? 'Ready' : 'Waiting'}
              </div>
              <div className="text-stravesta-lightGray text-xs md:text-sm">Entry Point</div>
            </div>
            <div className="bg-stravesta-dark/50 rounded-lg p-2 md:p-4">
              <div className={`text-sm md:text-lg font-bold transition-colors ${animationStep >= 10 ? 'text-green-400' : 'text-gray-400'}`}>
                {animationStep >= 10 ? '+50 Pips' : '+-- Pips'}
              </div>
              <div className="text-stravesta-lightGray text-xs md:text-sm">Potential</div>
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