
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabase';

const EmailSubscribeForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple email validation
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
      // Check if subscriber already exists
      const { data: existingSubscriber } = await supabase
        .from('subscribers')
        .select('id')
        .eq('email', email)
        .single();
      
      if (existingSubscriber) {
        toast({
          title: "Already subscribed",
          description: "This email is already subscribed to our newsletter.",
        });
        setLoading(false);
        return;
      }
      
      // Insert new subscriber
      const { error } = await supabase
        .from('subscribers')
        .insert([
          { email: email, subscribed_at: new Date().toISOString() }
        ]);
      
      if (error) throw error;
      
      toast({
        title: "Thank you!",
        description: "You've been added to our newsletter list.",
      });
      setEmail('');
    } catch (error) {
      console.error('Error saving subscriber:', error);
      toast({
        title: "Subscription failed",
        description: "There was a problem subscribing to the newsletter. Please try again.",
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
        />
        <Button 
          type="submit" 
          className="bg-stravesta-teal hover:bg-stravesta-teal/90 text-stravesta-dark font-medium teal-glow"
          disabled={loading}
        >
          {loading ? "Subscribing..." : "Get Early Access"}
        </Button>
      </div>
    </form>
  );
};

export default EmailSubscribeForm;
