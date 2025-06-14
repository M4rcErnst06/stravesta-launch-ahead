
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
    <Card className="bg-stravesta-navy/50 border-stravesta-teal/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Eye className="h-5 w-5 text-stravesta-teal" />
          Alle Trades
        </CardTitle>
        <CardDescription className="text-stravesta-lightGray">
          Übersicht und Verwaltung Ihrer Trades
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-stravesta-lightGray" />
            <Input
              placeholder="Nach Symbol oder Notizen suchen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-stravesta-dark border-stravesta-darkGray text-white focus:border-stravesta-teal"
            />
          </div>
          
          <Select value={statusFilter} onValueChange={(value: 'all' | 'open' | 'closed') => setStatusFilter(value)}>
            <SelectTrigger className="w-[140px] bg-stravesta-dark border-stravesta-darkGray text-white focus:border-stravesta-teal">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-stravesta-dark border-stravesta-darkGray">
              <SelectItem value="all" className="text-white hover:bg-stravesta-navy">Alle Status</SelectItem>
              <SelectItem value="open" className="text-white hover:bg-stravesta-navy">Offen</SelectItem>
              <SelectItem value="closed" className="text-white hover:bg-stravesta-navy">Geschlossen</SelectItem>
            </SelectContent>
          </Select>

          <Select value={typeFilter} onValueChange={(value: 'all' | 'long' | 'short') => setTypeFilter(value)}>
            <SelectTrigger className="w-[120px] bg-stravesta-dark border-stravesta-darkGray text-white focus:border-stravesta-teal">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-stravesta-dark border-stravesta-darkGray">
              <SelectItem value="all" className="text-white hover:bg-stravesta-navy">Alle Typen</SelectItem>
              <SelectItem value="long" className="text-white hover:bg-stravesta-navy">Long</SelectItem>
              <SelectItem value="short" className="text-white hover:bg-stravesta-navy">Short</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="rounded-md border border-stravesta-darkGray overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-stravesta-dark border-b border-stravesta-darkGray">
                <TableHead className="text-stravesta-lightGray">Symbol</TableHead>
                <TableHead className="text-stravesta-lightGray">Typ</TableHead>
                <TableHead className="text-stravesta-lightGray">Entry</TableHead>
                <TableHead className="text-stravesta-lightGray">Exit</TableHead>
                <TableHead className="text-stravesta-lightGray">Menge</TableHead>
                <TableHead className="text-stravesta-lightGray">P&L</TableHead>
                <TableHead className="text-stravesta-lightGray">Status</TableHead>
                <TableHead className="text-stravesta-lightGray">Emotion</TableHead>
                <TableHead className="text-stravesta-lightGray">Datum</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTrades.map((trade) => (
                <TableRow 
                  key={trade.id} 
                  className="bg-stravesta-navy/30 border-b border-stravesta-darkGray hover:bg-stravesta-navy/50"
                >
                  <TableCell className="font-medium text-white">{trade.symbol}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      trade.type === 'long' 
                        ? 'bg-green-500/20 text-green-500' 
                        : 'bg-red-500/20 text-red-500'
                    }`}>
                      {trade.type.toUpperCase()}
                    </span>
                  </TableCell>
                  <TableCell className="text-white">{trade.entry_price.toFixed(4)}</TableCell>
                  <TableCell className="text-white">
                    {trade.exit_price ? trade.exit_price.toFixed(4) : '-'}
                  </TableCell>
                  <TableCell className="text-white">{trade.quantity.toLocaleString()}</TableCell>
                  <TableCell>
                    {trade.pnl !== undefined ? (
                      <span className={`font-medium ${
                        trade.pnl >= 0 ? 'text-green-500' : 'text-red-500'
                      }`}>
                        ${trade.pnl.toFixed(2)}
                      </span>
                    ) : (
                      <span className="text-stravesta-lightGray">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      trade.status === 'open' 
                        ? 'bg-stravesta-teal/20 text-stravesta-teal' 
                        : 'bg-stravesta-lightGray/20 text-stravesta-lightGray'
                    }`}>
                      {trade.status === 'open' ? 'OFFEN' : 'GESCHLOSSEN'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`text-sm ${getEmotionColor(trade.emotion)}`}>
                      {getEmotionLabel(trade.emotion)}
                    </span>
                  </TableCell>
                  <TableCell className="text-stravesta-lightGray">
                    {new Date(trade.entry_date).toLocaleDateString('de-DE')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredTrades.length === 0 && (
          <div className="text-center py-8">
            <p className="text-stravesta-lightGray">Keine Trades gefunden.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TradeList;
