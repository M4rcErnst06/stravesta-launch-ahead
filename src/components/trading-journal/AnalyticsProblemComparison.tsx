
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AnalyticsProblemComparison = () => {
  return (
    <div className="mb-16" data-animate>
      <div className="text-center mb-12">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
          The Real Problem: You Don't Know What You Don't See.
        </h3>
        <p className="text-lg text-stravesta-lightGray max-w-2xl mx-auto">
          Most traders repeat mistakes not because they're undisciplined, but because they never see the patterns behind them.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Card className="bg-red-500/10 border-red-500/30 border-2">
          <CardHeader>
            <CardTitle className="text-white">
              Without Stravesta
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="text-stravesta-lightGray text-sm flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0"></div>
                Emotional trades
              </li>
              <li className="text-stravesta-lightGray text-sm flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0"></div>
                No strategy improvement
              </li>
              <li className="text-stravesta-lightGray text-sm flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0"></div>
                Vague notes, forgotten trades
              </li>
              <li className="text-stravesta-lightGray text-sm flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0"></div>
                Same mistakes again & again
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-green-500/10 border-green-500/30 border-2">
          <CardHeader>
            <CardTitle className="text-white">
              With Stravesta
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="text-stravesta-lightGray text-sm flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0"></div>
                Deep pattern recognition
              </li>
              <li className="text-stravesta-lightGray text-sm flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0"></div>
                Concrete action recommendations
              </li>
              <li className="text-stravesta-lightGray text-sm flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0"></div>
                Continuous optimization
              </li>
              <li className="text-stravesta-lightGray text-sm flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0"></div>
                Emotional control
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsProblemComparison;
