
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star } from 'lucide-react';

const PricingSection = () => {
  const plans = [
    {
      name: "Starter",
      price: "29",
      period: "Month",
      description: "Perfect for trading beginners",
      badge: null,
      features: [
        "AI Setup Recognition (Basic)",
        "Trading Journal",
        "Community Access",
        "Email Support",
        "5 AI Alerts per day"
      ],
      buttonText: "Start Now",
      popular: false
    },
    {
      name: "Pro",
      price: "79",
      period: "Month", 
      description: "For professional traders",
      badge: "Popular",
      features: [
        "All Starter Features",
        "Advanced AI Setup Recognition",
        "Personal AI Bots",
        "Live Scan & Backtesting",
        "Unlimited Alerts",
        "TradingView Integration",
        "Coach Dashboard",
        "Priority Support"
      ],
      buttonText: "Go Pro",
      popular: true
    },
    {
      name: "Enterprise",
      price: "199",
      period: "Month",
      description: "For trading teams & coaches",
      badge: null,
      features: [
        "All Pro Features",
        "White-Label Solution",
        "Multi-User Management",
        "Custom Integrations",
        "Dedicated Account Manager",
        "SLA & 24/7 Support",
        "Custom AI Training",
        "API Access"
      ],
      buttonText: "Contact Us",
      popular: false
    }
  ];

  return (
    <section className="py-20 bg-stravesta-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            💰 Pricing & Plans
          </h2>
          <p className="text-xl text-stravesta-lightGray max-w-3xl mx-auto">
            Choose the plan that fits your trading style. 
            <br />
            All plans with 14-day money-back guarantee.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative bg-stravesta-navy/50 border-stravesta-teal/20 hover:border-stravesta-teal/40 transition-all duration-300 ${
                plan.popular ? 'scale-105 border-stravesta-teal/60' : 'hover:scale-105'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-stravesta-teal text-stravesta-dark font-semibold px-4 py-1">
                    <Star className="w-3 h-3 mr-1" />
                    {plan.badge}
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl text-white mb-2">{plan.name}</CardTitle>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gradient">€{plan.price}</span>
                  <span className="text-stravesta-lightGray">/{plan.period}</span>
                </div>
                <p className="text-stravesta-lightGray">{plan.description}</p>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-stravesta-teal mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-stravesta-lightGray">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className="w-full bg-stravesta-teal hover:bg-stravesta-teal/90 text-black font-semibold"
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-stravesta-lightGray mb-4">
            🎓 Special discounts available for students and trading groups
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-stravesta-lightGray">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-stravesta-teal" />
              14-day money-back guarantee
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-stravesta-teal" />
              Cancel anytime
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-stravesta-teal" />
              No setup fees
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-stravesta-teal" />
              EU-GDPR compliant
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
