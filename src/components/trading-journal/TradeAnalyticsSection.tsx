import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import JournalAnalyticsAnimation from './JournalAnalyticsAnimation';
import MetaTraderSyncAnimation from './MetaTraderSyncAnimation';
import AnalyticsHeader from './AnalyticsHeader';
import AnalyticsProblemComparison from './AnalyticsProblemComparison';

const TradeAnalyticsSection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Removed background effects from here as they are now handled by the parent section */}
      <div className="w-full max-w-6xl mx-auto px-4 relative z-10">
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
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 w-full" data-animate>
            <Card className="bg-stravesta-navy/50 border-stravesta-teal/20 hover:border-stravesta-teal/60 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-stravesta-teal/20 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-stravesta-teal/20 to-stravesta-teal/20 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
              <CardHeader className="relative z-10 text-center">
                <CardTitle className="text-xl text-white mb-2">AI Pattern Recognition</CardTitle>
                <CardDescription className="text-stravesta-lightGray">Automatic analysis of your trading habits and success patterns</CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-stravesta-navy/50 border-stravesta-teal/20 hover:border-stravesta-teal/60 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-stravesta-teal/20 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-stravesta-teal/20 to-stravesta-teal/20 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
              <CardHeader className="relative z-10 text-center">
                <CardTitle className="text-xl text-white mb-2">Emotion Tracking</CardTitle>
                <CardDescription className="text-stravesta-lightGray">Correlation between emotions and trading performance</CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-stravesta-navy/50 border-stravesta-teal/20 hover:border-stravesta-teal/60 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-stravesta-teal/20 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-stravesta-teal/20 to-stravesta-teal/20 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
              <CardHeader className="relative z-10 text-center">
                <CardTitle className="text-xl text-white mb-2">Performance Optimization</CardTitle>
                <CardDescription className="text-stravesta-lightGray">Concrete action recommendations to improve your results</CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-stravesta-navy/50 border-stravesta-teal/20 hover:border-stravesta-teal/60 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-stravesta-teal/20 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-stravesta-teal/20 to-stravesta-teal/20 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
              <CardHeader className="relative z-10 text-center">
                <CardTitle className="text-xl text-white mb-2">Predictive Analytics</CardTitle>
                <CardDescription className="text-stravesta-lightGray">AI-based predictions for future trading decisions</CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div style={{ minHeight: '600px' }}>
            <JournalAnalyticsAnimation />
          </div>
        </div>
      </div>

      {/* Adjusted alignment for consistency */}
 <div className="w-full max-w-full px-4">
  <div className="max-w-6xl mx-auto">
    <AnalyticsProblemComparison />
  </div>
</div>

    </section>
  );
};

export default TradeAnalyticsSection;
