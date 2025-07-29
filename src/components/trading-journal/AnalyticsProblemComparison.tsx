
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AnalyticsProblemComparison = () => {
  return (
    <div className="mb-16" data-animate>
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Card className="bg-red-500/10 border-red-500/30 border-2">
          <CardHeader>
            <CardTitle className="text-white text-lg mb-2">
              The Problem
            </CardTitle>
            <h4 className="text-white font-semibold">
              Why Most Traders Struggle
            </h4>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="text-stravesta-lightGray text-sm">
                They miss great setups because they can't watch their watchlist 24/7.
              </li>
              <li className="text-stravesta-lightGray text-sm">
                Emotions take over fear, doubt, hesitation.
              </li>
              <li className="text-stravesta-lightGray text-sm">
                Inconsistent execution ruins performance.
              </li>
              <li className="text-stravesta-lightGray text-sm">
                Even solid strategies fail without structure, timing and discipline.
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-green-500/10 border-green-500/30 border-2">
          <CardHeader>
            <CardTitle className="text-white text-lg mb-2">
              The Solution
            </CardTitle>
            <h4 className="text-white font-semibold">
              How Stravesta Helps You Win
            </h4>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="text-stravesta-lightGray text-sm">
                AI scans all markets constantly – no missed setups.
              </li>
              <li className="text-stravesta-lightGray text-sm">
                Instant alerts based on your criteria – no second-guessing.
              </li>
              <li className="text-stravesta-lightGray text-sm">
                Data-driven decisions, not emotions.
              </li>
              <li className="text-stravesta-lightGray text-sm">
                Learns from your best trades and improves over time.
              </li>
              <li className="text-stravesta-lightGray text-sm">
                With Stravesta, you trade with confidence – not chaos.
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsProblemComparison;
