
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
      console.log('Starting subscription process for email:', email);
      
      // Check if subscriber already exists
      const { data: existingSubscriber, error: existingError } = await supabase
        .from('subscribers')
        .select('id')
        .eq('email', email)
        .maybeSingle();
      
      console.log('Existing subscriber check:', { existingSubscriber, existingError });
      
      if (existingError) {
        console.error('Error checking existing subscriber:', existingError);
        throw new Error('Database error while checking subscription');
      }
      
      if (existingSubscriber) {
        toast({
          title: "Already subscribed",
          description: "This email is already subscribed to our newsletter.",
        });
        setLoading(false);
        return;
      }
      
      // Insert new subscriber
      console.log('Inserting new subscriber...');
      const { error: insertError } = await supabase
        .from('subscribers')
        .insert([
          { 
            email: email, 
            subscribed_at: new Date().toISOString()
          }
        ]);
      
      if (insertError) {
        console.error('Insert error:', insertError);
        throw new Error('Failed to save subscription');
      }
      
      console.log('Subscriber inserted successfully');
      
      // Send welcome email - don't let this block success
      try {
        console.log('Sending welcome email...');
        const { error: emailError } = await supabase.functions.invoke('send-welcome-email', {
          body: { 
            email: email,
            user_name: email.split('@')[0] // Use part before @ as name
          }
        });
        
        if (emailError) {
          console.error('Welcome email error:', emailError);
          // Don't throw here - subscription was successful even if email fails
        } else {
          console.log('Welcome email sent successfully');
        }
      } catch (emailError) {
        console.error('Failed to send welcome email:', emailError);
        // Continue - subscription was successful
      }
      
      toast({
        title: "Thank you!",
        description: "You've been successfully subscribed to our newsletter!",
      });
      setEmail('');
      
    } catch (error: any) {
      console.error('Error in subscription process:', error);
      toast({
        title: "Subscription failed",
        description: error.message || "There was a problem subscribing to the newsletter. Please try again.",
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
          {loading ? "Subscribing..." : "Subscribe Now"}
        </Button>
      </div>
    </form>
  );
};

export default EmailSubscribeForm;
