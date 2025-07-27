import React, { useEffect, useState } from 'react';

interface Candle {
  id: number;
  open: number;
  high: number;
  low: number;
  close: number;
  x: number;
}

const BackgroundChartAnimation = () => {
  const [candles, setCandles] = useState<Candle[]>([]);

  const generateCandle = (id: number, prevClose: number): Candle => {
    const volatility = Math.random() * 12 + 6;
    const open = prevClose + (Math.random() - 0.5) * 3;
    const change = (Math.random() - 0.5) * volatility;
    const close = open + change;
    const high = Math.max(open, close) + Math.random() * volatility * 0.8;
    const low = Math.min(open, close) - Math.random() * volatility * 0.5;
    
    return {
      id,
      open,
      high,
      low,
      close,
      x: id * 35
    };
  };

  useEffect(() => {
    const initialCandles: Candle[] = [];
    let price = 100;
    
    // Fill screen with candles from right to left
    for (let i = 0; i < 60; i++) {
      const candle = generateCandle(i, price);
      candle.x = i * 35; // Increase spacing between candles
      initialCandles.push(candle);
      price = candle.close;
    }
    
    setCandles(initialCandles);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCandles(prevCandles => {
        // Move all candles to the left smoothly
        const movedCandles = prevCandles.map(candle => ({
          ...candle,
          x: candle.x - 0.8
        }));
        
        // Instead of removing candles, reposition them when they go off-screen
        const updatedCandles = movedCandles.map(candle => {
          // If candle moved off the left side, move it to the right side
          if (candle.x < -60) {
            const maxX = Math.max(...movedCandles.map(c => c.x), 0);
            const lastCandle = movedCandles.find(c => c.x === maxX);
            const newCandle = generateCandle(
              Date.now() + Math.random(),
              lastCandle ? lastCandle.close : 100
            );
            newCandle.x = maxX + 35;
            return newCandle;
          }
          return candle;
        });
        
        return updatedCandles;
      });
    }, 50); // Smooth 20fps animation

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      <div className="w-full h-full relative">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1920 1080"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="xMidYMid slice"
          style={{ opacity: 0.7 }}
        >
        <defs>
          <linearGradient id="candleGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00d4aa" stopOpacity="0.9"/>
            <stop offset="50%" stopColor="#00b894" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#00a085" stopOpacity="0.7"/>
          </linearGradient>
          
          <linearGradient id="candleGradientBear" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ff6b6b" stopOpacity="0.9"/>
            <stop offset="50%" stopColor="#e55656" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#d63031" stopOpacity="0.7"/>
          </linearGradient>
          
          <filter id="glow">
            <feMorphology operator="dilate" radius="0.3"/>
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* No grid background - solid color only */}
        
        {/* Main candlestick chart - Center screen */}
        {candles.map(candle => {
          const scale = 5;
          const centerY = 400; // Moved back to center area
          const priceOffset = (candle.close - 100) * scale;
          const baseY = centerY - priceOffset;
          const bodyHeight = Math.abs(candle.close - candle.open) * scale;
          const bodyY = baseY - Math.max(candle.open - 100, candle.close - 100) * scale;
          const wickTop = baseY - (candle.high - 100) * scale;
          const wickBottom = baseY - (candle.low - 100) * scale;
          const isBullish = candle.close > candle.open;
          
            return (
            <g key={candle.id}>
              {/* Wick */}
              <line
                x1={candle.x + 12}
                y1={wickTop}
                x2={candle.x + 12}
                y2={wickBottom}
                stroke={isBullish ? "#00d4aa" : "#ff6b6b"}
                strokeWidth="3"
                opacity="0.8"
              />
              
              {/* Body */}
              <rect
                x={candle.x + 4}
                y={bodyY}
                width="16"
                height={Math.max(bodyHeight, 6)}
                fill={isBullish ? "url(#candleGradient)" : "url(#candleGradientBear)"}
                stroke={isBullish ? "#00b894" : "#e55656"}
                strokeWidth="1.5"
                opacity="0.8"
                rx="1.5"
              />
            </g>
          );
        })}
        
        </svg>
      </div>
    </div>
  );
};

export default BackgroundChartAnimation;