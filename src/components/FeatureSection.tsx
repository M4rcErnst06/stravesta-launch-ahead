
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
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
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
              className="bg-stravesta-navy/50 border-stravesta-teal/20 hover:border-stravesta-teal/60 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-stravesta-teal/20 relative overflow-hidden h-full"
              style={{ 
                backdropFilter: 'blur(10px)'
              }}
            >
              {/* Glowing border effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-stravesta-teal/0 via-stravesta-teal/20 to-stravesta-teal/0 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Background pattern */}
              <div className="absolute inset-0 bg-tech-pattern opacity-5 hover:opacity-10 transition-opacity duration-500"></div>
              
              <CardHeader className="relative z-10 pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-stravesta-teal">
                    {feature.icon}
                  </div>
                  {feature.badge && (
                    <Badge className="bg-stravesta-teal/10 text-stravesta-teal border-stravesta-teal/30 text-xs whitespace-nowrap">
                      {feature.badge}
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-xl text-white leading-tight mb-2">
                  {feature.title}
                </CardTitle>
                <CardDescription className="text-stravesta-lightGray text-sm leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="relative z-10 pt-0">
                <ul className="space-y-3">
                  {feature.features.map((item, idx) => (
                    <li 
                      key={idx} 
                      className="flex items-start gap-3"
                    >
                      <div className="w-2 h-2 bg-stravesta-teal rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm text-stravesta-lightGray leading-relaxed break-words">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Bottom border effect */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-stravesta-teal/0 via-stravesta-teal to-stravesta-teal/0"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
