
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Filter, Edit, Trash2, Eye } from 'lucide-react';

interface Trade {
  id: string;
  symbol: string;
  type: 'long' | 'short';
  entry_price: number;
  exit_price?: number;
  quantity: number;
  entry_date: string;
  exit_date?: string;
  pnl?: number;
  status: 'open' | 'closed';
  notes?: string;
  emotion?: 'fear' | 'greed' | 'discipline' | 'fomo' | 'neutral';
}

interface TradeListProps {
  trades: Trade[];
  onUpdateTrade: (id: string, updatedTrade: Partial<Trade>) => void;
}

const TradeList: React.FC<TradeListProps> = ({ trades, onUpdateTrade }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'open' | 'closed'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'long' | 'short'>('all');

  const filteredTrades = trades.filter(trade => {
    const matchesSearch = trade.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (trade.notes && trade.notes.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || trade.status === statusFilter;
    const matchesType = typeFilter === 'all' || trade.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const getEmotionColor = (emotion?: string) => {
    switch (emotion) {
      case 'discipline': return 'text-green-500';
      case 'fear': return 'text-orange-500';
      case 'greed': return 'text-red-500';
      case 'fomo': return 'text-purple-500';
      default: return 'text-stravesta-lightGray';
    }
  };

  const getEmotionLabel = (emotion?: string) => {
    switch (emotion) {
      case 'discipline': return 'Disziplin';
      case 'fear': return 'Angst';
      case 'greed': return 'Gier';
      case 'fomo': return 'FOMO';
      default: return 'Neutral';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-stravesta-navy/60 backdrop-blur-sm rounded-2xl p-6 border border-stravesta-teal/30">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-3">
            <div className="p-2 bg-stravesta-teal/20 rounded-lg">
              <Eye className="h-6 w-6 text-stravesta-teal" />
            </div>
            Alle Trades verwalten
          </h2>
          <p className="text-stravesta-lightGray text-base">
            Übersicht und Verwaltung Ihrer Trading-History
          </p>
        </div>

        {/* Enhanced Filters */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-stravesta-lightGray" />
            <Input
              placeholder="Nach Symbol oder Notizen suchen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-12 bg-stravesta-dark border-stravesta-darkGray text-white focus:border-stravesta-teal text-base"
            />
          </div>
          
          <Select value={statusFilter} onValueChange={(value: 'all' | 'open' | 'closed') => setStatusFilter(value)}>
            <SelectTrigger className="w-full lg:w-[160px] h-12 bg-stravesta-dark border-stravesta-darkGray text-white focus:border-stravesta-teal">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-stravesta-dark border-stravesta-darkGray">
              <SelectItem value="all" className="text-white hover:bg-stravesta-navy">🔄 Alle Status</SelectItem>
              <SelectItem value="open" className="text-white hover:bg-stravesta-navy">🟢 Offen</SelectItem>
              <SelectItem value="closed" className="text-white hover:bg-stravesta-navy">✅ Geschlossen</SelectItem>
            </SelectContent>
          </Select>

          <Select value={typeFilter} onValueChange={(value: 'all' | 'long' | 'short') => setTypeFilter(value)}>
            <SelectTrigger className="w-full lg:w-[140px] h-12 bg-stravesta-dark border-stravesta-darkGray text-white focus:border-stravesta-teal">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-stravesta-dark border-stravesta-darkGray">
              <SelectItem value="all" className="text-white hover:bg-stravesta-navy">📊 Alle Typen</SelectItem>
              <SelectItem value="long" className="text-white hover:bg-stravesta-navy">📈 Long</SelectItem>
              <SelectItem value="short" className="text-white hover:bg-stravesta-navy">📉 Short</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Trades Cards - Mobile Friendly */}
      <div className="space-y-4">
        {filteredTrades.length === 0 ? (
          <Card className="bg-stravesta-navy/60 backdrop-blur-sm border-stravesta-teal/30">
            <CardContent className="text-center py-12">
              <div className="p-4 bg-stravesta-dark/50 rounded-full w-fit mx-auto mb-4">
                <Eye className="h-8 w-8 text-stravesta-lightGray" />
              </div>
              <p className="text-stravesta-lightGray text-lg">Keine Trades gefunden.</p>
              <p className="text-stravesta-lightGray/70 text-sm mt-2">Versuchen Sie andere Filtereinstellungen.</p>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Desktop Table View */}
            <Card className="bg-stravesta-navy/60 backdrop-blur-sm border-stravesta-teal/30 hidden lg:block">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-stravesta-dark/50 border-b border-stravesta-darkGray hover:bg-stravesta-dark/50">
                        <TableHead className="text-stravesta-lightGray font-semibold py-4 px-6">Symbol</TableHead>
                        <TableHead className="text-stravesta-lightGray font-semibold py-4">Typ</TableHead>
                        <TableHead className="text-stravesta-lightGray font-semibold py-4">Entry</TableHead>
                        <TableHead className="text-stravesta-lightGray font-semibold py-4">Exit</TableHead>
                        <TableHead className="text-stravesta-lightGray font-semibold py-4">Menge</TableHead>
                        <TableHead className="text-stravesta-lightGray font-semibold py-4">P&L</TableHead>
                        <TableHead className="text-stravesta-lightGray font-semibold py-4">Status</TableHead>
                        <TableHead className="text-stravesta-lightGray font-semibold py-4">Emotion</TableHead>
                        <TableHead className="text-stravesta-lightGray font-semibold py-4 px-6">Datum</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTrades.map((trade, index) => (
                        <TableRow 
                          key={trade.id} 
                          className="bg-stravesta-navy/30 border-b border-stravesta-darkGray/50 hover:bg-stravesta-navy/50 transition-all duration-200"
                        >
                          <TableCell className="font-bold text-white text-lg py-4 px-6">{trade.symbol}</TableCell>
                          <TableCell className="py-4">
                            <span className={`px-3 py-2 rounded-lg text-sm font-semibold ${
                              trade.type === 'long' 
                                ? 'bg-green-500/20 text-green-400' 
                                : 'bg-red-500/20 text-red-400'
                            }`}>
                              {trade.type === 'long' ? '📈 LONG' : '📉 SHORT'}
                            </span>
                          </TableCell>
                          <TableCell className="text-white font-medium py-4">{trade.entry_price.toFixed(4)}</TableCell>
                          <TableCell className="text-white font-medium py-4">
                            {trade.exit_price ? trade.exit_price.toFixed(4) : '-'}
                          </TableCell>
                          <TableCell className="text-white font-medium py-4">{trade.quantity.toLocaleString()}</TableCell>
                          <TableCell className="py-4">
                            {trade.pnl !== undefined ? (
                              <span className={`font-bold text-base ${
                                trade.pnl >= 0 ? 'text-green-400' : 'text-red-400'
                              }`}>
                                ${trade.pnl.toFixed(2)}
                              </span>
                            ) : (
                              <span className="text-stravesta-lightGray">-</span>
                            )}
                          </TableCell>
                          <TableCell className="py-4">
                            <span className={`px-3 py-2 rounded-lg text-sm font-semibold ${
                              trade.status === 'open' 
                                ? 'bg-stravesta-teal/20 text-stravesta-teal' 
                                : 'bg-stravesta-lightGray/20 text-stravesta-lightGray'
                            }`}>
                              {trade.status === 'open' ? '🟢 OFFEN' : '✅ GESCHLOSSEN'}
                            </span>
                          </TableCell>
                          <TableCell className="py-4">
                            <span className={`text-sm font-medium ${getEmotionColor(trade.emotion)}`}>
                              {getEmotionLabel(trade.emotion)}
                            </span>
                          </TableCell>
                          <TableCell className="text-stravesta-lightGray font-medium py-4 px-6">
                            {new Date(trade.entry_date).toLocaleDateString('de-DE')}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* Mobile Card View */}
            <div className="grid gap-4 lg:hidden">
              {filteredTrades.map((trade, index) => (
                <Card key={trade.id} className="bg-stravesta-navy/60 backdrop-blur-sm border-stravesta-teal/30 hover:border-stravesta-teal/50 transition-all duration-200">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-12 rounded-full bg-gradient-to-b from-stravesta-teal to-stravesta-teal/50"></div>
                          <div>
                            <h3 className="text-xl font-bold text-white">{trade.symbol}</h3>
                            <p className="text-stravesta-lightGray text-sm">
                              {new Date(trade.entry_date).toLocaleDateString('de-DE')}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`px-3 py-2 rounded-lg text-sm font-semibold ${
                            trade.status === 'open' 
                              ? 'bg-stravesta-teal/20 text-stravesta-teal' 
                              : 'bg-stravesta-lightGray/20 text-stravesta-lightGray'
                          }`}>
                            {trade.status === 'open' ? '🟢 OFFEN' : '✅ GESCHLOSSEN'}
                          </span>
                        </div>
                      </div>

                      {/* Details Grid */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-stravesta-lightGray text-sm">Typ</p>
                          <span className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                            trade.type === 'long' 
                              ? 'bg-green-500/20 text-green-400' 
                              : 'bg-red-500/20 text-red-400'
                          }`}>
                            {trade.type === 'long' ? '📈 LONG' : '📉 SHORT'}
                          </span>
                        </div>
                        <div>
                          <p className="text-stravesta-lightGray text-sm">P&L</p>
                          {trade.pnl !== undefined ? (
                            <p className={`font-bold text-lg ${
                              trade.pnl >= 0 ? 'text-green-400' : 'text-red-400'
                            }`}>
                              ${trade.pnl.toFixed(2)}
                            </p>
                          ) : (
                            <p className="text-stravesta-lightGray">-</p>
                          )}
                        </div>
                        <div>
                          <p className="text-stravesta-lightGray text-sm">Entry</p>
                          <p className="text-white font-medium">{trade.entry_price.toFixed(4)}</p>
                        </div>
                        <div>
                          <p className="text-stravesta-lightGray text-sm">Exit</p>
                          <p className="text-white font-medium">
                            {trade.exit_price ? trade.exit_price.toFixed(4) : '-'}
                          </p>
                        </div>
                        <div>
                          <p className="text-stravesta-lightGray text-sm">Menge</p>
                          <p className="text-white font-medium">{trade.quantity.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-stravesta-lightGray text-sm">Emotion</p>
                          <p className={`text-sm font-medium ${getEmotionColor(trade.emotion)}`}>
                            {getEmotionLabel(trade.emotion)}
                          </p>
                        </div>
                      </div>

                      {/* Notes if available */}
                      {trade.notes && (
                        <div className="pt-3 border-t border-stravesta-darkGray/50">
                          <p className="text-stravesta-lightGray text-sm mb-1">Notizen:</p>
                          <p className="text-white text-sm">{trade.notes}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TradeList;
