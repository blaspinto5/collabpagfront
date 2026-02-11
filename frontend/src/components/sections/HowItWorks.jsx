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
    <section className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-cyan/10 border border-cyan/20 text-cyan text-[10px] md:text-xs font-bold uppercase tracking-widest mb-4">
            Proceso Simple
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">
            ¿Cómo Funciona?
          </h2>
          <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto">
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
        <div className="hidden md:block absolute top-10 left-[calc(50%+40px)] w-[calc(100%-40px)] h-px bg-gradient-to-r from-white/20 to-transparent" />
      )}
      
      {/* Card */}
      <div className="glass rounded-2xl p-6 md:p-8 text-center h-full transition-all duration-300 hover:border-gold/30 hover:-translate-y-1">
        {/* Icon */}
        <div className={`relative w-16 h-16 md:w-20 md:h-20 rounded-xl bg-gradient-to-br ${item.color} mx-auto mb-5 flex items-center justify-center group-hover:scale-105 transition-transform shadow-xl`}>
          <Icon size={28} className="text-primary-dark" />
          <span className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-slate-900 border-2 border-white/20 flex items-center justify-center text-white font-bold text-xs">
            {item.step}
          </span>
        </div>
        
        <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-gold transition-colors">
          {item.title}
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed">
          {item.description}
        </p>
      </div>
    </div>
  );
});

StepCard.displayName = 'StepCard';

export default HowItWorks;
