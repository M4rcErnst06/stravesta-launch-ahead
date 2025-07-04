
import React from 'react';
import TradingChartAnimation from './TradingChartAnimation';
import ScannerHeader from './ScannerHeader';
import ScannerProblemStatement from './ScannerProblemStatement';
import ScannerFeatures from './ScannerFeatures';

const SetupScannerSection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Removed background effects from here as they are now handled by the parent section */}
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
      </div>
    </section>
  );
};

export default SetupScannerSection;
