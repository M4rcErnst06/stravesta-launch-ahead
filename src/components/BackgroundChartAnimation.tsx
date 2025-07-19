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
    const volatility = Math.random() * 8 + 3;
    const open = prevClose + (Math.random() - 0.5) * 2;
    const change = (Math.random() - 0.5) * volatility;
    const close = open + change;
    const high = Math.max(open, close) + Math.random() * volatility * 0.5;
    const low = Math.min(open, close) - Math.random() * volatility * 0.3;
    
    return {
      id,
      open,
      high,
      low,
      close,
      x: id * 20
    };
  };

  useEffect(() => {
    const initialCandles: Candle[] = [];
    let price = 100;
    
    // Fill screen with candles from right to left
    for (let i = 0; i < 100; i++) {
      const candle = generateCandle(i, price);
      candle.x = i * 20;
      initialCandles.push(candle);
      price = candle.close;
    }
    
    setCandles(initialCandles);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCandles(prevCandles => {
        // Move all candles to the left
        const movedCandles = prevCandles.map(candle => ({
          ...candle,
          x: candle.x - 2
        }));
        
        // Remove candles that moved off screen
        const visibleCandles = movedCandles.filter(candle => candle.x > -50);
        
        // Add new candle from the right
        const lastCandle = visibleCandles[visibleCandles.length - 1];
        const maxX = Math.max(...visibleCandles.map(c => c.x), 0);
        
        if (maxX < 2000) {
          const newCandle = generateCandle(
            Date.now(),
            lastCandle ? lastCandle.close : 100
          );
          newCandle.x = maxX + 20;
          visibleCandles.push(newCandle);
        }
        
        return visibleCandles;
      });
    }, 100);

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
          style={{ opacity: 0.8 }}
        >
        <defs>
          <linearGradient id="candleGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="1"/>
            <stop offset="50%" stopColor="#059669" stopOpacity="0.9"/>
            <stop offset="100%" stopColor="#047857" stopOpacity="0.8"/>
          </linearGradient>
          
          <filter id="glow">
            <feMorphology operator="dilate" radius="1"/>
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* No grid background - solid color only */}
        
        {/* Main candlestick chart - Center screen */}
        {candles.map(candle => {
          const scale = 3;
          const centerY = 540; // Center of 1080px height
          const priceOffset = (candle.close - 100) * scale;
          const baseY = centerY - priceOffset;
          const bodyHeight = Math.abs(candle.close - candle.open) * scale;
          const bodyY = baseY - Math.max(candle.open - 100, candle.close - 100) * scale;
          const wickTop = baseY - (candle.high - 100) * scale;
          const wickBottom = baseY - (candle.low - 100) * scale;
          
            return (
            <g key={candle.id} filter="url(#glow)">
              {/* Wick */}
              <line
                x1={candle.x + 6}
                y1={wickTop}
                x2={candle.x + 6}
                y2={wickBottom}
                stroke="#10b981"
                strokeWidth="2"
                opacity="0.8"
              />
              
              {/* Body */}
              <rect
                x={candle.x + 2}
                y={bodyY}
                width="8"
                height={Math.max(bodyHeight, 3)}
                fill="url(#candleGradient)"
                stroke="#10b981"
                strokeWidth="1"
                opacity="0.8"
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