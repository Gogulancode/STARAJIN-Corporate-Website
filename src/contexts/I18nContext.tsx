import React, { createContext, useContext, ReactNode } from 'react';
import { Language } from '../i18n/translations';

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

interface I18nProviderProps {
  locale: Language;
  messages: any;
  children: ReactNode;
}

export const I18nProvider: React.FC<I18nProviderProps> = ({ locale, messages, children }) => {
  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = messages;
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  // Dummy setLanguage - actual language changes will be handled by navigation
  const setLanguage = (_lang: Language) => {
    console.warn('setLanguage called - use LanguageSwitcher component for URL-based language switching');
  };

  return (
    <I18nContext.Provider value={{ language: locale, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
};

// Keep the same hook name for backward compatibility
export const useLanguage = () => {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within an I18nProvider');
  }
  return context;
};
