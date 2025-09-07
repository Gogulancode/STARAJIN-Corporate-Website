import { Link, LinkProps, useParams } from 'react-router-dom';
import { withLocalePath } from '../i18n/translation-config';
import type { Locale } from '../i18n/translation-config';

export default function LocalizedLink({ to, ...rest }: LinkProps) {
  const { locale = 'en' } = useParams();
  const current = (locale === 'ko' ? 'ko' : 'en') as Locale;

  const href = typeof to === 'string' ? withLocalePath(to, current) : to;
  return <Link to={href} {...rest} />;
}
