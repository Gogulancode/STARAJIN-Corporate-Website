import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Values from '@/components/Values';
import Services from '@/components/Services';
import TrackRecord from '@/components/TrackRecord';
import NewsSection from '@/components/NewsSection';
import BrandSection from '@/components/BrandSection';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <Values />
      <Services />
      <TrackRecord />
      <NewsSection />
      <BrandSection />
      <CTA />
      <Footer />
    </main>
  );
}