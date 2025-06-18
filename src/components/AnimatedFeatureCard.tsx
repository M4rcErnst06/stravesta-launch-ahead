
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface AnimatedFeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  badge?: string;
  delay?: number;
}

const AnimatedFeatureCard: React.FC<AnimatedFeatureCardProps> = ({ 
  icon, 
  title, 
  description, 
  features, 
  badge,
  delay = 0
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div 
      ref={cardRef}
      className={`transition-all duration-700 ease-out ${
        isVisible 
          ? 'translate-y-0 opacity-100 scale-100' 
          : 'translate-y-20 opacity-0 scale-95'
      }`}
    >
      <Card 
        className={`bg-stravesta-navy/50 border-stravesta-teal/20 hover:border-stravesta-teal/60 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-stravesta-teal/20 relative overflow-hidden h-full group cursor-pointer ${
          isHovered ? 'bg-stravesta-navy/70' : ''
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ 
          backdropFilter: 'blur(10px)',
          transform: isHovered ? 'translateY(-5px)' : 'translateY(0)'
        }}
      >
        {/* Animated glowing border effect */}
        <div className={`absolute inset-0 bg-gradient-to-r from-stravesta-teal/0 via-stravesta-teal/30 to-stravesta-teal/0 transition-opacity duration-500 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}></div>
        
        {/* Background pattern with animation */}
        <div className={`absolute inset-0 bg-tech-pattern transition-opacity duration-500 ${
          isHovered ? 'opacity-20' : 'opacity-5'
        }`}></div>
        
        <CardHeader className="relative z-10 pb-4">
          <div className="flex items-center justify-between mb-4">
            <div className={`text-stravesta-teal transition-all duration-300 ${
              isHovered ? 'scale-110 rotate-12' : 'scale-100 rotate-0'
            }`}>
              {icon}
            </div>
            {badge && (
              <Badge className={`bg-stravesta-teal/10 text-stravesta-teal border-stravesta-teal/30 text-xs whitespace-nowrap transition-all duration-300 ${
                isHovered ? 'bg-stravesta-teal/20 scale-105' : ''
              }`}>
                {badge}
              </Badge>
            )}
          </div>
          <CardTitle className={`text-xl text-white leading-tight mb-2 transition-colors duration-300 ${
            isHovered ? 'text-stravesta-teal' : ''
          }`}>
            {title}
          </CardTitle>
          <CardDescription className="text-stravesta-lightGray text-sm leading-relaxed">
            {description}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="relative z-10 pt-0">
          <ul className="space-y-3">
            {features.map((item, idx) => (
              <li 
                key={idx} 
                className={`flex items-start gap-3 transition-all duration-300 delay-${idx * 50} ${
                  isVisible ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                }`}
              >
                <div className={`w-2 h-2 bg-stravesta-teal rounded-full mt-2 flex-shrink-0 transition-all duration-300 ${
                  isHovered ? 'scale-125 shadow-md shadow-stravesta-teal/50' : 'scale-100'
                }`}></div>
                <span className="text-sm text-stravesta-lightGray leading-relaxed break-words">
                  {item}
                </span>
              </li>
            ))}
          </ul>

          {/* Animated bottom border effect */}
          <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-stravesta-teal/0 via-stravesta-teal to-stravesta-teal/0 transition-all duration-500 ${
            isHovered ? 'opacity-100 scale-x-100' : 'opacity-50 scale-x-75'
          }`}></div>
        </CardContent>

        {/* Hover ripple effect */}
        <div className={`absolute inset-0 rounded-lg transition-all duration-700 ${
          isHovered 
            ? 'bg-gradient-to-br from-stravesta-teal/5 via-transparent to-stravesta-teal/5' 
            : 'bg-transparent'
        }`}></div>
      </Card>
    </div>
  );
};

export default AnimatedFeatureCard;
