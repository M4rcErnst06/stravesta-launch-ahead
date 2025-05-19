
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

const EmailSubscribeForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
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
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Thank you!",
        description: "You've been added to our early access list.",
      });
      setEmail('');
      setLoading(false);
    }, 1000);
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
