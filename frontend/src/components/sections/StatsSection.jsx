/**
 * StatsSection Component
 * Key metrics with glass morphism design
 */

import { memo } from 'react';
import { Trophy, Users, Shield, Sparkles } from 'lucide-react';

const stats = [
  { icon: Users, value: '10,000+', label: 'Participantes', color: 'text-gold' },
  { icon: Trophy, value: '$50M+', label: 'En Premios', color: 'text-cyan' },
  { icon: Shield, value: '100%', label: 'Seguro', color: 'text-emerald-400' },
  { icon: Sparkles, value: '500+', label: 'Ganadores', color: 'text-purple-400' },
];

const StatsSection = () => {
  return (
    <section className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
        <div className="glass rounded-2xl p-5 sm:p-6 md:p-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const StatCard = memo(({ icon: Icon, value, label, color }) => (
  <div className="text-center group">
    <div className={`inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-xl bg-white/5 border border-white/10 mb-3 group-hover:border-gold/30 transition-colors ${color}`}>
      <Icon size={24} />
    </div>
    <div className={`text-xl sm:text-2xl md:text-3xl font-black ${color} mb-1.5 tracking-tight`}>
      {value}
    </div>
    <div className="text-xs sm:text-sm text-slate-400 font-medium">
      {label}
    </div>
  </div>
));

StatCard.displayName = 'StatCard';

export default StatsSection;
