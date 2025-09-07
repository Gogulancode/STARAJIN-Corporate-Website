import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/I18nContext';

export default function BrandSection() {
  const { t } = useLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  // Client logos data
  const clients = [
    {
      id: 1,
      name: "Partner 1",
      logo: "/logos/logo_01.png",
      alt: "Partner 1 Logo"
    },
    {
      id: 2,
      name: "Partner 2",
      logo: "/logos/logo_02.png",
      alt: "Partner 2 Logo"
    },
    {
      id: 3,
      name: "Partner 3",
      logo: "/logos/logo_03.png",
      alt: "Partner 3 Logo"
    },
    {
      id: 4,
      name: "Partner 4",
      logo: "/logos/logo_04.png",
      alt: "Partner 4 Logo"
    },
    {
      id: 5,
      name: "Partner 5",
      logo: "/logos/logo_05.png",
      alt: "Partner 5 Logo"
    },
    {
      id: 6,
      name: "Partner 6",
      logo: "/logos/logo_06.png",
      alt: "Partner 6 Logo"
    },
    {
      id: 7,
      name: "Partner 7",
      logo: "/logos/logo_07.png",
      alt: "Partner 7 Logo"
    },
    {
      id: 8,
      name: "Partner 8",
      logo: "/logos/logo_08.png",
      alt: "Partner 8 Logo"
    },
    {
      id: 9,
      name: "Partner 9",
      logo: "/logos/logo_09.png",
      alt: "Partner 9 Logo"
    },
    {
      id: 10,
      name: "Partner 10",
      logo: "/logos/logo_10.png",
      alt: "Partner 10 Logo"
    },
    {
      id: 11,
      name: "Partner 11",
      logo: "/logos/logo_11.png",
      alt: "Partner 11 Logo"
    },
    {
      id: 12,
      name: "Partner 12",
      logo: "/logos/logo_12.png",
      alt: "Partner 12 Logo"
    },
    {
      id: 13,
      name: "Partner 13",
      logo: "/logos/logo_13.png",
      alt: "Partner 13 Logo"
    },
    {
      id: 14,
      name: "Partner 14",
      logo: "/logos/logo_14.png",
      alt: "Partner 14 Logo"
    },
    {
      id: 15,
      name: "Partner 15",
      logo: "/logos/logo_15.png",
      alt: "Partner 15 Logo"
    },
    {
      id: 16,
      name: "Partner 16",
      logo: "/logos/logo_16.png",
      alt: "Partner 16 Logo"
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex + 6 >= clients.length ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(timer);
  }, [clients.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex + 6 >= clients.length ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? Math.max(0, clients.length - 6) : prevIndex - 1
    );
  };

  // Get visible clients (6 at a time for better layout)
  const visibleClients = clients.slice(currentIndex, currentIndex + 6);
  if (visibleClients.length < 6 && currentIndex > 0) {
    // If we don't have enough clients, fill from the beginning
    const needed = 6 - visibleClients.length;
    visibleClients.push(...clients.slice(0, needed));
  }

  return (
    <section className="py-12 lg:py-16" style={{ backgroundColor: '#224288' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-8 lg:mb-12"
        >
          <div className="flex items-center mb-6">
            <h2 className="font-malgun text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              {t('brandSection.title')}
            </h2>
            <div className="flex-1 h-px bg-white/30 ml-8"></div>
          </div>
        </motion.div>

        {/* Clients Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-starajin-orange hover:text-white group"
            aria-label="Previous clients"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-starajin-orange hover:text-white group"
            aria-label="Next clients"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Clients Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
            {visibleClients.map((client, index) => (
              <motion.div
                key={`${client.id}-${currentIndex}-${index}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-white backdrop-blur-sm p-4 lg:p-6 rounded-xl border border-white/20 hover:border-starajin-orange hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center min-h-[100px] lg:min-h-[120px]"
              >
                <div className="relative w-full h-12 lg:h-16">
                  <img
                    src={client.logo}
                    alt={client.alt}
                    className="w-full h-full object-contain transition-all duration-300"
                    onError={(e) => {
                      // Fallback to a placeholder or text if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `
                          <div class="w-full h-full flex items-center justify-center">
                            <span class="font-malgun font-bold text-gray-600 group-hover:text-starajin-orange transition-colors text-sm text-center">
                              ${client.name}
                            </span>
                          </div>
                        `;
                      }
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: Math.ceil(clients.length / 6) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index * 6)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  Math.floor(currentIndex / 6) === index
                    ? 'bg-starajin-orange scale-125'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
