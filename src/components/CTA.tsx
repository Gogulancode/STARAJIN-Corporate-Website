import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, CheckCircle, Phone, Mail } from 'lucide-react';
import { useLanguage } from '../contexts/I18nContext';

export default function CTA() {
  const { t } = useLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="section-padding bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-starajin-blue/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-starajin-orange/10 rounded-full blur-3xl"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-gray-900"
          >
            <div className="inline-flex items-center px-4 py-2 bg-starajin-blue/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6 text-starajin-blue">
              <span className="w-2 h-2 bg-starajin-orange rounded-full mr-2 animate-pulse"></span>
              {t('cta.readyToExpand')}
            </div>

            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6 text-gray-900">
              {t('cta.beginExpansion')}
              <span className="block text-starajin-orange">{t('cta.withStarajin')}</span>
            </h2>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {t('cta.joinSuccessful')}
            </p>
            
            {/* Benefits List */}
            <div className="space-y-4 mb-8">
              {['expertAnalysis', 'culturalBridge', 'regulatorySupport', 'provenTrack'].map((benefitKey, index) => (
                <motion.div
                  key={benefitKey}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="flex items-start space-x-3"
                >
                  <CheckCircle className="w-6 h-6 text-starajin-orange flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">{t(`benefits.${benefitKey}`)}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button className="group inline-flex items-center px-8 py-4 bg-starajin-blue text-white font-semibold rounded-full hover:bg-starajin-blue/90 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                {t('cta.getStartedToday')}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="group inline-flex items-center px-8 py-4 bg-white border-2 border-starajin-blue text-starajin-blue font-semibold rounded-full hover:bg-starajin-blue hover:text-white transition-all duration-300">
                <Phone className="mr-2 h-5 w-5" />
                {t('cta.scheduleCall')}
              </button>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-gray-50 border border-gray-200 rounded-3xl p-8 shadow-xl">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('cta.quickConsultation')}</h3>
                <p className="text-gray-600">{t('cta.expertAdvice')}</p>
              </div>
              
              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder={t('cta.yourName')}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-starajin-orange focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder={t('cta.company')}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-starajin-orange focus:border-transparent"
                  />
                </div>
                
                <input
                  type="email"
                  placeholder={t('cta.emailAddress')}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-starajin-orange focus:border-transparent"
                />
                
                <select className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-starajin-orange focus:border-transparent">
                  <option value="" className="text-gray-500">{t('cta.selectService')}</option>
                  <option value="market-entry" className="text-gray-900">{t('services.marketEntry')}</option>
                  <option value="business-dev" className="text-gray-900">{t('services.businessDev')}</option>
                  <option value="consulting" className="text-gray-900">{t('services.consulting')}</option>
                  <option value="cultural" className="text-gray-900">{t('services.cultural')}</option>
                </select>
                
                <textarea
                  placeholder={t('cta.tellUsGoals')}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-starajin-orange focus:border-transparent resize-none"
                ></textarea>
                
                <button
                  type="submit"
                  className="w-full px-6 py-4 bg-starajin-orange text-white font-semibold rounded-xl hover:bg-starajin-orange/90 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  {t('cta.requestConsultation')}
                </button>
              </form>
              
              <div className="mt-6 text-center">
                <p className="text-gray-500 text-sm">
                  {t('cta.secureInfo')}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}