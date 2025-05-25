import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { Toaster } from '@/components/ui/toaster';
import { Mail } from 'lucide-react';

// Type for subscriber data - fixed to match actual database column name
interface Subscriber {
  id: string;
  email: string;
  subscribed_at: string;
  created_at: string;
}

const Admin = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginAttempt, setLoginAttempt] = useState(false);

  // Check admin auth on load
  useEffect(() => {
    checkAuthentication();
  }, []);

  // Simple admin password auth (in a real app, use Supabase Auth)
  const checkAuthentication = async () => {
    const session = await supabase.auth.getSession();
    if (session.data.session) {
      setIsAuthenticated(true);
      fetchSubscribers();
    } else {
      setIsAuthenticated(false);
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginAttempt(true);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: 'admin@stravesta.com', // replace with your admin email when setting up
        password: password
      });
      
      if (error) {
        toast({
          title: "Authentication failed",
          description: "Invalid credentials. Please try again.",
          variant: "destructive",
        });
        return;
      }
      
      setIsAuthenticated(true);
      fetchSubscribers();
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login error",
        description: "An error occurred during login.",
        variant: "destructive",
      });
    } finally {
      setLoginAttempt(false);
    }
  };

  const fetchSubscribers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('subscribers')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setSubscribers(data || []);
    } catch (error) {
      console.error('Error fetching subscribers:', error);
      toast({
        title: "Fetch error",
        description: "Failed to load subscribers.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSendNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!subject || !content) {
      toast({
        title: "Validation error",
        description: "Subject and content are required.",
        variant: "destructive",
      });
      return;
    }
    
    setSending(true);
    
    try {
      // Call Supabase Edge Function to send emails
      const { error } = await supabase.functions.invoke('send-newsletter', {
        body: {
          subject,
          content,
          subscribers: subscribers.map(s => s.email)
        }
      });
      
      if (error) throw error;
      
      toast({
        title: "Newsletter sent",
        description: `Successfully sent to ${subscribers.length} subscribers.`,
      });
      
      // Reset form
      setSubject('');
      setContent('');
    } catch (error) {
      console.error('Error sending newsletter:', error);
      toast({
        title: "Send error",
        description: "Failed to send newsletter. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-stravesta-dark flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md space-y-8 p-8 bg-stravesta-navy rounded-lg shadow-xl">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-6">Admin Access</h1>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <Input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-stravesta-darkGray border-stravesta-darkGray text-white"
              required
            />
            <Button 
              type="submit" 
              className="bg-stravesta-teal hover:bg-stravesta-teal/90 text-stravesta-dark font-medium w-full"
              disabled={loginAttempt}
            >
              {loginAttempt ? "Logging in..." : "Log In"}
            </Button>
          </form>
        </div>
        <Toaster />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stravesta-dark bg-tech-pattern relative">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-stravesta-dark/90 pointer-events-none"></div>
      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Newsletter Admin</h1>
          <Button 
            onClick={() => supabase.auth.signOut().then(() => setIsAuthenticated(false))}
            variant="outline"
            className="text-white border-white hover:bg-white/10"
          >
            Sign Out
          </Button>
        </div>
        
        {/* Subscriber count */}
        <div className="bg-stravesta-navy/50 p-6 rounded-lg mb-8">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-stravesta-teal/20 rounded-full">
              <Mail className="h-6 w-6 text-stravesta-teal" />
            </div>
            <div>
              <h2 className="text-xl font-medium text-white">Total Subscribers</h2>
              <p className="text-3xl font-bold text-stravesta-teal">{subscribers.length}</p>
            </div>
          </div>
        </div>
        
        {/* Send newsletter form */}
        <div className="bg-stravesta-navy/30 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Send Newsletter</h2>
          <form onSubmit={handleSendNewsletter} className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Newsletter Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="bg-stravesta-navy border-stravesta-darkGray text-white"
                required
              />
            </div>
            <div>
              <Textarea
                placeholder="Newsletter Content (Supports Markdown)"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[200px] bg-stravesta-navy border-stravesta-darkGray text-white"
                required
              />
            </div>
            <Button 
              type="submit" 
              className="bg-stravesta-teal hover:bg-stravesta-teal/90 text-stravesta-dark font-medium"
              disabled={sending}
            >
              {sending ? "Sending..." : `Send to ${subscribers.length} Subscribers`}
            </Button>
          </form>
        </div>
        
        {/* Subscribers list */}
        <div className="bg-stravesta-navy/30 p-6 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white">Subscribers</h2>
            <Button 
              onClick={fetchSubscribers}
              variant="outline"
              size="sm"
              className="text-white border-white hover:bg-white/10"
              disabled={loading}
            >
              {loading ? "Loading..." : "Refresh"}
            </Button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b border-stravesta-darkGray">
                <tr>
                  <th className="py-3 px-4 text-stravesta-lightGray font-medium">Email</th>
                  <th className="py-3 px-4 text-stravesta-lightGray font-medium">Subscribed On</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stravesta-darkGray">
                {loading ? (
                  <tr>
                    <td colSpan={2} className="py-4 px-4 text-center text-stravesta-lightGray">
                      Loading subscribers...
                    </td>
                  </tr>
                ) : subscribers.length === 0 ? (
                  <tr>
                    <td colSpan={2} className="py-4 px-4 text-center text-stravesta-lightGray">
                      No subscribers yet.
                    </td>
                  </tr>
                ) : (
                  subscribers.map((subscriber) => (
                    <tr key={subscriber.id}>
                      <td className="py-3 px-4 text-white">{subscriber.email}</td>
                      <td className="py-3 px-4 text-stravesta-lightGray">
                        {new Date(subscriber.subscribed_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Admin;
