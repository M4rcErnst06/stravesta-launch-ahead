import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wifi, Database, Cpu, Shield, Zap, CheckCircle2, AlertCircle, Activity, Cable, Server } from 'lucide-react';

const MetaTraderSyncAnimation = () => {
  const [syncPhase, setSyncPhase] = useState(0);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const [dataFlow, setDataFlow] = useState<string[]>([]);
  const [aiProcessing, setAiProcessing] = useState(false);
  const [tradingData, setTradingData] = useState<any[]>([]);

  const connectionSteps = [
    { id: 'establish', label: 'Verbindung herstellen', icon: <Wifi className="h-4 w-4" />, color: 'blue' },
    { id: 'authenticate', label: 'Authentifizierung', icon: <Shield className="h-4 w-4" />, color: 'purple' },
    { id: 'sync', label: 'Daten synchronisieren', icon: <Database className="h-4 w-4" />, color: 'cyan' },
    { id: 'analyze', label: 'KI-Analyse starten', icon: <Cpu className="h-4 w-4" />, color: 'green' }
  ];

  const tradeStreams = [
    { symbol: 'EURUSD', action: 'BUY', volume: '0.15', pnl: '+67.24', status: 'processing' },
    { symbol: 'GBPJPY', action: 'SELL', volume: '0.08', pnl: '-23.10', status: 'processing' },
    { symbol: 'XAUUSD', action: 'BUY', volume: '0.02', pnl: '+145.80', status: 'processing' },
    { symbol: 'BTCUSD', action: 'SELL', volume: '0.01', pnl: '+89.45', status: 'processing' }
  ];

  useEffect(() => {
    const runSyncSequence = async () => {
      // Phase 1: Connection establishment
      setSyncPhase(1);
      setConnectionStatus('connecting');
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Phase 2: Authentication
      setSyncPhase(2);
      setConnectionStatus('authenticating');
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // Phase 3: Data sync begins
      setSyncPhase(3);
      setConnectionStatus('connected');
      setDataFlow(['mt5_auth', 'broker_handshake']);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Phase 4: Stream trading data
      setSyncPhase(4);
      for (let i = 0; i < tradeStreams.length; i++) {
        setDataFlow(prev => [...prev, `trade_${i + 1}`]);
        setTradingData(prev => [...prev, { ...tradeStreams[i], id: i + 1, timestamp: Date.now() }]);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      // Phase 5: AI processing
      setSyncPhase(5);
      setAiProcessing(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Phase 6: Complete
      setSyncPhase(6);
      setAiProcessing(false);
      setTradingData(prev => prev.map(trade => ({ ...trade, status: 'analyzed' })));
      
      // Hold for 3 seconds then reset
      await new Promise(resolve => setTimeout(resolve, 3000));
      setSyncPhase(0);
      setConnectionStatus('disconnected');
      setDataFlow([]);
      setTradingData([]);
      setAiProcessing(false);
    };

    const interval = setInterval(runSyncSequence, 18000);
    runSyncSequence();

    return () => clearInterval(interval);
  }, []);

  const getPhaseColor = (phase: number) => {
    if (syncPhase >= phase) return 'bg-gradient-to-r from-stravesta-teal to-blue-500';
    return 'bg-stravesta-darkGray';
  };

  const getStatusColor = () => {
    switch (connectionStatus) {
      case 'connecting': return 'text-yellow-400 animate-pulse';
      case 'authenticating': return 'text-purple-400 animate-pulse';
      case 'connected': return 'text-green-400';
      default: return 'text-stravesta-lightGray';
    }
  };

  return (
    <div className="relative max-w-7xl mx-auto">
      {/* Background Network Effect */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {syncPhase >= 3 && (
          <>
            <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-stravesta-teal rounded-full animate-ping"></div>
            <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute bottom-1/3 left-1/2 w-1 h-1 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-green-400 rounded-full animate-ping" style={{ animationDelay: '1.5s' }}></div>
          </>
        )}
      </div>

      {/* Main Container */}
      <div className="bg-gradient-to-br from-stravesta-navy/90 to-black/80 backdrop-blur-xl rounded-3xl border border-stravesta-teal/30 overflow-hidden">
        
        {/* Header */}
        <div className="relative p-8 border-b border-stravesta-teal/20">
          <div className="text-center">
            <div className="flex justify-center items-center gap-6 mb-6">
              <div className="relative">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-6 rounded-2xl">
                  <Server className="h-12 w-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2">
                  <div className={`w-4 h-4 rounded-full ${getStatusColor()}`}>
                    <div className="w-full h-full bg-current rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
              
              {/* Connection Beam */}
              {syncPhase >= 1 && (
                <div className="flex-1 relative h-2 bg-stravesta-dark rounded-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-stravesta-teal to-green-500 rounded-full opacity-50 animate-pulse"></div>
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-stravesta-teal rounded-full transition-all duration-1000 relative overflow-hidden"
                    style={{ width: `${Math.min((syncPhase / 6) * 100, 100)}%` }}
                  >
                    <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                  </div>
                </div>
              )}
              
              <div className="relative">
                <div className="bg-gradient-to-r from-stravesta-teal to-green-500 p-6 rounded-2xl">
                  <Database className="h-12 w-12 text-white" />
                </div>
                {aiProcessing && (
                  <div className="absolute -top-2 -right-2">
                    <Cpu className="h-6 w-6 text-yellow-400 animate-spin" />
                  </div>
                )}
              </div>
            </div>
            
            <h3 className="text-3xl font-bold bg-gradient-to-r from-white via-stravesta-teal to-blue-400 bg-clip-text text-transparent mb-2">
              Real-Time MetaTrader Sync
            </h3>
            <p className={`text-lg ${getStatusColor()}`}>
              {connectionStatus === 'disconnected' && "Bereit für Verbindung"}
              {connectionStatus === 'connecting' && "Verbindung wird hergestellt..."}
              {connectionStatus === 'authenticating' && "Authentifizierung läuft..."}
              {connectionStatus === 'connected' && "Live-Synchronisation aktiv"}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          
          {/* Connection Steps */}
          <div className="grid grid-cols-4 gap-6 mb-12">
            {connectionSteps.map((step, index) => (
              <div 
                key={step.id}
                className={`
                  text-center transition-all duration-700 transform
                  ${syncPhase > index ? 'scale-105 opacity-100' : 'scale-95 opacity-50'}
                `}
              >
                <div className={`
                  w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4 transition-all duration-500
                  ${syncPhase > index 
                    ? `bg-gradient-to-r from-${step.color}-500 to-${step.color}-600 shadow-lg shadow-${step.color}-500/30` 
                    : 'bg-stravesta-dark/50 border border-stravesta-darkGray'
                  }
                `}>
                  <div className={syncPhase > index ? 'text-white' : 'text-stravesta-lightGray'}>
                    {step.icon}
                  </div>
                </div>
                <h4 className={`text-sm font-semibold ${syncPhase > index ? 'text-white' : 'text-stravesta-lightGray'}`}>
                  {step.label}
                </h4>
                {syncPhase === index + 1 && (
                  <div className="mt-2">
                    <div className="w-8 h-1 bg-stravesta-teal rounded-full mx-auto animate-pulse"></div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Data Flow Visualization */}
          {syncPhase >= 4 && (
            <div className="mb-12">
              <h4 className="text-xl font-bold text-white text-center mb-8">
                Live Trading Data Stream
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* MT5 Terminal */}
                <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/30 border-2">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-blue-500/20 p-3 rounded-lg">
                        <Activity className="h-6 w-6 text-blue-400" />
                      </div>
                      <div>
                        <h5 className="text-lg font-bold text-blue-400">MetaTrader 5</h5>
                        <p className="text-stravesta-lightGray text-sm">Live Terminal</p>
                      </div>
                      <div className="ml-auto">
                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      {tradingData.slice(0, 2).map((trade, index) => (
                        <div 
                          key={trade.id}
                          className="bg-blue-500/10 rounded-lg p-3 border border-blue-500/20 transform transition-all duration-500 animate-fade-in"
                          style={{ animationDelay: `${index * 300}ms` }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-white text-sm">{trade.symbol}</span>
                              <Badge className={`text-xs ${
                                trade.action === 'BUY' 
                                  ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                                  : 'bg-red-500/20 text-red-400 border-red-500/30'
                              }`}>
                                {trade.action}
                              </Badge>
                            </div>
                            <span className={`font-bold text-sm ${
                              trade.pnl.startsWith('+') ? 'text-green-400' : 'text-red-400'
                            }`}>
                              {trade.pnl}
                            </span>
                          </div>
                          <div className="text-xs text-stravesta-lightGray mt-1">
                            Volume: {trade.volume}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Stravesta AI */}
                <Card className="bg-gradient-to-br from-stravesta-teal/10 to-green-500/10 border-stravesta-teal/30 border-2">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-stravesta-teal/20 p-3 rounded-lg">
                        <Cpu className={`h-6 w-6 text-stravesta-teal ${aiProcessing ? 'animate-pulse' : ''}`} />
                      </div>
                      <div>
                        <h5 className="text-lg font-bold text-stravesta-teal">Stravesta AI</h5>
                        <p className="text-stravesta-lightGray text-sm">Real-time Analysis</p>
                      </div>
                      <div className="ml-auto">
                        <div className={`w-3 h-3 rounded-full ${
                          aiProcessing ? 'bg-yellow-400 animate-pulse' : 'bg-green-400'
                        }`}></div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      {tradingData.slice(0, 2).map((trade, index) => (
                        <div 
                          key={`ai-${trade.id}`}
                          className="bg-stravesta-teal/10 rounded-lg p-3 border border-stravesta-teal/20 transform transition-all duration-500 animate-fade-in"
                          style={{ animationDelay: `${(index * 300) + 500}ms` }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-white text-sm">{trade.symbol}</span>
                              {trade.status === 'analyzed' && (
                                <CheckCircle2 className="h-4 w-4 text-green-400" />
                              )}
                            </div>
                            <span className="text-stravesta-teal text-sm font-semibold">
                              {trade.status === 'analyzed' ? 'Analyzed' : 'Processing...'}
                            </span>
                          </div>
                          <div className="text-xs text-stravesta-lightGray mt-1">
                            Risk Score: {Math.floor(Math.random() * 30) + 20}/100
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Final Status */}
          {syncPhase === 6 && (
            <div className="text-center animate-fade-in">
              <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl p-8 border-2 border-green-400/50">
                <CheckCircle2 className="h-12 w-12 text-green-400 mx-auto mb-4" />
                <h4 className="text-2xl font-bold text-green-400 mb-3">
                  Synchronisation Erfolgreich
                </h4>
                <p className="text-stravesta-lightGray text-lg">
                  {tradingData.length} Trades synchronisiert und analysiert • KI-Insights verfügbar
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Progress Indicator */}
        <div className="px-8 pb-6">
          <div className="flex justify-center space-x-2">
            {[0, 1, 2, 3, 4, 5, 6].map((phase) => (
              <div
                key={phase}
                className={`h-2 rounded-full transition-all duration-500 ${
                  syncPhase >= phase 
                    ? phase === 6 ? 'w-8 bg-green-400' : 'w-4 bg-stravesta-teal' 
                    : 'w-2 bg-stravesta-darkGray'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetaTraderSyncAnimation;