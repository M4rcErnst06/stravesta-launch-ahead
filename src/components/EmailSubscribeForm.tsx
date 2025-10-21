
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

const EmailSubscribeForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    
    try {
      const normalizedEmail = email.toLowerCase().trim();
      
      // Insert new subscriber - database constraint prevents duplicates
      const { error } = await supabase
        .from('subscribers')
        .insert({ 
          email: normalizedEmail,
          subscribed_at: new Date().toISOString()
        });
      
      // Handle duplicate email (unique constraint violation)
      if (error) {
        if (error.code === '23505') {
          toast({
            title: "Already subscribed",
            description: "This email is already subscribed to our newsletter.",
          });
          setEmail('');
          setLoading(false);
          return;
        }
        throw error;
      }
      
      // Send welcome email in background (non-blocking)
      supabase.functions.invoke('send-welcome-email', {
        body: { 
          email: normalizedEmail,
          user_name: normalizedEmail.split('@')[0]
        }
      }).catch(() => {
        // Welcome email is non-critical, fail silently
      });
      
      toast({
        title: "Thank you!",
        description: "You've been successfully subscribed to our newsletter!",
      });
      
      setEmail('');
      
    } catch (error: any) {
      toast({
        title: "Subscription failed",
        description: error?.message || "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md w-full mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-grow bg-stravesta-navy border-stravesta-darkGray focus:border-stravesta-teal"
          required
          disabled={loading}
        />
        <Button 
          type="submit" 
          className="bg-stravesta-teal hover:bg-stravesta-teal/90 text-stravesta-dark font-medium teal-glow"
          disabled={loading || !email.trim()}
        >
          {loading ? "Subscribing..." : "Subscribe Now"}
        </Button>
      </div>
    </form>
  );
};

export default EmailSubscribeForm;
