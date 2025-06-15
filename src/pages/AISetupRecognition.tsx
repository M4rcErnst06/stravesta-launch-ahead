import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Brain, Upload, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ChartUpload from '@/components/ai-setup/ChartUpload';
import AnalysisResults from '@/components/ai-setup/AnalysisResults';
import { toast } from '@/components/ui/use-toast';

export interface SetupAnalysis {
  pattern: string;
  confidence: number;
  trend: 'bullish' | 'bearish' | 'sideways';
  entry_price?: number;
  stop_loss?: number;
  take_profit?: number;
  risk_reward_ratio?: number;
  support_levels: number[];
  resistance_levels: number[];
  analysis_text: string;
  timestamp: string;
}

const AISetupRecognition = () => {
  const navigate = useNavigate();
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<SetupAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleImageUpload = (imageUrl: string) => {
    setUploadedImage(imageUrl);
    setAnalysis(null);
  };

  const analyzeChart = async () => {
    if (!uploadedImage) {
      toast({
        title: "Fehler",
        description: "Bitte laden Sie zuerst ein Chart-Bild hoch.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    try {
      const response = await fetch('/api/analyze-chart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageUrl: uploadedImage
        }),
      });

      if (!response.ok) {
        throw new Error('Analyse fehlgeschlagen');
      }

      const result = await response.json();
      setAnalysis(result);
      
      toast({
        title: "Analyse abgeschlossen",
        description: "Chart wurde erfolgreich analysiert!",
      });
    } catch (error) {
      console.error('Analyse Fehler:', error);
      toast({
        title: "Fehler",
        description: "Chart-Analyse fehlgeschlagen. Bitte versuchen Sie es erneut.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-stravesta-dark relative">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-stravesta-dark/90 pointer-events-none"></div>
      
      <div className="relative z-10">
        {/* Header */}
        <header className="bg-stravesta-navy/80 backdrop-blur-sm border-b border-stravesta-teal/20">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button 
                  onClick={() => navigate('/dashboard')}
                  variant="outline"
                  size="sm"
                  className="text-stravesta-lightGray border-stravesta-darkGray bg-stravesta-navy/50 hover:bg-stravesta-navy hover:text-white hover:border-stravesta-teal"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Zurück
                </Button>
                <div>
                  <h1 className="text-2xl font-bold text-gradient flex items-center gap-2">
                    <Brain className="h-7 w-7 text-stravesta-teal" />
                    AI Setup-Erkennung
                  </h1>
                  <p className="text-stravesta-lightGray">Automatische Erkennung von Trading-Setups durch KI-Analyse</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Upload Section */}
            <div className="space-y-6">
              <Card className="bg-stravesta-navy/50 border-stravesta-teal/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Upload className="h-5 w-5 text-stravesta-teal" />
                    Chart hochladen
                  </CardTitle>
                  <CardDescription className="text-stravesta-lightGray">
                    Laden Sie ein Chart-Bild hoch für die AI-Analyse
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartUpload onImageUpload={handleImageUpload} />
                  
                  {uploadedImage && (
                    <div className="mt-6">
                      <Button 
                        onClick={analyzeChart}
                        disabled={isAnalyzing}
                        className="w-full bg-stravesta-teal hover:bg-stravesta-teal/90 text-stravesta-dark"
                      >
                        {isAnalyzing ? (
                          <>
                            <Zap className="h-4 w-4 mr-2 animate-pulse" />
                            Analysiere Chart...
                          </>
                        ) : (
                          <>
                            <Brain className="h-4 w-4 mr-2" />
                            Chart analysieren
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Beta Notice */}
              <Card className="bg-stravesta-navy/70 border-stravesta-teal/20">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-stravesta-teal mb-2">🚀 Beta Feature</h3>
                  <p className="text-stravesta-lightGray text-sm">
                    Die AI Setup-Erkennung befindet sich in der Beta-Phase. 
                    Analyseergebnisse sollten immer mit eigener technischer Analyse verifiziert werden.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Analysis Results */}
            <div>
              <AnalysisResults 
                analysis={analysis} 
                isAnalyzing={isAnalyzing}
                uploadedImage={uploadedImage}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AISetupRecognition;
