
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
    const isBullish = Math.random() > 0.5;
    const volatility = 0.015 + Math.random() * 0.025; // 1.5-4% volatility
    
    let open = prevClose;
    let close: number;
    
    if (isBullish) {
      close = open * (1 + Math.random() * volatility);
    } else {
      close = open * (1 - Math.random() * volatility);
    }
    
    const high = Math.max(open, close) * (1 + Math.random() * 0.01);
    const low = Math.min(open, close) * (1 - Math.random() * 0.01);
    
    return {
      id,
      open,
      high,
      low,
      close,
      x: id * 15 + 20, // Start from x=20 and space candles by 15 units
      isBullish
    };
  };

  // Initialize candles
  useEffect(() => {
    const initialCandles: Candle[] = [];
    let price = 100;
    
    for (let i = 0; i < 40; i++) {
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
        
        setCurrentPrice(newCandle.close);
        
        // Move all candles to the left and add new one
        const updatedCandles = prevCandles
          .map(candle => ({ ...candle, x: candle.x - 15 }))
          .filter(candle => candle.x > -30);
        
        return [...updatedCandles, newCandle];
      });
    }, 800); // Update every 800ms

    return () => clearInterval(interval);
  }, []);

  const renderCandle = (candle: Candle) => {
    const isGreen = candle.isBullish;
    const scale = 300; // Scale factor
    
    const bodyHeight = Math.abs(candle.close - candle.open) * scale;
    const bodyTop = Math.min(candle.open, candle.close) * scale;
    const wickTop = candle.high * scale;
    const wickBottom = candle.low * scale;
    
    const chartHeight = 250;
    const baselineY = chartHeight - 30;
    
    return (
      <g key={candle.id} className="transition-all duration-500">
        {/* Wick */}
        <line
          x1={candle.x + 6}
          y1={baselineY - (wickTop - 90 * scale)}
          x2={candle.x + 6}
          y2={baselineY - (wickBottom - 90 * scale)}
          stroke={isGreen ? '#10B981' : '#EF4444'}
          strokeWidth="1.5"
        />
        
        {/* Body */}
        <rect
          x={candle.x}
          y={baselineY - (bodyTop + bodyHeight - 90 * scale)}
          width="12"
          height={Math.max(bodyHeight, 3)}
          fill={isGreen ? '#10B981' : '#EF4444'}
          stroke={isGreen ? '#059669' : '#DC2626'}
          strokeWidth="1"
          rx="1"
          className="transition-all duration-500"
        />
      </g>
    );
  };

  return (
    <div className="w-full h-full relative">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 700 250"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Grid lines */}
        <defs>
          <pattern id="chartGrid" width="25" height="20" patternUnits="userSpaceOnUse">
            <path d="M 25 0 L 0 0 0 20" fill="none" stroke="rgba(0, 245, 212, 0.15)" strokeWidth="0.5"/>
          </pattern>
        </defs>
        
        <rect width="100%" height="100%" fill="url(#chartGrid)" />
        
        {/* Horizontal price levels */}
        {[95, 100, 105, 110].map(level => (
          <g key={level}>
            <line
              x1="0"
              y1={220 - (level - 90) * 3}
              x2="700"
              y2={220 - (level - 90) * 3}
              stroke="rgba(0, 245, 212, 0.2)"
              strokeWidth="0.5"
              strokeDasharray="3,3"
            />
            <text
              x="10"
              y={220 - (level - 90) * 3 - 3}
              fill="rgba(0, 245, 212, 0.6)"
              fontSize="8"
              fontFamily="monospace"
            >
              ${level}
            </text>
          </g>
        ))}
        
        {/* Candlesticks */}
        <g className="candlesticks">
          {candles.map(candle => renderCandle(candle))}
        </g>
        
        {/* Current price line */}
        <line
          x1="0"
          y1={220 - (currentPrice - 90) * 3}
          x2="700"
          y2={220 - (currentPrice - 90) * 3}
          stroke="#00F5D4"
          strokeWidth="2"
          strokeDasharray="5,3"
          opacity="0.8"
        />
        
        {/* Price display */}
        <rect
          x="580"
          y="15"
          width="110"
          height="25"
          rx="5"
          fill="rgba(0, 245, 212, 0.2)"
          stroke="rgba(0, 245, 212, 0.4)"
          strokeWidth="1"
        />
        <text
          x="635"
          y="32"
          fill="#00F5D4"
          fontSize="10"
          fontFamily="monospace"
          fontWeight="bold"
          textAnchor="middle"
        >
          ${currentPrice.toFixed(2)}
        </text>
      </svg>
    </div>
  );
};

export default AnimatedTradingChart;
