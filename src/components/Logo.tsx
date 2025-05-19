
import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  // Map size to actual width/height
  const sizeMap = {
    sm: 'w-8',
    md: 'w-12',
    lg: 'w-16'
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`${sizeMap[size]} aspect-square`}>
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path
            d="M148.37 52.76C164.78 69.17 164.78 95.95 148.37 112.37L112.37 148.37C95.95 164.78 69.17 164.78 52.76 148.37C36.35 131.95 36.35 105.17 52.76 88.76L70.17 71.35"
            stroke="#17E6C8"
            strokeWidth="14"
            strokeLinecap="round"
          />
          <path
            d="M52.76 148.37C36.35 131.95 36.35 105.17 52.76 88.76L88.76 52.76C105.17 36.35 131.95 36.35 148.37 52.76C164.78 69.17 164.78 95.95 148.37 112.37L130.95 129.78"
            stroke="#17E6C8"
            strokeWidth="14"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div className="font-bold tracking-wider text-stravesta-teal">
        {size === 'sm' && <span className="text-lg">STRAVESTA</span>}
        {size === 'md' && <span className="text-xl">STRAVESTA</span>}
        {size === 'lg' && <span className="text-3xl">STRAVESTA</span>}
      </div>
    </div>
  );
};

export default Logo;
