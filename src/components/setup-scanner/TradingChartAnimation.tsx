
import React, { useEffect, useRef, useState } from 'react';
import { TrendingUp, AlertTriangle, Target } from 'lucide-react';

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
  const [missedEntry, setMissedEntry] = useState(false);

  // Realistic trading data based on the uploaded image
  const candleData: CandleData[] = [
    { open: 1.0850, high: 1.0870, low: 1.0845, close: 1.0865, timestamp: 1 },
    { open: 1.0865, high: 1.0880, low: 1.0860, close: 1.0875, timestamp: 2 },
    { open: 1.0875, high: 1.0885, low: 1.0870, close: 1.0880, timestamp: 3 },
    { open: 1.0880, high: 1.0890, low: 1.0875, close: 1.0885, timestamp: 4 },
    { open: 1.0885, high: 1.0895, low: 1.0880, close: 1.0890, timestamp: 5 },
    { open: 1.0890, high: 1.0900, low: 1.0885, close: 1.0895, timestamp: 6 },
    { open: 1.0895, high: 1.0905, low: 1.0890, close: 1.0900, timestamp: 7 },
    { open: 1.0900, high: 1.0920, low: 1.0895, close: 1.0915, timestamp: 8 },
    { open: 1.0915, high: 1.0925, low: 1.0910, close: 1.0920, timestamp: 9 },
    { open: 1.0920, high: 1.0935, low: 1.0915, close: 1.0930, timestamp: 10 },
  ];

  const fibLevels = [
    { level: 0.618, price: 1.0895, label: '61.8%' },
    { level: 0.786, price: 1.0885, label: '78.6%' },
    { level: 0.886, price: 1.0875, label: '88.6%' },
  ];

  const entryPoint = { price: 1.0890, timestamp: 6 };
  const targetPoint = { price: 1.0930, timestamp: 10 };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 600;
    canvas.height = 400;

    const drawChart = () => {
      // Clear canvas
      ctx.fillStyle = '#0A1929';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Chart boundaries
      const chartLeft = 60;
      const chartRight = canvas.width - 40;
      const chartTop = 40;
      const chartBottom = canvas.height - 60;
      const chartWidth = chartRight - chartLeft;
      const chartHeight = chartBottom - chartTop;

      // Price range
      const minPrice = 1.0840;
      const maxPrice = 1.0940;
      const priceRange = maxPrice - minPrice;

      // Helper functions
      const priceToY = (price: number) => chartBottom - ((price - minPrice) / priceRange) * chartHeight;
      const timestampToX = (timestamp: number) => chartLeft + ((timestamp - 1) / 9) * chartWidth;

      // Draw grid
      ctx.strokeStyle = '#1A2A3A';
      ctx.lineWidth = 1;
      for (let i = 0; i <= 5; i++) {
        const y = chartTop + (i * chartHeight) / 5;
        ctx.beginPath();
        ctx.moveTo(chartLeft, y);
        ctx.lineTo(chartRight, y);
        ctx.stroke();
      }

      // Draw fibonacci levels
      ctx.lineWidth = 1;
      fibLevels.forEach((fib, index) => {
        if (animationStep > 2) {
          ctx.strokeStyle = index === 0 ? '#17E6C8' : index === 1 ? '#FFB800' : '#FF6B6B';
          ctx.setLineDash([5, 5]);
          const y = priceToY(fib.price);
          ctx.beginPath();
          ctx.moveTo(chartLeft, y);
          ctx.lineTo(chartRight, y);
          ctx.stroke();

          // Fib labels
          ctx.fillStyle = ctx.strokeStyle;
          ctx.font = '12px Arial';
          ctx.fillText(fib.label, chartRight + 5, y + 4);
          ctx.fillText(fib.price.toFixed(4), chartRight + 5, y - 8);
        }
      });
      ctx.setLineDash([]);

      // Draw candlesticks
      const visibleCandles = Math.min(animationStep + 1, candleData.length);
      for (let i = 0; i < visibleCandles; i++) {
        const candle = candleData[i];
        const x = timestampToX(candle.timestamp);
        const openY = priceToY(candle.open);
        const closeY = priceToY(candle.close);
        const highY = priceToY(candle.high);
        const lowY = priceToY(candle.low);

        const candleWidth = 12;
        const isGreen = candle.close > candle.open;

        // Draw wick
        ctx.strokeStyle = isGreen ? '#00C851' : '#FF4444';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x, highY);
        ctx.lineTo(x, lowY);
        ctx.stroke();

        // Draw body
        ctx.fillStyle = isGreen ? '#00C851' : '#FF4444';
        const bodyHeight = Math.abs(closeY - openY);
        const bodyTop = Math.min(openY, closeY);
        ctx.fillRect(x - candleWidth/2, bodyTop, candleWidth, bodyHeight || 1);
      }

      // Draw entry point
      if (animationStep >= 6) {
        const entryX = timestampToX(entryPoint.timestamp);
        const entryY = priceToY(entryPoint.price);

        // Entry arrow
        ctx.fillStyle = missedEntry ? '#FF4444' : '#17E6C8';
        ctx.beginPath();
        ctx.moveTo(entryX, entryY);
        ctx.lineTo(entryX - 8, entryY - 12);
        ctx.lineTo(entryX + 8, entryY - 12);
        ctx.closePath();
        ctx.fill();

        // Entry label
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 12px Arial';
        ctx.fillText(missedEntry ? 'MISSED!' : 'ENTRY', entryX - 20, entryY - 20);
        ctx.font = '10px Arial';
        ctx.fillText(entryPoint.price.toFixed(4), entryX - 15, entryY - 8);
      }

      // Draw target point
      if (animationStep >= 10) {
        const targetX = timestampToX(targetPoint.timestamp);
        const targetY = priceToY(targetPoint.price);

        ctx.strokeStyle = '#00C851';
        ctx.lineWidth = 2;
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(timestampToX(entryPoint.timestamp), priceToY(entryPoint.price));
        ctx.lineTo(targetX, targetY);
        ctx.stroke();
        ctx.setLineDash([]);

        // Target label
        ctx.fillStyle = '#00C851';
        ctx.font = 'bold 12px Arial';
        ctx.fillText('TARGET', targetX - 25, targetY - 15);
        ctx.font = '10px Arial';
        ctx.fillText('+40 PIPS', targetX - 20, targetY - 5);
      }

      // Price labels
      ctx.fillStyle = '#E0E5EB';
      ctx.font = '10px Arial';
      for (let i = 0; i <= 5; i++) {
        const price = maxPrice - (i * priceRange) / 5;
        const y = chartTop + (i * chartHeight) / 5;
        ctx.fillText(price.toFixed(4), 10, y + 4);
      }
    };

    drawChart();
  }, [animationStep, missedEntry]);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimationStep(prev => {
        if (prev < 10) {
          return prev + 1;
        } else {
          setMissedEntry(true);
          return 0;
        }
      });
    }, 800);

    const missedTimer = setTimeout(() => {
      setMissedEntry(true);
    }, 5000);

    return () => {
      clearInterval(timer);
      clearTimeout(missedTimer);
    };
  }, []);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="bg-stravesta-navy/80 backdrop-blur-sm rounded-lg p-6 border border-stravesta-teal/20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-stravesta-teal" />
            <span className="text-white font-semibold">EUR/USD • M15</span>
          </div>
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${
            missedEntry 
              ? 'bg-red-500/20 text-red-400' 
              : 'bg-stravesta-teal/20 text-stravesta-teal'
          }`}>
            {missedEntry ? (
              <>
                <AlertTriangle className="h-4 w-4" />
                <span className="text-sm font-medium">Setup Missed</span>
              </>
            ) : (
              <>
                <Target className="h-4 w-4" />
                <span className="text-sm font-medium">Setup Detected</span>
              </>
            )}
          </div>
        </div>

        <canvas 
          ref={canvasRef}
          className="w-full h-auto border border-stravesta-teal/10 rounded"
          style={{ maxWidth: '100%', height: 'auto' }}
        />

        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
          <div className="bg-stravesta-dark/50 rounded p-3">
            <div className="text-stravesta-teal text-lg font-bold">78.6%</div>
            <div className="text-stravesta-lightGray text-xs">Fibonacci Entry</div>
          </div>
          <div className="bg-stravesta-dark/50 rounded p-3">
            <div className="text-green-400 text-lg font-bold">+40</div>
            <div className="text-stravesta-lightGray text-xs">Pips Potential</div>
          </div>
          <div className="bg-stravesta-dark/50 rounded p-3">
            <div className={`text-lg font-bold ${missedEntry ? 'text-red-400' : 'text-stravesta-teal'}`}>
              {missedEntry ? 'MISSED' : 'ACTIVE'}
            </div>
            <div className="text-stravesta-lightGray text-xs">Status</div>
          </div>
        </div>
      </div>

      {missedEntry && (
        <div className="absolute inset-0 bg-red-500/10 rounded-lg border-2 border-red-500/50 flex items-center justify-center backdrop-blur-sm">
          <div className="text-center">
            <AlertTriangle className="h-12 w-12 text-red-400 mx-auto mb-2" />
            <div className="text-red-400 font-bold text-lg">Setup Verpasst!</div>
            <div className="text-red-300 text-sm">40 Pips Gewinn entgangen</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TradingChartAnimation;
