
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CheckCircle } from 'lucide-react';

const ScannerProblemStatement = () => {
  const tradingScenarios = [
    {
      icon: <AlertCircle className="h-5 w-5 text-red-400" />,
      title: "Ohne Stravesta",
      points: [
        "Setups werden übersehen",
        "Emotionale Entscheidungen",
        "Verpasste Gelegenheiten",
        "Inkonsistente Ergebnisse"
      ],
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/30"
    },
    {
      icon: <CheckCircle className="h-5 w-5 text-green-400" />,
      title: "Mit Stravesta",
      points: [
        "Alle Setups erfasst",
        "Systematischer Ansatz",
        "Keine verpassten Trades",
        "Konsistente Performance"
      ],
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/30"
    }
  ];

  return (
    <div className="mb-16" data-animate>
      <div className="text-center mb-12">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Das Problem: Verpasste Gelegenheiten
        </h3>
        <p className="text-lg text-stravesta-lightGray max-w-2xl mx-auto">
          Studien zeigen: Durchschnittliche Trader verpassen 67% aller profitablen Setups, 
          weil sie nicht permanent die Charts überwachen können.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {tradingScenarios.map((scenario, index) => (
          <Card 
            key={index}
            className={`${scenario.bgColor} ${scenario.borderColor} border-2`}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                {scenario.icon}
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
