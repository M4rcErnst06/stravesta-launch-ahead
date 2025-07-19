
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  language: 'en' | 'de';
  setLanguage: (lang: 'en' | 'de') => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.features': 'Features',
    'nav.about': 'About Us',
    'nav.contact': 'Contact',
    'nav.earlyAccess': 'Early Access',
    
    // Hero Section
    'hero.title': 'Trading with',
    'hero.titleHighlight': 'AI-Power',
    'hero.subtitle': 'Revolutionize your trading with automatic setup recognition, personalized AI bots and intelligent analysis.',
    'hero.cta': 'Secure Early Access Now',
    'hero.earlyAccess.title': 'Early Access Active',
    'hero.earlyAccess.description': 'Exclusive access to Stravesta with continuous updates and direct developer contact',
    'hero.earlyAccess.feedback': 'Give Feedback',
    'hero.earlyAccess.learnMore': 'Learn More',
    
    // Features
    'features.title': 'Revolutionary Trading Tools',
    'features.subtitle': 'Everything you need for successful trading - powered by AI',
    'features.group1.title': 'AI & Automation',
    'features.group1.description': 'State-of-the-art AI technology for intelligent trading',
    'features.group2.title': 'Analysis & Tracking',
    'features.group2.description': 'Professional tools for detailed market analysis',
    
    // Feature Cards
    'feature.aiSetup.title': 'AI Setup Recognition',
    'feature.aiSetup.description': 'Automatic recognition of your trading patterns with advanced AI',
    'feature.aiSetup.feature1': 'Real-time pattern recognition',
    'feature.aiSetup.feature2': 'Personalized setup alerts',
    'feature.aiSetup.feature3': 'Backtesting your strategies',
    'feature.aiSetup.feature4': 'Performance optimization',
    
    'feature.tradingBots.title': 'Trading Bots',
    'feature.tradingBots.description': 'Automated trading assistants for various strategies',
    'feature.tradingBots.feature1': 'Scalping Bot',
    'feature.tradingBots.feature2': 'Swing Trading Bot',
    'feature.tradingBots.feature3': 'Risk Management',
    'feature.tradingBots.feature4': '24/7 Monitoring',
    
    'feature.setupScanner.title': 'Setup Scanner',
    'feature.setupScanner.description': 'Automatic scanning of markets for your preferred setups',
    'feature.setupScanner.feature1': 'Multi-timeframe analysis',
    'feature.setupScanner.feature2': 'Custom setup filters',
    'feature.setupScanner.feature3': 'Alert system',
    'feature.setupScanner.feature4': 'Market monitoring',
    
    'feature.analytics.title': 'Smart Analytics',
    'feature.analytics.description': 'Detailed analysis of your trading performance',
    'feature.analytics.feature1': 'Advanced statistics',
    'feature.analytics.feature2': 'Risk management tools',
    'feature.analytics.feature3': 'Performance tracking',
    'feature.analytics.feature4': 'Loss analysis',
    
    'feature.portfolio.title': 'Portfolio Analysis',
    'feature.portfolio.description': 'Comprehensive analysis of your trading portfolio',
    'feature.portfolio.feature1': 'Diversification analysis',
    'feature.portfolio.feature2': 'Risk-reward optimization',
    'feature.portfolio.feature3': 'Correlation analysis',
    'feature.portfolio.feature4': 'Performance benchmarks',
    
    'feature.journal.title': 'Trading Journal',
    'feature.journal.description': 'Digital journal for documenting all trades',
    'feature.journal.feature1': 'Automatic trade capture',
    'feature.journal.feature2': 'Screenshot integration',
    'feature.journal.feature3': 'Emotion tracking',
    'feature.journal.feature4': 'Performance reports',
    
    // About Section
    'about.title': 'The Future of Trading',
    'about.paragraph1': 'Stravesta combines state-of-the-art AI technology with proven trading strategies to give you a decisive advantage in the markets.',
    'about.paragraph2': 'Our platform learns from your trading style and helps you achieve consistent profits while minimizing risks.',
    'about.paragraph3': 'From automatic setup recognition to intelligent trading bots - Stravesta is your personal trading assistant.',
    
    // CTA Section
    'cta.badge': 'Early Access Program',
    'cta.title': 'Ready for the',
    'cta.titleHighlight': 'next level?',
    'cta.subtitle': 'Join the trading revolution. Exclusive early access with special benefits for pioneers.',
    'cta.benefits.title': 'Early Access Benefits',
    'cta.benefit1': '25% Launch Discount',
    'cta.benefit2': 'Beta Features First',
    'cta.benefit3': 'Priority Support',
    'cta.benefit4': 'Community Access',
    'cta.disclaimer': 'No financial advice • GDPR compliant • Cancel anytime',
    
    // Footer
    'footer.title': 'Stravesta',
    'footer.tagline': 'The future of trading with AI power',
    'footer.contact': 'Contact',
    'footer.support': 'Support',
    'footer.copyright': '2024 Stravesta. All rights reserved.',
    'footer.privacy': 'Privacy',
    'footer.imprint': 'Imprint',
    'footer.terms': 'Terms'
  },
  de: {
    // Navigation
    'nav.home': 'Home',
    'nav.features': 'Features',
    'nav.about': 'Über uns',
    'nav.contact': 'Kontakt',
    'nav.earlyAccess': 'Early Access',
    
    // Hero Section
    'hero.title': 'Trading mit',
    'hero.titleHighlight': 'KI-Power',
    'hero.subtitle': 'Revolutioniere dein Trading mit automatischer Setup-Erkennung, personalisierten AI-Bots und intelligenter Analyse.',
    'hero.cta': 'Jetzt Early Access sichern',
    'hero.earlyAccess.title': 'Early Access aktiv',
    'hero.earlyAccess.description': 'Exklusiver Zugang zu Stravesta mit kontinuierlichen Updates und direktem Entwickler-Kontakt',
    'hero.earlyAccess.feedback': 'Feedback geben',
    'hero.earlyAccess.learnMore': 'Mehr erfahren',
    
    // Features
    'features.title': 'Revolutionäre Trading-Tools',
    'features.subtitle': 'Alles was du für erfolgreiches Trading brauchst - powered by KI',
    'features.group1.title': 'KI & Automatisierung',
    'features.group1.description': 'Modernste KI-Technologie für intelligentes Trading',
    'features.group2.title': 'Analyse & Tracking',
    'features.group2.description': 'Professionelle Tools für detaillierte Marktanalyse',
    
    // Feature Cards
    'feature.aiSetup.title': 'KI-Setup-Erkennung',
    'feature.aiSetup.description': 'Automatische Erkennung deiner Trading-Patterns mit fortschrittlicher KI',
    'feature.aiSetup.feature1': 'Pattern-Erkennung in Echtzeit',
    'feature.aiSetup.feature2': 'Personalisierte Setup-Alerts',
    'feature.aiSetup.feature3': 'Backtesting deiner Strategien',
    'feature.aiSetup.feature4': 'Performance-Optimierung',
    
    'feature.tradingBots.title': 'Trading-Bots',
    'feature.tradingBots.description': 'Automatisierte Trading-Assistenten für verschiedene Strategien',
    'feature.tradingBots.feature1': 'Scalping-Bot',
    'feature.tradingBots.feature2': 'Swing-Trading Bot',
    'feature.tradingBots.feature3': 'Risk-Management',
    'feature.tradingBots.feature4': '24/7 Monitoring',
    
    'feature.setupScanner.title': 'Setup-Scanner',
    'feature.setupScanner.description': 'Automatisches Scannen der Märkte nach deinen bevorzugten Setups',
    'feature.setupScanner.feature1': 'Multi-Timeframe Analyse',
    'feature.setupScanner.feature2': 'Custom Setup-Filter',
    'feature.setupScanner.feature3': 'Alert-System',
    'feature.setupScanner.feature4': 'Markt-Überwachung',
    
    'feature.analytics.title': 'Smart Analytics',
    'feature.analytics.description': 'Detaillierte Analyse deiner Trading-Performance',
    'feature.analytics.feature1': 'Erweiterte Statistiken',
    'feature.analytics.feature2': 'Risk-Management Tools',
    'feature.analytics.feature3': 'Performance-Tracking',
    'feature.analytics.feature4': 'Verlust-Analyse',
    
    'feature.portfolio.title': 'Portfolio-Analyse',
    'feature.portfolio.description': 'Umfassende Analyse deines Trading-Portfolios',
    'feature.portfolio.feature1': 'Diversifikations-Analyse',
    'feature.portfolio.feature2': 'Risk-Reward Optimierung',
    'feature.portfolio.feature3': 'Correlation Analysis',
    'feature.portfolio.feature4': 'Performance-Benchmarks',
    
    'feature.journal.title': 'Trading-Journal',
    'feature.journal.description': 'Digitales Journal zur Dokumentation aller Trades',
    'feature.journal.feature1': 'Automatische Trade-Erfassung',
    'feature.journal.feature2': 'Screenshot-Integration',
    'feature.journal.feature3': 'Emotion-Tracking',
    'feature.journal.feature4': 'Performance-Reports',
    
    // About Section
    'about.title': 'Die Zukunft des Tradings',
    'about.paragraph1': 'Stravesta kombiniert modernste KI-Technologie mit bewährten Trading-Strategien, um dir einen entscheidenden Vorteil an den Märkten zu verschaffen.',
    'about.paragraph2': 'Unsere Platform lernt von deinem Trading-Stil und hilft dir dabei, konsistente Gewinne zu erzielen und Risiken zu minimieren.',
    'about.paragraph3': 'Von der automatischen Setup-Erkennung bis hin zu intelligenten Trading-Bots - Stravesta ist dein persönlicher Trading-Assistent.',
    
    // CTA Section
    'cta.badge': 'Early Access Program',
    'cta.title': 'Bereit für das',
    'cta.titleHighlight': 'nächste Level?',
    'cta.subtitle': 'Schließe dich der Trading-Revolution an. Exklusiver Early Access mit besonderen Vorteilen für Pioniere.',
    'cta.benefits.title': 'Early Access Vorteile',
    'cta.benefit1': '25% Launch-Rabatt',
    'cta.benefit2': 'Beta-Features zuerst',
    'cta.benefit3': 'Priority Support',
    'cta.benefit4': 'Community Access',
    'cta.disclaimer': 'Keine Finanzberatung • DSGVO-konform • Jederzeit kündbar',
    
    // Footer
    'footer.title': 'Stravesta',
    'footer.tagline': 'Die Zukunft des Tradings mit KI-Power',
    'footer.contact': 'Kontakt',
    'footer.support': 'Support',
    'footer.copyright': '2024 Stravesta. Alle Rechte vorbehalten.',
    'footer.privacy': 'Datenschutz',
    'footer.imprint': 'Impressum',
    'footer.terms': 'AGB'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'de'>('en'); // Default to English

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
