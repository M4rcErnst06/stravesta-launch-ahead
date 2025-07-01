
import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-stravesta-lightGray hover:text-white hover:bg-stravesta-teal/10"
        >
          <Globe className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-stravesta-navy border-stravesta-teal/20">
        <DropdownMenuItem
          onClick={() => setLanguage('en')}
          className={`cursor-pointer ${
            language === 'en' 
              ? 'bg-stravesta-teal/20 text-stravesta-teal' 
              : 'text-stravesta-lightGray hover:bg-stravesta-teal/10 hover:text-white'
          }`}
        >
          English
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setLanguage('de')}
          className={`cursor-pointer ${
            language === 'de' 
              ? 'bg-stravesta-teal/20 text-stravesta-teal' 
              : 'text-stravesta-lightGray hover:bg-stravesta-teal/10 hover:text-white'
          }`}
        >
          Deutsch
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageToggle;
