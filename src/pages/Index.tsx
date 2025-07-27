
import React, { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import GroupedFeatureSection from '@/components/GroupedFeatureSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import SetupScannerSection from '@/components/setup-scanner/SetupScannerSection';
import TradeAnalyticsSection from '@/components/trading-journal/TradeAnalyticsSection';
import BackgroundChartAnimation from '@/components/BackgroundChartAnimation';
const IndexContent = () => {

  useEffect(() => {
    // Smooth scrolling for all links
    const handleSmoothScroll = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = target.getAttribute('href')?.substring(1);
        const element = document.getElementById(id || '');
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start' 
          });
        }
      }
    };

    document.addEventListener('click', handleSmoothScroll);
    return () => document.removeEventListener('click', handleSmoothScroll);
  }, []);

  useEffect(() => {
    // Animation for About Section
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          entry.target.classList.remove('opacity-0', 'translate-y-8');
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('[data-animate]');
    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Empty featureGroups array to remove the sections
  const featureGroups: any[] = [];

  return (
    <div className="min-h-screen relative bg-stravesta-dark">
      <div className="relative z-20">
        <Navigation />
        
        {/* Hero Section with Chart Background */}
        <section id="home" className="pt-20 bg-stravesta-dark relative min-h-screen">
          {/* Chart Animation Background */}
          <div className="absolute inset-0 z-0">
            <BackgroundChartAnimation />
          </div>
          
          {/* Hero Content */}
          <div className="relative z-10">
            <HeroSection />
          </div>
        </section>
        
        {/* What is Stravesta Section - Same background as AI Setup Scanner */}
        <section id="about" className="py-20 scroll-mt-20 bg-[#0b1e35] relative">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient opacity-0 translate-y-8 transition-all duration-700" data-animate>
                What is Stravesta
              </h2>
              <div className="text-lg text-stravesta-lightGray space-y-6">
                <p className="opacity-0 translate-y-8 transition-all duration-700 delay-200" data-animate>
                  Stravesta combines state-of-the-art AI technology with proven trading strategies to give you a decisive advantage in the markets.
                </p>
                <p className="opacity-0 translate-y-8 transition-all duration-700 delay-400" data-animate>
                  Our platform learns from your trading style and helps you achieve consistent profits while minimizing risks.
                </p>
                <p className="opacity-0 translate-y-8 transition-all duration-700 delay-600" data-animate>
                  From automatic setup recognition to intelligent trading bots - Stravesta is your personal trading assistant.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* KI Setup Scanner Section - Navy Blue Background */}
        <section id="setup-scanner" className="scroll-mt-20 bg-stravesta-navy relative">
          {/* Section-specific background effects */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-96 h-96 bg-stravesta-teal/3 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/3 rounded-full blur-3xl animate-pulse"></div>
          </div>
          <div className="relative z-10">
            <SetupScannerSection />
          </div>
        </section>
        
        {/* KI Trading Journal Analytics Section - Dark Gray Background */}
        <section id="journal-analytics" className="scroll-mt-20 bg-stravesta-darkGray relative">
          {/* Section-specific background effects */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-96 h-96 bg-green-500/3 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-stravesta-teal/3 rounded-full blur-3xl animate-pulse"></div>
          </div>
          <div className="relative z-10">
            <TradeAnalyticsSection />
          </div>
        </section>
        
        {/* Features Section - Hidden since featureGroups is empty */}
        {featureGroups.length > 0 && (
          <section id="features" className="scroll-mt-20 bg-stravesta-dark">
            <div className="flex justify-center">
              <div className="w-full max-w-7xl">
                <GroupedFeatureSection
                  title="Revolutionary Trading Tools"
                  subtitle="Everything you need for successful trading - powered by AI"
                  featureGroups={featureGroups}
                  className="bg-stravesta-dark"
                />
              </div>
            </div>
          </section>
        )}

        {/* About Us Section - Same background as AI Setup Scanner */}
        <section id="about-us" className="py-20 scroll-mt-20 bg-[#0b1e35] relative">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient opacity-0 translate-y-8 transition-all duration-700" data-animate>
                About Us
              </h2>
              <div className="text-lg text-stravesta-lightGray space-y-6">
                <p className="opacity-0 translate-y-8 transition-all duration-700 delay-200" data-animate>
                  Meet the visionary team behind Stravesta, passionate about combining innovative technology 
                  with smart trading solutions. Our founders are dedicated to democratizing advanced trading 
                  tools and making sophisticated market analysis accessible to traders worldwide.
                </p>
                <p className="opacity-0 translate-y-8 transition-all duration-700 delay-400" data-animate>
                  We believe that every trader deserves access to institutional-grade technology and insights. 
                  Our mission is to level the playing field by combining deep market knowledge with cutting-edge AI, 
                  transforming how retail traders analyze markets and execute profitable strategies.
                </p>
              </div>
            </div>
            
            {/* Team Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
              {/* Team Member 1 */}
              <div className="text-center group opacity-0 translate-y-8 transition-all duration-700 delay-600" data-animate>
                <div className="relative mb-6">
                  <div className="w-48 h-48 mx-auto rounded-2xl overflow-hidden bg-gradient-to-br from-stravesta-teal/20 to-stravesta-blue/20 border-2 border-stravesta-teal/30 group-hover:border-stravesta-teal/50 transition-all duration-300">
                    <img 
                      src="/api/placeholder/192/192" 
                      alt="Team Member"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">Gabriel Suter</h3>
                    <p className="text-stravesta-teal font-semibold text-lg">Founder & CEO</p>
                  </div>
                  
                  <p className="text-stravesta-lightGray leading-relaxed max-w-sm mx-auto">
                    Brief description of expertise and role at Stravesta.
                  </p>
                  
                  <div className="flex justify-center space-x-4 pt-4">
                    <a 
                      href="https://www.linkedin.com/in/gabriel-suter-18973329a" 
                      className="flex items-center space-x-2 bg-stravesta-teal/10 hover:bg-stravesta-teal/20 border border-stravesta-teal/30 rounded-lg px-4 py-2 transition-all duration-300 group"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg className="h-4 w-4 text-stravesta-teal group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      <span className="text-stravesta-teal text-sm font-medium">LinkedIn</span>
                    </a>
                    <div className="flex items-center space-x-2 bg-stravesta-teal/10 border border-stravesta-teal/30 rounded-lg px-4 py-2">
                      <svg className="h-4 w-4 text-stravesta-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="text-stravesta-teal text-sm font-medium">Contact: gabriel@stravesta.com</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Team Member 2 */}
              <div className="text-center group opacity-0 translate-y-8 transition-all duration-700 delay-800" data-animate>
                <div className="relative mb-6">
                   <div className="w-48 h-48 mx-auto rounded-2xl overflow-hidden bg-gradient-to-br from-stravesta-blue/20 to-stravesta-teal/20 border-2 border-stravesta-teal/30 group-hover:border-stravesta-teal/50 transition-all duration-300">
                     <img 
                       src="/lovable-uploads/07991bd6-28dc-4eeb-944c-a1db9d21a001.png" 
                       alt="Marc Ernst"
                       className="w-full h-full object-cover object-center"
                     />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">Marc Ernst</h3>
                    <p className="text-stravesta-teal font-semibold text-lg">Co-Founder</p>
                  </div>
                  
                  <p className="text-stravesta-lightGray leading-relaxed max-w-sm mx-auto">
                    Brief description of expertise and role at Stravesta.
                  </p>
                  
                  <div className="flex justify-center space-x-4 pt-4">
                    <a 
                      href="https://www.linkedin.com/in/marc-ernst-213a76351" 
                      className="flex items-center space-x-2 bg-stravesta-teal/10 hover:bg-stravesta-teal/20 border border-stravesta-teal/30 rounded-lg px-4 py-2 transition-all duration-300 group"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg className="h-4 w-4 text-stravesta-teal group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      <span className="text-stravesta-teal text-sm font-medium">LinkedIn</span>
                    </a>
                     <div className="flex items-center space-x-2 bg-stravesta-teal/10 border border-stravesta-teal/30 rounded-lg px-4 py-2">
                       <svg className="h-4 w-4 text-stravesta-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                       </svg>
                       <span className="text-stravesta-teal text-sm font-medium">Contact: marc@stravesta.com</span>
                     </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Early Access Section - Same background as AI Setup Scanner */}
        <section id="early-access" className="scroll-mt-20 bg-[#0b1e35]">
          <CTASection />
        </section>

        {/* Footer - Dark Background */}
        <div className="bg-stravesta-dark">
          <Footer />
        </div>
      </div>
    </div>
  );
};

const Index = () => {
  return <IndexContent />;
};

export default Index;
