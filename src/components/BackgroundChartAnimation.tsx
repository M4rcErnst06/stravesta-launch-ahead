import React, { useEffect, useState } from 'react';

interface Candle {
  id: number;
  open: number;
  high: number;
  low: number;
  close: number;
  x: number;
  isBullish: boolean;
}

const BackgroundChartAnimation = () => {
  const [candles, setCandles] = useState<Candle[]>([]);
  const [currentPrice, setCurrentPrice] = useState(100);

  // Generate a single bullish candle
  const generateBullishCandle = (id: number, prevClose: number): Candle => {
    const open = prevClose;
    const change = Math.random() * 3 + 0.5; // Always positive change
    const close = open + change;
    const high = close + Math.random() * 1;
    const low = open - Math.random() * 0.5;
    
    return {
      id,
      open,
      high,
      low,
      close,
      x: id * 8,
      isBullish: true
    };
  };

  // Initialize candles
  useEffect(() => {
    const initialCandles: Candle[] = [];
    let price = 100;
    
    for (let i = 0; i < 80; i++) {
      const candle = generateBullishCandle(i, price);
      initialCandles.push(candle);
      price = candle.close;
    }
    
    setCandles(initialCandles);
    setCurrentPrice(price);
  }, []);

  // Animation loop
  useEffect(() => {
    const interval = setInterval(() => {
      setCandles(prevCandles => {
        const newCandles = [...prevCandles];
        
        // Remove first candle and shift all x positions
        newCandles.shift();
        newCandles.forEach(candle => {
          candle.x -= 8;
          candle.id -= 1;
        });
        
        // Add new candle at the end
        const lastCandle = newCandles[newCandles.length - 1];
        const newCandle = generateBullishCandle(
          lastCandle ? lastCandle.id + 1 : 0,
          lastCandle ? lastCandle.close : currentPrice
        );
        newCandles.push(newCandle);
        
        return newCandles;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [currentPrice]);

  const renderCandle = (candle: Candle) => {
    const bodyHeight = Math.abs(candle.close - candle.open);
    const bodyY = Math.min(candle.open, candle.close);
    const wickTop = candle.high;
    const wickBottom = candle.low;

    return (
      <g key={candle.id}>
        {/* Wick */}
        <line
          x1={candle.x + 2}
          y1={wickTop}
          x2={candle.x + 2}
          y2={wickBottom}
          stroke="#10b981"
          strokeWidth="1"
          opacity="0.8"
        />
        
        {/* Body */}
        <rect
          x={candle.x}
          y={bodyY}
          width="4"
          height={Math.max(bodyHeight, 1)}
          fill="#10b981"
          opacity="0.9"
        />
      </g>
    );
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-stravesta-dark/50"></div>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 800 600"
        className="opacity-10"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Grid lines */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#10b981" strokeWidth="0.5" opacity="0.3"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        
        {/* Price levels */}
        {[120, 110, 100, 90, 80].map((price, index) => (
          <g key={price}>
            <line
              x1="0"
              y1={price * 3}
              x2="800"
              y2={price * 3}
              stroke="#10b981"
              strokeWidth="0.5"
              opacity="0.3"
              strokeDasharray="2,2"
            />
          </g>
        ))}
        
        {/* Candles */}
        <g transform="scale(1, -1) translate(0, -400)">
          {candles.map(renderCandle)}
        </g>
      </svg>
    </div>
  );
};

export default BackgroundChartAnimation;