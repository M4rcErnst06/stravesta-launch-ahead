
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, ArrowLeft, TrendingUp, Calendar, Brain, BarChart3 } from 'lucide-react';
import { User as SupabaseUser } from '@supabase/supabase-js';

interface WatchlistAsset {
  id: string;
  symbol: string;
  name: string;
  asset_type: string;
  assignments: string[];
}

interface FeatureLimit {
  feature_name: string;
  limit_count: number;
  current_count: number;
  subscription_tier: string;
}

const WatchlistManagement = () => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [assets, setAssets] = useState<WatchlistAsset[]>([]);
  const [limits, setLimits] = useState<FeatureLimit[]>([]);
  const [newSymbol, setNewSymbol] = useState('');
  const [newName, setNewName] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const featureConfig = {
    'economic-calendar': { 
      name: 'Economic Calendar', 
      icon: <Calendar className="h-4 w-4" />,
      description: 'Nachrichten und Ereignisse für diese Paare verfolgen'
    },
    'market-scanner': { 
      name: 'Market Scanner', 
      icon: <TrendingUp className="h-4 w-4" />,
      description: 'Marktbewegungen und Trends scannen'
    },
    'ai-setup': { 
      name: 'AI Setup-Erkennung', 
      icon: <Brain className="h-4 w-4" />,
      description: 'Setup-Muster mit KI erkennen'
    },
    'portfolio-analysis': { 
      name: 'Portfolio Analyse', 
      icon: <BarChart3 className="h-4 w-4" />,
      description: 'Portfolio-Performance analysieren'
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        fetchWatchlistData(session.user.id);
      } else {
        navigate('/login');
      }
    });
  }, [navigate]);

  const fetchWatchlistData = async (userId: string) => {
    try {
      // Fetch assets with their feature assignments
      const { data: assetsData, error: assetsError } = await supabase
        .from('watchlist_assets')
        .select(`
          id,
          symbol,
          name,
          asset_type,
          watchlist_feature_assignments (
            feature_name
          )
        `)
        .eq('user_id', userId);

      if (assetsError) throw assetsError;

      // Fetch subscription limits and current counts
      const { data: limitsData, error: limitsError } = await supabase
        .from('subscription_feature_limits')
        .select('*')
        .eq('user_id', userId);

      if (limitsError) throw limitsError;

      // Calculate current counts for each feature
      const limitsWithCounts = await Promise.all(
        limitsData.map(async (limit) => {
          const { count } = await supabase
            .from('watchlist_feature_assignments')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', userId)
            .eq('feature_name', limit.feature_name);

          return {
            ...limit,
            current_count: count || 0
          };
        })
      );

      // Format assets data
      const formattedAssets = assetsData?.map(asset => ({
        ...asset,
        assignments: asset.watchlist_feature_assignments?.map(a => a.feature_name) || []
      })) || [];

      setAssets(formattedAssets);
      setLimits(limitsWithCounts);
    } catch (error) {
      console.error('Error fetching watchlist data:', error);
      toast({
        title: "Fehler",
        description: "Watchlist-Daten konnten nicht geladen werden.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addAsset = async () => {
    if (!user || !newSymbol.trim() || !newName.trim()) return;

    try {
      const { data, error } = await supabase
        .from('watchlist_assets')
        .insert({
          user_id: user.id,
          symbol: newSymbol.toUpperCase(),
          name: newName,
          asset_type: 'forex'
        })
        .select()
        .single();

      if (error) throw error;

      setAssets(prev => [...prev, { ...data, assignments: [] }]);
      setNewSymbol('');
      setNewName('');
      
      toast({
        title: "Erfolgreich",
        description: "Asset zur Watchlist hinzugefügt.",
      });
    } catch (error) {
      console.error('Error adding asset:', error);
      toast({
        title: "Fehler",
        description: "Asset konnte nicht hinzugefügt werden.",
        variant: "destructive",
      });
    }
  };

  const removeAsset = async (assetId: string) => {
    try {
      const { error } = await supabase
        .from('watchlist_assets')
        .delete()
        .eq('id', assetId);

      if (error) throw error;

      setAssets(prev => prev.filter(asset => asset.id !== assetId));
      
      toast({
        title: "Erfolgreich",
        description: "Asset aus Watchlist entfernt.",
      });

      // Refresh data to update counts
      if (user) fetchWatchlistData(user.id);
    } catch (error) {
      console.error('Error removing asset:', error);
      toast({
        title: "Fehler",
        description: "Asset konnte nicht entfernt werden.",
        variant: "destructive",
      });
    }
  };

  const toggleFeatureAssignment = async (assetId: string, featureName: string, isAssigned: boolean) => {
    if (!user) return;

    const limit = limits.find(l => l.feature_name === featureName);
    if (!limit) return;

    if (!isAssigned && limit.current_count >= limit.limit_count) {
      toast({
        title: "Limit erreicht",
        description: `Maximum ${limit.limit_count} Assets für ${featureConfig[featureName]?.name} erreicht.`,
        variant: "destructive",
      });
      return;
    }

    try {
      if (isAssigned) {
        // Add assignment
        const { error } = await supabase
          .from('watchlist_feature_assignments')
          .insert({
            user_id: user.id,
            asset_id: assetId,
            feature_name: featureName
          });

        if (error) throw error;
      } else {
        // Remove assignment
        const { error } = await supabase
          .from('watchlist_feature_assignments')
          .delete()
          .eq('user_id', user.id)
          .eq('asset_id', assetId)
          .eq('feature_name', featureName);

        if (error) throw error;
      }

      // Update local state
      setAssets(prev => prev.map(asset => 
        asset.id === assetId 
          ? {
              ...asset,
              assignments: isAssigned 
                ? [...asset.assignments, featureName]
                : asset.assignments.filter(f => f !== featureName)
            }
          : asset
      ));

      // Update limits count
      setLimits(prev => prev.map(limit =>
        limit.feature_name === featureName
          ? {
              ...limit,
              current_count: isAssigned 
                ? limit.current_count + 1 
                : limit.current_count - 1
            }
          : limit
      ));

    } catch (error) {
      console.error('Error toggling feature assignment:', error);
      toast({
        title: "Fehler",
        description: "Feature-Zuordnung konnte nicht geändert werden.",
        variant: "destructive",
      });
    }
  };

  const getSubscriptionTierDisplay = () => {
    const tier = limits[0]?.subscription_tier || 'basic';
    return tier.charAt(0).toUpperCase() + tier.slice(1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-stravesta-dark flex items-center justify-center">
        <div className="text-white">Lädt...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stravesta-dark relative">
      <div className="absolute inset-0 bg-gradient-to-br from-stravesta-teal/5 via-transparent to-stravesta-navy/20"></div>
      
      <div className="relative z-10">
        {/* Header */}
        <header className="bg-stravesta-navy/80 backdrop-blur-sm border-b border-stravesta-teal/20">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  onClick={() => navigate('/dashboard')}
                  variant="ghost"
                  size="sm"
                  className="text-stravesta-lightGray hover:text-white"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Zurück
                </Button>
                <h1 className="text-2xl font-bold text-gradient">Watchlist verwalten</h1>
              </div>
              <Badge variant="secondary" className="bg-stravesta-teal/20 text-stravesta-teal border-stravesta-teal/30">
                {getSubscriptionTierDisplay()} Abo
              </Badge>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          {/* Feature Credits Overview */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">Verfügbare Credits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {limits.map(limit => {
                const config = featureConfig[limit.feature_name];
                if (!config) return null;

                const remainingCredits = limit.limit_count - limit.current_count;
                const usagePercentage = (limit.current_count / limit.limit_count) * 100;

                return (
                  <Card key={limit.feature_name} className="bg-stravesta-navy/50 border-stravesta-teal/20">
                    <CardHeader className="pb-3">
                      <div className="flex items-center space-x-2">
                        {config.icon}
                        <CardTitle className="text-sm text-white">{config.name}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-stravesta-lightGray">Verwendet:</span>
                          <span className="text-sm font-medium text-white">
                            {limit.current_count}/{limit.limit_count}
                          </span>
                        </div>
                        <div className="w-full bg-stravesta-darkGray rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-300 ${
                              usagePercentage >= 100 
                                ? 'bg-red-500' 
                                : usagePercentage >= 80 
                                  ? 'bg-yellow-500' 
                                  : 'bg-stravesta-teal'
                            }`}
                            style={{ width: `${Math.min(usagePercentage, 100)}%` }}
                          />
                        </div>
                        <div className="text-center">
                          <div className={`text-lg font-bold ${
                            remainingCredits === 0 ? 'text-red-400' : 'text-stravesta-teal'
                          }`}>
                            {remainingCredits}
                          </div>
                          <p className="text-xs text-stravesta-lightGray">
                            {remainingCredits === 0 ? 'Keine Credits' : 'Credits verfügbar'}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Add New Asset */}
          <Card className="bg-stravesta-navy/50 border-stravesta-teal/20 mb-8">
            <CardHeader>
              <CardTitle className="text-white">Neues Asset hinzufügen</CardTitle>
              <CardDescription className="text-stravesta-lightGray">
                Fügen Sie Währungspaare oder Assets zu Ihrer Watchlist hinzu
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4">
                <Input
                  placeholder="Symbol (z.B. EUR/USD)"
                  value={newSymbol}
                  onChange={(e) => setNewSymbol(e.target.value)}
                  className="bg-stravesta-darkGray border-stravesta-teal/30 text-white"
                />
                <Input
                  placeholder="Name (z.B. Euro / US Dollar)"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="bg-stravesta-darkGray border-stravesta-teal/30 text-white"
                />
                <Button
                  onClick={addAsset}
                  className="bg-stravesta-teal hover:bg-stravesta-teal/90 text-stravesta-dark"
                  disabled={!newSymbol.trim() || !newName.trim()}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Hinzufügen
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Assets List */}
          <Card className="bg-stravesta-navy/50 border-stravesta-teal/20">
            <CardHeader>
              <CardTitle className="text-white">Ihre Watchlist</CardTitle>
              <CardDescription className="text-stravesta-lightGray">
                Verwalten Sie Feature-Zuordnungen für Ihre Assets
              </CardDescription>
            </CardHeader>
            <CardContent>
              {assets.length === 0 ? (
                <div className="text-center py-8 text-stravesta-lightGray">
                  Keine Assets in der Watchlist. Fügen Sie Ihr erstes Asset hinzu!
                </div>
              ) : (
                <div className="space-y-4">
                  {assets.map(asset => (
                    <div key={asset.id} className="bg-stravesta-darkGray/50 p-4 rounded-lg border border-stravesta-teal/10">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="text-white font-semibold">{asset.symbol}</h3>
                          <p className="text-stravesta-lightGray text-sm">{asset.name}</p>
                        </div>
                        <Button
                          onClick={() => removeAsset(asset.id)}
                          variant="ghost"
                          size="sm"
                          className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                        {Object.entries(featureConfig).map(([featureName, config]) => {
                          const limit = limits.find(l => l.feature_name === featureName);
                          const isAssigned = asset.assignments.includes(featureName);
                          const canAssign = !isAssigned && limit && limit.current_count < limit.limit_count;
                          const remainingCredits = limit ? limit.limit_count - limit.current_count : 0;

                          return (
                            <div key={featureName} className="flex items-center space-x-3 p-3 bg-stravesta-navy/30 rounded border border-stravesta-teal/10">
                              <Checkbox
                                checked={isAssigned}
                                onCheckedChange={(checked) => 
                                  toggleFeatureAssignment(asset.id, featureName, !!checked)
                                }
                                disabled={!isAssigned && !canAssign}
                              />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-2 mb-1">
                                  {config.icon}
                                  <span className={`text-sm font-medium ${
                                    isAssigned ? 'text-stravesta-teal' : 'text-stravesta-lightGray'
                                  }`}>
                                    {config.name}
                                  </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  {!canAssign && !isAssigned ? (
                                    <Badge variant="secondary" className="text-xs bg-red-500/20 text-red-400 border-red-500/30">
                                      Keine Credits
                                    </Badge>
                                  ) : (
                                    <Badge variant="secondary" className="text-xs">
                                      {remainingCredits} verfügbar
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
      
      <Toaster />
    </div>
  );
};

export default WatchlistManagement;
