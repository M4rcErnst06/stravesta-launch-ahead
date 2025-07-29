
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AnalyticsProblemComparison = () => {
  return (
    <div className="mb-16" data-animate>
      <div className="text-center mb-12">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
          The Problem: Surface Level Self Analysis
        </h3>
        <p className="text-lg text-stravesta-lightGray max-w-2xl mx-auto">
          Most traders repeat mistakes because they don't see the patterns in their own behavior.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Card className="bg-red-500/10 border-red-500/30 border-2">
          <CardHeader>
            <CardTitle className="text-white">
              Without AI Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="text-stravesta-lightGray text-sm flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0"></div>
                Vague notes without insights
              </li>
              <li className="text-stravesta-lightGray text-sm flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0"></div>
                Repeating the same mistakes
              </li>
              <li className="text-stravesta-lightGray text-sm flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0"></div>
                No strategic optimization
              </li>
              <li className="text-stravesta-lightGray text-sm flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0"></div>
                Emotional decisions
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-green-500/10 border-green-500/30 border-2">
          <CardHeader>
            <CardTitle className="text-white">
              With Stravesta AI
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
