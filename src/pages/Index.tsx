
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
          {/* Chart Animation Background - with bounds */}
          <div className="absolute top-24 bottom-12 left-0 right-0 -z-10 overflow-hidden">
            <BackgroundChartAnimation />
          </div>
          
          {/* Hero Content */}
          <div className="relative z-10">
            <HeroSection />
          </div>
        </section>
        
        {/* What is Stravesta Section - Modern Glassmorphism Design */}
        <section id="about" className="py-32 scroll-mt-20 bg-[#0b1e35] relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            {/* Modern glassmorphism container */}
            <div className="max-w-6xl mx-auto">
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-12 shadow-2xl">
                <div className="text-center">
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-gradient opacity-0 translate-y-8 transition-all duration-700" data-animate>
                    What is Stravesta
                  </h2>
                  <div className="space-y-8 text-lg md:text-xl lg:text-2xl text-stravesta-lightGray/90 leading-relaxed">
                    <p className="opacity-0 translate-y-8 transition-all duration-700 delay-200" data-animate>
                      Stravesta is your intelligent trading assistant built to help you trade smarter, not harder.
                    </p>
                    <p className="opacity-0 translate-y-8 transition-all duration-700 delay-400" data-animate>
                      It learns from your unique trading behavior and spots your most successful patterns using AI.
                    </p>
                    <p className="opacity-0 translate-y-8 transition-all duration-700 delay-600" data-animate>
                      From real-time setup recognition to fully personalized bots, Stravesta gives you clarity, structure, and a strategic edge.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* KI Setup Scanner Section - Navy Blue Background */}
        <section id="setup-scanner" className="scroll-mt-20 bg-[#081624] relative">
          <div className="relative z-10">
            <SetupScannerSection />
          </div>
        </section>
        
        {/* KI Trading Journal Analytics Section - Dark Navy Blue Background */}
        <section id="journal-analytics" className="scroll-mt-20 bg-[#0a1b2e] relative">
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

        {/* About Us Section - Modern Card Design */}
        <section id="about-us" className="py-32 scroll-mt-20 bg-[#081624] relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-6xl mx-auto">
              {/* Modern section header */}
              <div className="text-center mb-20">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gradient opacity-0 translate-y-8 transition-all duration-700" data-animate>
                  About Us
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-stravesta-teal to-blue-400 mx-auto rounded-full opacity-0 translate-y-8 transition-all duration-700 delay-200" data-animate></div>
              </div>
              
              {/* Modern Team Cards Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
                {/* Team Member 1 - Gabriel Suter */}
                <div className="opacity-0 translate-y-8 transition-all duration-700 delay-400" data-animate>
                  <div className="backdrop-blur-xl bg-white/10 border border-stravesta-teal/50 rounded-3xl p-8 shadow-2xl">
                    <div className="text-center">
                      <div className="relative mb-8">
                        <div className="w-40 h-40 mx-auto rounded-3xl overflow-hidden bg-gradient-to-br from-stravesta-teal/30 to-blue-500/30 border-2 border-stravesta-teal/50 shadow-xl">
                          <img 
                            src="/lovable-uploads/9382c705-a077-40ee-bc08-9311467ad362.png" 
                            alt="Gabriel Suter"
                            className="w-full h-full object-cover object-center"
                          />
                        </div>
                        {/* Floating accent */}
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-stravesta-teal to-blue-400 rounded-full shadow-lg animate-pulse"></div>
                      </div>
                      
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-2xl md:text-3xl font-bold text-stravesta-teal mb-2">Gabriel Suter</h3>
                          <p className="text-stravesta-teal font-semibold text-lg bg-stravesta-teal/10 px-4 py-2 rounded-full inline-block">Founder & CEO</p>
                        </div>
                        
                        {/* LinkedIn button */}
                        <div className="flex justify-center space-x-3">
                          <a 
                            href="https://www.linkedin.com/in/gabriel-suter-18973329a" 
                            className="flex items-center space-x-2 bg-gradient-to-r from-stravesta-teal/30 to-blue-500/30 border border-stravesta-teal/50 rounded-xl px-6 py-3"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <svg className="h-5 w-5 text-stravesta-teal" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                            <span className="text-white text-sm font-medium">LinkedIn</span>
                          </a>
                        </div>
                        
                        {/* Contact info */}
                        <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 backdrop-blur-sm">
                          <div className="flex items-center justify-center space-x-2">
                            <svg className="h-4 w-4 text-stravesta-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span className="text-white/80 text-sm font-medium">gabriel@stravesta.com</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Team Member 2 - Marc Ernst */}
                <div className="opacity-0 translate-y-8 transition-all duration-700 delay-600" data-animate>
                  <div className="backdrop-blur-xl bg-white/10 border border-blue-400/50 rounded-3xl p-8 shadow-2xl">
                    <div className="text-center">
                      <div className="relative mb-8">
                        <div className="w-40 h-40 mx-auto rounded-3xl overflow-hidden bg-gradient-to-br from-blue-500/30 to-purple-500/30 border-2 border-blue-400/50 shadow-xl">
                          <img 
                            src="/lovable-uploads/07991bd6-28dc-4eeb-944c-a1db9d21a001.png" 
                            alt="Marc Ernst"
                            className="w-full h-full object-cover object-center"
                          />
                        </div>
                        {/* Floating accent */}
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full shadow-lg animate-pulse" style={{animationDelay: '0.5s'}}></div>
                      </div>
                      
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-2xl md:text-3xl font-bold text-blue-400 mb-2">Marc Ernst</h3>
                          <p className="text-blue-400 font-semibold text-lg bg-blue-400/10 px-4 py-2 rounded-full inline-block">Co-Founder</p>
                        </div>
                        
                        {/* LinkedIn button */}
                        <div className="flex justify-center space-x-3">
                          <a 
                            href="https://www.linkedin.com/in/marc-ernst-213a76351" 
                            className="flex items-center space-x-2 bg-gradient-to-r from-blue-500/30 to-purple-500/30 border border-blue-400/50 rounded-xl px-6 py-3"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                            <span className="text-white text-sm font-medium">LinkedIn</span>
                          </a>
                        </div>
                        
                        {/* Contact info */}
                        <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 backdrop-blur-sm">
                          <div className="flex items-center justify-center space-x-2">
                            <svg className="h-4 w-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span className="text-white/80 text-sm font-medium">marc@stravesta.com</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Modern mission statement */}
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-12 shadow-2xl opacity-0 translate-y-8 transition-all duration-700 delay-800" data-animate>
                <div className="text-center space-y-8">
                  <div className="text-xl md:text-2xl text-white/90 leading-relaxed font-light">
                    <p className="mb-6 hover:text-white transition-colors duration-300">
                      Meet the visionary team behind Stravesta, passionate about combining innovative technology 
                      with smart trading solutions. Our founders are dedicated to democratizing advanced trading 
                      tools and making sophisticated market analysis accessible to traders worldwide.
                    </p>
                    <p className="hover:text-white transition-colors duration-300">
                      We believe that every trader deserves access to institutional-grade technology and insights. 
                      Our mission is to level the playing field by combining deep market knowledge with cutting-edge AI, 
                      transforming how retail traders analyze markets and execute profitable strategies.
                    </p>
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
        <div className="bg-[#081624]">
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
