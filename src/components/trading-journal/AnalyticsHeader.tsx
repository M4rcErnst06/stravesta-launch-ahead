
import React from 'react';
import { Badge } from '@/components/ui/badge';

const AnalyticsHeader = () => {
  return (
    <div className="text-center mb-16" data-animate>
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
        Track. Learn. Improve.
      </h2>
      <p className="text-xl text-stravesta-lightGray max-w-3xl mx-auto">
        Your trades, your habits now analyzed by AI.
      </p>
    </div>
  );
};

export default AnalyticsHeader;
