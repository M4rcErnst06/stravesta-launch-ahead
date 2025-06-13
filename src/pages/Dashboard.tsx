
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Toaster } from '@/components/ui/toaster';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, TrendingUp, BarChart3, Settings } from 'lucide-react';
import { User as SupabaseUser, Session } from '@supabase/supabase-js';

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
              Bereit für Ihr Trading mit KI-Power? Hier ist Ihr persönliches Dashboard.
            </p>
          </div>

          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <div className="bg-stravesta-navy/50 p-6 rounded-lg border border-stravesta-teal/10 hover:border-stravesta-teal/30 transition-all">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-stravesta-teal/20 rounded-full">
                  <TrendingUp className="h-6 w-6 text-stravesta-teal" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Trading Performance</h3>
                  <p className="text-stravesta-lightGray">Bald verfügbar</p>
                </div>
              </div>
            </div>

            <div className="bg-stravesta-navy/50 p-6 rounded-lg border border-stravesta-teal/10 hover:border-stravesta-teal/30 transition-all">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-stravesta-teal/20 rounded-full">
                  <BarChart3 className="h-6 w-6 text-stravesta-teal" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">AI-Analyse</h3>
                  <p className="text-stravesta-lightGray">Wird entwickelt</p>
                </div>
              </div>
            </div>

            <div className="bg-stravesta-navy/50 p-6 rounded-lg border border-stravesta-teal/10 hover:border-stravesta-teal/30 transition-all">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-stravesta-teal/20 rounded-full">
                  <Settings className="h-6 w-6 text-stravesta-teal" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Einstellungen</h3>
                  <p className="text-stravesta-lightGray">Profil verwalten</p>
                </div>
              </div>
            </div>
          </div>

          {/* Beta Notice */}
          <div className="bg-gradient-to-r from-stravesta-teal/10 to-stravesta-navy/30 p-6 rounded-lg border border-stravesta-teal/20">
            <h3 className="text-xl font-semibold text-white mb-2">🚀 Beta-Zugang aktiv</h3>
            <p className="text-stravesta-lightGray mb-4">
              Sie haben frühen Zugang zu Stravesta! Weitere Features werden in Kürze freigeschaltet.
            </p>
            <div className="flex space-x-4">
              <Button className="bg-stravesta-teal hover:bg-stravesta-teal/90 text-stravesta-dark">
                Features entdecken
              </Button>
              <Button variant="outline" className="border-stravesta-teal text-stravesta-teal hover:bg-stravesta-teal hover:text-stravesta-dark">
                Feedback geben
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
