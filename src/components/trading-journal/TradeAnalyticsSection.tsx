
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
          
          {/* Feature boxes */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8" data-animate>
            <div className="bg-card border border-border rounded-lg p-6">
              <h4 className="text-white font-semibold mb-2">AI Pattern Recognition</h4>
              <p className="text-stravesta-lightGray text-sm">Automatic analysis of your trading habits and success patterns</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <h4 className="text-white font-semibold mb-2">Emotion Tracking</h4>
              <p className="text-stravesta-lightGray text-sm">Correlation between emotions and trading performance</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <h4 className="text-white font-semibold mb-2">Performance Optimization</h4>
              <p className="text-stravesta-lightGray text-sm">Concrete action recommendations to improve your results</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <h4 className="text-white font-semibold mb-2">Predictive Analytics</h4>
              <p className="text-stravesta-lightGray text-sm">AI-based predictions for future trading decisions</p>
            </div>
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
