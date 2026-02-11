/**
 * HeroCarousel Component
 * Clean, centered carousel with Swiper
 * Aligned with header max-w-7xl layout
 */

import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import { Trophy, Ticket, Clock, ChevronRight, ChevronLeft, Flame } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Price formatter
const formatPrice = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  minimumFractionDigits: 0
}).format;

// Date formatter
const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString('es-CL', {
    day: 'numeric',
    month: 'short'
  });

const HeroCarousel = ({ raffles, loading }) => {
  if (loading) return <LoadingSkeleton />;
  if (!raffles?.length) return null;

  return (
    <section className="pt-8 pb-12 md:pt-12 md:pb-16">
      {/* Section Header - Con padding estándar */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 mb-8 md:mb-10 text-center">
        <span className="inline-block px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-[10px] md:text-xs font-bold uppercase tracking-widest mb-4">
          Sorteos Activos
        </span>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight">
          Elige tu <span className="text-gold">Premio</span>
        </h1>
      </div>

      {/* Carousel Container - Full width, Swiper maneja offsets */}
      <div className="hero-carousel relative max-w-7xl mx-auto">
        {/* Navigation Arrows */}
        <button 
          className="swiper-button-prev-custom hidden lg:flex absolute left-2 xl:left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 xl:w-12 xl:h-12 rounded-full bg-slate-800/90 backdrop-blur-sm border border-white/10 items-center justify-center text-white hover:text-gold hover:border-gold/50 hover:bg-slate-700/90 transition-all shadow-lg"
          aria-label="Anterior"
        >
          <ChevronLeft size={20} />
        </button>
        <button 
          className="swiper-button-next-custom hidden lg:flex absolute right-2 xl:right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 xl:w-12 xl:h-12 rounded-full bg-slate-800/90 backdrop-blur-sm border border-white/10 items-center justify-center text-white hover:text-gold hover:border-gold/50 hover:bg-slate-700/90 transition-all shadow-lg"
          aria-label="Siguiente"
        >
          <ChevronRight size={20} />
        </button>

        <Swiper
          modules={[Pagination, Autoplay, Navigation]}
          centerInsufficientSlides={true}
          grabCursor={true}
          centeredSlides={false}
          slidesPerView={1}
          spaceBetween={20}
          slidesOffsetBefore={32}
          slidesOffsetAfter={32}
          loop={raffles.length > 3}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }}
          navigation={{
            prevEl: '.swiper-button-prev-custom',
            nextEl: '.swiper-button-next-custom',
          }}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 16, slidesOffsetBefore: 32, slidesOffsetAfter: 32 },
            768: { slidesPerView: 2, spaceBetween: 20, slidesOffsetBefore: 56, slidesOffsetAfter: 56 },
            1024: { slidesPerView: 3, spaceBetween: 24, slidesOffsetBefore: 80, slidesOffsetAfter: 80 },
          }}
        >
          {raffles.map((raffle) => (
            <SwiperSlide key={raffle.id} className="pb-2">
              <CarouselCard raffle={raffle} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

// Carousel Card - Premium Design
const CarouselCard = memo(({ raffle }) => {
  const { id, title, image, ticketPrice, totalTickets, ticketsSold, endDate, prizeValue, category } = raffle;
  const progress = (ticketsSold / totalTickets) * 100;
  const isHot = progress > 70;

  return (
    <Link to={`/sorteo/${id}`} className="block group h-full">
      <div className="relative h-full bg-gradient-to-b from-slate-800/90 to-slate-900/90 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 transition-all duration-300 group-hover:border-gold/40 group-hover:shadow-[0_8px_32px_rgba(255,215,0,0.15)] group-hover:-translate-y-1">
        
        {/* Image */}
        <div className="relative h-48 sm:h-52 overflow-hidden">
          <img
            src={image || '/placeholder.jpg'}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />
          
          {/* Category */}
          <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide rounded-full bg-white/10 backdrop-blur-sm text-white border border-white/20">
            {category}
          </span>
          
          {/* Hot Badge */}
          {isHot && (
            <span className="absolute top-3 right-3 px-2.5 py-1 text-[10px] font-bold rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white flex items-center gap-1">
              <Flame size={10} />
              Hot
            </span>
          )}

          {/* Prize Value */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-gold font-bold text-base sm:text-lg">
              <Trophy size={16} />
              {formatPrice(prizeValue)}
            </div>
            <div className="flex items-center gap-1 text-white/80 text-xs sm:text-sm">
              <Clock size={12} />
              {formatDate(endDate)}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5">
          <h3 className="text-base sm:text-lg font-bold text-white mb-3 group-hover:text-gold transition-colors line-clamp-1">
            {title}
          </h3>

          {/* Progress */}
          <div className="mb-3">
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-slate-400">{ticketsSold} vendidos</span>
              <span className="text-gold font-medium">{totalTickets - ticketsSold} disponibles</span>
            </div>
            <div className="h-1 bg-slate-700/50 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-gold to-yellow-400 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* CTA Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-cyan font-bold text-sm">
              <Ticket size={14} />
              <span>{formatPrice(ticketPrice)}</span>
            </div>
            <span className="inline-flex items-center gap-1 text-gold font-semibold text-xs group-hover:gap-1.5 transition-all">
              Participar
              <ChevronRight size={14} />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
});

CarouselCard.displayName = 'CarouselCard';

// Loading Skeleton
const LoadingSkeleton = memo(() => (
  <section className="pt-8 pb-12 md:pt-12 md:pb-16">
    <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
      <div className="mb-8 text-center">
        <div className="h-6 w-32 bg-slate-700/50 rounded-full mx-auto mb-4 animate-pulse" />
        <div className="h-10 w-64 bg-slate-700/50 rounded-lg mx-auto animate-pulse" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-[420px] bg-slate-800/50 rounded-2xl animate-pulse" />
        ))}
      </div>
    </div>
  </section>
));

LoadingSkeleton.displayName = 'LoadingSkeleton';

export default HeroCarousel;
