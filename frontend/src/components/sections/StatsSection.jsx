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
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-primary-light/60 backdrop-blur-xl border border-white/10 rounded-3xl p-10 md:p-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-14">
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
    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10 mb-5 group-hover:border-gold/30 transition-colors ${color}`}>
      <Icon size={32} />
    </div>
    <div className={`text-4xl sm:text-5xl md:text-6xl font-black ${color} mb-3 tracking-tight`}>
      {value}
    </div>
    <div className="text-base sm:text-lg text-slate-400 font-medium">
      {label}
    </div>
  </div>
));

StatCard.displayName = 'StatCard';

export default StatsSection;
