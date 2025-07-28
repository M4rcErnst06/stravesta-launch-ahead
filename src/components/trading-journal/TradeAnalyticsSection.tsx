
import React from 'react';

import JournalAnalyticsAnimation from './JournalAnalyticsAnimation';
import MetaTraderSyncAnimation from './MetaTraderSyncAnimation';
import AnalyticsHeader from './AnalyticsHeader';
import AnalyticsProblemComparison from './AnalyticsProblemComparison';
import AnalyticsFeatures from './AnalyticsFeatures';

const TradeAnalyticsSection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Removed background effects from here as they are now handled by the parent section */}
      <div className="container mx-auto px-4 relative z-10">
        <AnalyticsHeader />

        {/* MetaTrader Integration Demo */}
        <div className="mb-20" data-animate>
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white">
              Automatic MetaTrader Integration
            </h3>
            <p className="text-stravesta-lightGray max-w-2xl mx-auto">
              Instantly sync your trades from MetaTrader – and let AI turn them into insight.
            </p>
          </div>
          <div style={{ minHeight: '600px' }}>
            <MetaTraderSyncAnimation />
          </div>
        </div>

        {/* Live Analytics Demo */}
        <div className="mb-20" data-animate>
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">
              AI Analysis in Action
            </h3>
            <p className="text-stravesta-lightGray max-w-3xl mx-auto">
              See how our AI turns your trade history into patterns, warnings, and strategic feedback – automatically.
            </p>
          </div>
          <div style={{ minHeight: '500px' }}>
            <JournalAnalyticsAnimation />
          </div>
        </div>

        <AnalyticsProblemComparison />
        <AnalyticsFeatures />
      </div>
    </section>
  );
};

export default TradeAnalyticsSection;
