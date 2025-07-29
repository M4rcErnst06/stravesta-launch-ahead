import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AnalyticsProblemComparison = () => {
  return (
    <div className="w-full px-4" data-animate>
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-x-6 gap-y-10">
          <Card className="bg-red-500/10 border-red-500/30 border-2 p-6">
            <CardHeader className="px-0 pt-0 pb-2">
              <CardTitle className="text-white">
                The Problem
              </CardTitle>
              <p className="text-white text-lg font-medium">Why Most Traders Struggle</p>
            </CardHeader>
            <CardContent className="px-0 pt-0">
              <ul className="space-y-3">
                {[
                  "They miss great setups because they can't watch their watchlist 24/7.",
                  "Emotions take over fear, doubt, hesitation.",
                  "Inconsistent execution ruins performance.",
                  "Even solid strategies fail without structure, timing and discipline."
                ].map((item, idx) => (
                  <li key={idx} className="text-stravesta-lightGray text-sm flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0 mt-1.5"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-green-500/10 border-green-500/30 border-2 p-6">
            <CardHeader className="px-0 pt-0 pb-2">
              <CardTitle className="text-white">
                The Solution
              </CardTitle>
              <p className="text-white text-lg font-medium">How Stravesta Helps You Win</p>
            </CardHeader>
            <CardContent className="px-0 pt-0">
              <ul className="space-y-3">
                {[
                  "AI scans all markets constantly – no missed setups.",
                  "Instant alerts based on your criteria – no second-guessing.",
                  "Data-driven decisions, not emotions.",
                  "Learns from your best trades and improves over time.",
                  "With Stravesta, you trade with confidence – not chaos."
                ].map((item, idx) => (
                  <li key={idx} className="text-stravesta-lightGray text-sm flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0 mt-1.5"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsProblemComparison;
