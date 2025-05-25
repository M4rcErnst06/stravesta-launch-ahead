
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
      
      // Try to insert directly - if it fails due to duplicate, we'll handle it
      const { data: insertData, error: insertError } = await supabase
        .from('subscribers')
        .insert([
          { 
            email: email.toLowerCase().trim(), // Normalize email
            subscribed_at: new Date().toISOString()
          }
        ])
        .select();
      
      console.log('Insert attempt result:', { insertData, insertError });
      
      // Check if error is due to duplicate email (unique constraint violation)
      if (insertError) {
        if (insertError.code === '23505' || insertError.message?.includes('duplicate') || insertError.message?.includes('already exists')) {
          toast({
            title: "Already subscribed",
            description: "This email is already subscribed to our newsletter.",
          });
        } else {
          console.error('Database insert error:', insertError);
          toast({
            title: "Subscription failed",
            description: "There was a problem with the subscription. Please try again.",
            variant: "destructive"
          });
        }
        setLoading(false);
        return;
      }
      
      console.log('Subscriber inserted successfully');
      
      // Send welcome email - this should not block the success response
      try {
        console.log('Attempting to send welcome email...');
        const { error: emailError } = await supabase.functions.invoke('send-welcome-email', {
          body: { 
            email: email.toLowerCase().trim(),
            user_name: email.split('@')[0] // Use part before @ as name
          }
        });
        
        if (emailError) {
          console.error('Welcome email error (non-blocking):', emailError);
        } else {
          console.log('Welcome email sent successfully');
        }
      } catch (emailError) {
        console.error('Failed to send welcome email (non-blocking):', emailError);
      }
      
      // Success response
      toast({
        title: "Thank you!",
        description: "You've been successfully subscribed to our newsletter!",
      });
      setEmail('');
      
    } catch (error: any) {
      console.error('Unexpected error in subscription process:', error);
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
