/**
 * Home Page
 * Clean layout with premium carousel first
 * Structure: HeroCarousel → Stats → HowItWorks
 */

import { useRaffles } from '../hooks';
import { HeroCarousel, StatsSection, HowItWorks } from '../components/sections';

const HomePage = () => {
  const { raffles, loading, error } = useRaffles({ status: 'active' });

  return (
    <>
      {/* Premium Carousel - First Section */}
      <HeroCarousel raffles={raffles} loading={loading} />

      {/* Stats Section */}
      <StatsSection />

      {/* How It Works */}
      <HowItWorks />
    </>
  );
};

export default HomePage;