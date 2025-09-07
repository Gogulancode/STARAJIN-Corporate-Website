/**
 * STARAJIN COMPONENT TEMPLATE
 * 
 * 🔥 USE THIS TEMPLATE FOR ALL NEW COMPONENTS
 * 
 * This template ensures every component automatically supports Korean translation
 * and follows STARAJIN development standards.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../contexts/LanguageContext';

interface ComponentNameProps {
  // Define your props here
}

export default function ComponentName({ }: ComponentNameProps) {
  // 🌍 REQUIRED: Initialize translation hook
  const { t } = useLanguage();
  
  // Animation hook for scroll-triggered animations
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      ref={ref}
      className="py-16 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          {/* 🔥 NEVER use hard-coded text - ALWAYS use t() function */}
          <h2 className="text-3xl font-bold text-center mb-8">
            {t('componentName.title')}
          </h2>
          
          <p className="text-lg text-center text-gray-600 mb-12">
            {t('componentName.description')}
          </p>
          
          {/* Add your component content here */}
          
        </motion.div>
      </div>
    </section>
  );
}

/**
 * 📝 TRANSLATION KEYS TO ADD:
 * 
 * Add these to src/i18n/translations.ts:
 * 
 * English (en):
 * componentName: {
 *   title: "Your English Title",
 *   description: "Your English Description"
 * }
 * 
 * Korean (ko):
 * componentName: {
 *   title: "한국어 제목",
 *   description: "한국어 설명"
 * }
 */
