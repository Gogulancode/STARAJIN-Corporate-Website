
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/I18nContext';

export default function Services() {
  const { t } = useLanguage();
  const services = [
    {
      key: "businessEntry",
      titleKey: "services.businessEntry.title",
      descriptionKey: "services.businessEntry.description",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=500&fit=crop&crop=center",
      date: "September 06, 2025"
    },
    {
      key: "investment",
      titleKey: "services.investment.title",
      descriptionKey: "services.investment.description",
      image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&h=500&fit=crop&crop=center",
      date: "August 25, 2025"
    },
    {
      key: "b2bPartner",
      titleKey: "services.b2bPartner.title",
      descriptionKey: "services.b2bPartner.description",
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=500&fit=crop&crop=center",
      date: "August 20, 2025"
    },
    {
      key: "strategyConsultation",
      titleKey: "services.strategyConsultation.title",
      descriptionKey: "services.strategyConsultation.description",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=500&fit=crop&crop=center",
      date: "August 15, 2025"
    },
    {
      key: "businessData",
      titleKey: "services.businessData.title",
      descriptionKey: "services.businessData.description",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop&crop=center",
      date: "August 10, 2025"
    }
  ];

  // Slider state
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(1);
  const [cardWidth, setCardWidth] = useState(0);
  const [translate, setTranslate] = useState(0); // actual animated translateX
  const trackRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  // Determine visible cards by breakpoint
  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      if (w >= 1280) setVisible(4); else if (w >= 640) setVisible(2); else setVisible(1);
      if (cardRef.current) setCardWidth(cardRef.current.offsetWidth);
    };
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, []);

  // Clamp current when visible changes
  useEffect(() => {
    setCurrent(c => Math.min(c, Math.max(0, services.length - visible)));
  }, [visible, services.length]);

  const gap = 32; // px

  const computeTarget = (idx: number) => {
    if (!cardWidth || !trackRef.current || !containerRef.current) return 0;
    let base = -(cardWidth + gap) * idx;
    if (idx === services.length - visible) {
      const maxShift = trackRef.current.scrollWidth - containerRef.current.clientWidth;
      if (maxShift > 0) base = -maxShift;
    }
    return base;
  };

  // Animate translate when current changes
  useEffect(() => {
    const target = computeTarget(current);
    let start: number | null = null;
    const from = translate;
    const distance = target - from;
    if (Math.abs(distance) < 1) { setTranslate(target); return; }
    const duration = 650; // ms similar to Chevron smooth glide
    const ease = (t: number) => 1 - Math.pow(1 - t, 3); // easeOutCubic
    let frame: number;
    const step = (ts: number) => {
      if (start === null) start = ts;
      const progress = Math.min(1, (ts - start) / duration);
      setTranslate(from + distance * ease(progress));
      if (progress < 1) frame = requestAnimationFrame(step); else cancelAnimationFrame(frame);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, cardWidth, visible]);

  const next = () => setCurrent(c => Math.min(c + 1, services.length - visible));
  const prev = () => setCurrent(c => Math.max(c - 1, 0));

  return (
  <section className="py-14 sm:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
  <div className="mb-6 max-w-3xl">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">{t('services.title')}</h2>
          <p className="mt-4 text-lg text-gray-600">{t('services.subtitle')}</p>
        </div>

        {/* Slider Wrapper */}
        <div className="relative">
          {/* Gradient Fades removed per request */}

          {/* Track */}
          <div className="overflow-hidden" ref={containerRef}>
            <div
              ref={trackRef}
              className="flex gap-8 will-change-transform"
              style={{ transform: `translate3d(${translate}px,0,0)` }}
            >
              {services.map((service, i) => {
                const isActive = i === current; // first visible card emphasis (Chevron style)
                const distanceFromActive = Math.abs(i - current);
                const scale = distanceFromActive === 0 ? 1 : distanceFromActive === 1 ? 0.96 : 0.93;
                const dim = distanceFromActive === 0 ? 'opacity-100' : 'opacity-85';
                return (
                <div
                  key={service.key}
                  ref={i === 0 ? cardRef : undefined}
                  aria-current={isActive ? 'true' : undefined}
                  className={`group flex flex-col rounded-2xl overflow-hidden border border-gray-100 w-72 sm:w-80 lg:w-72 xl:w-80 flex-shrink-0 will-change-transform transition-all duration-500 ease-[cubic-bezier(.22,.68,.37,1.02)] ${dim} ${isActive ? 'bg-white shadow-xl z-10' : 'bg-white shadow-md'} `}
                  style={{ transform: `scale(${scale})` }}
                >
                  <div className="h-48 w-full overflow-hidden">
                    <img
                      src={service.image}
                      alt={t(service.titleKey)}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-1 flex flex-col p-6">
                    {/* Date removed per request */}
                    <h3 className="text-lg font-bold text-gray-900 mb-3 leading-snug line-clamp-3">{t(service.titleKey)}</h3>
                    <p className="text-gray-600 text-sm mb-4 flex-1 line-clamp-4">{t(service.descriptionKey)}</p>
                    <button
                      className="inline-flex items-center text-starajin-blue font-semibold text-sm hover:text-starajin-orange transition-colors duration-300 mt-auto"
                    >
                      <ArrowRight className="w-4 h-4 mr-1" /> {t('services.readArticle')}
                    </button>
                  </div>
                </div>
              )})}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-8">
            <div className="flex gap-3">
              <button
                onClick={prev}
                disabled={current === 0}
                className="disabled:opacity-30 disabled:cursor-not-allowed w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center bg-white hover:border-starajin-blue hover:text-starajin-blue transition-colors"
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                disabled={current >= services.length - visible}
                className="disabled:opacity-30 disabled:cursor-not-allowed w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center bg-white hover:border-starajin-blue hover:text-starajin-blue transition-colors"
                aria-label="Next"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Dots */}
            <div className="flex gap-2">
              {Array.from({ length: services.length - visible + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current ? 'bg-starajin-blue w-6' : 'bg-gray-300 w-2 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* CTA Section Below Services */}
      <div className="mt-6">
        <div className="w-full bg-white/90 backdrop-blur-sm border-y border-gray-200 py-6 sm:py-7">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 tracking-tight">{t('services.readyToExpand')}</h3>
              <p className="text-sm sm:text-base text-gray-600 mt-1">{t('services.readyToExpandDesc')}</p>
            </div>
            <button className="inline-flex items-center justify-center bg-starajin-orange hover:bg-starajin-orange/90 text-white font-medium text-sm sm:text-base rounded-full px-6 py-3 transition-colors shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-starajin-orange/30">{t('services.getStarted')}</button>
          </div>
        </div>
      </div>
    </section>
  );
}
