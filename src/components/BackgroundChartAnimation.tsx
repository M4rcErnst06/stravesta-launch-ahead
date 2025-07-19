import React, { useEffect, useState } from 'react';

interface Candle {
  id: number;
  open: number;
  high: number;
  low: number;
  close: number;
  x: number;
}

const BackgroundChartAnimation = () => {
  const [candles, setCandles] = useState<Candle[]>([]);

  const generateCandle = (id: number, prevClose: number): Candle => {
    const volatility = Math.random() * 8 + 2; // More variation
    const open = prevClose + (Math.random() - 0.5) * volatility;
    const change = (Math.random() - 0.3) * volatility; // Sometimes up, sometimes down
    const close = open + change;
    const high = Math.max(open, close) + Math.random() * volatility;
    const low = Math.min(open, close) - Math.random() * volatility * 0.5;
    
    return {
      id,
      open,
      high,
      low,
      close,
      x: id * 30 // More spacing
    };
  };

  useEffect(() => {
    const initialCandles: Candle[] = [];
    let price = 50; // Start lower
    
    for (let i = 0; i < 70; i++) {
      const candle = generateCandle(i, price);
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
          candle.x -= 1.5;
        });
        
        const visibleCandles = newCandles.filter(candle => candle.x > -100);
        
        if (visibleCandles.length < 70) {
          const lastCandle = visibleCandles[visibleCandles.length - 1];
          const newCandle = generateCandle(
            lastCandle ? lastCandle.id + 1 : 0,
            lastCandle ? lastCandle.close : 50
          );
          newCandle.x = 2200;
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
        
        {/* Main candlestick chart - Better positioning */}
        {candles.map(candle => {
          const scale = 6; // Even larger scale
          const baseY = 650; // Move down more
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
                stroke="#10b981"
                strokeWidth="4"
                opacity="1"
              />
              
              {/* Body - Larger */}
              <rect
                x={candle.x + 2}
                y={bodyY}
                width="20"
                height={Math.max(bodyHeight, 6)}
                fill="url(#candleGradient)"
                stroke="#10b981"
                strokeWidth="1.5"
                opacity="1"
              />
            </g>
          );
        })}
        
        {/* Second layer for depth - Different positioning */}
        {candles.slice(0, 35).map(candle => {
          const scale = 4;
          const baseY = 850; // Lower positioning
          const bodyHeight = Math.abs(candle.close - candle.open) * scale;
          const bodyY = baseY - Math.max(candle.open, candle.close) * scale;
          const wickTop = baseY - candle.high * scale;
          const wickBottom = baseY - candle.low * scale;
          
          return (
            <g key={`layer2-${candle.id}`}>
              <line
                x1={candle.x + 200}
                y1={wickTop}
                x2={candle.x + 200}
                y2={wickBottom}
                stroke="#10b981"
                strokeWidth="3"
                opacity="0.7"
              />
              <rect
                x={candle.x + 196}
                y={bodyY}
                width="16"
                height={Math.max(bodyHeight, 4)}
                fill="#10b981"
                opacity="0.6"
              />
            </g>
          );
        })}
        
        {/* Third layer - Higher positioning */}
        {candles.slice(0, 20).map(candle => {
          const scale = 3;
          const baseY = 400; // Higher up
          const bodyHeight = Math.abs(candle.close - candle.open) * scale;
          const bodyY = baseY - Math.max(candle.open, candle.close) * scale;
          const wickTop = baseY - candle.high * scale;
          const wickBottom = baseY - candle.low * scale;
          
          return (
            <g key={`layer3-${candle.id}`}>
              <line
                x1={candle.x + 400}
                y1={wickTop}
                x2={candle.x + 400}
                y2={wickBottom}
                stroke="#10b981"
                strokeWidth="2"
                opacity="0.5"
              />
              <rect
                x={candle.x + 398}
                y={bodyY}
                width="10"
                height={Math.max(bodyHeight, 3)}
                fill="#10b981"
                opacity="0.4"
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