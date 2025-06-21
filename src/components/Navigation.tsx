
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Zap } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Features', path: '/features' },
    { label: 'AI Features', path: '/ai-features' },
    { label: 'Analyse Features', path: '/analysis-features' },
    { label: 'Über uns', path: '/about' },
    { label: 'Roadmap', path: '/roadmap' },
  ];

  return (
    <nav className="flex justify-between items-center py-6 px-4 container mx-auto">
      <Link to="/" className="flex items-center space-x-2">
        <Zap className="h-8 w-8 text-stravesta-teal" />
        <span className="text-2xl font-bold text-gradient">Stravesta</span>
      </Link>
      
      <div className="hidden md:flex items-center space-x-8">
        {navItems.map((item) => (
          <Link key={item.path} to={item.path}>
            <span 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === item.path 
                  ? 'text-stravesta-teal bg-stravesta-teal/10' 
                  : 'text-stravesta-lightGray hover:text-stravesta-teal hover:bg-stravesta-teal/5'
              }`}
            >
              {item.label}
            </span>
          </Link>
        ))}
      </div>

      <div className="flex items-center space-x-4">
        <span className="text-stravesta-teal font-semibold">
          Bald verfügbar
        </span>
      </div>
    </nav>
  );
};

export default Navigation;
