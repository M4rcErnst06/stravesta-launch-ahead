import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Toaster } from '@/components/ui/toaster';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, TrendingUp, BarChart3, Settings, Brain, Bot, Calendar, MessageSquare, FileText, Target } from 'lucide-react';
import { User as SupabaseUser, Session } from '@supabase/supabase-js';
import ToolCard from '@/components/ToolCard';

interface UserProfile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  display_name: string;
  avatar_url?: string;
}

const Dashboard = () => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          setTimeout(() => {
            fetchUserProfile(session.user.id);
          }, 0);
        } else {
          navigate('/login');
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        navigate('/login');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }

      setProfile(data);
    } catch (error) {
      console.error('Profile fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Abgemeldet",
        description: "Sie wurden erfolgreich abgemeldet.",
      });
      navigate('/');
    } catch (error) {
      console.error('Sign out error:', error);
      toast({
        title: "Fehler",
        description: "Abmeldung fehlgeschlagen.",
        variant: "destructive",
      });
    }
  };

  const tools = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: "AI Setup-Erkennung",
      description: "Automatische Erkennung von Trading-Setups durch KI-Analyse",
      status: 'active' as const,
      features: [
        "Chart-Pattern Erkennung",
        "Support/Resistance Levels",
        "Trend-Analyse",
        "Signal-Konfidenz Score"
      ],
      onUse: () => navigate('/ai-setup-recognition')
    },
    {
      icon: <Bot className="h-8 w-8" />,
      title: "Trading Bot",
      description: "Personalisierte AI-Bots für automatisches Trading",
      status: 'coming-soon' as const,
      features: [
        "Personalisierte Strategien",
        "Risk Management",
        "24/7 Marktüberwachung",
        "Performance Tracking"
      ]
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Trading Journal",
      description: "Detaillierte Aufzeichnung und Analyse Ihrer Trades",
      status: 'active' as const,
      features: [
        "Trade-Logging",
        "Performance-Metriken",
        "Emotion Tracking",
        "Export-Funktionen"
      ],
      onUse: () => navigate('/trading-journal')
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Portfolio Analyse",
      description: "Umfassende Analyse Ihres Trading-Portfolios",
      status: 'beta' as const,
      features: [
        "Risk/Reward Analyse",
        "Diversifikation Metrics",
        "Drawdown Analyse",
        "Benchmark Vergleich"
      ],
      onUse: () => toast({ title: "Portfolio Analyse", description: "Analyse wird geladen..." })
    },
    {
      icon: <MessageSquare className="h-8 w-8" />,
      title: "Community Chat",
      description: "Austausch mit anderen Tradern und Experten",
      status: 'active' as const,
      features: [
        "Live Diskussionen",
        "Experten-Tipps",
        "Trade-Ideen teilen",
        "Mentoring Programme"
      ],
      onUse: () => navigate('/community-chat')
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      title: "Economic Calendar",
      description: "Wichtige Wirtschaftsereignisse und deren Impact",
      status: 'coming-soon' as const,
      features: [
        "Live News Feed",
        "Impact Bewertung",
        "Custom Alerts",
        "Historical Data"
      ]
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Backtesting Engine",
      description: "Teste deine Strategien mit historischen Daten",
      status: 'coming-soon' as const,
      features: [
        "Strategy Builder",
        "Historical Simulation",
        "Performance Metrics",
        "Optimization Tools"
      ]
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Market Scanner",
      description: "Scanne Märkte nach Trading-Gelegenheiten",
      status: 'beta' as const,
      features: [
        "Multi-Timeframe Scan",
        "Custom Screener",
        "Alert System",
        "Watchlist Management"
      ],
      onUse: () => toast({ title: "Market Scanner", description: "Scanner wird gestartet..." })
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-stravesta-dark flex items-center justify-center">
        <div className="text-white text-xl">Lädt Dashboard...</div>
      </div>
    );
  }

  const displayName = profile?.display_name || 
                     `${profile?.first_name} ${profile?.last_name}`.trim() ||
                     user?.email?.split('@')[0] ||
                     'Benutzer';

  return (
    <div className="min-h-screen bg-stravesta-dark bg-tech-pattern relative">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-stravesta-dark/90 pointer-events-none"></div>
      
      <div className="relative z-10">
        {/* Header */}
        <header className="bg-stravesta-navy/80 backdrop-blur-sm border-b border-stravesta-teal/20">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <h1 className="text-2xl font-bold text-gradient">Stravesta</h1>
                <span className="text-stravesta-lightGray">Dashboard</span>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-white">
                  <User className="h-5 w-5 text-stravesta-teal" />
                  <span className="font-medium">{displayName}</span>
                </div>
                
                <Button 
                  onClick={handleSignOut}
                  variant="outline"
                  size="sm"
                  className="text-stravesta-lightGray border-stravesta-darkGray bg-stravesta-navy/50 hover:bg-stravesta-navy hover:text-white hover:border-stravesta-teal"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Abmelden
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-12">
          {/* Welcome Section */}
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Willkommen zurück, {profile?.first_name || displayName}!
            </h2>
            <p className="text-xl text-stravesta-lightGray">
              Hier ist Ihre persönliche Tool-Übersicht. Entdecken Sie alle verfügbaren Features.
            </p>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {tools.map((tool, index) => (
              <ToolCard
                key={index}
                icon={tool.icon}
                title={tool.title}
                description={tool.description}
                status={tool.status}
                features={tool.features}
                onUse={tool.onUse}
              />
            ))}
          </div>

          {/* Beta Notice */}
          <div className="bg-gradient-to-r from-stravesta-teal/10 to-stravesta-navy/30 p-6 rounded-lg border border-stravesta-teal/20">
            <h3 className="text-xl font-semibold text-white mb-2">🚀 Beta-Zugang aktiv</h3>
            <p className="text-stravesta-lightGray mb-4">
              Sie haben frühen Zugang zu Stravesta! Weitere Tools werden kontinuierlich freigeschaltet.
            </p>
            <div className="flex space-x-4">
              <Button className="bg-stravesta-teal hover:bg-stravesta-teal/90 text-stravesta-dark">
                Feedback geben
              </Button>
              <Button variant="outline" className="border-stravesta-teal text-stravesta-teal hover:bg-stravesta-teal hover:text-stravesta-dark">
                Roadmap ansehen
              </Button>
            </div>
          </div>
        </main>
      </div>
      
      <Toaster />
    </div>
  );
};

export default Dashboard;
