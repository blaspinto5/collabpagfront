/**
 * HeroSection Component
 * Premium hero with improved contrast, typography and conversion focus
 */

import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Gift, ArrowRight, Play } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center scale-110" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-primary/60 to-primary-dark/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/50 via-transparent to-primary-dark/50" />
      </div>

      {/* Glow Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan/10 rounded-full blur-[100px] animate-pulse delay-1000" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Logo with glow */}
        <div className="mb-8 md:mb-10">
          <img 
            src="/logo.png" 
            alt="Sorteando Weas"
            className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mx-auto drop-shadow-[0_0_30px_rgba(255,215,0,0.4)] hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Trust Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 backdrop-blur-md border border-gold/30 text-gold text-sm mb-8 md:mb-10 hover:border-gold/50 transition-colors">
          <Sparkles size={16} className="text-gold" />
          <span className="font-medium">La plataforma #1 de sorteos en Chile</span>
        </div>

        {/* Main Headline - High Impact */}
        <h1 className="mb-6 md:mb-8">
          <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white tracking-tight leading-none mb-2">
            Gana
          </span>
          <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-none bg-gradient-to-r from-gold via-yellow-300 to-gold bg-clip-text text-transparent drop-shadow-lg">
            Premios Increíbles
          </span>
        </h1>

        {/* Subtitle - Clear Value Proposition */}
        <p className="text-lg sm:text-xl md:text-2xl text-slate-300 mb-10 md:mb-12 max-w-2xl mx-auto leading-relaxed font-light">
          Participa en sorteos exclusivos con los mejores premios.
          <span className="block text-gold font-semibold mt-1">¡Tu próximo premio te espera!</span>
        </p>

        {/* Stats Container - Glass Morphism */}
        <div className="max-w-3xl mx-auto mb-10 md:mb-14">
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 md:p-8 shadow-2xl">
            <div className="grid grid-cols-3 gap-4 md:gap-8">
              <StatItem value="1,000+" label="Ganadores Felices" color="text-gold" />
              <StatItem value="$50M+" label="En Premios Entregados" color="text-cyan" />
              <StatItem value="100%" label="Transparente y Seguro" color="text-emerald-400" />
            </div>
          </div>
        </div>

        {/* CTA Buttons with Glow */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
          <Link
            to="/sorteos"
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-gold to-yellow-500 text-primary-dark font-bold text-lg rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,215,0,0.5)] w-full sm:w-auto justify-center"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-gold opacity-0 group-hover:opacity-100 transition-opacity" />
            <Gift size={22} className="relative z-10" />
            <span className="relative z-10">Ver Sorteos</span>
            <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <Link
            to="/como-funciona"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-white/5 backdrop-blur-sm border-2 border-gold/50 text-gold font-semibold text-lg rounded-xl transition-all duration-300 hover:bg-gold/10 hover:border-gold hover:scale-105 w-full sm:w-auto justify-center"
          >
            <Play size={20} className="group-hover:scale-110 transition-transform" />
            <span>¿Cómo Funciona?</span>
          </Link>
        </div>

        {/* Social Proof */}
        <div className="mt-10 md:mt-14 flex items-center justify-center gap-2 text-slate-400 text-sm">
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map((i) => (
              <div 
                key={i} 
                className="w-8 h-8 rounded-full bg-gradient-to-br from-gold/20 to-cyan/20 border-2 border-primary-dark flex items-center justify-center text-xs text-gold font-bold"
              >
                {String.fromCharCode(64 + i)}
              </div>
            ))}
          </div>
          <span className="ml-2">+500 participantes esta semana</span>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2">
        <span className="text-slate-400 text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-6 h-10 border-2 border-gold/40 rounded-full flex items-start justify-center p-1.5">
          <div className="w-1.5 h-2.5 bg-gold rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

// Stats Item Component - Memoized for performance
const StatItem = memo(({ value, label, color }) => (
  <div className="text-center">
    <div className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black ${color} mb-1 tracking-tight`}>
      {value}
    </div>
    <div className="text-xs sm:text-sm text-slate-400 font-medium">
      {label}
    </div>
  </div>
));

StatItem.displayName = 'StatItem';

export default HeroSection;