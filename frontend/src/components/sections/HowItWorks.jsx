/**
 * HowItWorks Section
 * Clean steps design without redundant overlays
 */

import { memo } from 'react';
import { Ticket, CreditCard, Trophy } from 'lucide-react';

const steps = [
  {
    step: 1,
    icon: Ticket,
    title: 'Elige tu Sorteo',
    description: 'Explora nuestros sorteos activos y elige el premio que más te guste.',
    color: 'from-gold to-yellow-500'
  },
  {
    step: 2,
    icon: CreditCard,
    title: 'Compra tus Boletos',
    description: 'Selecciona la cantidad de boletos y paga de forma segura con MercadoPago.',
    color: 'from-cyan to-blue-500'
  },
  {
    step: 3,
    icon: Trophy,
    title: '¡Espera el Sorteo!',
    description: 'Recibirás tus números por email. ¡Cruza los dedos y espera tu premio!',
    color: 'from-emerald-400 to-green-500'
  }
];

const HowItWorks = () => {
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <span className="inline-block px-5 py-2 rounded-full bg-cyan/10 border border-cyan/20 text-cyan text-xs font-bold uppercase tracking-widest mb-6">
            Proceso Simple
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
            ¿Cómo Funciona?
          </h2>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
            Participar es muy fácil, solo sigue estos simples pasos
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {steps.map((item, index) => (
            <StepCard key={item.step} item={item} isLast={index === steps.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
};

const StepCard = memo(({ item, isLast }) => {
  const Icon = item.icon;
  
  return (
    <div className="relative group">
      {/* Connector Line */}
      {!isLast && (
        <div className="hidden md:block absolute top-14 left-[calc(50%+50px)] w-[calc(100%-50px)] h-px bg-gradient-to-r from-white/20 to-transparent" />
      )}
      
      {/* Card */}
      <div className="glass rounded-3xl p-10 text-center h-full transition-all duration-300 hover:border-gold/30 hover:-translate-y-1">
        {/* Icon */}
        <div className={`relative w-24 h-24 rounded-2xl bg-gradient-to-br ${item.color} mx-auto mb-8 flex items-center justify-center group-hover:scale-105 transition-transform shadow-2xl`}>
          <Icon size={40} className="text-primary-dark" />
          <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-slate-900 border-2 border-white/20 flex items-center justify-center text-white font-bold text-base">
            {item.step}
          </span>
        </div>
        
        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-gold transition-colors">
          {item.title}
        </h3>
        <p className="text-slate-400 text-base leading-relaxed">
          {item.description}
        </p>
      </div>
    </div>
  );
});

StepCard.displayName = 'StepCard';

export default HowItWorks;
