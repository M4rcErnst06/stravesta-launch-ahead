
import React from 'react';

interface StravellaLogoProps {
  className?: string;
}

const StravellaLogo: React.FC<StravellaLogoProps> = ({ className = "w-8 h-8" }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      className={className}
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer circle with gradient */}
      <circle 
        cx="50" 
        cy="50" 
        r="45" 
        fill="url(#gradient1)" 
        stroke="#00F5D4" 
        strokeWidth="2"
      />
      
      {/* Inner geometric pattern - S shape inspired */}
      <path 
        d="M30 35 Q40 25 50 35 Q60 45 70 35 Q60 55 50 45 Q40 55 30 65 Q40 75 50 65 Q60 55 70 65" 
        stroke="#00F5D4" 
        strokeWidth="3" 
        fill="none" 
        strokeLinecap="round"
      />
      
      {/* Center dot */}
      <circle 
        cx="50" 
        cy="50" 
        r="3" 
        fill="#00F5D4"
      />
      
      {/* Gradient definitions */}
      <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(0, 245, 212, 0.1)" />
          <stop offset="100%" stopColor="rgba(0, 212, 245, 0.1)" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default StravellaLogo;
