
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AnalyticsProblemComparison = () => {
  return (
    <div className="mb-16" data-animate>
      <div className="w-full bg-gradient-to-br from-stravesta-navy/80 to-stravesta-dark/90 rounded-2xl p-8 backdrop-blur-sm border border-dashed border-stravesta-teal/30">
        <div className="grid md:grid-cols-2 gap-8">
        <Card className="bg-red-500/10 border-red-500/30 border-2">
          <CardHeader>
            <CardTitle className="text-white">
              The Problem
            </CardTitle>
            <p className="text-white text-lg font-medium">Why Most Traders Struggle</p>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="text-stravesta-lightGray text-sm flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0 mt-1.5"></div>
                They miss great setups because they can't watch their watchlist 24/7.
              </li>
              <li className="text-stravesta-lightGray text-sm flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0 mt-1.5"></div>
                Emotions take over fear, doubt, hesitation.
              </li>
              <li className="text-stravesta-lightGray text-sm flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0 mt-1.5"></div>
                Inconsistent execution ruins performance.
              </li>
              <li className="text-stravesta-lightGray text-sm flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0 mt-1.5"></div>
                Even solid strategies fail without structure, timing and discipline.
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-green-500/10 border-green-500/30 border-2">
          <CardHeader>
            <CardTitle className="text-white">
              The Solution
            </CardTitle>
            <p className="text-white text-lg font-medium">How Stravesta Helps You Win</p>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="text-stravesta-lightGray text-sm flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0 mt-1.5"></div>
                AI scans all markets constantly – no missed setups.
              </li>
              <li className="text-stravesta-lightGray text-sm flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0 mt-1.5"></div>
                Instant alerts based on your criteria – no second-guessing.
              </li>
              <li className="text-stravesta-lightGray text-sm flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0 mt-1.5"></div>
                Data-driven decisions, not emotions.
              </li>
              <li className="text-stravesta-lightGray text-sm flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0 mt-1.5"></div>
                Learns from your best trades and improves over time.
              </li>
              <li className="text-stravesta-lightGray text-sm flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0 mt-1.5"></div>
                With Stravesta, you trade with confidence – not chaos.
              </li>
            </ul>
          </CardContent>
        </Card>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsProblemComparison;
