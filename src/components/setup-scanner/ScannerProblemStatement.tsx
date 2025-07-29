
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';


const ScannerProblemStatement = () => {
  const tradingScenarios = [
    {
      title: "Without Stravesta",
      points: [
        "Setups are missed",
        "Emotional decisions",
        "Missed opportunities",
        "Inconsistent results"
      ],
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/30"
    },
    {
      title: "With Stravesta",
      points: [
        "All setups captured",
        "Systematic approach",
        "No missed trades",
        "Consistent performance"
      ],
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/30"
    }
  ];

  return (
    <div className="mb-16" data-animate>
      <div className="text-center mb-12">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
          The Problem: Missed Opportunities
        </h3>
        <p className="text-lg text-stravesta-lightGray max-w-2xl mx-auto">
          Studies show: Average traders miss 67% of all profitable setups 
          because they cannot permanently monitor the charts.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 w-full mx-auto">
        {tradingScenarios.map((scenario, index) => (
          <Card 
            key={index}
            className={`${scenario.bgColor} ${scenario.borderColor} border-2`}
          >
            <CardHeader>
              <CardTitle className="text-white">
                {scenario.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {scenario.points.map((point, idx) => (
                  <li key={idx} className="text-stravesta-lightGray text-sm flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-current flex-shrink-0"></div>
                    {point}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ScannerProblemStatement;
