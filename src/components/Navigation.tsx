
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Zap } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Features', path: '/features' },
    { label: 'Integrationen', path: '/integrations' },
    { label: 'Roadmap', path: '/roadmap' },
  ];

  return (
    <nav className="flex justify-between items-center py-6 px-4 container mx-auto">
      <Link to="/" className="flex items-center space-x-2">
        <Zap className="h-8 w-8 text-stravesta-teal" />
        <span className="text-2xl font-bold text-gradient">Stravesta</span>
      </Link>
      
      <div className="hidden md:flex items-center space-x-8">
        <NavigationMenu>
          <NavigationMenuList>
            {navItems.map((item) => (
              <NavigationMenuItem key={item.path}>
                <Link to={item.path}>
                  <NavigationMenuLink 
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      location.pathname === item.path 
                        ? 'text-stravesta-teal bg-stravesta-teal/10' 
                        : 'text-stravesta-lightGray hover:text-stravesta-teal hover:bg-stravesta-teal/5'
                    }`}
                  >
                    {item.label}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
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
