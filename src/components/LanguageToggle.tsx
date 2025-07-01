
import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-2 rounded-lg text-stravesta-lightGray hover:text-white hover:bg-stravesta-teal/10 transition-colors">
        <Globe className="h-4 w-4" />
        <span className="text-sm font-medium">{language.toUpperCase()}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-stravesta-navy border-stravesta-teal/20">
        <DropdownMenuItem 
          onClick={() => setLanguage('en')}
          className={`cursor-pointer ${language === 'en' ? 'bg-stravesta-teal/10 text-stravesta-teal' : 'text-stravesta-lightGray hover:text-white'}`}
        >
          English
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setLanguage('de')}
          className={`cursor-pointer ${language === 'de' ? 'bg-stravesta-teal/10 text-stravesta-teal' : 'text-stravesta-lightGray hover:text-white'}`}
        >
          Deutsch
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageToggle;
