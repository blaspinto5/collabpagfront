/**
 * 404 Not Found Page
 */

import { Link } from 'react-router-dom';
import { Home, Search, Ticket } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 flex items-center justify-center">
      <div className="max-w-lg w-full text-center">
        <div className="bg-primary-light/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
          {/* 404 */}
          <div className="mb-6">
            <span className="text-8xl font-bold bg-gradient-to-r from-gold to-cyan bg-clip-text text-transparent">404</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-white mb-4">
            Página no encontrada
          </h1>

          {/* Message */}
          <p className="text-slate-300 text-lg mb-6">
            Lo sentimos, la página que buscas no existe o ha sido movida.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/" className="px-7 py-3.5 rounded-xl font-semibold transition-all bg-gradient-to-r from-gold to-amber-600 text-slate-900 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gold/30 flex items-center justify-center gap-2">
              <Home size={18} />
              Ir al inicio
            </Link>
            <Link to="/sorteos" className="px-7 py-3.5 rounded-xl font-semibold transition-all bg-transparent border-2 border-gold text-gold hover:bg-gold hover:text-slate-900 flex items-center justify-center gap-2">
              <Ticket size={18} />
              Ver sorteos
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
