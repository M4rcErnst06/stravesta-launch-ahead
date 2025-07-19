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

  // Generate realistic bullish candles like in DipSway
  const generateBullishCandle = (id: number, prevClose: number): Candle => {
    const volatility = 2;
    const trend = 0.5; // Strong upward trend
    
    const open = prevClose + (Math.random() - 0.3) * volatility * 0.2;
    const change = Math.random() * volatility + trend;
    const close = open + change;
    const high = Math.max(open, close) + Math.random() * volatility * 0.4;
    const low = Math.min(open, close) - Math.random() * volatility * 0.2;
    
    return {
      id,
      open,
      high,
      low,
      close,
      x: id * 25,
      isBullish: close > open
    };
  };

  // Initialize with chart data
  useEffect(() => {
    const initialCandles: Candle[] = [];
    let price = 50;
    
    for (let i = 0; i < 80; i++) {
      const candle = generateBullishCandle(i, price);
      initialCandles.push(candle);
      price = candle.close;
    }
    
    setCandles(initialCandles);
  }, []);

  // Animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCandles(prevCandles => {
        const newCandles = [...prevCandles];
        
        // Move all candles left
        newCandles.forEach(candle => {
          candle.x -= 0.8;
        });
        
        // Remove off-screen candles
        const visibleCandles = newCandles.filter(candle => candle.x > -50);
        
        // Add new candle
        if (visibleCandles.length < 80) {
          const lastCandle = visibleCandles[visibleCandles.length - 1];
          const newCandle = generateBullishCandle(
            lastCandle ? lastCandle.id + 1 : 0,
            lastCandle ? lastCandle.close : 50
          );
          newCandle.x = 2000;
          visibleCandles.push(newCandle);
        }
        
        return visibleCandles;
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

  const renderCandle = (candle: Candle, index: number) => {
    const scale = 6;
    const baseY = 400;
    const bodyHeight = Math.abs(candle.close - candle.open) * scale;
    const bodyY = baseY - Math.max(candle.open, candle.close) * scale;
    const wickTop = baseY - candle.high * scale;
    const wickBottom = baseY - candle.low * scale;
    
    // More visible opacity
    const opacity = 0.6;

    return (
      <g key={`${candle.id}-${index}`} opacity={opacity}>
        {/* Wick */}
        <line
          x1={candle.x + 8}
          y1={wickTop}
          x2={candle.x + 8}
          y2={wickBottom}
          stroke="#14b8a6"
          strokeWidth="3"
        />
        
        {/* Body */}
        <rect
          x={candle.x + 2}
          y={bodyY}
          width="12"
          height={Math.max(bodyHeight, 4)}
          fill="#14b8a6"
          stroke="#0d9488"
          strokeWidth="1"
          rx="1"
        />
        
        {/* Glow effect */}
        <rect
          x={candle.x + 2}
          y={bodyY}
          width="12"
          height={Math.max(bodyHeight, 4)}
          fill="#14b8a6"
          opacity="0.4"
          rx="1"
          filter="blur(3px)"
        />
      </g>
    );
  };

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* Less aggressive gradients so charts are more visible */}
      <div className="absolute inset-0 bg-gradient-to-r from-stravesta-dark/60 via-transparent to-stravesta-dark/60 z-10"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-stravesta-dark/40 via-transparent to-stravesta-dark/70 z-10"></div>
      
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1920 1080"
        className="absolute inset-0"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Glow effect */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          {/* Grid pattern */}
          <pattern id="trading-grid" width="100" height="100" patternUnits="userSpaceOnUse">
            <path 
              d="M 100 0 L 0 0 0 100" 
              fill="none" 
              stroke="#14b8a6" 
              strokeWidth="0.8" 
              opacity="0.2"
            />
          </pattern>
        </defs>
        
        {/* Background grid */}
        <rect width="100%" height="100%" fill="url(#trading-grid)" />
        
        {/* Horizontal price levels */}
        {Array.from({length: 10}, (_, i) => (
          <line
            key={i}
            x1="0"
            y1={100 + i * 80}
            x2="1920"
            y2={100 + i * 80}
            stroke="#14b8a6"
            strokeWidth="1"
            opacity="0.2"
            strokeDasharray="15,25"
          />
        ))}
        
        {/* First set of candles - main layer */}
        <g filter="url(#glow)">
          {candles.map((candle, index) => renderCandle(candle, index))}
        </g>
        
        {/* Second set of candles - offset for depth */}
        <g transform="translate(200, 100)" opacity="0.4">
          {candles.slice(0, 60).map((candle, index) => {
            const offsetCandle = { ...candle, x: candle.x + 100 };
            return renderCandle(offsetCandle, index + 1000);
          })}
        </g>
        
        {/* Third set of candles - background layer */}
        <g transform="translate(-150, 200)" opacity="0.3">
          {candles.slice(0, 40).map((candle, index) => {
            const offsetCandle = { ...candle, x: candle.x + 300 };
            return renderCandle(offsetCandle, index + 2000);
          })}
        </g>
        
        {/* Trend lines */}
        <path
          d="M 0,800 Q 480,700 960,600 Q 1440,500 1920,400"
          fill="none"
          stroke="#14b8a6"
          strokeWidth="3"
          opacity="0.3"
          strokeDasharray="10,20"
          filter="url(#glow)"
        />
        
        <path
          d="M 0,600 Q 480,500 960,400 Q 1440,300 1920,200"
          fill="none"
          stroke="#14b8a6"
          strokeWidth="2"
          opacity="0.2"
          strokeDasharray="5,10"
        />
      </svg>
    </div>
  );
};

export default BackgroundChartAnimation;