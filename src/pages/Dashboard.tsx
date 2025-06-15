import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Toaster } from '@/components/ui/toaster';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, TrendingUp, BarChart3, Settings, Brain, Bot, Calendar, MessageSquare, FileText, Target } from 'lucide-react';
import { User as SupabaseUser, Session } from '@supabase/supabase-js';
import DashboardSkeleton from '@/components/DashboardSkeleton';
import LoadingSpinner from '@/components/LoadingSpinner';
import DraggableToolCard from '@/components/DraggableToolCard';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable';

interface UserProfile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  display_name: string;
  avatar_url?: string;
}

interface Tool {
  id: string;
  icon: React.ReactNode;
  title: string;
  status: 'active' | 'coming-soon' | 'beta';
  onUse?: () => void;
}

const Dashboard = () => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(false);
  const navigate = useNavigate();

  const [tools, setTools] = useState<Tool[]>([
    {
      id: 'ai-setup',
      icon: <Brain className="h-8 w-8" />,
      title: "AI Setup-Erkennung",
      status: 'active' as const,
      onUse: () => navigate('/ai-setup-recognition')
    },
    {
      id: 'trading-bot',
      icon: <Bot className="h-8 w-8" />,
      title: "Trading Bot",
      status: 'coming-soon' as const,
    },
    {
      id: 'trading-journal',
      icon: <FileText className="h-8 w-8" />,
      title: "Trading Journal",
      status: 'active' as const,
      onUse: () => navigate('/trading-journal')
    },
    {
      id: 'portfolio-analyse',
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Portfolio Analyse",
      status: 'coming-soon' as const,
    },
    {
      id: 'community-chat',
      icon: <MessageSquare className="h-8 w-8" />,
      title: "Community Chat",
      status: 'active' as const,
      onUse: () => navigate('/community-chat')
    },
    {
      id: 'economic-calendar',
      icon: <Calendar className="h-8 w-8" />,
      title: "Economic Calendar",
      status: 'active' as const,
      onUse: () => navigate('/economic-calendar')
    },
    {
      id: 'backtesting',
      icon: <Target className="h-8 w-8" />,
      title: "Backtesting Engine",
      status: 'coming-soon' as const,
    },
    {
      id: 'market-scanner',
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Market Scanner",
      status: 'coming-soon' as const,
    }
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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

  // Load saved tool order from localStorage
  useEffect(() => {
    const savedOrder = localStorage.getItem('dashboard-tool-order');
    if (savedOrder && user) {
      try {
        const orderIds = JSON.parse(savedOrder);
        const reorderedTools = orderIds.map((id: string) => 
          tools.find(tool => tool.id === id)
        ).filter(Boolean);
        
        // Add any new tools that weren't in the saved order
        const existingIds = orderIds;
        const newTools = tools.filter(tool => !existingIds.includes(tool.id));
        
        setTools([...reorderedTools, ...newTools]);
      } catch (error) {
        console.error('Error loading tool order:', error);
      }
    }
  }, [user]);

  const fetchUserProfile = async (userId: string) => {
    setProfileLoading(true);
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
      setProfileLoading(false);
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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setTools((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over?.id);
        
        const newOrder = arrayMove(items, oldIndex, newIndex);
        
        // Save new order to localStorage
        const orderIds = newOrder.map(tool => tool.id);
        localStorage.setItem('dashboard-tool-order', JSON.stringify(orderIds));
        
        return newOrder;
      });
    }
  };

  // Show full skeleton during initial load
  if (loading) {
    return <DashboardSkeleton />;
  }

  const displayName = profile?.display_name || 
                     `${profile?.first_name} ${profile?.last_name}`.trim() ||
                     user?.email?.split('@')[0] ||
                     'Benutzer';

  return (
    <div className="min-h-screen bg-stravesta-dark relative">
      <div className="absolute inset-0 bg-gradient-to-br from-stravesta-teal/5 via-transparent to-stravesta-navy/20"></div>
      
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
                  {profileLoading ? (
                    <LoadingSpinner size="sm" />
                  ) : (
                    <span className="font-medium">{displayName}</span>
                  )}
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
            <p className="text-sm text-stravesta-lightGray mt-2">
              💡 Tipp: Sie können die Kacheln per Drag & Drop neu anordnen!
            </p>
          </div>

          {/* Tools Grid with Drag and Drop */}
          <DndContext 
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext 
              items={tools.map(tool => tool.id)}
              strategy={rectSortingStrategy}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                {tools.map((tool) => (
                  <div key={tool.id}>
                    <DraggableToolCard
                      id={tool.id}
                      icon={tool.icon}
                      title={tool.title}
                      status={tool.status}
                      onUse={tool.onUse}
                    />
                  </div>
                ))}
              </div>
            </SortableContext>
          </DndContext>

          {/* Beta Notice */}
          <div className="bg-stravesta-navy/50 border border-stravesta-teal/20 p-6 rounded-lg backdrop-blur-sm">
            <h3 className="text-xl font-semibold text-white mb-2">🚀 Beta-Zugang aktiv</h3>
            <p className="text-stravesta-lightGray mb-4">
              Sie haben frühen Zugang zu Stravesta! Weitere Tools werden kontinuierlich freigeschaltet.
            </p>
            <div className="flex space-x-4">
              <Button className="bg-stravesta-teal hover:bg-stravesta-teal/90 text-stravesta-dark font-semibold transition-all duration-300">
                Feedback geben
              </Button>
              <Button variant="outline" className="border-stravesta-teal text-stravesta-teal hover:bg-stravesta-teal hover:text-stravesta-dark transition-all duration-300">
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
