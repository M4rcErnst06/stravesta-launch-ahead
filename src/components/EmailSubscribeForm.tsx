
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
    
    // Basic email validation
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
      console.log('Starting subscription for:', normalizedEmail);
      
      // Insert the subscriber directly
      const { data, error } = await supabase
        .from('subscribers')
        .insert({ 
          email: normalizedEmail,
          subscribed_at: new Date().toISOString()
        })
        .select('email');
      
      console.log('Insert result:', { data, error });
      
      if (error) {
        // Handle duplicate email error specifically
        if (error.code === '23505' || error.message?.includes('duplicate') || error.message?.includes('unique')) {
          toast({
            title: "Already subscribed",
            description: "This email is already subscribed to our newsletter.",
          });
          setEmail('');
          return;
        }
        
        console.error('Subscription error:', error);
        throw error;
      }
      
      console.log('Subscription successful');
      
      // Send welcome email in background (non-blocking)
      supabase.functions.invoke('send-welcome-email', {
        body: { 
          email: normalizedEmail,
          user_name: normalizedEmail.split('@')[0]
        }
      }).then(({ error: emailError }) => {
        if (emailError) {
          console.warn('Welcome email failed (non-critical):', emailError);
        } else {
          console.log('Welcome email sent');
        }
      }).catch((emailError) => {
        console.warn('Welcome email error (non-critical):', emailError);
      });
      
      // Show success message
      toast({
        title: "Thank you!",
        description: "You've been successfully subscribed to our newsletter!",
      });
      
      setEmail('');
      
    } catch (error: any) {
      console.error('Subscription failed:', error);
      
      toast({
        title: "Subscription failed",
        description: "An unexpected error occurred. Please try again.",
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
