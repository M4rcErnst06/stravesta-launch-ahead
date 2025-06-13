
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { Toaster } from '@/components/ui/toaster';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowLeft, User } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/dashboard');
      }
    };
    checkAuth();
  }, [navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        const redirectUrl = `${window.location.origin}/dashboard`;
        
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: redirectUrl,
            data: {
              first_name: firstName,
              last_name: lastName,
            }
          }
        });
        
        if (error) throw error;
        
        toast({
          title: "Konto erstellt",
          description: "Bitte überprüfen Sie Ihre E-Mail zur Bestätigung.",
        });
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) throw error;
        
        toast({
          title: "Willkommen zurück!",
          description: "Erfolgreich angemeldet.",
        });
        
        navigate('/dashboard');
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      toast({
        title: "Authentifizierung fehlgeschlagen",
        description: error.message || "Ein Fehler ist aufgetreten.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stravesta-dark flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8 p-8 bg-stravesta-navy rounded-lg shadow-xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">
            {isSignUp ? 'Konto erstellen' : 'Anmelden'}
          </h1>
          <p className="text-stravesta-lightGray">
            {isSignUp ? 'Erstellen Sie Ihr Stravesta-Konto' : 'Bei Ihrem Stravesta-Konto anmelden'}
          </p>
        </div>
        
        <form onSubmit={handleAuth} className="space-y-6">
          <div className="space-y-4">
            {isSignUp && (
              <>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-stravesta-lightGray" />
                  <Input
                    type="text"
                    placeholder="Vorname"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="pl-10 bg-stravesta-darkGray border-stravesta-darkGray text-white placeholder:text-stravesta-lightGray"
                    required
                  />
                </div>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-stravesta-lightGray" />
                  <Input
                    type="text"
                    placeholder="Nachname"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="pl-10 bg-stravesta-darkGray border-stravesta-darkGray text-white placeholder:text-stravesta-lightGray"
                    required
                  />
                </div>
              </>
            )}
            
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-stravesta-lightGray" />
              <Input
                type="email"
                placeholder="E-Mail-Adresse"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 bg-stravesta-darkGray border-stravesta-darkGray text-white placeholder:text-stravesta-lightGray"
                required
              />
            </div>
            
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-stravesta-lightGray" />
              <Input
                type="password"
                placeholder="Passwort"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 bg-stravesta-darkGray border-stravesta-darkGray text-white placeholder:text-stravesta-lightGray"
                required
                minLength={6}
              />
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="bg-stravesta-teal hover:bg-stravesta-teal/90 text-stravesta-dark font-medium w-full"
            disabled={loading}
          >
            {loading ? "Wird verarbeitet..." : isSignUp ? "Konto erstellen" : "Anmelden"}
          </Button>
        </form>
        
        <div className="text-center">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-stravesta-teal hover:text-stravesta-teal/80 text-sm"
          >
            {isSignUp ? 'Bereits ein Konto? Jetzt anmelden' : 'Neues Konto? Jetzt registrieren'}
          </button>
        </div>
        
        <div className="text-center">
          <Link 
            to="/"
            className="inline-flex items-center text-stravesta-lightGray hover:text-white text-sm"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Zurück zur Startseite
          </Link>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Login;
