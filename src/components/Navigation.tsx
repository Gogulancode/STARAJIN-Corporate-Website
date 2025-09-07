import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../contexts/I18nContext';
import LocalizedLink from './LocalizedLink';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navigation() {
  const { t } = useLanguage();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    { key: 'home', href: '/' },
    { key: 'about', href: '/about' },
    { key: 'services', href: '/services' },
    { key: 'projects', href: '/projects' },
    { key: 'culture', href: '/culture-exchange' },
    { key: 'media', href: '/media' },
    { key: 'contact', href: '/contact' }
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200"
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <LocalizedLink to="/" className="flex items-center">
            <img 
              src="/Starajin LogoX3.png" 
              alt="Starajin Logo" 
              className="h-10 w-auto object-contain"
            />
          </LocalizedLink>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <LocalizedLink
                key={item.key}
                to={item.href}
                className={`px-3 py-2 text-sm font-bold tracking-wide transition-colors duration-200 ${
                  location.pathname.endsWith(item.href) || (item.href === '/' && location.pathname.match(/^\/(en|ko)\/?$/))
                    ? 'text-black border-b-2 border-starajin-orange' 
                    : 'text-black hover:text-starajin-orange'
                }`}
              >
                {t(`nav.${item.key}`)}
              </LocalizedLink>
            ))}
          </div>

          {/* Language Toggle & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <LanguageSwitcher />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-md transition-colors text-black hover:text-starajin-orange hover:bg-gray-100"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-6 space-y-2">
              {navigationItems.map((item) => (
                <div key={item.key}>
                  <LocalizedLink
                    to={item.href}
                    className={`block px-4 py-3 text-base font-bold rounded-md transition-colors ${
                      location.pathname.endsWith(item.href) || (item.href === '/' && location.pathname.match(/^\/(en|ko)\/?$/))
                        ? 'text-black bg-gray-100'
                        : 'text-black hover:text-starajin-orange hover:bg-gray-50'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t(`nav.${item.key}`)}
                  </LocalizedLink>
                </div>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}