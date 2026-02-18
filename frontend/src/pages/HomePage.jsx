/**
 * Home Page
 * Clean layout with premium carousel first
 * Structure: HeroCarousel → Stats → HowItWorks
 */

import { useRaffles } from '../hooks';
import { HeroCarousel, StatsSection, HowItWorks, BackendRafflesCarousel } from '../components/sections';
import AboutSection from "../components/sections/AboutSection";
const HomePage = () => {
  const { raffles, loading, error } = useRaffles({ status: 'active' });

return (
  <>
    {/* About Section - Primera sección */}
    <AboutSection />

    {/* Premium Carousel */}
    <HeroCarousel raffles={raffles} loading={loading} error={error} />

    {/* Backend-sourced carousel */}
    <BackendRafflesCarousel raffles={raffles} loading={loading} error={error} />

    {/* Stats Section */}
    <StatsSection />

    {/* How It Works */}
    <HowItWorks />
  </>
);
};

export default HomePage;