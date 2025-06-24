
import React from 'react';
import Logo from './Logo';

const Navigation = () => {
  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Features', href: '#features' },
    { label: 'Über uns', href: '#about' },
    { label: 'Kontakt', href: '#early-access' },
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section - Left aligned */}
          <div className="flex items-center">
            <button 
              onClick={() => scrollToSection('#home')} 
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200"
            >
              <span className="text-2xl font-bold text-gradient">Stravesta</span>
            </button>
          </div>
          
          {/* Navigation Items - Center/Right */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button 
                key={item.href} 
                onClick={() => scrollToSection(item.href)}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-stravesta-lightGray hover:text-white hover:bg-stravesta-teal/10 hover:shadow-sm relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-stravesta-teal transition-all duration-200 group-hover:w-full"></span>
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="text-stravesta-lightGray hover:text-white p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
