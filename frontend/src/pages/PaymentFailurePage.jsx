/**
 * Payment Failure Page
 * Displayed after failed payment
 */

import { Link } from 'react-router-dom';
import { XCircle, Home, RefreshCw, HelpCircle } from 'lucide-react';

const PaymentFailurePage = () => {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 flex items-center justify-center">
      <div className="max-w-lg w-full text-center">
        <div className="glass rounded-2xl p-8">
          {/* Failure Icon */}
          <div className="relative mb-6">
            <div className="w-24 h-24 mx-auto rounded-full bg-red-500/20 flex items-center justify-center">
              <XCircle size={48} className="text-red-400" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-white mb-4">
            Pago Rechazado
          </h1>

          {/* Message */}
          <p className="text-slate-300 text-lg mb-6">
            Lo sentimos, tu pago no pudo ser procesado. No se ha realizado ningún cargo a tu cuenta.
          </p>

          {/* Info Box */}
          <div className="bg-primary-dark/50 rounded-xl p-4 mb-6 text-left">
            <p className="text-white font-semibold mb-2">Posibles causas:</p>
            <ul className="text-slate-400 text-sm space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                Fondos insuficientes en tu cuenta
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                Datos de tarjeta incorrectos
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                Límite de compra excedido
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                Problema temporal con tu banco
              </li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/sorteos" className="btn-primary flex items-center justify-center gap-2">
              <RefreshCw size={18} />
              Intentar de nuevo
            </Link>
            <Link to="/" className="btn-secondary flex items-center justify-center gap-2">
              <Home size={18} />
              Ir al inicio
            </Link>
          </div>
        </div>

        {/* Support */}
        <p className="text-slate-500 text-sm mt-6">
          <HelpCircle size={14} className="inline mr-1" />
          ¿Necesitas ayuda? Contáctanos a{' '}
          <a href="mailto:contacto@sorteandoweas.cl" className="text-gold hover:underline">
            contacto@sorteandoweas.cl
          </a>
        </p>
      </div>
    </div>
  );
};

export default PaymentFailurePage;
