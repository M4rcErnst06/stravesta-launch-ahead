
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageToggle from './LanguageToggle';

const Navigation = () => {
  const { t } = useLanguage();
  
  const navItems = [
    { label: t('nav.home'), href: '#home' },
    { label: 'KI Setup Scanner', href: '#setup-scanner' },
    { label: 'Trading Journal', href: '#journal-analytics' },
    { label: 'KI-Analyse', href: '#ai-analysis' },
    { label: t('nav.about'), href: '#about' },
    { label: t('nav.contact'), href: '#early-access' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start' 
      });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-stravesta-dark/98 backdrop-blur-lg border-b border-stravesta-teal/10 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section - Logo links vom Text */}
          <div className="flex items-center -ml-4">
            <button 
              onClick={() => scrollToSection('#home')} 
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-200"
            >
              <div className="w-12 h-12 flex items-center justify-center">
                <img 
                  src="/lovable-uploads/8e589fa7-a5e4-46d3-835b-4a29773eec29.png" 
                  alt="Stravesta Logo" 
                  className="w-10 h-10 object-contain"
                />
              </div>
              <span className="text-3xl font-bold text-gradient">Stravesta</span>
            </button>
          </div>
          
          {/* Navigation Items - Right aligned */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <button 
                key={item.href} 
                onClick={() => scrollToSection(item.href)}
                className="px-6 py-3 rounded-lg text-base font-medium transition-all duration-200 text-stravesta-lightGray hover:text-white hover:bg-stravesta-teal/10 hover:shadow-sm relative group"
              >
                {item.label}
                <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-stravesta-teal transition-all duration-200 group-hover:w-full"></span>
              </button>
            ))}
            <LanguageToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="text-stravesta-lightGray hover:text-white p-3">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
