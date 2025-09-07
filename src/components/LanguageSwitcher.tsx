import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Globe } from 'lucide-react';
import { withLocalePath, persistLocale } from '../i18n/translation-config';
import type { Locale } from '../i18n/translation-config';

export default function LanguageSwitcher() {
  const { locale = 'en' } = useParams();
  const navigate = useNavigate();
  const loc = useLocation();

  const current = (locale === 'ko' ? 'ko' : 'en') as Locale;
  const next = current === 'en' ? 'ko' : 'en';
  const target = withLocalePath(loc.pathname.replace(/^\/(en|ko)(?=\/|$)/i, ''), next);

  return (
    <button
      onClick={() => {
        persistLocale(next);
        navigate(target, { replace: true });
      }}
      className="flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-colors duration-200 bg-starajin-blue text-white hover:bg-starajin-blue/80"
      aria-label={`Switch language to ${next.toUpperCase()}`}
    >
      <Globe size={16} />
      <span className="text-sm">{current.toUpperCase()}</span>
    </button>
  );
}
