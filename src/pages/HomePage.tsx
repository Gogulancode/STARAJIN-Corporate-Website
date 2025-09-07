import Hero from '../components/Hero';
import WhyStarajin from '../components/WhyStarajin';
import Services from '../components/Services';
import TrackRecord from '../components/TrackRecord';
import NewsSection from '../components/NewsSection';
import BrandSection from '../components/BrandSection';
import CTA from '../components/CTA';

export default function HomePage() {
  console.log('HomePage rendering...');
  return (
    <main className="min-h-screen">
      <Hero />
      <WhyStarajin />
      <Services />
      <TrackRecord />
      <NewsSection />
      <BrandSection />
      <CTA />
    </main>
  );
}