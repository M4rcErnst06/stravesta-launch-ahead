
import React from 'react';
import { Button } from '@/components/ui/button';
import EmailSubscribeForm from '@/components/EmailSubscribeForm';
import { Rocket, Crown, Users, Zap } from 'lucide-react';

const CTASection = () => {
  
  return (
    <section className="py-20 bg-stravesta-dark relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-stravesta-teal/5 via-transparent to-stravesta-navy/20"></div>
      
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-stravesta-teal/10 border border-stravesta-teal/20 mb-8">
            <Crown className="h-4 w-4 text-stravesta-teal mr-2" />
            <span className="text-sm font-medium text-stravesta-teal">Early Access Program</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">Ready for the </span>
            <span className="text-gradient">next level?</span>
          </h2>
          
          <p className="text-xl text-stravesta-lightGray mb-8 max-w-3xl mx-auto">
            Join the trading revolution. Exclusive early access with special benefits for pioneers.
          </p>
          
          <div className="bg-stravesta-navy/40 backdrop-blur-sm rounded-2xl p-8 border border-stravesta-teal/20 max-w-2xl mx-auto mb-8">
            <div className="mb-6">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Rocket className="h-6 w-6 text-stravesta-teal" />
                <h3 className="text-2xl font-bold text-white">Early Access Benefits</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-stravesta-teal/5 hover:bg-stravesta-teal/10 transition-colors duration-300">
                  <Crown className="w-5 h-5 text-stravesta-teal flex-shrink-0" />
                  <span className="text-sm text-stravesta-lightGray">25% Launch Discount</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-stravesta-teal/5 hover:bg-stravesta-teal/10 transition-colors duration-300">
                  <Zap className="w-5 h-5 text-stravesta-teal flex-shrink-0" />
                  <span className="text-sm text-stravesta-lightGray">Beta Features First</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-stravesta-teal/5 hover:bg-stravesta-teal/10 transition-colors duration-300">
                  <Users className="w-5 h-5 text-stravesta-teal flex-shrink-0" />
                  <span className="text-sm text-stravesta-lightGray">Priority Support</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-stravesta-teal/5 hover:bg-stravesta-teal/10 transition-colors duration-300">
                  <Rocket className="w-5 h-5 text-stravesta-teal flex-shrink-0" />
                  <span className="text-sm text-stravesta-lightGray">Community Access</span>
                </div>
              </div>
            </div>
            
            <EmailSubscribeForm />
          </div>
          
          <p className="text-sm text-stravesta-lightGray">
            No financial advice • GDPR compliant • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
