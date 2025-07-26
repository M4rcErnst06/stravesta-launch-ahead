
import React from 'react';
import { Download } from 'lucide-react';
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
            <div className="flex justify-center items-center gap-3 mb-4">
              <div className="bg-blue-500/20 p-3 rounded-full">
                <Download className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">
                Automatic MetaTrader Integration
              </h3>
            </div>
            <p className="text-stravesta-lightGray max-w-2xl mx-auto">
              Watch how our seamless MetaTrader integration automatically imports all your trading data in real-time. 
              Every trade is instantly synchronized with your Stravesta Journal and analyzed by our advanced AI algorithms 
              to provide immediate insights into your trading performance and strategy effectiveness.
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
              Experience firsthand how our sophisticated AI engine processes your trading history to identify patterns, 
              weaknesses, and opportunities. Watch as complex data transforms into clear, actionable insights that 
              will revolutionize your trading approach and dramatically improve your success rate.
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
