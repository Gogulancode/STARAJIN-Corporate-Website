import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/I18nContext';
import { useState, useEffect } from 'react';

export default function Hero() {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const slides = [
    {
      titleKey: "hero.slide1.title",
      subtitleKey: "hero.slide1.subtitle", 
      descriptionKey: "hero.slide1.description",
      ctaKey: "hero.slide1.cta",
      backgroundImage: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      featuresKey: ["hero.slide1.feature1", "hero.slide1.feature2", "hero.slide1.feature3", "hero.slide1.feature4"],
      graphic: "market-entry"
    },
    {
      titleKey: "hero.slide2.title",
      subtitleKey: "hero.slide2.subtitle",
      descriptionKey: "hero.slide2.description", 
      ctaKey: "hero.slide2.cta",
      backgroundImage: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      featuresKey: ["hero.slide2.feature1", "hero.slide2.feature2", "hero.slide2.feature3", "hero.slide2.feature4"],
      graphic: "investment"
    },
    {
      titleKey: "hero.slide3.title",
      subtitleKey: "hero.slide3.subtitle",
      descriptionKey: "hero.slide3.description",
      ctaKey: "hero.slide3.cta", 
      backgroundImage: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      featuresKey: ["hero.slide3.feature1", "hero.slide3.feature2", "hero.slide3.feature3", "hero.slide3.feature4"],
      graphic: "cultural-exchange"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isAnimating) {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length, isAnimating]);

  const nextSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const prevSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const goToSlide = (index: number) => {
    if (!isAnimating && index !== currentSlide) {
      setIsAnimating(true);
      setCurrentSlide(index);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  return (
    <>
      {/* Hero Slider Section */}
      <section className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] lg:min-h-screen overflow-hidden">
        <div className="relative w-full h-full">
          {/* Slides */}
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out ${
                index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
              style={{ 
                backgroundImage: `url(${slide.backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >
              {/* Dark Overlay for Content Visibility */}
              <div className="absolute inset-0 bg-black/50"></div>
              
              {/* Optional Subtle Pattern Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/20"></div>

              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center z-20">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
                  {/* Content - Left Side */}
                  <div className="text-white space-y-6 lg:space-y-8 font-malgun text-center lg:text-left">
                    {/* Main Title */}
                    <div className="space-y-2">
                      <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                        {t(slide.titleKey)}
                      </h1>
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-4xl font-bold text-starajin-orange break-words">
                        {t(slide.subtitleKey)}
                      </h2>
                    </div>
                    
                    {/* Description */}
                    <p className="text-base sm:text-lg lg:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
                      {t(slide.descriptionKey)}
                    </p>

                    {/* CTA Button */}
                    <div className="pt-4">
                      <button className="group inline-flex items-center justify-center px-6 lg:px-8 py-3 lg:py-4 bg-starajin-blue text-white font-semibold rounded-xl hover:bg-starajin-blue/80 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                        {t(slide.ctaKey)}
                        <ArrowRight className="ml-2 h-4 w-4 lg:h-5 lg:w-5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>

                  {/* Features Grid - Right Side */}
                  <div className="hidden md:block lg:block">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
                      {slide.featuresKey.map((featureKey, featureIndex) => (
                        <div
                          key={featureIndex}
                          className="bg-white/20 backdrop-blur-md rounded-lg p-3 lg:p-4 border border-white/30 hover:bg-white/30 transition-all duration-300 group"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-starajin-orange rounded-full"></div>
                            <div className="w-5 h-5 lg:w-6 lg:h-6 border border-white/40 rounded group-hover:border-starajin-orange transition-colors">
                              <div className="w-full h-full bg-white/20 rounded"></div>
                            </div>
                          </div>
                          <h4 className="text-white font-semibold text-xs lg:text-sm mb-2 leading-tight font-malgun">{t(featureKey)}</h4>
                          <div className="h-0.5 bg-gradient-to-r from-starajin-orange/60 to-white/20 rounded-full"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Slide Navigation */}
          <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2 z-30">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button
                onClick={prevSlide}
                disabled={isAnimating}
                className="p-2 sm:p-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 text-white hover:bg-white hover:text-gray-900 transition-all duration-300 disabled:opacity-50"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              
              <div className="flex space-x-1 sm:space-x-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    disabled={isAnimating}
                    className={`h-2 sm:h-3 rounded-full transition-all duration-300 disabled:opacity-50 ${
                      index === currentSlide ? 'bg-white w-6 sm:w-8' : 'bg-white/40 w-2 sm:w-3'
                    }`}
                  />
                ))}
              </div>
              
              <button
                onClick={nextSlide}
                disabled={isAnimating}
                className="p-2 sm:p-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 text-white hover:bg-white hover:text-gray-900 transition-all duration-300 disabled:opacity-50"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}