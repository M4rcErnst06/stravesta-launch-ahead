import React, { useEffect, useState } from 'react';

interface Candle {
  id: number;
  open: number;
  high: number;
  low: number;
  close: number;
  x: number;
  y: number; // Add y position for diagonal movement
}

const BackgroundChartAnimation = () => {
  const [candles, setCandles] = useState<Candle[]>([]);

  const generateCandle = (id: number, prevClose: number): Candle => {
    const volatility = Math.random() * 15 + 5;
    const open = prevClose + (Math.random() - 0.5) * volatility;
    const change = (Math.random() - 0.2) * volatility * 2;
    const close = open + change;
    const high = Math.max(open, close) + Math.random() * volatility * 1.5;
    const low = Math.min(open, close) - Math.random() * volatility * 0.3;
    
    return {
      id,
      open,
      high,
      low,
      close,
      x: id * 25,
      y: 0 // Will be set dynamically
    };
  };

  useEffect(() => {
    const initialCandles: Candle[] = [];
    let price = 20;
    
    for (let i = 0; i < 80; i++) {
      const candle = generateCandle(i, price);
      candle.x = (i * 25) + 150; // Start from bottom left
      candle.y = 200 + (i * 2); // Diagonal movement up
      initialCandles.push(candle);
      price = candle.close;
    }
    
    setCandles(initialCandles);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCandles(prevCandles => {
        const newCandles = [...prevCandles];
        
        newCandles.forEach(candle => {
          candle.x -= 1.5; // Move right to left
          candle.y -= 0.8; // Move bottom to top
        });
        
        const visibleCandles = newCandles.filter(candle => candle.x > -200 && candle.y > -200); // Keep diagonal area visible
        
        if (visibleCandles.length < 80) {
          const lastCandle = visibleCandles[visibleCandles.length - 1];
          const newCandle = generateCandle(
            lastCandle ? lastCandle.id + 1 : 0,
            lastCandle ? lastCandle.close : 20
          );
          newCandle.x = 1920 + 200; // Enter from right
          newCandle.y = 800; // Enter from bottom
          visibleCandles.push(newCandle);
        }
        
        return visibleCandles;
      });
    }, 50);

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
        
        {/* Main candlestick chart - Diagonal movement */}
        {candles.map(candle => {
          const scale = 12;
          const baseY = 750 + candle.y; // Use dynamic Y position
          const bodyHeight = Math.abs(candle.close - candle.open) * scale;
          const bodyY = baseY - Math.max(candle.open, candle.close) * scale;
          const wickTop = baseY - candle.high * scale;
          const wickBottom = baseY - candle.low * scale;
          
          return (
            <g key={candle.id} filter="url(#glow)">
              {/* Wick */}
              <line
                x1={candle.x + 8}
                y1={wickTop}
                x2={candle.x + 8}
                y2={wickBottom}
                stroke="#10b981"
                strokeWidth="6"
                opacity="1"
              />
              
              {/* Body - Larger */}
              <rect
                x={candle.x + 2}
                y={bodyY}
                width="12"
                height={Math.max(bodyHeight, 8)}
                fill="url(#candleGradient)"
                stroke="#10b981"
                strokeWidth="1.5"
                opacity="1"
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