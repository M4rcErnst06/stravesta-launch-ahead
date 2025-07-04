
import React from 'react';
import TradingChartAnimation from './TradingChartAnimation';
import ScannerHeader from './ScannerHeader';
import ScannerProblemStatement from './ScannerProblemStatement';
import ScannerFeatures from './ScannerFeatures';
import ScannerStats from './ScannerStats';

const SetupScannerSection = () => {
  return (
    <section className="py-20 bg-stravesta-dark relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-stravesta-teal/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-stravesta-teal/5 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <ScannerHeader />

        {/* Chart Animation */}
        <div className="mb-20" data-animate>
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">
              Sehen Sie selbst: Ein verpasster Trade
            </h3>
            <p className="text-stravesta-lightGray">
              Diese Animation zeigt, wie schnell profitable Setups entstehen und wieder verschwinden
            </p>
          </div>
          <div style={{ minHeight: '600px' }}>
            <TradingChartAnimation />
          </div>
        </div>

        <ScannerProblemStatement />
        <ScannerFeatures />
        <ScannerStats />
      </div>
    </section>
  );
};

export default SetupScannerSection;
