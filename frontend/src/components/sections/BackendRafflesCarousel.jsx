import React, { memo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Image, ChevronLeft, ChevronRight } from 'lucide-react';
import { Clock } from 'lucide-react';
import { buildCardAssetUrl } from '../../utils/assets';

const formatPrice = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  minimumFractionDigits: 0,
}).format;

const formatDate = (dateString) => {
  if (!dateString) return 'Fecha no disponible';
  const d = new Date(dateString);
  if (Number.isNaN(d.getTime())) return 'Fecha inválida';
  return d.toLocaleDateString('es-CL', {
    day: 'numeric',
    month: 'short',
  });
};

const BackendRafflesCarousel = ({ raffles = [], loading = false, error = null }) => {
  const [index, setIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w >= 1024) setVisibleCount(3);
      else if (w >= 768) setVisibleCount(2);
      else setVisibleCount(1);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const itemsLength = (raffles || []).length || 0;
  const maxIndex = Math.max(0, itemsLength - visibleCount);
  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(maxIndex, i + 1));

  if (loading) return <div className="py-12">Cargando sorteos...</div>;
  if (error) return <div className="py-12 text-red-400">{error}</div>;

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto mb-6 text-center px-6">
        <span className="inline-block px-5 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold text-lg font-bold uppercase tracking-widest mb-6">
          Sorteos desde backend
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-2 relative">
        {/* Arrows */}
        {raffles.length > visibleCount && (
          <>
            <button
              onClick={prev}
              aria-label="Anterior"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-slate-800/80 text-white flex items-center justify-center shadow hover:scale-105 transition-transform"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={next}
              aria-label="Siguiente"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-slate-800/80 text-white flex items-center justify-center shadow hover:scale-105 transition-transform"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        {/* Track */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 gap-6"
            style={{ transform: `translateX(-${(index * 100) / visibleCount}%)` }}
          >
            {(raffles || []).map((r) => (
              <div key={r.id} style={{ flex: `0 0 ${100 / visibleCount}%` }}>
                <BackendCard raffle={r} />
              </div>
            ))}
          </div>
        </div>

        {/* Todos los sorteos button */}
        <div className="mt-8 text-center">
          <Link to="/sorteos" className="inline-block px-6 py-3 rounded-full bg-gold text-slate-900 font-semibold">
            TODOS LOS SORTEOS
          </Link>
        </div>
      </div>
    </section>
  );
};

const BackendCard = memo(({ raffle }) => {
  const { id, title, image, cards = [], ticketPrice, totalTickets = 100, ticketsSold = 0, drawDate, category } = raffle;
  // prefer first card image if present, else raffle.image, else placeholder
  const mainImage = (cards && cards[0] && cards[0].image)
    ? buildCardAssetUrl(cards[0].image)
    : (image ? buildCardAssetUrl(image) : '/images/placeholder.png');
  const progress = (ticketsSold / totalTickets) * 100;

  return (
    <Link to={`/sorteo/${id}`} className="block group">
      <div className="relative bg-gradient-to-b from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/10 transition-all duration-500 group-hover:border-gold/40 group-hover:shadow-[0_0_60px_rgba(255,215,0,0.15)]">
        <div className="relative h-56 sm:h-64 overflow-hidden">
          <img src={mainImage} alt={title} className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
          <span className="absolute top-4 left-4 px-3 py-1 text-xs font-bold uppercase tracking-wide rounded-full bg-white/10 backdrop-blur-sm text-white border border-white/20">{category}</span>
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-white/80 text-sm">
              <Clock size={14} />
              {formatDate(drawDate)}
            </div>
          </div>
        </div>

        <div className="p-5 sm:p-6">
          <h3 className="text-xl sm:text-2xl text-white mb-4 group-hover:text-gold transition-colors line-clamp-1">{title || `Sorteo ${id}`}</h3>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-cyan font-bold">
              <Image size={18} />
              <span>{formatPrice(ticketPrice || 0)}</span>
            </div>
            <span className="inline-flex items-center gap-1 text-gold font-semibold text-sm group-hover:gap-2 transition-all">
              Revisar
              <ChevronRight size={16} />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
});

BackendCard.displayName = 'BackendCard';

export default BackendRafflesCarousel;
