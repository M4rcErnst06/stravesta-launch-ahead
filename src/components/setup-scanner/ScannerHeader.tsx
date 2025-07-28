
import React from 'react';
import { Badge } from '@/components/ui/badge';

const ScannerHeader = () => {
  return (
    <div className="text-center mb-16" data-animate>
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
        AI Setup Scanner
      </h2>
      <p className="text-xl text-stravesta-lightGray max-w-3xl mx-auto mb-4">
        Never miss profitable trading setups again
      </p>
      <Badge className="bg-stravesta-teal/20 text-stravesta-teal border-stravesta-teal/30">
        AI-Powered • Real-time Analysis
      </Badge>
    </div>
  );
};

export default ScannerHeader;
