export const SUPPORTED_LOCALES = ['en', 'ko'] as const;
export type Locale = typeof SUPPORTED_LOCALES[number];
export const DEFAULT_LOCALE: Locale = 'en';

export function parseLocaleFromPath(pathname: string): Locale | null {
  const m = pathname.match(/^\/(en|ko)(?=\/|$)/i);
  return (m?.[1]?.toLowerCase() as Locale) ?? null;
}

export function detectInitialLocale(pathname = typeof window !== 'undefined' ? window.location.pathname : '/'): Locale {
  const fromPath = parseLocaleFromPath(pathname);
  if (fromPath) return fromPath;

  const saved = (typeof window !== 'undefined' && localStorage.getItem('locale')) as Locale | null;
  if (saved && SUPPORTED_LOCALES.includes(saved)) return saved;

  const browser = typeof navigator !== 'undefined' && navigator.language?.toLowerCase().startsWith('ko') ? 'ko' : 'en';
  return (browser as Locale) || DEFAULT_LOCALE;
}

export function persistLocale(next: Locale) {
  if (typeof window !== 'undefined') localStorage.setItem('locale', next);
}

export function withLocalePath(path: string, locale: Locale): string {
  const clean = (path.startsWith('/') ? path : `/${path}`).replace(/^\/(en|ko)(?=\/|$)/i, '');
  return `/${locale}${clean}`;
}
