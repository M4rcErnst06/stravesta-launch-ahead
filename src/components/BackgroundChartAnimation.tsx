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
    const open = prevClose + (Math.random() - 0.3) * 1.5;
    const change = Math.random() * 3 + 0.5; // Always bullish
    const close = open + change;
    const high = close + Math.random() * 1.5;
    const low = open - Math.random() * 0.5;
    
    return {
      id,
      open,
      high,
      low,
      close,
      x: id * 15
    };
  };

  useEffect(() => {
    const initialCandles: Candle[] = [];
    let price = 150;
    
    for (let i = 0; i < 120; i++) {
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
          candle.x -= 0.8;
        });
        
        const visibleCandles = newCandles.filter(candle => candle.x > -60);
        
        if (visibleCandles.length < 120) {
          const lastCandle = visibleCandles[visibleCandles.length - 1];
          const newCandle = generateCandle(
            lastCandle ? lastCandle.id + 1 : 0,
            lastCandle ? lastCandle.close : 150
          );
          newCandle.x = 2100;
          visibleCandles.push(newCandle);
        }
        
        return visibleCandles;
      });
    }, 60);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none w-full h-full">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.25 }}
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Grid */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#10b981" strokeWidth="0.3" opacity="0.4"/>
          </pattern>
          <linearGradient id="candleGlow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#065f46" stopOpacity="0.3"/>
          </linearGradient>
        </defs>
        
        <rect width="100%" height="100%" fill="url(#grid)" />
        
        {/* Price levels */}
        {[150, 250, 350, 450, 550, 650, 750, 850].map(y => (
          <line key={y} x1="0" y1={y} x2="1920" y2={y} stroke="#10b981" strokeWidth="0.8" opacity="0.15" strokeDasharray="8,12"/>
        ))}
        
        {/* Main candles layer */}
        {candles.map(candle => {
          const scale = 2.2;
          const baseY = 540;
          const bodyHeight = Math.abs(candle.close - candle.open) * scale;
          const bodyY = baseY - Math.max(candle.open, candle.close) * scale;
          const wickTop = baseY - candle.high * scale;
          const wickBottom = baseY - candle.low * scale;
          
          return (
            <g key={candle.id} opacity="0.9">
              {/* Wick */}
              <line
                x1={candle.x + 7}
                y1={wickTop}
                x2={candle.x + 7}
                y2={wickBottom}
                stroke="#10b981"
                strokeWidth="1.5"
              />
              
              {/* Body with glow */}
              <rect
                x={candle.x + 3}
                y={bodyY}
                width="8"
                height={Math.max(bodyHeight, 1.5)}
                fill="url(#candleGlow)"
                stroke="#10b981"
                strokeWidth="0.5"
              />
            </g>
          );
        })}
        
        {/* Background layer with offset */}
        {candles.slice(0, 60).map(candle => {
          const scale = 1.8;
          const baseY = 720;
          const bodyHeight = Math.abs(candle.close - candle.open) * scale;
          const bodyY = baseY - Math.max(candle.open, candle.close) * scale;
          const wickTop = baseY - candle.high * scale;
          const wickBottom = baseY - candle.low * scale;
          
          return (
            <g key={`bg-${candle.id}`} opacity="0.4">
              <line
                x1={candle.x + 150}
                y1={wickTop}
                x2={candle.x + 150}
                y2={wickBottom}
                stroke="#10b981"
                strokeWidth="1"
              />
              <rect
                x={candle.x + 147}
                y={bodyY}
                width="6"
                height={Math.max(bodyHeight, 1)}
                fill="#10b981"
                opacity="0.6"
              />
            </g>
          );
        })}
        
        {/* Third layer for depth */}
        {candles.slice(0, 40).map(candle => {
          const scale = 1.4;
          const baseY = 300;
          const bodyHeight = Math.abs(candle.close - candle.open) * scale;
          const bodyY = baseY - Math.max(candle.open, candle.close) * scale;
          const wickTop = baseY - candle.high * scale;
          const wickBottom = baseY - candle.low * scale;
          
          return (
            <g key={`depth-${candle.id}`} opacity="0.25">
              <line
                x1={candle.x + 300}
                y1={wickTop}
                x2={candle.x + 300}
                y2={wickBottom}
                stroke="#10b981"
                strokeWidth="0.8"
              />
              <rect
                x={candle.x + 298}
                y={bodyY}
                width="4"
                height={Math.max(bodyHeight, 1)}
                fill="#10b981"
                opacity="0.5"
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default BackgroundChartAnimation;