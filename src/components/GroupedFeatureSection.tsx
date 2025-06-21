
import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  badge?: string;
}

interface FeatureGroup {
  groupTitle: string;
  groupDescription: string;
  features: Feature[];
  color: string;
}

interface GroupedFeatureSectionProps {
  title: string;
  subtitle: string;
  featureGroups: FeatureGroup[];
  className?: string;
}

const GroupedFeatureSection: React.FC<GroupedFeatureSectionProps> = ({ 
  title, 
  subtitle, 
  featureGroups, 
  className = '' 
}) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
          entry.target.classList.remove('opacity-0', 'translate-y-8');
        }
      });
    }, observerOptions);

    if (sectionRef.current) {
      const animatedElements = sectionRef.current.querySelectorAll('[data-animate]');
      animatedElements.forEach((el) => observer.observe(el));
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={`py-20 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16" data-animate>
          <div className="opacity-0 translate-y-8 transition-all duration-1000">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
              {title}
            </h2>
            <p className="text-xl text-stravesta-lightGray max-w-3xl mx-auto">
              {subtitle}
            </p>
            <div className="mt-6 w-24 h-1 bg-gradient-to-r from-stravesta-teal to-transparent mx-auto"></div>
          </div>
        </div>
        
        <div className="space-y-20">
          {featureGroups.map((group, groupIndex) => (
            <div 
              key={groupIndex} 
              className="opacity-0 translate-y-8 transition-all duration-1000"
              data-animate
              style={{ transitionDelay: `${groupIndex * 200}ms` }}
            >
              <div className="text-center mb-12">
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                  {group.groupTitle}
                </h3>
                <p className="text-lg text-stravesta-lightGray max-w-2xl mx-auto">
                  {group.groupDescription}
                </p>
                <div 
                  className="mt-4 w-16 h-1 mx-auto rounded-full"
                  style={{ backgroundColor: group.color }}
                ></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {group.features.map((feature, featureIndex) => (
                  <Card 
                    key={featureIndex}
                    className="bg-stravesta-navy/50 border-stravesta-teal/20 hover:border-stravesta-teal/60 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-stravesta-teal/20 relative overflow-hidden h-full opacity-0 translate-y-4"
                    data-animate
                    style={{ 
                      backdropFilter: 'blur(10px)',
                      transitionDelay: `${(groupIndex * 200) + (featureIndex * 100)}ms`
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
                      <CardTitle className="text-lg text-white leading-tight mb-2">
                        {feature.title}
                      </CardTitle>
                      <CardDescription className="text-stravesta-lightGray text-sm leading-relaxed">
                        {feature.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="relative z-10 pt-0">
                      <ul className="space-y-2">
                        {feature.features.map((item, idx) => (
                          <li 
                            key={idx} 
                            className="flex items-start gap-2"
                          >
                            <div 
                              className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                              style={{ backgroundColor: group.color }}
                            ></div>
                            <span className="text-xs text-stravesta-lightGray leading-relaxed break-words">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>

                      {/* Bottom border effect */}
                      <div 
                        className="absolute bottom-0 left-0 right-0 h-1 opacity-70"
                        style={{ 
                          background: `linear-gradient(to right, transparent, ${group.color}, transparent)` 
                        }}
                      ></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GroupedFeatureSection;
