
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlusCircle } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface Trade {
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

interface TradeFormProps {
  onAddTrade: (trade: Omit<Trade, 'id'>) => void;
}

const TradeForm: React.FC<TradeFormProps> = ({ onAddTrade }) => {
  const [formData, setFormData] = useState({
    symbol: '',
    type: 'long' as 'long' | 'short',
    entry_price: '',
    exit_price: '',
    quantity: '',
    entry_date: new Date().toISOString().split('T')[0],
    exit_date: '',
    status: 'open' as 'open' | 'closed',
    notes: '',
    emotion: 'neutral' as 'fear' | 'greed' | 'discipline' | 'fomo' | 'neutral'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.symbol || !formData.entry_price || !formData.quantity) {
      toast({
        title: "Fehler",
        description: "Bitte füllen Sie alle Pflichtfelder aus.",
        variant: "destructive",
      });
      return;
    }

    const trade: Omit<Trade, 'id'> = {
      symbol: formData.symbol.toUpperCase(),
      type: formData.type,
      entry_price: parseFloat(formData.entry_price),
      exit_price: formData.exit_price ? parseFloat(formData.exit_price) : undefined,
      quantity: parseInt(formData.quantity),
      entry_date: formData.entry_date,
      exit_date: formData.exit_date || undefined,
      status: formData.status,
      notes: formData.notes || undefined,
      emotion: formData.emotion,
    };

    // Calculate P&L if trade is closed
    if (trade.status === 'closed' && trade.exit_price) {
      const priceDiff = trade.type === 'long' 
        ? trade.exit_price - trade.entry_price
        : trade.entry_price - trade.exit_price;
      trade.pnl = priceDiff * trade.quantity;
    }

    onAddTrade(trade);
    
    // Reset form
    setFormData({
      symbol: '',
      type: 'long',
      entry_price: '',
      exit_price: '',
      quantity: '',
      entry_date: new Date().toISOString().split('T')[0],
      exit_date: '',
      status: 'open',
      notes: '',
      emotion: 'neutral'
    });

    toast({
      title: "Trade hinzugefügt",
      description: `${trade.symbol} wurde erfolgreich hinzugefügt.`,
    });
  };

  return (
    <Card className="bg-stravesta-navy/50 border-stravesta-teal/20 max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <PlusCircle className="h-5 w-5 text-stravesta-teal" />
          Neuen Trade hinzufügen
        </CardTitle>
        <CardDescription className="text-stravesta-lightGray">
          Dokumentieren Sie Ihren Trade für die Analyse
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="symbol" className="text-stravesta-lightGray">Symbol *</Label>
              <Input
                id="symbol"
                value={formData.symbol}
                onChange={(e) => setFormData(prev => ({ ...prev, symbol: e.target.value }))}
                placeholder="z.B. EURUSD, AAPL"
                className="bg-stravesta-dark border-stravesta-darkGray text-white focus:border-stravesta-teal"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type" className="text-stravesta-lightGray">Trade-Typ *</Label>
              <Select value={formData.type} onValueChange={(value: 'long' | 'short') => setFormData(prev => ({ ...prev, type: value }))}>
                <SelectTrigger className="bg-stravesta-dark border-stravesta-darkGray text-white focus:border-stravesta-teal">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-stravesta-dark border-stravesta-darkGray">
                  <SelectItem value="long" className="text-white hover:bg-stravesta-navy">Long (Kauf)</SelectItem>
                  <SelectItem value="short" className="text-white hover:bg-stravesta-navy">Short (Verkauf)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="entry_price" className="text-stravesta-lightGray">Einstiegspreis *</Label>
              <Input
                id="entry_price"
                type="number"
                step="0.0001"
                value={formData.entry_price}
                onChange={(e) => setFormData(prev => ({ ...prev, entry_price: e.target.value }))}
                placeholder="1.0850"
                className="bg-stravesta-dark border-stravesta-darkGray text-white focus:border-stravesta-teal"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity" className="text-stravesta-lightGray">Menge *</Label>
              <Input
                id="quantity"
                type="number"
                value={formData.quantity}
                onChange={(e) => setFormData(prev => ({ ...prev, quantity: e.target.value }))}
                placeholder="1000"
                className="bg-stravesta-dark border-stravesta-darkGray text-white focus:border-stravesta-teal"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="entry_date" className="text-stravesta-lightGray">Einstiegsdatum *</Label>
              <Input
                id="entry_date"
                type="date"
                value={formData.entry_date}
                onChange={(e) => setFormData(prev => ({ ...prev, entry_date: e.target.value }))}
                className="bg-stravesta-dark border-stravesta-darkGray text-white focus:border-stravesta-teal"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status" className="text-stravesta-lightGray">Status</Label>
              <Select value={formData.status} onValueChange={(value: 'open' | 'closed') => setFormData(prev => ({ ...prev, status: value }))}>
                <SelectTrigger className="bg-stravesta-dark border-stravesta-darkGray text-white focus:border-stravesta-teal">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-stravesta-dark border-stravesta-darkGray">
                  <SelectItem value="open" className="text-white hover:bg-stravesta-navy">Offen</SelectItem>
                  <SelectItem value="closed" className="text-white hover:bg-stravesta-navy">Geschlossen</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {formData.status === 'closed' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="exit_price" className="text-stravesta-lightGray">Ausstiegspreis</Label>
                <Input
                  id="exit_price"
                  type="number"
                  step="0.0001"
                  value={formData.exit_price}
                  onChange={(e) => setFormData(prev => ({ ...prev, exit_price: e.target.value }))}
                  placeholder="1.0920"
                  className="bg-stravesta-dark border-stravesta-darkGray text-white focus:border-stravesta-teal"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="exit_date" className="text-stravesta-lightGray">Ausstiegsdatum</Label>
                <Input
                  id="exit_date"
                  type="date"
                  value={formData.exit_date}
                  onChange={(e) => setFormData(prev => ({ ...prev, exit_date: e.target.value }))}
                  className="bg-stravesta-dark border-stravesta-darkGray text-white focus:border-stravesta-teal"
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="emotion" className="text-stravesta-lightGray">Emotion beim Trade</Label>
            <Select value={formData.emotion} onValueChange={(value: 'fear' | 'greed' | 'discipline' | 'fomo' | 'neutral') => setFormData(prev => ({ ...prev, emotion: value }))}>
              <SelectTrigger className="bg-stravesta-dark border-stravesta-darkGray text-white focus:border-stravesta-teal">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-stravesta-dark border-stravesta-darkGray">
                <SelectItem value="neutral" className="text-white hover:bg-stravesta-navy">Neutral</SelectItem>
                <SelectItem value="discipline" className="text-white hover:bg-stravesta-navy">Diszipliniert</SelectItem>
                <SelectItem value="fear" className="text-white hover:bg-stravesta-navy">Angst</SelectItem>
                <SelectItem value="greed" className="text-white hover:bg-stravesta-navy">Gier</SelectItem>
                <SelectItem value="fomo" className="text-white hover:bg-stravesta-navy">FOMO</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes" className="text-stravesta-lightGray">Notizen</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Setup, Marktbedingungen, Lessons learned..."
              className="bg-stravesta-dark border-stravesta-darkGray text-white focus:border-stravesta-teal"
              rows={4}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-stravesta-teal hover:bg-stravesta-teal/90 text-stravesta-dark font-medium"
          >
            Trade hinzufügen
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default TradeForm;
