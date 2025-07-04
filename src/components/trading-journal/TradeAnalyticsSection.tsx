
import React from 'react';
import AnalyticsHeader from './AnalyticsHeader';
import AnalyticsProblemComparison from './AnalyticsProblemComparison';  
import AnalyticsFeatures from './AnalyticsFeatures';
import JournalAnalyticsAnimation from './JournalAnalyticsAnimation';

const TradeAnalyticsSection = () => {
  return (
    <section className="py-20 bg-stravesta-navy relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-96 h-96 bg-stravesta-teal/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-stravesta-teal/5 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <AnalyticsHeader />
        
        {/* Analytics Animation */}
        <div className="mb-20" data-animate>
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">
              KI-Analyse in Aktion
            </h3>
            <p className="text-stravesta-lightGray">
              Sehen Sie, wie unsere KI Ihre Trading-Muster analysiert und wertvolle Insights generiert
            </p>
          </div>
          <JournalAnalyticsAnimation />
        </div>

        <AnalyticsProblemComparison />
        <AnalyticsFeatures />
      </div>
    </section>
  );
};

export default TradeAnalyticsSection;
