
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
      period: "Monat",
      description: "Perfekt für Trading-Einsteiger",
      badge: null,
      features: [
        "AI-Setup-Erkennung (Basic)",
        "Trading-Journal",
        "Community-Zugang",
        "Email Support",
        "5 AI-Alerts pro Tag"
      ],
      buttonText: "Jetzt starten",
      popular: false
    },
    {
      name: "Pro",
      price: "79",
      period: "Monat", 
      description: "Für professionelle Trader",
      badge: "Beliebt",
      features: [
        "Alle Starter Features",
        "Erweiterte AI-Setup-Erkennung",
        "Persönliche AI-Bots",
        "Live-Scan & Backtesting",
        "Unbegrenzte Alerts",
        "TradingView Integration",
        "Coach-Dashboard",
        "Priority Support"
      ],
      buttonText: "Pro werden",
      popular: true
    },
    {
      name: "Enterprise",
      price: "199",
      period: "Monat",
      description: "Für Trading-Teams & Coaches",
      badge: null,
      features: [
        "Alle Pro Features",
        "White-Label Solution",
        "Multi-User Management",
        "Custom Integrationen",
        "Dedicated Account Manager",
        "SLA & 24/7 Support",
        "Custom AI-Training",
        "API-Zugang"
      ],
      buttonText: "Kontakt aufnehmen",
      popular: false
    }
  ];

  return (
    <section className="py-20 bg-stravesta-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            💰 Preise & Pläne
          </h2>
          <p className="text-xl text-stravesta-lightGray max-w-3xl mx-auto">
            Wähle den Plan, der zu deinem Trading-Stil passt. 
            <br />
            Alle Pläne mit 14-tägiger Geld-zurück-Garantie.
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
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-stravesta-teal hover:bg-stravesta-teal/90 text-stravesta-dark' 
                      : 'bg-stravesta-navy border border-stravesta-teal text-stravesta-teal hover:bg-stravesta-teal hover:text-stravesta-dark'
                  }`}
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-stravesta-lightGray mb-4">
            🎓 Spezielle Rabatte für Studenten und Trading-Gruppen verfügbar
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-stravesta-lightGray">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-stravesta-teal" />
              14-Tage Geld-zurück-Garantie
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-stravesta-teal" />
              Jederzeit kündbar
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-stravesta-teal" />
              Keine Einrichtungsgebühren
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-stravesta-teal" />
              EU-DSGVO konform
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
