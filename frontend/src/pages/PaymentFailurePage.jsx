/**
 * Payment Failure Page
 * Displayed after failed payment - Using centralized UI components
 */

import { Link } from 'react-router-dom';
import { XCircle, Home, RefreshCw, HelpCircle } from 'lucide-react';
import { Card, Button } from '../components/ui';

const PaymentFailurePage = () => {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 flex items-center justify-center">
      <div className="max-w-lg w-full text-center">
        <Card hoverable={false} className="p-8">
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
            <Link to="/sorteos">
              <Button variant="primary" icon={<RefreshCw size={18} />}>
                Intentar de nuevo
              </Button>
            </Link>
            <Link to="/">
              <Button variant="secondary" icon={<Home size={18} />}>
                Ir al inicio
              </Button>
            </Link>
          </div>
        </Card>

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
