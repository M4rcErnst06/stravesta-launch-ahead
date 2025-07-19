import React, { useEffect, useState } from 'react';

interface Candle {
  id: number;
  open: number;
  high: number;
  low: number;
  close: number;
  x: number;
  y: number;
}

const BackgroundChartAnimation = () => {
  const [candles, setCandles] = useState<Candle[]>([]);

  const generateCandle = (id: number, prevClose: number, baseY: number): Candle => {
    // Always bullish trend like DipSway
    const volatility = Math.random() * 8 + 2;
    const open = prevClose;
    const change = Math.random() * 6 + 1; // Always positive (bullish)
    const close = open + change;
    const high = close + Math.random() * 3;
    const low = open - Math.random() * 1;
    
    return {
      id,
      open,
      high,
      low,
      close,
      x: id * 40, // Wider spacing
      y: baseY
    };
  };

  useEffect(() => {
    const initialCandles: Candle[] = [];
    let price = 10; // Start low
    
    for (let i = 0; i < 50; i++) {
      // Diagonal positioning: bottom left to top right
      const baseY = 900 - (i * 15); // Higher Y = lower on screen
      const candle = generateCandle(i, price, baseY);
      candle.x = (i * 40) + 50; // Start from left
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
          candle.x -= 1; // Slow movement
          candle.y += 0.3; // Slight downward drift for new space
        });
        
        const visibleCandles = newCandles.filter(candle => candle.x > -100 && candle.y < 1000);
        
        if (visibleCandles.length < 50) {
          const lastCandle = visibleCandles[visibleCandles.length - 1];
          const lastPrice = lastCandle ? lastCandle.close : 10;
          const newY = lastCandle ? lastCandle.y - 15 : 100; // Continue diagonal
          
          const newCandle = generateCandle(
            lastCandle ? lastCandle.id + 1 : 0,
            lastPrice,
            newY
          );
          newCandle.x = 1920 + 100;
          newCandle.y = newY;
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
            <stop offset="0%" stopColor="#00d4ff" stopOpacity="1"/>
            <stop offset="50%" stopColor="#00b4d8" stopOpacity="0.9"/>
            <stop offset="100%" stopColor="#0077b6" stopOpacity="0.8"/>
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
        
        {/* DipSway-style diagonal chart */}
        {candles.map(candle => {
          const scale = 8; // Good scale for visibility
          const baseY = candle.y; // Use the diagonal Y position
          const bodyHeight = Math.abs(candle.close - candle.open) * scale;
          const bodyY = baseY - Math.max(candle.open, candle.close) * scale;
          const wickTop = baseY - candle.high * scale;
          const wickBottom = baseY - candle.low * scale;
          
          return (
            <g key={candle.id} filter="url(#glow)">
              {/* Wick */}
              <line
                x1={candle.x + 10}
                y1={wickTop}
                x2={candle.x + 10}
                y2={wickBottom}
                stroke="#00d4ff"
                strokeWidth="3"
                opacity="1"
              />
              
              {/* Body - Larger */}
              <rect
                x={candle.x + 3}
                y={bodyY}
                width="14"
                height={Math.max(bodyHeight, 4)}
                fill="url(#candleGradient)"
                stroke="#00d4ff"
                strokeWidth="1"
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