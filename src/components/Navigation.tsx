import React from 'react';

const Navigation = () => {
  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Features', href: '#features' },
    { label: 'Über uns', href: '#about' },
    { label: 'Early Access', href: '#early-access' },
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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-stravesta-dark/95 backdrop-blur-md border-b border-stravesta-teal/20">
      <div className="flex justify-between items-center py-4 px-4 container mx-auto">
        <button onClick={() => scrollToSection('#home')} className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-gradient">Stravesta</span>
        </button>
        
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <button 
              key={item.href} 
              onClick={() => scrollToSection(item.href)}
              className="px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 text-stravesta-lightGray hover:text-stravesta-teal hover:bg-stravesta-teal/10 hover:scale-105"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
