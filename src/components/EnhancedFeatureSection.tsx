
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  badge?: string;
  gradient: string;
}

interface EnhancedFeatureSectionProps {
  title: string;
  subtitle: string;
  features: Feature[];
  className?: string;
}

const EnhancedFeatureSection: React.FC<EnhancedFeatureSectionProps> = ({ 
  title, 
  subtitle, 
  features, 
  className = '' 
}) => {
  return (
    <section id="features" className={`py-32 relative overflow-hidden ${className}`}>
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-gradient-to-r from-stravesta-teal/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gradient-to-l from-blue-500/10 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-24 animate-fade-in">
          <div className="inline-block mb-6">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gradient bg-gradient-to-r from-stravesta-teal via-cyan-400 to-blue-500 bg-[length:200%_200%] animate-gradient-shift">
              {title}
            </h2>
            <div className="h-1 bg-gradient-to-r from-transparent via-stravesta-teal to-transparent mx-auto animate-pulse"></div>
          </div>
          <p className="text-2xl text-stravesta-lightGray max-w-4xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>
        
        {/* Enhanced Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group relative overflow-hidden bg-gradient-to-br from-stravesta-navy/60 to-stravesta-dark/60 backdrop-blur-sm border-stravesta-teal/20 hover:border-stravesta-teal/60 transition-all duration-700 hover:scale-105 hover:shadow-2xl hover:shadow-stravesta-teal/20 animate-fade-in"
              style={{ 
                animationDelay: `${index * 0.15}s`,
              }}
            >
              {/* Animated Border Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-stravesta-teal/0 via-stravesta-teal/30 to-stravesta-teal/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
              
              {/* Hover Glow Effect */}
              <div className={`absolute inset-0 ${feature.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl`}></div>
              
              {/* Moving Background Pattern */}
              <div className="absolute inset-0 bg-tech-pattern opacity-5 group-hover:opacity-10 transition-opacity duration-500 animate-gradient-shift"></div>
              
              <CardHeader className="relative z-10 pb-4">
                <div className="flex items-start justify-between mb-6">
                  <div className="text-4xl group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 filter drop-shadow-lg">
                    {feature.icon}
                  </div>
                  {feature.badge && (
                    <Badge className="bg-stravesta-teal/20 text-stravesta-teal border-stravesta-teal/40 group-hover:bg-stravesta-teal/30 group-hover:scale-110 transition-all duration-300 animate-pulse backdrop-blur-sm">
                      {feature.badge}
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-2xl text-white group-hover:text-stravesta-teal transition-colors duration-300 mb-3">
                  {feature.title}
                </CardTitle>
                <CardDescription className="text-stravesta-lightGray group-hover:text-white transition-colors duration-300 text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="relative z-10 pt-0">
                <ul className="space-y-4">
                  {feature.features.map((item, idx) => (
                    <li 
                      key={idx} 
                      className="flex items-start gap-3 group/item animate-fade-in hover:scale-105 transition-transform duration-300" 
                      style={{ animationDelay: `${(index * 0.15) + (idx * 0.05)}s` }}
                    >
                      <div className="w-3 h-3 bg-gradient-to-r from-stravesta-teal to-cyan-400 rounded-full mt-1.5 flex-shrink-0 group-hover:scale-150 group-hover:shadow-lg group-hover:shadow-stravesta-teal/50 transition-all duration-300 animate-pulse"></div>
                      <span className="text-stravesta-lightGray group-hover:text-white transition-colors duration-300 group/item:hover:text-stravesta-teal leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Enhanced Bottom Bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1">
                  <div className="h-full bg-gradient-to-r from-stravesta-teal/0 via-stravesta-teal to-stravesta-teal/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center"></div>
                </div>
              </CardContent>

              {/* Floating Particles on Hover */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-stravesta-teal/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-float"
                    style={{
                      left: `${20 + Math.random() * 60}%`,
                      top: `${20 + Math.random() * 60}%`,
                      animationDelay: `${Math.random() * 2}s`,
                      animationDuration: `${2 + Math.random() * 2}s`
                    }}
                  />
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Enhanced Bottom Decoration */}
        <div className="mt-24 flex justify-center animate-fade-in" style={{ animationDelay: `${features.length * 0.15}s` }}>
          <div className="flex space-x-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div 
                key={i}
                className="w-3 h-3 bg-gradient-to-r from-stravesta-teal to-cyan-400 rounded-full animate-pulse"
                style={{ 
                  animationDelay: `${i * 0.2}s`,
                  opacity: 1 - (i * 0.2)
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedFeatureSection;
