
import React from 'react';

const AnalyticsStats = () => {
  return (
    <div className="text-center" data-animate>
      <div className="bg-stravesta-navy/80 backdrop-blur-sm rounded-2xl p-8 border border-stravesta-teal/20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-stravesta-teal mb-2">89%</div>
            <div className="text-stravesta-lightGray">Pattern-Erkennungsgenauigkeit</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-stravesta-teal mb-2">35%</div>
            <div className="text-stravesta-lightGray">Durchschnittliche Performance-Steigerung</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-stravesta-teal mb-2">24/7</div>
            <div className="text-stravesta-lightGray">Kontinuierliche Analyse</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsStats;
