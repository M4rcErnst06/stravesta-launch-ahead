
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
                Automatische MetaTrader Integration
              </h3>
            </div>
            <p className="text-stravesta-lightGray max-w-2xl mx-auto">
              Sehen Sie live, wie Ihre MetaTrader Trades automatisch ins Stravesta Journal 
              synchronisiert und von unserer KI analysiert werden
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
              KI-Analyse in Aktion
            </h3>
            <p className="text-stravesta-lightGray">
              Live-Demo: Wie unsere KI Ihr Trading Journal analysiert und strategische Insights liefert
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
