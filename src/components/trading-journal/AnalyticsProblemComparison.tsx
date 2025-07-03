
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Target } from 'lucide-react';

const AnalyticsProblemComparison = () => {
  return (
    <div className="mb-16" data-animate>
      <div className="text-center mb-12">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Das Problem: Oberflächliche Selbstanalyse
        </h3>
        <p className="text-lg text-stravesta-lightGray max-w-2xl mx-auto">
          Die meisten Trader analysieren ihre Trades nur oberflächlich und verpassen 
          wichtige Patterns, die den Unterschied zwischen Gewinn und Verlust ausmachen.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Card className="bg-red-500/10 border-red-500/30 border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Target className="h-5 w-5 text-red-400" />
              Ohne KI-Analyse
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="text-stravesta-lightGray text-sm flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0"></div>
                Vage Notizen ohne Erkenntnisse
              </li>
              <li className="text-stravesta-lightGray text-sm flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0"></div>
                Wiederholung derselben Fehler
              </li>
              <li className="text-stravesta-lightGray text-sm flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0"></div>
                Keine strategische Optimierung
              </li>
              <li className="text-stravesta-lightGray text-sm flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0"></div>
                Emotionale Entscheidungen
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-green-500/10 border-green-500/30 border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Brain className="h-5 w-5 text-green-400" />
              Mit Stravesta KI
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="text-stravesta-lightGray text-sm flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0"></div>
                Tiefe Pattern-Erkennung
              </li>
              <li className="text-stravesta-lightGray text-sm flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0"></div>
                Konkrete Handlungsempfehlungen
              </li>
              <li className="text-stravesta-lightGray text-sm flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0"></div>
                Kontinuierliche Optimierung
              </li>
              <li className="text-stravesta-lightGray text-sm flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0"></div>
                Emotionale Kontrolle
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsProblemComparison;
