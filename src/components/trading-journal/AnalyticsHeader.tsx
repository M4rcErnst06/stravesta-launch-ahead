
import React from 'react';
import { Badge } from '@/components/ui/badge';

const AnalyticsHeader = () => {
  return (
    <div className="text-center mb-16" data-animate>
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
        AI Trading Journal Analytics
      </h2>
      <p className="text-xl text-stravesta-lightGray max-w-3xl mx-auto">
        Let AI analyze and optimize your trading performance
      </p>
    </div>
  );
};

export default AnalyticsHeader;
