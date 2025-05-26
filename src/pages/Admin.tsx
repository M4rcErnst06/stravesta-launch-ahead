
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/components/ui/use-toast';
import { Toaster } from '@/components/ui/toaster';
import { Mail, LogOut, Trash2, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { User } from '@supabase/supabase-js';

// Type for subscriber data
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
  const [deleting, setDeleting] = useState(false);
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [selectedSubscribers, setSelectedSubscribers] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthAndLoadData();
  }, []);

  const checkAuthAndLoadData = async () => {
    try {
      // Check authentication
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !session) {
        navigate('/auth');
        return;
      }

      // Check if user is admin
      const { data: isAdminResult, error: adminError } = await supabase
        .rpc('is_admin', { user_email: session.user.email });

      if (adminError || !isAdminResult) {
        console.error("Admin check failed:", adminError);
        toast({
          title: "Zugriff verweigert",
          description: "Admin-Berechtigung erforderlich.",
          variant: "destructive",
        });
        await supabase.auth.signOut();
        navigate('/auth');
        return;
      }

      setUser(session.user);
      fetchSubscribers();
    } catch (error) {
      console.error('Auth check error:', error);
      navigate('/auth');
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
        title: "Fehler beim Laden",
        description: "Abonnenten konnten nicht geladen werden.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/auth');
    } catch (error) {
      console.error('Sign out error:', error);
      toast({
        title: "Fehler",
        description: "Abmeldung fehlgeschlagen.",
        variant: "destructive",
      });
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedSubscribers(subscribers.map(s => s.id));
    } else {
      setSelectedSubscribers([]);
    }
  };

  const handleSelectSubscriber = (subscriberId: string, checked: boolean) => {
    if (checked) {
      setSelectedSubscribers(prev => [...prev, subscriberId]);
    } else {
      setSelectedSubscribers(prev => prev.filter(id => id !== subscriberId));
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedSubscribers.length === 0) {
      toast({
        title: "Keine Auswahl",
        description: "Bitte wählen Sie mindestens einen Abonnenten aus.",
        variant: "destructive",
      });
      return;
    }

    const confirmed = window.confirm(
      `Sind Sie sicher, dass Sie ${selectedSubscribers.length} Abonnent(en) löschen möchten?`
    );

    if (!confirmed) return;

    setDeleting(true);

    try {
      const { error } = await supabase
        .from('subscribers')
        .delete()
        .in('id', selectedSubscribers);

      if (error) throw error;

      toast({
        title: "Erfolgreich gelöscht",
        description: `${selectedSubscribers.length} Abonnent(en) wurden gelöscht.`,
      });

      // Refresh subscribers list and clear selection
      setSelectedSubscribers([]);
      fetchSubscribers();
    } catch (error) {
      console.error('Error deleting subscribers:', error);
      toast({
        title: "Löschfehler",
        description: "Fehler beim Löschen der Abonnenten. Bitte versuchen Sie es erneut.",
        variant: "destructive",
      });
    } finally {
      setDeleting(false);
    }
  };

  const handleSendNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!subject.trim() || !content.trim()) {
      toast({
        title: "Validierungsfehler",
        description: "Betreff und Inhalt sind erforderlich.",
        variant: "destructive",
      });
      return;
    }
    
    setSending(true);
    
    try {
      // Get current session to ensure we have the latest token
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error("Keine aktive Sitzung");
      }

      // Use selected subscribers if any are selected, otherwise send to all
      const targetEmails = selectedSubscribers.length > 0 
        ? subscribers.filter(s => selectedSubscribers.includes(s.id)).map(s => s.email)
        : subscribers.map(s => s.email);

      if (targetEmails.length === 0) {
        toast({
          title: "Keine Empfänger",
          description: "Keine Abonnenten zum Senden ausgewählt.",
          variant: "destructive",
        });
        setSending(false);
        return;
      }

      console.log("Sending newsletter request...");
      console.log("Target emails count:", targetEmails.length);
      console.log("Session token present:", !!session.access_token);

      // Prepare the request body
      const requestBody = {
        subject: subject.trim(),
        content: content.trim(),
        subscribers: targetEmails
      };

      console.log("Request body prepared:", requestBody);

      // Call Supabase Edge Function using the client method
      const { data, error } = await supabase.functions.invoke('send-newsletter', {
        body: requestBody,
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (error) {
        console.error('Newsletter sending error:', error);
        throw new Error(error.message || 'Fehler beim Senden des Newsletters');
      }
      
      console.log("Newsletter sent successfully:", data);
      
      toast({
        title: "Newsletter gesendet",
        description: `Erfolgreich an ${targetEmails.length} Abonnenten gesendet.`,
      });
      
      // Reset form and selection
      setSubject('');
      setContent('');
      setSelectedSubscribers([]);
    } catch (error: any) {
      console.error('Error sending newsletter:', error);
      
      // More detailed error handling
      const errorMessage = error?.message || 'Unbekannter Fehler aufgetreten';
      
      toast({
        title: "Newsletter Fehler",
        description: `Fehler beim Senden: ${errorMessage}`,
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-stravesta-dark flex items-center justify-center">
        <div className="text-white">Lädt...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stravesta-dark bg-tech-pattern relative">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-stravesta-dark/90 pointer-events-none"></div>
      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Newsletter Admin</h1>
            <p className="text-stravesta-lightGray mt-1">Willkommen, {user.email}</p>
          </div>
          <Button 
            onClick={handleSignOut}
            variant="outline"
            className="text-stravesta-lightGray border-stravesta-darkGray bg-stravesta-navy/50 hover:bg-stravesta-navy hover:text-white hover:border-stravesta-teal"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Abmelden
          </Button>
        </div>
        
        {/* Subscriber count */}
        <div className="bg-stravesta-navy/50 p-6 rounded-lg mb-8">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-stravesta-teal/20 rounded-full">
              <Mail className="h-6 w-6 text-stravesta-teal" />
            </div>
            <div>
              <h2 className="text-xl font-medium text-white">Gesamte Abonnenten</h2>
              <p className="text-3xl font-bold text-stravesta-teal">{subscribers.length}</p>
              {selectedSubscribers.length > 0 && (
                <p className="text-sm text-stravesta-lightGray">
                  {selectedSubscribers.length} ausgewählt für Newsletter
                </p>
              )}
            </div>
          </div>
        </div>
        
        {/* Send newsletter form */}
        <div className="bg-stravesta-navy/30 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Newsletter senden</h2>
          <form onSubmit={handleSendNewsletter} className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Newsletter Betreff"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="bg-stravesta-navy/70 border-stravesta-darkGray text-white placeholder:text-stravesta-lightGray/60 focus:border-stravesta-teal focus:ring-stravesta-teal focus-visible:ring-stravesta-teal"
                required
              />
            </div>
            <div>
              <Textarea
                placeholder="Newsletter Inhalt (Unterstützt **fett** und *kursiv* Text)"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[200px] bg-stravesta-navy/70 border-stravesta-darkGray text-white placeholder:text-stravesta-lightGray/60 focus:border-stravesta-teal focus:ring-stravesta-teal focus-visible:ring-stravesta-teal"
                required
              />
            </div>
            <div className="bg-stravesta-navy/50 p-4 rounded-lg">
              <p className="text-stravesta-lightGray text-sm mb-2">
                {selectedSubscribers.length > 0 
                  ? `Newsletter wird an ${selectedSubscribers.length} ausgewählte Abonnenten gesendet`
                  : `Newsletter wird an alle ${subscribers.length} Abonnenten gesendet`
                }
              </p>
            </div>
            <Button 
              type="submit" 
              className="bg-stravesta-teal hover:bg-stravesta-teal/90 text-stravesta-dark font-medium"
              disabled={sending || subscribers.length === 0}
            >
              <Send className="h-4 w-4 mr-2" />
              {sending 
                ? "Wird gesendet..." 
                : selectedSubscribers.length > 0 
                  ? `An ${selectedSubscribers.length} Ausgewählte senden`
                  : `An alle ${subscribers.length} Abonnenten senden`
              }
            </Button>
          </form>
        </div>
        
        {/* Subscribers list */}
        <div className="bg-stravesta-navy/30 p-6 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white">Abonnenten</h2>
            <div className="flex gap-2">
              {selectedSubscribers.length > 0 && (
                <Button 
                  onClick={handleDeleteSelected}
                  variant="outline"
                  size="sm"
                  className="text-red-400 border-red-400/50 bg-red-500/10 hover:bg-red-500/20 hover:text-red-300 hover:border-red-300"
                  disabled={deleting}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  {deleting ? "Wird gelöscht..." : `${selectedSubscribers.length} löschen`}
                </Button>
              )}
              <Button 
                onClick={fetchSubscribers}
                variant="outline"
                size="sm"
                className="text-stravesta-lightGray border-stravesta-darkGray bg-stravesta-navy/50 hover:bg-stravesta-navy hover:text-white hover:border-stravesta-teal"
                disabled={loading}
              >
                {loading ? "Lädt..." : "Aktualisieren"}
              </Button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b border-stravesta-darkGray">
                <tr>
                  <th className="py-3 px-4 text-stravesta-lightGray font-medium">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={selectedSubscribers.length === subscribers.length && subscribers.length > 0}
                        onCheckedChange={handleSelectAll}
                        className="border-stravesta-darkGray data-[state=checked]:bg-stravesta-teal data-[state=checked]:border-stravesta-teal"
                      />
                      <span>Alle auswählen</span>
                    </div>
                  </th>
                  <th className="py-3 px-4 text-stravesta-lightGray font-medium">E-Mail</th>
                  <th className="py-3 px-4 text-stravesta-lightGray font-medium">Angemeldet am</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stravesta-darkGray">
                {loading ? (
                  <tr>
                    <td colSpan={3} className="py-4 px-4 text-center text-stravesta-lightGray">
                      Lade Abonnenten...
                    </td>
                  </tr>
                ) : subscribers.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="py-4 px-4 text-center text-stravesta-lightGray">
                      Noch keine Abonnenten.
                    </td>
                  </tr>
                ) : (
                  subscribers.map((subscriber) => (
                    <tr key={subscriber.id}>
                      <td className="py-3 px-4">
                        <Checkbox
                          checked={selectedSubscribers.includes(subscriber.id)}
                          onCheckedChange={(checked) => handleSelectSubscriber(subscriber.id, checked as boolean)}
                          className="border-stravesta-darkGray data-[state=checked]:bg-stravesta-teal data-[state=checked]:border-stravesta-teal"
                        />
                      </td>
                      <td className="py-3 px-4 text-white">{subscriber.email}</td>
                      <td className="py-3 px-4 text-stravesta-lightGray">
                        {new Date(subscriber.subscribed_at).toLocaleDateString('de-DE')}
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
