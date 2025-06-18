
import React, { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import StatsSection from '@/components/StatsSection';
import FeatureSection from '@/components/FeatureSection';
import TestimonialSection from '@/components/TestimonialSection';
import PricingSection from '@/components/PricingSection';
import CTASection from '@/components/CTASection';
import { Bot, Target, Zap, Bell, BarChart3, Users, GraduationCap } from 'lucide-react';

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const aiFeatures = [
    {
      icon: <Bot className="h-12 w-12" />,
      title: "AI-Setup-Erkennung",
      description: "Intelligente Mustererkennung für deine erfolgreichen Trading-Strategien",
      features: [
        "Automatische Pattern-Erkennung",
        "Erfolgsbasierte Lernalgorithmen", 
        "Realtime Setup-Scanning",
        "Historische Datenanalyse"
      ],
      badge: "KI-Power"
    },
    {
      icon: <Target className="h-12 w-12" />,
      title: "Persönliche AI-Bots",
      description: "Maßgeschneiderte Trading-Assistenten die deinen Stil verstehen",
      features: [
        "Individuelle Lernalgorithmen",
        "Kontextbasierte Empfehlungen",
        "Adaptives Verhalten",
        "24/7 Marktüberwachung"
      ],
      badge: "Smart"
    },
    {
      icon: <Zap className="h-12 w-12" />,
      title: "Live-Scan & Backtesting",
      description: "Echtzeitanalyse kombiniert mit historischer Strategiebewertung",
      features: [
        "Realtime Marktscanning",
        "Automatisches Backtesting",
        "Performance-Validierung",
        "Risiko-Assessment"
      ],
      badge: "Live"
    },
    {
      icon: <Bell className="h-12 w-12" />,
      title: "Smart Alerts",
      description: "Intelligente Benachrichtigungen für perfekte Entry-Points",
      features: [
        "Regelbasierte Alerts",
        "AI-basierte Signale",
        "Telegram/Discord Integration",
        "Mobile Push-Notifications"
      ],
      badge: "Instant"
    },
    {
      icon: <BarChart3 className="h-12 w-12" />,
      title: "Trading-Journal",
      description: "Vollautomatische Erfassung und Analyse deiner Trades",
      features: [
        "Automatische Trade-Erfassung",
        "KPI-Dashboard",
        "Emotionale Analyse",
        "Screenshot-Integration",
        "Performance-Tracking"
      ],
      badge: "Automatisch"
    },
    {
      icon: <Users className="h-12 w-12" />,
      title: "Community-Modul",
      description: "Vernetze dich mit gleichgesinnten Tradern und teile Strategien",
      features: [
        "Setup-Sharing Platform",
        "Community Diskussionen",
        "Leaderboards",
        "Gruppenchats",
        "Kommentar-System"
      ],
      badge: "Social"
    },
    {
      icon: <GraduationCap className="h-12 w-12" />,
      title: "Coach-Dashboard",
      description: "Professionelle Tools für Trading-Coaches und Mentoren",
      features: [
        "Schüler-Statistiken",
        "Fortschritts-Tracking",
        "Performance-Bewertung",
        "Individuelle Analyse",
        "Coaching-Tools"
      ],
      badge: "Pro"
    }
  ];

  return (
    <div className={`min-h-screen bg-stravesta-dark overflow-hidden transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-10 left-10 w-96 h-96 bg-stravesta-teal/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-stravesta-teal/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-stravesta-teal/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10">
        {/* Navigation with fade-in */}
        <div className={`transition-all duration-1000 delay-300 ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
          <Navigation />
        </div>

        {/* Hero Section with slide-up animation */}
        <div className={`transition-all duration-1000 delay-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <HeroSection />
        </div>

        {/* Stats Section with fade-in from left */}
        <div className={`transition-all duration-1000 delay-700 ${isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
          <StatsSection />
        </div>

        {/* Features Section with staggered animation */}
        <div className={`transition-all duration-1000 delay-900 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <FeatureSection
            title="🚀 Alle Features im Überblick"
            subtitle="Entdecke die vollständige Power der Stravesta KI-Trading Platform"
            features={aiFeatures}
            className="bg-stravesta-navy"
          />
        </div>

        {/* Testimonials with scale animation */}
        <div className={`transition-all duration-1000 delay-1100 ${isLoaded ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
          <TestimonialSection />
        </div>

        {/* Pricing with fade-in from right */}
        <div className={`transition-all duration-1000 delay-1300 ${isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
          <PricingSection />
        </div>

        {/* CTA Section with final animation */}
        <div className={`transition-all duration-1000 delay-1500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <CTASection />
        </div>
      </div>

      {/* Floating Action Button with pulse animation */}
      <div className="fixed bottom-8 right-8 z-50">
        <div className={`transition-all duration-1000 delay-2000 ${isLoaded ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-stravesta-teal hover:bg-stravesta-teal/90 text-black p-4 rounded-full shadow-2xl hover:shadow-stravesta-teal/50 transition-all duration-300 animate-pulse hover:animate-none hover:scale-110"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>
      </div>

      {/* Smooth scroll behavior */}
      <style jsx>{`
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
};

export default Index;
