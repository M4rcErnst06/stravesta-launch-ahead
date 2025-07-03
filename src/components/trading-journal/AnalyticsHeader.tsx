
import React from 'react';
import { Brain } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const AnalyticsHeader = () => {
  return (
    <div className="text-center mb-16" data-animate>
      <div className="flex justify-center mb-6">
        <div className="bg-gradient-to-r from-stravesta-teal/20 to-blue-500/20 p-4 rounded-full">
          <Brain className="h-12 w-12 text-stravesta-teal" />
        </div>
      </div>
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
        KI Trading Journal Analytics
      </h2>
      <p className="text-xl text-stravesta-lightGray max-w-3xl mx-auto mb-4">
        Lassen Sie KI Ihre Trading-Performance analysieren und optimieren
      </p>
      <div className="flex justify-center gap-2">
        <Badge className="bg-stravesta-teal/20 text-stravesta-teal border-stravesta-teal/30">
          KI-Powered
        </Badge>
        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
          Predictive Analytics
        </Badge>
      </div>
    </div>
  );
};

export default AnalyticsHeader;
