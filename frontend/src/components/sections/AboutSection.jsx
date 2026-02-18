/**
 * About Section
 * Explicación elegante de cómo funciona la plataforma
 */

import { memo } from "react";
import { Link } from "react-router-dom";
const AboutSection = () => {
  return (
    <section className="py-24 md:py-32 relative z-10">
      <div className="max-w-6xl mx-auto px-6">

        <div className="
          relative
          bg-gradient-to-br
          from-slate-800/70
          to-slate-900/70
          backdrop-blur-xl
          border border-white/10
          rounded-3xl
          p-10 md:p-16
          overflow-hidden
          group
          transition-all
          duration-500
          hover:border-gold/30
          hover:shadow-[0_0_60px_rgba(255,215,0,0.1)]
        ">

          {/* Glow decorativo */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-gold/10 blur-[120px] opacity-40 group-hover:opacity-70 transition-opacity duration-500" />

          <div className="relative">

            <h2 className="text-4xl md:text-5xl font-black text-white mb-8 text-center">
              ¿Qué es Sorteando Weas?
            </h2>

            <p className="text-slate-300 text-lg md:text-xl leading-relaxed text-center max-w-3xl mx-auto mb-10">
              Compra una ilustración digital única y participa automáticamente
              en sorteos de premios reales. Cada ilustración funciona como tu
              ticket de participación.
            </p>

            <div className="grid md:grid-cols-3 gap-8 text-center">

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition">
                <h3 className="text-gold font-bold text-xl mb-3">
                  🎨 Ilustraciones Digitales
                </h3>
                <p className="text-slate-400">
                  Cada compra corresponde a una obra digital exclusiva creada
                  por inteligencia artificial.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition">
                <h3 className="text-cyan font-bold text-xl mb-3">
                  🎟 Participación Automática
                </h3>
                <p className="text-slate-400">
                  Al comprar tu ilustración recibes un número único que entra
                  directamente al sorteo activo.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition">
                <h3 className="text-emerald-400 font-bold text-xl mb-3">
                  🏆 Premios Reales
                </h3>
                <p className="text-slate-400">
                  Sorteamos productos reales y experiencias exclusivas de forma
                  transparente.
                </p>
              </div>
            <div className="mt-14 text-center">
  <Link
    to="/bases-legales"
    className="
      inline-block
      px-8
      py-3
      rounded-2xl
      border
      border-gold/30
      text-gold
      font-semibold
      tracking-wide
      text-sm
      transition-all
      duration-300
      hover:bg-gold
      hover:text-slate-900
      hover:shadow-[0_0_30px_rgba(255,215,0,0.4)]
    "
  >
    Bases Legales
  </Link>
</div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default memo(AboutSection);
