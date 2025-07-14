
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

  // Generate realistic candlestick data
  const generateCandle = (id: number, prevClose: number): Candle => {
    const volatility = 0.03;
    const trend = Math.random() > 0.5 ? 1 : -1;
    const change = (Math.random() * volatility * trend);
    
    const open = prevClose;
    const close = open * (1 + change);
    const high = Math.max(open, close) * (1 + Math.random() * 0.02);
    const low = Math.min(open, close) * (1 - Math.random() * 0.02);
    
    return {
      id,
      open,
      high,
      low,
      close,
      x: id * 15
    };
  };

  // Initialize candles
  useEffect(() => {
    const initialCandles: Candle[] = [];
    let price = 100;
    
    for (let i = 0; i < 120; i++) {
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
          .map(candle => ({ ...candle, x: candle.x - 15 }))
          .filter(candle => candle.x > -50);
        
        return [...updatedCandles, newCandle];
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const renderCandle = (candle: Candle, index: number) => {
    const isGreen = candle.close > candle.open;
    const bodyHeight = Math.abs(candle.close - candle.open) * 400;
    const bodyTop = Math.min(candle.open, candle.close) * 400;
    const wickTop = candle.high * 400;
    const wickBottom = candle.low * 400;
    
    return (
      <g key={`${candle.id}-${index}`} className="candle-group">
        {/* Wick */}
        <line
          x1={candle.x + 6}
          y1={500 - wickTop}
          x2={candle.x + 6}
          y2={500 - wickBottom}
          stroke={isGreen ? '#00F5D4' : '#FF4757'}
          strokeWidth="2"
          opacity="0.9"
        />
        
        {/* Body */}
        <rect
          x={candle.x}
          y={500 - (bodyTop + bodyHeight)}
          width="12"
          height={Math.max(bodyHeight, 2)}
          fill={isGreen ? '#00F5D4' : '#FF4757'}
          opacity="0.8"
          className="transition-all duration-300"
        />
      </g>
    );
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ opacity: 0.25 }}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1800 500"
        className="w-full h-full"
        style={{ 
          background: 'transparent',
          transform: 'scale(1.1)',
        }}
      >
        {/* Grid lines */}
        <defs>
          <pattern id="grid" width="60" height="50" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 50" fill="none" stroke="rgba(0, 245, 212, 0.15)" strokeWidth="1"/>
          </pattern>
          
          {/* Glow effect */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        <rect width="100%" height="100%" fill="url(#grid)" />
        
        {/* Price levels */}
        {[100, 200, 300, 400].map(level => (
          <line
            key={level}
            x1="0"
            y1={500 - level}
            x2="1800"
            y2={500 - level}
            stroke="rgba(0, 245, 212, 0.2)"
            strokeWidth="1"
            strokeDasharray="10,5"
          />
        ))}
        
        {/* Candlesticks */}
        {candles.map((candle, index) => renderCandle(candle, index))}
        
        {/* Floating trading notifications */}
        <g className="trading-notification opacity-90">
          <rect
            x="1200"
            y="80"
            width="400"
            height="90"
            rx="12"
            fill="rgba(0, 245, 212, 0.15)"
            stroke="rgba(0, 245, 212, 0.4)"
            strokeWidth="2"
            filter="url(#glow)"
          />
          <text
            x="1220"
            y="110"
            fill="#00F5D4"
            fontSize="14"
            fontFamily="monospace"
            fontWeight="bold"
          >
            ✓ AI Setup erkannt: Bullish Pattern
          </text>
          <text
            x="1220"
            y="130"
            fill="#00F5D4"
            fontSize="12"
            fontFamily="monospace"
            opacity="0.9"
          >
            Profit Target: +3.2% | Stop Loss: -1.1%
          </text>
          <text
            x="1220"
            y="150"
            fill="#00F5D4"
            fontSize="11"
            fontFamily="monospace"
            opacity="0.7"
          >
            Confidence: 87%
          </text>
        </g>
        
        {/* Second notification */}
        <g className="trading-notification-2 opacity-80">
          <rect
            x="200"
            y="300"
            width="350"
            height="70"
            rx="10"
            fill="rgba(255, 71, 87, 0.12)"
            stroke="rgba(255, 71, 87, 0.3)"
            strokeWidth="2"
          />
          <text
            x="220"
            y="325"
            fill="#FF4757"
            fontSize="13"
            fontFamily="monospace"
            fontWeight="bold"
          >
            ⚠ Risk Management aktiv
          </text>
          <text
            x="220"
            y="345"
            fill="#FF4757"
            fontSize="11"
            fontFamily="monospace"
            opacity="0.8"
          >
            Position reduziert: -50%
          </text>
        </g>
        
        {/* Moving price line */}
        <g className="price-line animate-pulse">
          <line
            x1="0"
            y1="250"
            x2="1800"
            y2="260"
            stroke="#00F5D4"
            strokeWidth="3"
            strokeDasharray="15,10"
            opacity="0.6"
            filter="url(#glow)"
          />
        </g>
      </svg>
    </div>
  );
};

export default AnimatedTradingChart;
