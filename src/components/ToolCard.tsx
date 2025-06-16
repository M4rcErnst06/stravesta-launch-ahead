
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface ToolCardProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  status: 'active' | 'coming-soon' | 'beta';
  features?: string[];
  onUse?: () => void;
}

const ToolCard: React.FC<ToolCardProps> = ({ 
  icon, 
  title, 
  status, 
  onUse 
}) => {
  const getStatusBadge = () => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500/10 text-green-500 border-green-500/30">Aktiv</Badge>;
      case 'beta':
        return <Badge className="bg-stravesta-teal/10 text-stravesta-teal border-stravesta-teal/30">Beta</Badge>;
      case 'coming-soon':
        return <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/30">Bald verfügbar</Badge>;
    }
  };

  const isDisabled = status === 'coming-soon';

  return (
    <Card className="bg-stravesta-navy/50 border-stravesta-teal/20 hover:border-stravesta-teal/40 transition-all duration-300 hover:scale-105 h-full">
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <div className="text-stravesta-teal">
            {icon}
          </div>
          {getStatusBadge()}
        </div>
        <CardTitle className="text-xl text-white">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          onClick={onUse}
          disabled={isDisabled}
          className={`w-full group/btn ${
            isDisabled 
              ? 'bg-stravesta-darkGray text-stravesta-lightGray cursor-not-allowed' 
              : 'bg-stravesta-teal hover:bg-stravesta-teal/90 text-black font-semibold'
          }`}
        >
          {isDisabled ? 'Bald verfügbar' : 'Tool öffnen'}
          {!isDisabled && (
            <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ToolCard;
