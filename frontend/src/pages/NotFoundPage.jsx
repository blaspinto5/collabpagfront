/**
 * 404 Not Found Page
 */

import { Link } from 'react-router-dom';
import { Home, Search, Ticket } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen pt-24 pb-16 px-6 md:px-10 lg:px-16 flex items-center justify-center">
      <div className="max-w-lg w-full text-center">
        <div className="glass rounded-2xl p-8">
          {/* 404 */}
          <div className="mb-6">
            <span className="text-8xl font-bold gradient-text">404</span>
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
            <Link to="/" className="btn-primary flex items-center justify-center gap-2">
              <Home size={18} />
              Ir al inicio
            </Link>
            <Link to="/sorteos" className="btn-secondary flex items-center justify-center gap-2">
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
