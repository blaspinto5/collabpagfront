/**
 * FeaturedRaffles Section
 * Carousel with featured active raffles
 * Optimized with memo
 */

import { memo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, ChevronLeft, ChevronRight, Sparkles, ChevronDown } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import RaffleCard from '../RaffleCard';
import { CardSkeleton } from '../Loading';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const FeaturedRaffles = ({ raffles, loading, error }) => {
  return (
    <section className="relative py-20 md:py-28 lg:py-32 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/50 via-primary/30 to-primary-dark/70" />
      
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-gold/40 rounded-full animate-[float_4s_ease-in-out_infinite]" />
        <div className="absolute top-40 right-20 w-3 h-3 bg-cyan/30 rounded-full animate-[float_5s_ease-in-out_infinite_0.5s]" />
        <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-gold/30 rounded-full animate-[float_3.5s_ease-in-out_infinite_1s]" />
        <div className="absolute top-1/3 right-1/3 w-4 h-4 bg-cyan/20 rounded-full animate-[float_6s_ease-in-out_infinite_0.2s]" />
        <div className="absolute bottom-20 right-10 w-2 h-2 bg-gold/50 rounded-full animate-[float_4.5s_ease-in-out_infinite_0.8s]" />
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-8 sm:px-10 lg:px-16">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 mb-6 animate-[pulse-glow_2s_ease-in-out_infinite]">
            <Sparkles size={18} className="text-gold animate-spin" style={{ animationDuration: '3s' }} />
            <span className="text-gold text-sm font-semibold uppercase tracking-wider">
              Sorteos Destacados
            </span>
            <Sparkles size={18} className="text-gold animate-spin" style={{ animationDuration: '3s', animationDirection: 'reverse' }} />
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight animate-[float_4s_ease-in-out_infinite]">
            ¡Participa Ahora!
          </h2>
          
          <p className="text-slate-400 text-base md:text-lg lg:text-xl max-w-2xl mx-auto mb-6">
            No pierdas la oportunidad de ganar increíbles premios
          </p>
          
          {/* Animated Arrows */}
          <div className="flex justify-center gap-4">
            <ChevronDown size={28} className="text-gold animate-[bounce-arrow_1.5s_ease-in-out_infinite]" />
            <ChevronDown size={28} className="text-gold animate-[bounce-arrow_1.5s_ease-in-out_infinite_0.2s]" />
          </div>
        </div>

        {/* Content */}
        {error ? (
          <ErrorState message={error} />
        ) : loading ? (
          <LoadingState />
        ) : raffles.length > 0 ? (
          <CarouselContent raffles={raffles} />
        ) : (
          <EmptyState />
        )}

        {/* View All CTA */}
        {raffles.length > 0 && !loading && !error && (
          <div className="text-center mt-12 md:mt-16">
            <Link
              to="/sorteos"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-gold to-yellow-500 text-primary-dark font-bold text-base md:text-lg rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,215,0,0.4)]"
            >
              <span>Ver todos los sorteos</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

// Carousel Content - Memoized
const CarouselContent = memo(({ raffles }) => (
  <div className="relative mx-auto max-w-5xl">
    {/* Navigation Buttons */}
    <button 
      className="swiper-btn-prev hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-slate-900/90 border border-gold/50 items-center justify-center text-gold hover:bg-gold hover:text-slate-900 transition-colors"
      aria-label="Anterior"
    >
      <ChevronLeft size={20} />
    </button>
    <button 
      className="swiper-btn-next hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-slate-900/90 border border-gold/50 items-center justify-center text-gold hover:bg-gold hover:text-slate-900 transition-colors"
      aria-label="Siguiente"
    >
      <ChevronRight size={20} />
    </button>

    {/* Swiper Carousel */}
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={20}
      slidesPerView={1}
      centeredSlides={false}
      navigation={{
        prevEl: '.swiper-btn-prev',
        nextEl: '.swiper-btn-next',
      }}
      pagination={{ 
        clickable: true,
        dynamicBullets: true,
      }}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      }}
      loop={raffles.length > 3}
      breakpoints={{
        500: { slidesPerView: 1, spaceBetween: 16 },
        700: { slidesPerView: 2, spaceBetween: 20 },
        1024: { slidesPerView: 3, spaceBetween: 24 },
      }}
      className="!px-1"
    >
      {raffles.map((raffle) => (
        <SwiperSlide key={raffle.id}>
          <RaffleCard raffle={raffle} />
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
));

CarouselContent.displayName = 'CarouselContent';

// Loading State - Memoized (static component)
const LoadingState = memo(() => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
    {[...Array(3)].map((_, i) => (
      <CardSkeleton key={i} />
    ))}
  </div>
));

LoadingState.displayName = 'LoadingState';

// Error State - Memoized
const ErrorState = memo(({ message }) => (
  <div className="text-center py-16 bg-red-500/10 backdrop-blur-sm rounded-2xl border border-red-500/20">
    <p className="text-red-400 text-lg">{message}</p>
  </div>
));

ErrorState.displayName = 'ErrorState';

// Empty State - Memoized (static component)
const EmptyState = memo(() => (
  <div className="text-center py-16 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
    <Star size={48} className="text-slate-600 mx-auto mb-4" />
    <p className="text-slate-400 text-lg md:text-xl">
      No hay sorteos activos en este momento.
    </p>
    <p className="text-slate-500 mt-2">
      ¡Vuelve pronto para nuevas oportunidades!
    </p>
  </div>
));

EmptyState.displayName = 'EmptyState';

export default FeaturedRaffles;
