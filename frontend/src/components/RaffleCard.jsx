/**
 * RaffleCard Component
 * Clean, modern card design
 */

import { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Ticket, Clock, Trophy, ChevronRight, Flame } from 'lucide-react';

// Formatters
const formatDate = (dateString) => 
  new Date(dateString).toLocaleDateString('es-CL', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

const priceFormatter = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  minimumFractionDigits: 0
});

const formatPrice = (price) => priceFormatter.format(price);

const RaffleCard = memo(({ raffle }) => {
  const { id, title, description, image, ticketPrice, totalTickets, ticketsSold, endDate, prizeValue, category } = raffle;

  const { remainingTickets, progress, isHot } = useMemo(() => ({
    remainingTickets: totalTickets - ticketsSold,
    progress: (ticketsSold / totalTickets) * 100,
    isHot: (ticketsSold / totalTickets) * 100 > 70
  }), [totalTickets, ticketsSold]);

  return (
    <div className="group h-full">
      <div className="h-full flex flex-col glass rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-gold/30">
        
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={image || '/placeholder.jpg'}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
          
          {/* Badges */}
          <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-bold uppercase rounded-md bg-gold/90 text-slate-900">
            {category}
          </span>
          
          {isHot && (
            <span className="absolute top-3 right-3 px-2.5 py-1 text-xs font-bold rounded-md bg-gradient-to-r from-orange-500 to-red-500 text-white flex items-center gap-1">
              <Flame size={12} />
              Hot
            </span>
          )}

          {/* Prize */}
          <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-sm text-gold font-bold">
            <Trophy size={14} />
            {formatPrice(prizeValue)}
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-grow p-6">
          <h3 className="text-xl font-bold text-white mb-3 line-clamp-1 group-hover:text-gold transition-colors">
            {title}
          </h3>
          
          <p className="text-slate-400 text-sm mb-5 line-clamp-2 flex-grow leading-relaxed">
            {description}
          </p>

          {/* Progress */}
          <div className="mb-5">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-400">{ticketsSold} vendidos</span>
              <span className="text-gold font-medium">{remainingTickets} disponibles</span>
            </div>
            <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-gold to-yellow-400 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Info */}
          <div className="flex items-center justify-between mb-5 py-3 px-4 rounded-xl bg-white/5">
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <Clock size={16} className="text-cyan" />
              {formatDate(endDate)}
            </div>
            <div className="flex items-center gap-2 text-cyan font-bold">
              <Ticket size={16} />
              {formatPrice(ticketPrice)}
            </div>
          </div>

          {/* CTA */}
          <Link
            to={`/sorteo/${id}`}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-gold to-yellow-500 text-slate-900 font-bold text-center flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:shadow-gold/20"
          >
            Participar
            <ChevronRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
});

RaffleCard.displayName = 'RaffleCard';

export default RaffleCard;
