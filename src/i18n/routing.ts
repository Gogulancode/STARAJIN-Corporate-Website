import { Locale, parseLocaleFromPath, detectInitialLocale, persistLocale, withLocalePath } from './translation-config';

export { detectInitialLocale, persistLocale, withLocalePath };

export function getLocaleFromUrl(pathname = typeof window !== 'undefined' ? window.location.pathname : '/'): Locale {
  return parseLocaleFromPath(pathname) ?? detectInitialLocale(pathname);
}