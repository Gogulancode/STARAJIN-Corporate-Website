import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../contexts/I18nContext';

// Move stats outside component to prevent recreation
const STATS = [
  { value: 15, suffix: '+', labelKey: 'whyStarajin.stats.years.title' },
  { value: 1000, suffix: '+', labelKey: 'whyStarajin.stats.network.title' },
  { value: 50, suffix: '+', labelKey: 'whyStarajin.stats.success.title' },
  { value: 100, suffix: '%', labelKey: 'whyStarajin.stats.support.title' }
];

export default function WhyStarajin() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement | null>(null);
  const [started, setStarted] = useState(false);
  const [displayed, setDisplayed] = useState(STATS.map(() => 0));
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setStarted(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    
    // Clear any existing animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    const duration = 1200;
    const start = performance.now();
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    
    const tick = () => {
      const now = performance.now();
      const progress = Math.min(1, (now - start) / duration);
      setDisplayed(STATS.map(stat => Math.round(stat.value * ease(progress))));
      
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(tick);
      } else {
        animationRef.current = null;
      }
    };
    
    animationRef.current = requestAnimationFrame(tick);
    
    // Cleanup function
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [started]);

  return (
    <section
      ref={sectionRef}
      // Updated to new primary token color (#22428a)
      className="py-14 sm:py-16 relative overflow-hidden bg-[#22428a]"
    >
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_65%)]" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-white">
          <span className="text-secondary">{t('whyStarajin.title')}</span>
        </h2>
        <p className="max-w-3xl mx-auto text-xs sm:text-sm md:text-base text-white/80 mb-8 leading-relaxed">
          {t('whyStarajin.description')}
        </p>
        <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6 sm:gap-y-10">
          {STATS.map((stat, i) => (
            <div key={i} className="flex flex-col items-center group">
              <div className="flex items-baseline gap-1 text-4xl sm:text-5xl font-bold text-secondary tracking-tight transition-transform duration-300 group-hover:scale-105">
                <span>{displayed[i]}</span>
                <span className="text-white text-2xl sm:text-3xl leading-none">{stat.suffix}</span>
              </div>
              <div className="mt-2 text-[10px] sm:text-xs md:text-sm font-medium tracking-wide text-white/85 uppercase">
                {t(stat.labelKey)}
              </div>
              <div className="mt-2 w-8 h-[3px] rounded-full bg-secondary/70 group-hover:bg-secondary transition-colors" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
