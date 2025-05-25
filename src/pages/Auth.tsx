
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { Toaster } from '@/components/ui/toaster';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowLeft } from 'lucide-react';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/admin');
      }
    };
    checkAuth();
  }, [navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        
        if (error) throw error;
        
        toast({
          title: "Account created",
          description: "Please check your email to confirm your account.",
        });
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) throw error;
        
        // Check if user is admin
        const { data: isAdminResult, error: adminError } = await supabase
          .rpc('is_admin', { user_email: email });

        if (adminError) {
          console.error("Admin check failed:", adminError);
          await supabase.auth.signOut();
          throw new Error("Authentication failed");
        }

        if (!isAdminResult) {
          await supabase.auth.signOut();
          throw new Error("Access denied. Admin privileges required.");
        }
        
        toast({
          title: "Welcome back!",
          description: "Successfully logged in.",
        });
        
        navigate('/admin');
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      toast({
        title: "Authentication failed",
        description: error.message || "An error occurred during authentication.",
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
            {isSignUp ? 'Create Account' : 'Admin Login'}
          </h1>
          <p className="text-stravesta-lightGray">
            {isSignUp ? 'Sign up for admin access' : 'Sign in to access the admin panel'}
          </p>
        </div>
        
        <form onSubmit={handleAuth} className="space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-stravesta-lightGray" />
              <Input
                type="email"
                placeholder="Email address"
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
                placeholder="Password"
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
            {loading ? "Processing..." : isSignUp ? "Create Account" : "Sign In"}
          </Button>
        </form>
        
        <div className="text-center">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-stravesta-teal hover:text-stravesta-teal/80 text-sm"
          >
            {isSignUp ? 'Already have an account? Sign in' : 'Need an account? Sign up'}
          </button>
        </div>
        
        <div className="text-center">
          <Link 
            to="/"
            className="inline-flex items-center text-stravesta-lightGray hover:text-white text-sm"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to home
          </Link>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Auth;
