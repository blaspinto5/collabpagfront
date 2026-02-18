/**
 * HeroCarousel
 * - Receives `raffles`, `loading`, `error` from parent (HomePage)
 * - Selects a main raffle (category==='DEMO' || first)
 * - Performs ONE internal fetch: cardsService.listByRaffle(main.id, 8)
 */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Image, ChevronRight } from 'lucide-react';
import { cardsService } from '../../services/cardsService';
import { buildCardAssetUrl } from '../../utils/assets';

const ILLUSTRATION_PRICE = 1990;
const formatPrice = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  minimumFractionDigits: 0,
}).format;

const HeroCarousel = ({ raffles = [], loading: loadingRaffles = false, error: rafflesError = null }) => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const main = (raffles && raffles.find((r) => r.category === 'DEMO')) || (raffles && raffles[0]) || null;

  useEffect(() => {
    let mounted = true;
    if (!main) {
      setCards([]);
      setLoading(false);
      return;
    }

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const list = await cardsService.listByRaffle(main.id, 8);
        if (!mounted) return;
        setCards(list || []);
      } catch (err) {
        if (!mounted) return;
        setError(err.message || 'Error cargando ilustraciones');
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();

    return () => {
      mounted = false;
    };
  }, [main && main.id]);

  if (loadingRaffles) return <section className="py-16 md:py-24">Cargando ilustraciones...</section>;

  if (!main) {
    return (
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-4">No hay sorteos disponibles</h2>
          <p className="text-slate-400">Aún no hay ilustraciones para mostrar. Vuelve más tarde.</p>
        </div>
      </section>
    );
  }

  const visibleCards = (cards || []).slice(0, 8);
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto mb-8 text-center">
        <span className="inline-block px-5 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold text-lg font-bold uppercase tracking-widest mb-2">
          {main.title || 'Ilustraciones del sorteo'}
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {loading && <div className="py-8">Cargando ilustraciones...</div>}
        {error && <div className="py-8 text-red-400">{error}</div>}

        {!loading && !error && (
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {visibleCards.length === 0 && (
              <div className="col-span-full text-center text-slate-400 py-8">No hay ilustraciones en este sorteo.</div>
            )}
            {visibleCards.map((card) => (
              <CarouselCard key={card.id} id={main.id} card={card} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

const CarouselCard = ({ id: raffleId, card }) => {
  const img = card && card.image ? buildCardAssetUrl(card.image) : '/images/placeholder.png';
  const title = card && (card.title || card.name) ? (card.title || card.name) : `Ilustración ${card && card.id ? card.id : ''}`;

  return (
    <Link to={`/sorteo/${raffleId}`} className="block group">
      <div className="relative bg-gradient-to-b from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/10 transition-all duration-300 group-hover:border-gold/40 group-hover:shadow-[0_0_40px_rgba(255,215,0,0.15)]">
        <div className="relative h-56 sm:h-64 overflow-hidden">
          <img src={img} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
        </div>

        <div className="p-5 sm:p-6">
          <h3 className="text-xl sm:text-2xl text-white mb-4 group-hover:text-gold transition-colors">{title}</h3>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-cyan font-bold">
              <Image size={18} />
              <span>{formatPrice(ILLUSTRATION_PRICE)}</span>
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
};

export default HeroCarousel;
