
import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  // Map size to actual width/height
  const sizeMap = {
    sm: 'w-24',
    md: 'w-32',
    lg: 'w-40'
  };

  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src="/stravesta-logo.png" 
        alt="Stravesta" 
        className={`${sizeMap[size]} h-auto`} 
      />
    </div>
  );
};

export default Logo;
