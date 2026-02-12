/**
 * RaffleCard Component
 * Clean, modern card design using centralized UI components
 */

import { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Ticket, Clock, Trophy, ChevronRight, Flame } from 'lucide-react';
import { Badge, Button, Card } from './ui';
import { cardStyles } from '../styles/theme';

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
      <Card size="sm" className="h-full flex flex-col overflow-hidden p-0">
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
          <Badge variant="gold" className="absolute top-3 left-3">
            {category}
          </Badge>
          
          {isHot && (
            <Badge variant="hot" icon={<Flame size={12} className="animate-pulse" />} className="absolute top-3 right-3">
              Hot
            </Badge>
          )}

          {/* Prize */}
          <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-sm text-gold font-bold text-sm">
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
                className="h-full bg-gradient-to-r from-gold to-yellow-400 rounded-full transition-all duration-500"
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
          <Link to={`/sorteo/${id}`}>
            <Button variant="primary" size="md" className="w-full" iconRight={<ChevronRight size={18} />}>
              Participar
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
});

RaffleCard.displayName = 'RaffleCard';

export default RaffleCard;
