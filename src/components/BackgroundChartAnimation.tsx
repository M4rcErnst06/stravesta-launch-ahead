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

  // Generate a single bullish candle with more realistic price movements
  const generateBullishCandle = (id: number, prevClose: number): Candle => {
    const open = prevClose + (Math.random() - 0.5) * 0.2; // Small gap up/down
    const change = Math.random() * 2 + 0.3; // Always positive change (0.3 - 2.3)
    const close = open + change;
    const high = close + Math.random() * 0.8; // Wick above
    const low = Math.max(open - Math.random() * 0.5, open - 0.3); // Small wick below, but not below open too much
    
    return {
      id,
      open,
      high,
      low,
      close,
      x: id * 12, // Wider spacing between candles
      isBullish: true
    };
  };

  // Initialize candles across the full screen width
  useEffect(() => {
    const initialCandles: Candle[] = [];
    let price = 100;
    
    // Create enough candles to fill the screen width plus some extra for smooth scrolling
    for (let i = 0; i < 120; i++) {
      const candle = generateBullishCandle(i, price);
      initialCandles.push(candle);
      price = candle.close;
    }
    
    setCandles(initialCandles);
    setCurrentPrice(price);
  }, []);

  // Smooth animation loop - slower and more elegant
  useEffect(() => {
    const interval = setInterval(() => {
      setCandles(prevCandles => {
        const newCandles = [...prevCandles];
        
        // Move all candles to the left smoothly
        newCandles.forEach(candle => {
          candle.x -= 1; // Slower movement for smoother animation
          candle.id -= 0.083; // Fractional movement
        });
        
        // Remove candles that have moved off screen
        const visibleCandles = newCandles.filter(candle => candle.x > -20);
        
        // Add new candle when needed
        if (visibleCandles.length < 120) {
          const lastCandle = visibleCandles[visibleCandles.length - 1];
          const newCandle = generateBullishCandle(
            lastCandle ? lastCandle.id + 1 : 0,
            lastCandle ? lastCandle.close : currentPrice
          );
          newCandle.x = 1440; // Start from right edge
          visibleCandles.push(newCandle);
        }
        
        return visibleCandles;
      });
    }, 50); // Higher frequency for smoother animation

    return () => clearInterval(interval);
  }, [currentPrice]);

  const renderCandle = (candle: Candle) => {
    const scale = 3; // Scale factor for better visibility
    const bodyHeight = Math.abs(candle.close - candle.open) * scale;
    const bodyY = Math.min(candle.open, candle.close) * scale;
    const wickTop = candle.high * scale;
    const wickBottom = candle.low * scale;

    return (
      <g key={`${candle.id}-${candle.x}`} opacity="0.15">
        {/* Wick */}
        <line
          x1={candle.x + 3}
          y1={wickTop}
          x2={candle.x + 3}
          y2={wickBottom}
          stroke="#10b981"
          strokeWidth="1.5"
        />
        
        {/* Body */}
        <rect
          x={candle.x}
          y={bodyY}
          width="6"
          height={Math.max(bodyHeight, 2)}
          fill="#10b981"
          rx="1"
        />
      </g>
    );
  };

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Gradient overlays to fade the chart at edges */}
      <div className="absolute inset-0 bg-gradient-to-r from-stravesta-dark via-transparent to-stravesta-dark z-10"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-stravesta-dark/80 via-transparent to-stravesta-dark/80 z-10"></div>
      
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1440 800"
        className="absolute inset-0"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Subtle grid lines */}
        <defs>
          <pattern id="trading-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path 
              d="M 60 0 L 0 0 0 60" 
              fill="none" 
              stroke="#10b981" 
              strokeWidth="0.3" 
              opacity="0.1"
            />
          </pattern>
          
          {/* Subtle gradient for depth */}
          <linearGradient id="depth-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.03"/>
            <stop offset="50%" stopColor="#10b981" stopOpacity="0.01"/>
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.03"/>
          </linearGradient>
        </defs>
        
        {/* Background grid */}
        <rect width="100%" height="100%" fill="url(#trading-grid)" />
        <rect width="100%" height="100%" fill="url(#depth-gradient)" />
        
        {/* Horizontal price levels */}
        {[150, 200, 250, 300, 350, 400].map((price, index) => (
          <g key={price} opacity="0.05">
            <line
              x1="0"
              y1={price}
              x2="1440"
              y2={price}
              stroke="#10b981"
              strokeWidth="1"
              strokeDasharray="4,8"
            />
          </g>
        ))}
        
        {/* Candles - flipped vertically for proper chart orientation */}
        <g transform="scale(1, -1) translate(0, -500)">
          {candles.map(renderCandle)}
        </g>
        
        {/* Trend line overlay */}
        <path
          d="M 0,400 Q 360,380 720,360 Q 1080,340 1440,320"
          fill="none"
          stroke="#10b981"
          strokeWidth="2"
          opacity="0.08"
          strokeDasharray="5,10"
        />
      </svg>
    </div>
  );
};

export default BackgroundChartAnimation;