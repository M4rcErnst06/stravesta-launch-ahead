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
            <stop offset="0%" stopColor="#00d4ff" stopOpacity="1"/>
            <stop offset="50%" stopColor="#00b4d8" stopOpacity="0.9"/>
            <stop offset="100%" stopColor="#0077b6" stopOpacity="0.7"/>
          </linearGradient>
          
          <filter id="glow">
            <feMorphology operator="dilate" radius="1"/>
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Grid background */}
        <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
          <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#00d4ff" strokeWidth="0.5" opacity="0.2"/>
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid)" />
        
        {/* Price levels */}
        {[200, 300, 400, 500, 600, 700, 800].map(y => (
          <line 
            key={y} 
            x1="0" 
            y1={y} 
            x2="1920" 
            y2={y} 
            stroke="#00d4ff" 
            strokeWidth="1" 
            opacity="0.3" 
            strokeDasharray="10,10"
          />
        ))}
        
        {/* Main candlestick chart */}
        {candles.map(candle => {
          const scale = 2.5;
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
                stroke="#00d4ff"
                strokeWidth="3"
                opacity="0.9"
              />
              
              {/* Body */}
              <rect
                x={candle.x + 6}
                y={bodyY}
                width="12"
                height={Math.max(bodyHeight, 3)}
                fill="url(#candleGradient)"
                stroke="#00d4ff"
                strokeWidth="1"
                opacity="0.9"
              />
            </g>
          );
        })}
        
        {/* Second layer for depth */}
        {candles.slice(0, 40).map(candle => {
          const scale = 2;
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
                stroke="#00b4d8"
                strokeWidth="2"
                opacity="0.6"
              />
              <rect
                x={candle.x + 196}
                y={bodyY}
                width="8"
                height={Math.max(bodyHeight, 2)}
                fill="#00b4d8"
                opacity="0.6"
              />
            </g>
          );
        })}
        
        {/* Third layer */}
        {candles.slice(0, 25).map(candle => {
          const scale = 1.5;
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
                stroke="#0077b6"
                strokeWidth="1.5"
                opacity="0.4"
              />
              <rect
                x={candle.x + 398}
                y={bodyY}
                width="4"
                height={Math.max(bodyHeight, 1)}
                fill="#0077b6"
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