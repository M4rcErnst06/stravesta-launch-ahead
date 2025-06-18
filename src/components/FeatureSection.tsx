
import React from 'react';
import AnimatedFeatureCard from './AnimatedFeatureCard';

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
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient animate-fade-in">
            {title}
          </h2>
          <p className="text-xl text-stravesta-lightGray max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '200ms' }}>
            {subtitle}
          </p>
          <div className="mt-6 w-24 h-1 bg-gradient-to-r from-stravesta-teal to-transparent mx-auto animate-fade-in" style={{ animationDelay: '400ms' }}></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <AnimatedFeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              features={feature.features}
              badge={feature.badge}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
