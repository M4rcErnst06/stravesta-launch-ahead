import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { label: 'Home', path: '/' },
    { 
      label: 'Features', 
      path: '/features',
      dropdown: [
        { label: 'AI & Automatisierung', path: '/ai-features' },
        { label: 'Analyse & Lernen', path: '/analysis-features' }
      ]
    },
    { 
      label: 'Mehr', 
      path: '#',
      dropdown: [
        { label: 'Statistiken', path: '/stats' },
        { label: 'Testimonials', path: '/testimonials' },
        { label: 'Preise', path: '/pricing' },
        { label: 'Integrationen', path: '/integrations' }
      ]
    },
    { label: 'Community', path: '/community' },
    { label: 'Über uns', path: '/about' },
    { label: 'Roadmap', path: '/roadmap' },
  ];

  const isActiveDropdown = (item: any) => {
    if (item.label === 'Features' && location.pathname.includes('features')) return true;
    if (item.label === 'Mehr' && ['/stats', '/testimonials', '/pricing', '/integrations'].includes(location.pathname)) return true;
    return false;
  };

  return (
    <nav className="flex justify-between items-center py-6 px-4 container mx-auto">
      <Link to="/" className="flex items-center space-x-2">
        <div className="w-8 h-8 flex items-center justify-center">
          <img 
            src="/lovable-uploads/76b711be-4dc0-43ce-94db-c08ab34ad46e.png" 
            alt="Stravesta Logo" 
            className="w-8 h-8 object-contain"
          />
        </div>
        <span className="text-2xl font-bold text-gradient">Stravesta</span>
      </Link>
      
      <div className="hidden md:flex items-center space-x-8">
        {navItems.map((item) => (
          <div key={item.path}>
            {item.dropdown ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button 
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActiveDropdown(item)
                        ? 'text-stravesta-teal bg-stravesta-teal/10' 
                        : 'text-stravesta-lightGray hover:text-stravesta-teal hover:bg-stravesta-teal/5'
                    }`}
                  >
                    {item.label}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  className="bg-stravesta-navy border-stravesta-teal/20 min-w-[200px] z-50"
                  align="start"
                  sideOffset={4}
                >
                  {item.dropdown.map((dropdownItem) => (
                    <DropdownMenuItem key={dropdownItem.path} asChild>
                      <Link 
                        to={dropdownItem.path}
                        className="w-full text-stravesta-lightGray hover:text-stravesta-teal hover:bg-stravesta-teal/5 focus:text-stravesta-teal focus:bg-stravesta-teal/5 cursor-pointer"
                      >
                        {dropdownItem.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to={item.path}>
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
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center space-x-4">
        <Link to="/login">
          <Button className="bg-stravesta-teal hover:bg-stravesta-teal/90 text-black font-semibold">
            Anmelden
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;
