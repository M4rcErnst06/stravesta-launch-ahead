
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  badge?: string;
}

interface FeatureSectionProps {
  title: string;
  subtitle: string;
  features: Feature[];
  className?: string;
}

const FeatureSection: React.FC<FeatureSectionProps> = ({ title, subtitle, features, className = '' }) => {
  return (
    <section className={`py-20 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient animate-gradient-shift bg-gradient-to-r bg-[length:200%_200%]">
            {title}
          </h2>
          <p className="text-xl text-stravesta-lightGray max-w-3xl mx-auto">
            {subtitle}
          </p>
          <div className="mt-6 w-24 h-1 bg-gradient-to-r from-stravesta-teal to-transparent mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="bg-stravesta-navy/50 border-stravesta-teal/20 hover:border-stravesta-teal/60 transition-all duration-500 group hover:scale-105 hover:shadow-2xl hover:shadow-stravesta-teal/20 animate-fade-in relative overflow-hidden"
              style={{ 
                animationDelay: `${index * 0.1}s`,
                backdropFilter: 'blur(10px)'
              }}
            >
              {/* Glowing border effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-stravesta-teal/0 via-stravesta-teal/20 to-stravesta-teal/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Animated background pattern */}
              <div className="absolute inset-0 bg-tech-pattern opacity-5 group-hover:opacity-10 transition-opacity duration-500"></div>
              
              <CardHeader className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-stravesta-teal group-hover:scale-110 transition-all duration-500 group-hover:rotate-6">
                    {feature.icon}
                  </div>
                  {feature.badge && (
                    <Badge className="bg-stravesta-teal/10 text-stravesta-teal border-stravesta-teal/30 group-hover:bg-stravesta-teal/20 transition-all duration-300 animate-pulse-slow">
                      {feature.badge}
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-xl text-white group-hover:text-stravesta-teal transition-colors duration-300">
                  {feature.title}
                </CardTitle>
                <CardDescription className="text-stravesta-lightGray group-hover:text-white transition-colors duration-300">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="relative z-10">
                <ul className="space-y-3">
                  {feature.features.map((item, idx) => (
                    <li 
                      key={idx} 
                      className="flex items-start gap-3 group/item animate-fade-in" 
                      style={{ animationDelay: `${(index * 0.1) + (idx * 0.05)}s` }}
                    >
                      <div className="w-2 h-2 bg-stravesta-teal rounded-full mt-2 flex-shrink-0 group-hover:scale-125 group-hover:shadow-lg group-hover:shadow-stravesta-teal/50 transition-all duration-300"></div>
                      <span className="text-sm text-stravesta-lightGray group-hover:text-white transition-colors duration-300 group/item:hover:text-stravesta-teal">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Hover effect overlay */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-stravesta-teal/0 via-stravesta-teal to-stravesta-teal/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Section bottom decoration */}
        <div className="mt-16 flex justify-center animate-fade-in" style={{ animationDelay: `${features.length * 0.1}s` }}>
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-stravesta-teal rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-stravesta-teal/60 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <div className="w-2 h-2 bg-stravesta-teal/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
