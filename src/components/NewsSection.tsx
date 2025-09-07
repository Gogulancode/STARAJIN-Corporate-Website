import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, ExternalLink, TrendingUp, Clock } from 'lucide-react';
import { useLanguage } from '../contexts/I18nContext';

export default function NewsSection() {
  const { t } = useLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const newsItems = [
    {
      id: 1,
      title: "Korea-India Trade Relations Reach New Heights in 2024",
      summary: "Bilateral trade between Korea and India exceeded $25 billion, marking a significant milestone in economic cooperation between the two nations.",
      source: "Korea Herald",
      date: "2024-01-15",
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
      url: "#",
      category: "Trade",
      trending: true
    },
    {
      id: 2,
      title: "Korean Startups Eye Indian Market Expansion",
      summary: "Major Korean tech companies announce plans for significant investments in the Indian startup ecosystem, focusing on fintech and e-commerce.",
      source: "Yonhap News",
      date: "2024-01-12",
      image: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg",
      url: "#",
      category: "Technology",
      trending: false
    },
    {
      id: 3,
      title: "Cultural Exchange Programs Show Promising Results",
      summary: "Korea-India cultural exchange initiatives report increased participation and successful outcomes in educational and artistic collaborations.",
      source: "Korea Times",
      date: "2024-01-10",
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg",
      url: "#",
      category: "Culture",
      trending: false
    }
  ];

  return (
    <section className="py-6 sm:py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section - Left Aligned */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-4 lg:mb-6"
        >
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between">
            <div className="lg:max-w-2xl">
              <h2 className="font-malgun text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
                {t('news.latestUpdates')}
              </h2>
              <p className="font-malgun text-lg text-starajin-gray">
                {t('news.stayInformed')}
              </p>
            </div>
          </div>
        </motion.div>

        {/* News Cards - 3 Cards Across Full Width */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {newsItems.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Image Section */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                
                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-1 bg-starajin-blue text-white text-xs font-medium rounded">
                    {item.category}
                  </span>
                </div>

                {/* Trending Badge */}
                {item.trending && (
                  <div className="absolute top-3 right-3">
                    <div className="flex items-center px-2 py-1 bg-starajin-orange text-white text-xs font-medium rounded">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Trending
                    </div>
                  </div>
                )}
              </div>
              
              {/* Content Section */}
              <div className="p-4">
                {/* Title */}
                <h3 className="font-malgun text-lg font-bold text-gray-900 mb-2 group-hover:text-starajin-blue transition-colors line-clamp-2 leading-tight">
                  {item.title}
                </h3>
                
                {/* Summary */}
                <p className="font-malgun text-sm text-gray-600 mb-3 line-clamp-3 leading-relaxed">
                  {item.summary}
                </p>
                
                {/* Meta Info */}
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {new Date(item.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium">BY {item.source.toUpperCase()}</span>
                    <ExternalLink className="w-3 h-3 ml-2 text-starajin-blue group-hover:text-starajin-orange transition-colors" />
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
        
        {/* View More Button */}
        <div className="flex justify-center mt-6">
                      <button className="text-starajin-orange font-medium hover:text-starajin-orange/80 transition-colors">{t('news.viewMore')}</button>
        </div>
      </div>
    </section>
  );
}