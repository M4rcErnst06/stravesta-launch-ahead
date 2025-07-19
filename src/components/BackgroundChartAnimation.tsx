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

  // Generate realistic bullish candle
  const generateBullishCandle = (id: number, prevClose: number): Candle => {
    const volatility = 0.8;
    const trend = 0.3; // Upward trend
    
    const open = prevClose + (Math.random() - 0.5) * volatility * 0.3;
    const change = Math.random() * volatility + trend;
    const close = open + change;
    const high = Math.max(open, close) + Math.random() * volatility * 0.5;
    const low = Math.min(open, close) - Math.random() * volatility * 0.3;
    
    return {
      id,
      open,
      high,
      low,
      close,
      x: id * 16,
      isBullish: close > open
    };
  };

  // Initialize with realistic chart data
  useEffect(() => {
    const initialCandles: Candle[] = [];
    let price = 100;
    
    for (let i = 0; i < 100; i++) {
      const candle = generateBullishCandle(i, price);
      initialCandles.push(candle);
      price = candle.close;
    }
    
    setCandles(initialCandles);
  }, []);

  // Smooth animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCandles(prevCandles => {
        const newCandles = [...prevCandles];
        
        // Move all candles left
        newCandles.forEach(candle => {
          candle.x -= 0.5;
        });
        
        // Remove off-screen candles
        const visibleCandles = newCandles.filter(candle => candle.x > -30);
        
        // Add new candle
        if (visibleCandles.length < 100) {
          const lastCandle = visibleCandles[visibleCandles.length - 1];
          const newCandle = generateBullishCandle(
            lastCandle ? lastCandle.id + 1 : 0,
            lastCandle ? lastCandle.close : 100
          );
          newCandle.x = 1600;
          visibleCandles.push(newCandle);
        }
        
        return visibleCandles;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  const renderCandle = (candle: Candle, index: number) => {
    const scale = 4;
    const baseY = 200;
    const bodyHeight = Math.abs(candle.close - candle.open) * scale;
    const bodyY = baseY - Math.max(candle.open, candle.close) * scale;
    const wickTop = baseY - candle.high * scale;
    const wickBottom = baseY - candle.low * scale;
    
    // Opacity based on position for depth effect
    const opacity = Math.max(0.1, Math.min(0.4, (candle.x / 1600) * 0.4));

    return (
      <g key={`${candle.id}-${index}`} opacity={opacity}>
        {/* Wick */}
        <line
          x1={candle.x + 6}
          y1={wickTop}
          x2={candle.x + 6}
          y2={wickBottom}
          stroke="#14b8a6"
          strokeWidth="2"
        />
        
        {/* Body */}
        <rect
          x={candle.x + 2}
          y={bodyY}
          width="8"
          height={Math.max(bodyHeight, 3)}
          fill={candle.isBullish ? "#14b8a6" : "#ef4444"}
          stroke={candle.isBullish ? "#0d9488" : "#dc2626"}
          strokeWidth="1"
          rx="1"
        />
        
        {/* Glow effect for some candles */}
        {Math.random() > 0.7 && (
          <rect
            x={candle.x + 2}
            y={bodyY}
            width="8"
            height={Math.max(bodyHeight, 3)}
            fill={candle.isBullish ? "#14b8a6" : "#ef4444"}
            opacity="0.3"
            rx="1"
            filter="blur(2px)"
          />
        )}
      </g>
    );
  };

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Multiple gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-stravesta-dark via-transparent via-transparent to-stravesta-dark z-10"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-stravesta-dark/90 via-transparent to-stravesta-dark/90 z-10"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-stravesta-dark via-transparent to-transparent z-10"></div>
      
      {/* Multiple chart layers for depth */}
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1600 800"
        className="absolute inset-0"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Subtle glow effect */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          {/* Grid pattern */}
          <pattern id="trading-grid" width="80" height="80" patternUnits="userSpaceOnUse">
            <path 
              d="M 80 0 L 0 0 0 80" 
              fill="none" 
              stroke="#14b8a6" 
              strokeWidth="0.5" 
              opacity="0.1"
            />
          </pattern>
        </defs>
        
        {/* Background grid */}
        <rect width="100%" height="100%" fill="url(#trading-grid)" />
        
        {/* Horizontal price levels */}
        {Array.from({length: 8}, (_, i) => (
          <line
            key={i}
            x1="0"
            y1={100 + i * 80}
            x2="1600"
            y2={100 + i * 80}
            stroke="#14b8a6"
            strokeWidth="0.5"
            opacity="0.1"
            strokeDasharray="10,20"
          />
        ))}
        
        {/* Main candles */}
        <g>
          {candles.map((candle, index) => renderCandle(candle, index))}
        </g>
        
        {/* Trend lines */}
        <path
          d="M 0,600 Q 400,550 800,500 Q 1200,450 1600,400"
          fill="none"
          stroke="#14b8a6"
          strokeWidth="2"
          opacity="0.15"
          strokeDasharray="8,16"
        />
        
        <path
          d="M 0,400 Q 400,350 800,300 Q 1200,250 1600,200"
          fill="none"
          stroke="#14b8a6"
          strokeWidth="1"
          opacity="0.1"
          strokeDasharray="4,8"
        />
      </svg>
      
      {/* Scattered floating elements for depth */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-stravesta-teal/20 rounded-full animate-pulse"></div>
      <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-stravesta-teal/30 rounded-full animate-pulse"></div>
      <div className="absolute bottom-1/4 left-1/2 w-1.5 h-1.5 bg-stravesta-teal/20 rounded-full animate-pulse"></div>
    </div>
  );
};

export default BackgroundChartAnimation;