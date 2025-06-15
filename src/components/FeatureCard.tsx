
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  badge: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon, 
  title, 
  description, 
  features, 
  badge 
}) => {
  return (
    <Card className="bg-stravesta-navy/50 border-stravesta-teal/20 hover:border-stravesta-teal/40 transition-all duration-300 group h-full">
      <CardHeader className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className="text-6xl transition-transform duration-300 group-hover:scale-110">
            {icon}
          </div>
          <Badge className="bg-stravesta-teal/10 text-stravesta-teal border-stravesta-teal/30 shrink-0">
            {badge}
          </Badge>
        </div>
        <CardTitle className="text-xl text-white group-hover:text-stravesta-teal transition-colors duration-300">
          {title}
        </CardTitle>
        <CardDescription className="text-stravesta-lightGray leading-relaxed">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start text-sm text-stravesta-lightGray">
              <div className="w-1.5 h-1.5 bg-stravesta-teal rounded-full mt-2 mr-3 shrink-0"></div>
              <span className="leading-relaxed">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
