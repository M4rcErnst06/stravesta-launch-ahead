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
    const open = prevClose + (Math.random() - 0.4) * 2;
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
      x: id * 20
    };
  };

  useEffect(() => {
    const initialCandles: Candle[] = [];
    let price = 100;
    
    for (let i = 0; i < 100; i++) {
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
          candle.x -= 1;
        });
        
        const visibleCandles = newCandles.filter(candle => candle.x > -50);
        
        if (visibleCandles.length < 100) {
          const lastCandle = visibleCandles[visibleCandles.length - 1];
          const newCandle = generateCandle(
            lastCandle ? lastCandle.id + 1 : 0,
            lastCandle ? lastCandle.close : 100
          );
          newCandle.x = 2000;
          visibleCandles.push(newCandle);
        }
        
        return visibleCandles;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0" style={{ zIndex: 1 }}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1920 1080"
        className="absolute inset-0"
        style={{ opacity: 0.3 }}
      >
        {/* Grid */}
        <defs>
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#14b8a6" strokeWidth="0.5" opacity="0.3"/>
          </pattern>
        </defs>
        
        <rect width="100%" height="100%" fill="url(#grid)" />
        
        {/* Price levels */}
        {[200, 300, 400, 500, 600, 700, 800].map(y => (
          <line key={y} x1="0" y1={y} x2="1920" y2={y} stroke="#14b8a6" strokeWidth="1" opacity="0.2" strokeDasharray="5,10"/>
        ))}
        
        {/* Candles */}
        {candles.map(candle => {
          const scale = 3;
          const baseY = 600;
          const bodyHeight = Math.abs(candle.close - candle.open) * scale;
          const bodyY = baseY - Math.max(candle.open, candle.close) * scale;
          const wickTop = baseY - candle.high * scale;
          const wickBottom = baseY - candle.low * scale;
          
          return (
            <g key={candle.id}>
              {/* Wick */}
              <line
                x1={candle.x + 8}
                y1={wickTop}
                x2={candle.x + 8}
                y2={wickBottom}
                stroke="#14b8a6"
                strokeWidth="2"
              />
              
              {/* Body */}
              <rect
                x={candle.x + 4}
                y={bodyY}
                width="8"
                height={Math.max(bodyHeight, 2)}
                fill="#14b8a6"
              />
            </g>
          );
        })}
        
        {/* Second layer offset */}
        {candles.slice(0, 50).map(candle => {
          const scale = 2.5;
          const baseY = 800;
          const bodyHeight = Math.abs(candle.close - candle.open) * scale;
          const bodyY = baseY - Math.max(candle.open, candle.close) * scale;
          const wickTop = baseY - candle.high * scale;
          const wickBottom = baseY - candle.low * scale;
          
          return (
            <g key={`layer2-${candle.id}`} opacity="0.6">
              <line
                x1={candle.x + 100}
                y1={wickTop}
                x2={candle.x + 100}
                y2={wickBottom}
                stroke="#14b8a6"
                strokeWidth="2"
              />
              <rect
                x={candle.x + 96}
                y={bodyY}
                width="8"
                height={Math.max(bodyHeight, 2)}
                fill="#14b8a6"
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default BackgroundChartAnimation;