import LocalizedLink from './LocalizedLink';
import { Mail, Phone, MapPin, Linkedin, Twitter, Instagram, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/I18nContext';

export default function Footer() {
  const { t } = useLanguage();

  const quickLinks = [
    { key: 'about', href: '/about' },
    { key: 'services', href: '/services' },
    { key: 'projects', href: '/projects' },
    { key: 'contact', href: '/contact' }
  ];

  const services = [
    'Market Entry Strategy',
    'Cultural Exchange Programs',
    'Business Consulting',
    'JV/M&A Advisory'
  ];

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-pattern opacity-5"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex justify-center lg:justify-start items-center mb-4">
              <img 
                src="/Starajin LogoX3.png" 
                alt="Starajin Logo" 
                className="h-32 w-auto object-contain filter brightness-0 invert"
              />
            </div>
            
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              {t('footer.description')}
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4 mb-6">
              <a href="#" className="w-10 h-10 bg-starajin-blue hover:bg-starajin-orange rounded-full flex items-center justify-center transition-colors group">
                <Linkedin size={18} className="group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="w-10 h-10 bg-starajin-blue hover:bg-starajin-orange rounded-full flex items-center justify-center transition-colors group">
                <Twitter size={18} className="group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="w-10 h-10 bg-starajin-blue hover:bg-starajin-orange rounded-full flex items-center justify-center transition-colors group">
                <Instagram size={18} className="group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="w-10 h-10 bg-starajin-blue hover:bg-starajin-orange rounded-full flex items-center justify-center transition-colors group">
                <Mail size={18} className="group-hover:scale-110 transition-transform" />
              </a>
            </div>

            {/* Newsletter */}
            <div className="bg-gray-800 rounded-2xl p-6">
              <h4 className="text-lg font-semibold mb-3">{t('footer.stayUpdated')}</h4>
              <p className="text-gray-400 text-sm mb-4">{t('footer.getLatestInsights')}</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder={t('footer.enterEmail')}
                  className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-starajin-orange text-white"
                />
                <button className="px-4 py-2 bg-starajin-orange hover:bg-orange-600 rounded-r-lg transition-colors">
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-starajin-orange">{t('footer.quickLinks')}</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <LocalizedLink 
                    to={link.href} 
                    className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    {t(`nav.${link.key}`)}
                  </LocalizedLink>
                </li>
              ))}
            </ul>

            <h4 className="text-md font-semibold mt-8 mb-4 text-starajin-orange">{t('footer.services')}</h4>
            <ul className="space-y-2">
              {['businessDev', 'consulting', 'partnerMatching', 'cultural'].map((serviceKey, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-400 hover:text-gray-300 text-sm transition-colors">
                    {t(`services.${serviceKey}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-starajin-orange">{t('footer.contactUs')}</h3>
            
            {/* Korea Office */}
            <div className="mb-6">
              <h4 className="font-semibold mb-3 flex items-center">
                🇰🇷 {t('footer.koreaOffice')}
              </h4>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex items-start space-x-2">
                  <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                  <span>Seoul, South Korea</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone size={16} className="flex-shrink-0" />
                  <span>+82-2-1234-5678</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail size={16} className="flex-shrink-0" />
                  <span>korea@starajin.com</span>
                </div>
              </div>
            </div>

            {/* India Office */}
            <div>
              <h4 className="font-semibold mb-3 flex items-center">
                🇮🇳 {t('footer.indiaOffice')}
              </h4>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex items-start space-x-2">
                  <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                  <span>Mumbai, India</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone size={16} className="flex-shrink-0" />
                  <span>+91-22-9876-5432</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail size={16} className="flex-shrink-0" />
                  <span>india@starajin.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              {t('footer.rights')}
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">{t('footer.privacyPolicy')}</a>
              <a href="#" className="hover:text-white transition-colors">{t('footer.termsOfService')}</a>
              <a href="#" className="hover:text-white transition-colors">{t('footer.cookiePolicy')}</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}