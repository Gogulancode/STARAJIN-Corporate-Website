import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { detectInitialLocale, persistLocale } from './i18n/translation-config';
import { getMessages } from './i18n/translations';
import { I18nProvider } from './contexts/I18nContext';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ProjectsPage from './pages/ProjectsPage';
import CultureExchangePage from './pages/CultureExchangePage';
import MediaPage from './pages/MediaPage';
import ContactPage from './pages/ContactPage';

function BootstrapRedirect() {
  const initial = detectInitialLocale();
  return <Navigate replace to={`/${initial}`} />;
}

function LocalizedShell() {
  const params = useParams();
  const raw = (params.locale ?? 'en') as 'en' | 'ko';
  
  // Validate locale and redirect if invalid
  if (raw !== 'en' && raw !== 'ko') {
    const initial = detectInitialLocale();
    return <Navigate replace to={`/${initial}`} />;
  }
  
  const locale = raw;

  // persist on each mount/url change
  persistLocale(locale);

  const messages = getMessages(locale);

  return (
    <I18nProvider locale={locale} messages={messages}>
      <div className="min-h-screen">
        <Navigation />
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="culture-exchange" element={<CultureExchangePage />} />
          <Route path="media" element={<MediaPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="." replace />} />
        </Routes>
        <Footer />
      </div>
    </I18nProvider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Localized area - simplified pattern */}
        <Route path="/:locale/*" element={<LocalizedShell />} />
        {/* Fallback: redirect / -> /{detected} */}
        <Route path="/" element={<BootstrapRedirect />} />
      </Routes>
    </BrowserRouter>
  );
}
