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
    const volatility = Math.random() * 15 + 5; // Much more variation
    const open = prevClose + (Math.random() - 0.5) * volatility;
    const change = (Math.random() - 0.2) * volatility * 2; // Bigger moves, mostly up
    const close = open + change;
    const high = Math.max(open, close) + Math.random() * volatility * 1.5; // Much higher wicks
    const low = Math.min(open, close) - Math.random() * volatility * 0.3;
    
    return {
      id,
      open,
      high,
      low,
      close,
      x: id * 60 // Much more spacing
    };
  };

  useEffect(() => {
    const initialCandles: Candle[] = [];
    let price = 20; // Start much lower for taller candles
    
    for (let i = 0; i < 30; i++) { // Much fewer candles
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
        
        if (visibleCandles.length < 30) { // Fewer candles
          const lastCandle = visibleCandles[visibleCandles.length - 1];
          const newCandle = generateCandle(
            lastCandle ? lastCandle.id + 1 : 0,
            lastCandle ? lastCandle.close : 20
          );
          newCandle.x = 2400; // Wider viewport
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
        
        {/* Main candlestick chart - Much taller candles */}
        {candles.map(candle => {
          const scale = 12; // Much larger scale for height
          const baseY = 750; // Lower base
          const bodyHeight = Math.abs(candle.close - candle.open) * scale;
          const bodyY = baseY - Math.max(candle.open, candle.close) * scale;
          const wickTop = baseY - candle.high * scale;
          const wickBottom = baseY - candle.low * scale;
          
          return (
            <g key={candle.id} filter="url(#glow)">
              {/* Wick */}
              <line
                x1={candle.x + 15}
                y1={wickTop}
                x2={candle.x + 15}
                y2={wickBottom}
                stroke="#10b981"
                strokeWidth="6"
                opacity="1"
              />
              
              {/* Body - Larger */}
              <rect
                x={candle.x + 5}
                y={bodyY}
                width="24"
                height={Math.max(bodyHeight, 8)}
                fill="url(#candleGradient)"
                stroke="#10b981"
                strokeWidth="1.5"
                opacity="1"
              />
            </g>
          );
        })}
        
        {/* Second layer for depth - Fewer, taller candles */}
        {candles.slice(0, 15).map(candle => {
          const scale = 8;
          const baseY = 950; // Much lower
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
        
        {/* Third layer - Fewer candles */}
        {candles.slice(0, 10).map(candle => {
          const scale = 6;
          const baseY = 500; // Higher up but still tall
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