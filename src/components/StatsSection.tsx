
import React from 'react';

const StatsSection = () => {
  const stats = [
    { number: "500+", label: "Beta Tester", description: "Early Adopters weltweit" },
    { number: "95%", label: "Setup-Genauigkeit", description: "KI-erkannte Trading-Muster" },
    { number: "24/7", label: "Live Monitoring", description: "Ununterbrochene Marktüberwachung" },
    { number: "∞", label: "Möglichkeiten", description: "Mit KI-unterstütztem Trading" }
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-stravesta-navy to-stravesta-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            Zahlen, die für sich sprechen
          </h2>
          <p className="text-xl text-stravesta-lightGray">
            Stravesta in der Beta-Phase - bereits beeindruckende Ergebnisse
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="bg-stravesta-dark/50 rounded-2xl p-8 border border-stravesta-teal/10 hover:border-stravesta-teal/30 transition-all duration-300 hover:scale-105">
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
