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
    const open = prevClose + (Math.random() - 0.3) * 2;
    const change = Math.random() * 4 + 1; // Always bullish
    const close = open + change;
    const high = close + Math.random() * 2;
    const low = open - Math.random() * 1;
    
    return {
      id,
      open,
      high,
      low,
      close,
      x: id * 25
    };
  };

  useEffect(() => {
    const initialCandles: Candle[] = [];
    let price = 100;
    
    for (let i = 0; i < 80; i++) {
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
        
        if (visibleCandles.length < 80) {
          const lastCandle = visibleCandles[visibleCandles.length - 1];
          const newCandle = generateCandle(
            lastCandle ? lastCandle.id + 1 : 0,
            lastCandle ? lastCandle.close : 100
          );
          newCandle.x = 2100;
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
        
        {/* Main candlestick chart - Larger candles */}
        {candles.map(candle => {
          const scale = 4; // Increased scale for larger candles
          const baseY = 540;
          const bodyHeight = Math.abs(candle.close - candle.open) * scale;
          const bodyY = baseY - Math.max(candle.open, candle.close) * scale;
          const wickTop = baseY - candle.high * scale;
          const wickBottom = baseY - candle.low * scale;
          
          return (
            <g key={candle.id} filter="url(#glow)">
              {/* Wick */}
              <line
                x1={candle.x + 12}
                y1={wickTop}
                x2={candle.x + 12}
                y2={wickBottom}
                stroke="#10b981"
                strokeWidth="4"
                opacity="1"
              />
              
              {/* Body - Larger */}
              <rect
                x={candle.x + 4}
                y={bodyY}
                width="16"
                height={Math.max(bodyHeight, 4)}
                fill="url(#candleGradient)"
                stroke="#10b981"
                strokeWidth="1.5"
                opacity="1"
              />
            </g>
          );
        })}
        
        {/* Second layer for depth - Green */}
        {candles.slice(0, 40).map(candle => {
          const scale = 3;
          const baseY = 740;
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
                width="12"
                height={Math.max(bodyHeight, 3)}
                fill="#10b981"
                opacity="0.7"
              />
            </g>
          );
        })}
        
        {/* Third layer - Green */}
        {candles.slice(0, 25).map(candle => {
          const scale = 2;
          const baseY = 300;
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
                width="6"
                height={Math.max(bodyHeight, 2)}
                fill="#10b981"
                opacity="0.5"
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