
import React from 'react';

const StatsSection = () => {
  const stats = [
    { number: "500+", label: "Beta Testers", description: "Early adopters worldwide" },
    { number: "95%", label: "Setup Accuracy", description: "AI-recognized trading patterns" },
    { number: "24/7", label: "Live Monitoring", description: "Continuous market surveillance" },
    { number: "∞", label: "Possibilities", description: "With AI-powered trading" }
  ];

  return (
    <section className="py-20 bg-stravesta-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            Numbers That Speak for Themselves
          </h2>
          <p className="text-xl text-stravesta-lightGray">
            Stravesta in beta phase - already impressive results
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="bg-stravesta-navy/50 rounded-2xl p-8 border border-stravesta-teal/20 hover:border-stravesta-teal/40 transition-all duration-300 hover:scale-105">
                <div className="text-4xl md:text-5xl font-bold text-gradient mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold text-white mb-2">
                  {stat.label}
                </div>
                <div className="text-sm text-stravesta-lightGray">
                  {stat.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
