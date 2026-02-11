/**
 * StatsDashboard Component
 * Displays purchase statistics in the admin panel
 */

import { DollarSign, Ticket, Users, TrendingUp } from 'lucide-react';
import { useStats } from '../hooks';
import { Spinner } from './Loading';

const StatCard = ({ title, value, icon: Icon, trend, color = 'gold' }) => {
  const colorClasses = {
    gold: 'text-gold bg-gold/20',
    cyan: 'text-cyan bg-cyan/20',
    green: 'text-green-400 bg-green-400/20',
    purple: 'text-purple-400 bg-purple-400/20'
  };

  return (
    <div className="glass rounded-xl p-6 card-hover">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-slate-400 text-sm">{title}</p>
          <p className="text-3xl font-bold text-white mt-2">{value}</p>
          {trend && (
            <p className={`text-sm mt-2 ${trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
              <TrendingUp size={14} className="inline" />
              {trend > 0 ? '+' : ''}{trend}% vs mes anterior
            </p>
          )}
        </div>
        <div className={`p-3 rounded-xl ${colorClasses[color]}`}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
};

const StatsDashboard = () => {
  const { stats, loading, error } = useStats();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    }).format(price || 0);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="glass rounded-xl p-6 animate-pulse">
            <div className="h-4 bg-primary-light/50 rounded w-1/2 mb-4" />
            <div className="h-8 bg-primary-light/50 rounded w-3/4" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/20 border border-red-500 rounded-xl p-4 text-red-400">
        Error cargando estadísticas: {error}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Ingresos Totales"
        value={formatPrice(stats?.totalRevenue)}
        icon={DollarSign}
        color="gold"
      />
      <StatCard
        title="Boletos Vendidos"
        value={stats?.totalTickets || 0}
        icon={Ticket}
        color="cyan"
      />
      <StatCard
        title="Compras Confirmadas"
        value={stats?.confirmedPurchases || 0}
        icon={Users}
        color="green"
      />
      <StatCard
        title="Compras Pendientes"
        value={stats?.pendingPurchases || 0}
        icon={TrendingUp}
        color="purple"
      />
    </div>
  );
};

export default StatsDashboard;
