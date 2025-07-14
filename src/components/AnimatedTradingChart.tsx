
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

const AnimatedTradingChart = () => {
  const [candles, setCandles] = useState<Candle[]>([]);
  const [currentPrice, setCurrentPrice] = useState(100);

  // Generate realistic candlestick data
  const generateCandle = (id: number, prevClose: number): Candle => {
    // Alternate between bullish and bearish with some randomness
    const isBullish = Math.random() > 0.4; // 60% chance bullish
    const volatility = 0.02 + Math.random() * 0.03; // 2-5% volatility
    
    let open = prevClose;
    let close: number;
    
    if (isBullish) {
      close = open * (1 + Math.random() * volatility);
    } else {
      close = open * (1 - Math.random() * volatility);
    }
    
    const high = Math.max(open, close) * (1 + Math.random() * 0.015);
    const low = Math.min(open, close) * (1 - Math.random() * 0.015);
    
    return {
      id,
      open,
      high,
      low,
      close,
      x: id * 25 + 100, // Start from x=100 and space candles by 25 units
      isBullish
    };
  };

  // Initialize candles
  useEffect(() => {
    const initialCandles: Candle[] = [];
    let price = 100;
    
    for (let i = 0; i < 50; i++) {
      const candle = generateCandle(i, price);
      initialCandles.push(candle);
      price = candle.close;
    }
    
    setCandles(initialCandles);
    setCurrentPrice(price);
  }, []);

  // Animate new candles
  useEffect(() => {
    const interval = setInterval(() => {
      setCandles(prevCandles => {
        if (prevCandles.length === 0) return prevCandles;
        
        const lastCandle = prevCandles[prevCandles.length - 1];
        const newCandle = generateCandle(lastCandle.id + 1, lastCandle.close);
        
        // Update current price
        setCurrentPrice(newCandle.close);
        
        // Move all candles to the left and add new one
        const updatedCandles = prevCandles
          .map(candle => ({ ...candle, x: candle.x - 25 }))
          .filter(candle => candle.x > -50);
        
        return [...updatedCandles, newCandle];
      });
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  const renderCandle = (candle: Candle, index: number) => {
    const isGreen = candle.isBullish;
    const scale = 400; // Scale factor for better visibility
    
    const bodyHeight = Math.abs(candle.close - candle.open) * scale;
    const bodyTop = Math.min(candle.open, candle.close) * scale;
    const wickTop = candle.high * scale;
    const wickBottom = candle.low * scale;
    
    const chartHeight = 400;
    const baselineY = chartHeight - 50;
    
    return (
      <g key={`${candle.id}-${index}`} className="candle-group">
        {/* Wick (shadow) */}
        <line
          x1={candle.x + 10}
          y1={baselineY - (wickTop - 80 * scale)}
          x2={candle.x + 10}
          y2={baselineY - (wickBottom - 80 * scale)}
          stroke={isGreen ? '#10B981' : '#EF4444'}
          strokeWidth="2"
          opacity="1"
        />
        
        {/* Body */}
        <rect
          x={candle.x}
          y={baselineY - (bodyTop + bodyHeight - 80 * scale)}
          width="20"
          height={Math.max(bodyHeight, 4)}
          fill={isGreen ? '#10B981' : '#EF4444'}
          stroke={isGreen ? '#059669' : '#DC2626'}
          strokeWidth="1"
          opacity="1"
          className="transition-all duration-300"
          rx="2"
        />
        
        {/* Price labels on some candles */}
        {index % 10 === 0 && (
          <text
            x={candle.x + 10}
            y={baselineY - (bodyTop + bodyHeight - 80 * scale) - 15}
            fill={isGreen ? '#10B981' : '#EF4444'}
            fontSize="12"
            textAnchor="middle"
            fontFamily="monospace"
            opacity="1"
          >
            ${candle.close.toFixed(2)}
          </text>
        )}
      </g>
    );
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ opacity: 0.8 }}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1400 400"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Grid lines */}
        <defs>
          <pattern id="grid" width="50" height="30" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 30" fill="none" stroke="rgba(0, 245, 212, 0.2)" strokeWidth="1"/>
          </pattern>
          
          {/* Glow effect */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        <rect width="100%" height="100%" fill="url(#grid)" />
        
        {/* Horizontal price levels */}
        {[100, 120, 140, 160, 180].map(level => (
          <line
            key={level}
            x1="0"
            y1={350 - (level - 80) * 4}
            x2="1400"
            y2={350 - (level - 80) * 4}
            stroke="rgba(0, 245, 212, 0.3)"
            strokeWidth="1"
            strokeDasharray="5,5"
          />
        ))}
        
        {/* Candlesticks */}
        <g className="candlesticks">
          {candles.map((candle, index) => renderCandle(candle, index))}
        </g>
        
        {/* Current price indicator */}
        <g className="price-indicator">
          <line
            x1="0"
            y1={350 - (currentPrice - 80) * 4}
            x2="1400"
            y2={350 - (currentPrice - 80) * 4}
            stroke="#00F5D4"
            strokeWidth="3"
            strokeDasharray="10,5"
            opacity="1"
            filter="url(#glow)"
          />
          <text
            x="1200"
            y={350 - (currentPrice - 80) * 4 - 10}
            fill="#00F5D4"
            fontSize="14"
            fontFamily="monospace"
            fontWeight="bold"
          >
            Current: ${currentPrice.toFixed(2)}
          </text>
        </g>
        
        {/* Trading status */}
        <g className="trading-status">
          <rect
            x="50"
            y="30"
            width="280"
            height="50"
            rx="8"
            fill="rgba(0, 245, 212, 0.2)"
            stroke="rgba(0, 245, 212, 0.5)"
            strokeWidth="2"
          />
          <text
            x="70"
            y="50"
            fill="#00F5D4"
            fontSize="12"
            fontFamily="monospace"
            fontWeight="bold"
          >
            📈 Live Trading Chart
          </text>
          <text
            x="70"
            y="65"
            fill="#00F5D4"
            fontSize="10"
            fontFamily="monospace"
            opacity="0.9"
          >
            Bullish & Bearish Candles
          </text>
        </g>
      </svg>
    </div>
  );
};

export default AnimatedTradingChart;
