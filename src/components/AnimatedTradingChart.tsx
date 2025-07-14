
import React, { useEffect, useState } from 'react';

interface Candle {
  id: number;
  open: number;
  high: number;
  low: number;
  close: number;
  x: number;
}

const AnimatedTradingChart = () => {
  const [candles, setCandles] = useState<Candle[]>([]);
  const [containerWidth, setContainerWidth] = useState(1200);

  // Generate realistic candlestick data
  const generateCandle = (id: number, prevClose: number): Candle => {
    const volatility = 0.02;
    const trend = Math.random() > 0.5 ? 1 : -1;
    const change = (Math.random() * volatility * trend);
    
    const open = prevClose;
    const close = open * (1 + change);
    const high = Math.max(open, close) * (1 + Math.random() * 0.01);
    const low = Math.min(open, close) * (1 - Math.random() * 0.01);
    
    return {
      id,
      open,
      high,
      low,
      close,
      x: id * 12
    };
  };

  // Initialize candles
  useEffect(() => {
    const initialCandles: Candle[] = [];
    let price = 100;
    
    for (let i = 0; i < 150; i++) {
      const candle = generateCandle(i, price);
      initialCandles.push(candle);
      price = candle.close;
    }
    
    setCandles(initialCandles);
  }, []);

  // Animate new candles
  useEffect(() => {
    const interval = setInterval(() => {
      setCandles(prevCandles => {
        if (prevCandles.length === 0) return prevCandles;
        
        const lastCandle = prevCandles[prevCandles.length - 1];
        const newCandle = generateCandle(lastCandle.id + 1, lastCandle.close);
        
        // Move all candles to the left and add new one
        const updatedCandles = prevCandles
          .map(candle => ({ ...candle, x: candle.x - 12 }))
          .filter(candle => candle.x > -50);
        
        return [...updatedCandles, newCandle];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const renderCandle = (candle: Candle, index: number) => {
    const isGreen = candle.close > candle.open;
    const bodyHeight = Math.abs(candle.close - candle.open) * 300;
    const bodyTop = Math.min(candle.open, candle.close) * 300;
    const wickTop = candle.high * 300;
    const wickBottom = candle.low * 300;
    
    return (
      <g key={`${candle.id}-${index}`} className="candle-group">
        {/* Wick */}
        <line
          x1={candle.x + 4}
          y1={400 - wickTop}
          x2={candle.x + 4}
          y2={400 - wickBottom}
          stroke={isGreen ? '#00F5D4' : '#FF6B6B'}
          strokeWidth="1"
          opacity="0.8"
        />
        
        {/* Body */}
        <rect
          x={candle.x}
          y={400 - (bodyTop + bodyHeight)}
          width="8"
          height={Math.max(bodyHeight, 1)}
          fill={isGreen ? '#00F5D4' : '#FF6B6B'}
          opacity="0.9"
          className="animate-pulse"
        />
      </g>
    );
  };

  return (
    <div className="absolute inset-0 overflow-hidden opacity-20">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1200 400"
        className="w-full h-full"
        style={{ 
          background: 'transparent',
          transform: 'scale(1.2)',
        }}
      >
        {/* Grid lines */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0, 245, 212, 0.1)" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        
        {/* Price levels */}
        {[100, 200, 300].map(level => (
          <line
            key={level}
            x1="0"
            y1={400 - level}
            x2="1200"
            y2={400 - level}
            stroke="rgba(0, 245, 212, 0.1)"
            strokeWidth="0.5"
            strokeDasharray="5,5"
          />
        ))}
        
        {/* Candlesticks */}
        {candles.map((candle, index) => renderCandle(candle, index))}
        
        {/* Glow effect */}
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Trading notification */}
        <g className="trading-notification animate-pulse" opacity="0.8">
          <rect
            x="800"
            y="50"
            width="350"
            height="80"
            rx="10"
            fill="rgba(0, 245, 212, 0.1)"
            stroke="rgba(0, 245, 212, 0.3)"
            strokeWidth="1"
          />
          <text
            x="820"
            y="75"
            fill="#00F5D4"
            fontSize="12"
            fontFamily="monospace"
          >
            ✓ Setup erkannt: Bullish Engulfing
          </text>
          <text
            x="820"
            y="95"
            fill="#00F5D4"
            fontSize="10"
            fontFamily="monospace"
            opacity="0.8"
          >
            Profit: +2.4% | Stop Loss: -0.8%
          </text>
        </g>
      </svg>
    </div>
  );
};

export default AnimatedTradingChart;
