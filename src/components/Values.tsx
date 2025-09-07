import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Grid as Bridge, Target, Lightbulb, Leaf, Shield } from 'lucide-react';
import { useLanguage } from '../contexts/I18nContext';

export default function Values() {
  const { t } = useLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const values = [
    {
      key: 'bridging',
      icon: Bridge,
      color: 'bg-starajin-blue',
      hoverColor: 'group-hover:bg-starajin-orange',
    },
    {
      key: 'expertise',
      icon: Target,
      color: 'bg-starajin-orange',
      hoverColor: 'group-hover:bg-starajin-blue',
    },
    {
      key: 'innovation',
      icon: Lightbulb,
      color: 'bg-starajin-blue',
      hoverColor: 'group-hover:bg-starajin-orange',
    },
    {
      key: 'sustainability',
      icon: Leaf,
      color: 'bg-starajin-orange',
      hoverColor: 'group-hover:bg-starajin-blue',
    },
    {
      key: 'trust',
      icon: Shield,
      color: 'bg-starajin-blue',
      hoverColor: 'group-hover:bg-starajin-orange',
    },
  ];

  return (
    <section className="section-padding bg-starajin-light-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-starajin-orange/10 rounded-full text-starajin-orange font-medium text-sm mb-4">
            {t('values.foundation')}
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {t('values.title')}
          </h2>
          <p className="text-xl text-starajin-gray max-w-3xl mx-auto">
            {t('values.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.key}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group text-center card-hover"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                  <div className={`w-16 h-16 ${value.color} ${value.hoverColor} rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-6`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-starajin-blue transition-colors">
                    {t(`values.${value.key}`)}
                  </h3>
                  <p className="text-starajin-gray leading-relaxed">
                    {t(`values.${value.key}Desc`)}
                  </p>
                  
                  {/* Hover Effect Line */}
                  <div className="w-0 h-1 bg-starajin-orange mx-auto mt-4 group-hover:w-12 transition-all duration-300"></div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {t('values.readyToBridge')}
            </h3>
            <p className="text-starajin-gray mb-6">
              {t('values.letOurValues')}
            </p>
            <button className="inline-flex items-center px-8 py-4 starajin-orange-gradient text-white font-semibold rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              {t('hero.cta')}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}