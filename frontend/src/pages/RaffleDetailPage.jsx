/**
 * Raffle Detail Page
 * Shows full details of a raffle and purchase form
 */

import { useParams, Link } from 'react-router-dom';
import { useRaffle } from '../hooks';
import { PurchaseForm, PageLoader } from '../components';
import { 
  ArrowLeft, 
  Trophy, 
  Ticket, 
  Calendar, 
  Users, 
  CheckCircle,
  AlertTriangle 
} from 'lucide-react';

const RaffleDetailPage = () => {
  const { id } = useParams();
  const { raffle, loading, error } = useRaffle(id);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    }).format(price || 0);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-CL', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) return <PageLoader />;

  if (error || !raffle) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <AlertTriangle size={64} className="text-red-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Sorteo no encontrado</h1>
          <p className="text-slate-400 mb-6">{error || 'El sorteo que buscas no existe o ya no está disponible.'}</p>
          <Link to="/sorteos" className="btn-primary inline-flex items-center gap-2">
            <ArrowLeft size={18} />
            Ver todos los sorteos
          </Link>
        </div>
      </div>
    );
  }

  const remainingTickets = raffle.totalTickets - raffle.ticketsSold;
  const progress = (raffle.ticketsSold / raffle.totalTickets) * 100;
  const isExpiringSoon = new Date(raffle.endDate) - new Date() < 3 * 24 * 60 * 60 * 1000;

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <Link 
          to="/sorteos" 
          className="inline-flex items-center gap-2 text-gold hover:text-gold-light mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          Volver a sorteos
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image */}
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src={raffle.image || '/placeholder.jpg'}
                alt={raffle.title}
                className="w-full h-64 md:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 via-transparent to-transparent" />
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="px-3 py-1 text-sm font-semibold rounded-full bg-gold text-primary-dark">
                  {raffle.category}
                </span>
                {isExpiringSoon && raffle.status === 'active' && (
                  <span className="px-3 py-1 text-sm font-semibold rounded-full bg-red-500 text-white animate-pulse">
                    ¡Últimos días!
                  </span>
                )}
              </div>

              {/* Prize Value */}
              <div className="absolute bottom-4 right-4 flex items-center gap-2 text-gold text-2xl font-bold">
                <Trophy size={28} />
                {formatPrice(raffle.prizeValue)}
              </div>
            </div>

            {/* Title & Description */}
            <div className="glass rounded-2xl p-6">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {raffle.title}
              </h1>
              <p className="text-slate-300 text-lg leading-relaxed">
                {raffle.description}
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="glass rounded-xl p-4 text-center">
                <Ticket size={24} className="text-gold mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">{formatPrice(raffle.ticketPrice)}</p>
                <p className="text-sm text-slate-400">por boleto</p>
              </div>
              <div className="glass rounded-xl p-4 text-center">
                <Users size={24} className="text-cyan mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">{raffle.totalTickets}</p>
                <p className="text-sm text-slate-400">boletos totales</p>
              </div>
              <div className="glass rounded-xl p-4 text-center">
                <CheckCircle size={24} className="text-green-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">{raffle.ticketsSold}</p>
                <p className="text-sm text-slate-400">vendidos</p>
              </div>
              <div className="glass rounded-xl p-4 text-center">
                <Calendar size={24} className="text-purple-400 mx-auto mb-2" />
                <p className="text-lg font-bold text-white">{formatDate(raffle.endDate).split(',')[0]}</p>
                <p className="text-sm text-slate-400">fecha sorteo</p>
              </div>
            </div>

            {/* Progress */}
            <div className="glass rounded-xl p-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-400">Progreso de venta</span>
                <span className="text-gold font-semibold">{progress.toFixed(1)}%</span>
              </div>
              <div className="h-4 bg-primary-dark rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-gold to-cyan transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between text-sm mt-2">
                <span className="text-slate-400">{raffle.ticketsSold} vendidos</span>
                <span className="text-gold font-semibold">{remainingTickets} disponibles</span>
              </div>
            </div>
          </div>

          {/* Sidebar - Purchase Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {raffle.status === 'active' && remainingTickets > 0 ? (
                <PurchaseForm raffle={raffle} />
              ) : (
                <div className="glass rounded-2xl p-6 text-center">
                  <AlertTriangle size={48} className="text-yellow-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">
                    {remainingTickets === 0 ? 'Sorteo Agotado' : 'Sorteo Finalizado'}
                  </h3>
                  <p className="text-slate-400">
                    {remainingTickets === 0 
                      ? 'Todos los boletos han sido vendidos.' 
                      : 'Este sorteo ya no está disponible.'}
                  </p>
                  <Link to="/sorteos" className="btn-secondary mt-4 inline-block">
                    Ver otros sorteos
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RaffleDetailPage;
