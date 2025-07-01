
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'de';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.features': 'Features',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    
    // Hero Section
    'hero.title': 'The Future of Trading',
    'hero.subtitle': 'AI-powered trading tools for consistent profits',
    
    // Features
    'features.title': 'Revolutionary Trading Tools',
    'features.subtitle': 'Everything you need for successful trading - powered by AI',
    'features.ai.title': 'AI & Automation',
    'features.ai.description': 'State-of-the-art AI technology for intelligent trading',
    'features.analysis.title': 'Analysis & Tracking',
    'features.analysis.description': 'Professional tools for detailed market analysis',
    
    // About Section
    'about.title': 'The Future of Trading',
    'about.text1': 'Stravesta combines cutting-edge AI technology with proven trading strategies to give you a decisive advantage in the markets.',
    'about.text2': 'Our platform learns from your trading style and helps you achieve consistent profits while minimizing risks.',
    'about.text3': 'From automatic setup recognition to intelligent trading bots - Stravesta is your personal trading assistant.',
    
    // CTA Section
    'cta.badge': 'Early Access Program',
    'cta.title': 'Ready for the',
    'cta.titleHighlight': 'next level?',
    'cta.subtitle': 'Join the trading revolution. Exclusive early access with special benefits for pioneers.',
    'cta.benefitsTitle': 'Early Access Benefits',
    'cta.benefit1': '25% Launch Discount',
    'cta.benefit2': 'Beta Features First',
    'cta.benefit3': 'Priority Support',
    'cta.benefit4': 'Community Access',
    'cta.disclaimer': 'No financial advice • GDPR compliant • Cancel anytime',
    
    // Footer
    'footer.tagline': 'The future of trading with AI power',
    'footer.contact': 'Contact',
    'footer.support': 'Support',
    'footer.privacy': 'Privacy',
    'footer.imprint': 'Imprint',
    'footer.terms': 'Terms',
    'footer.rights': 'All rights reserved.',
  },
  de: {
    // Navigation
    'nav.home': 'Home',
    'nav.features': 'Features',
    'nav.about': 'Über uns',
    'nav.contact': 'Kontakt',
    
    // Hero Section
    'hero.title': 'Die Zukunft des Tradings',
    'hero.subtitle': 'KI-gestützte Trading-Tools für konstante Gewinne',
    
    // Features
    'features.title': 'Revolutionäre Trading-Tools',
    'features.subtitle': 'Alles was du für erfolgreiches Trading brauchst - powered by KI',
    'features.ai.title': 'KI & Automatisierung',
    'features.ai.description': 'Modernste KI-Technologie für intelligentes Trading',
    'features.analysis.title': 'Analyse & Tracking',
    'features.analysis.description': 'Professionelle Tools für detaillierte Marktanalyse',
    
    // About Section
    'about.title': 'Die Zukunft des Tradings',
    'about.text1': 'Stravesta kombiniert modernste KI-Technologie mit bewährten Trading-Strategien, um dir einen entscheidenden Vorteil an den Märkten zu verschaffen.',
    'about.text2': 'Unsere Platform lernt von deinem Trading-Stil und hilft dir dabei, konsistente Gewinne zu erzielen und Risiken zu minimieren.',
    'about.text3': 'Von der automatischen Setup-Erkennung bis hin zu intelligenten Trading-Bots - Stravesta ist dein persönlicher Trading-Assistent.',
    
    // CTA Section
    'cta.badge': 'Early Access Program',
    'cta.title': 'Bereit für das',
    'cta.titleHighlight': 'nächste Level?',
    'cta.subtitle': 'Schließe dich der Trading-Revolution an. Exklusiver Early Access mit besonderen Vorteilen für Pioniere.',
    'cta.benefitsTitle': 'Early Access Vorteile',
    'cta.benefit1': '25% Launch-Rabatt',
    'cta.benefit2': 'Beta-Features zuerst',
    'cta.benefit3': 'Priority Support',
    'cta.benefit4': 'Community Access',
    'cta.disclaimer': 'Keine Finanzberatung • DSGVO-konform • Jederzeit kündbar',
    
    // Footer
    'footer.tagline': 'Die Zukunft des Tradings mit KI-Power',
    'footer.contact': 'Kontakt',
    'footer.support': 'Support',
    'footer.privacy': 'Datenschutz',
    'footer.imprint': 'Impressum',
    'footer.terms': 'AGB',
    'footer.rights': 'Alle Rechte vorbehalten.',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'de')) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
