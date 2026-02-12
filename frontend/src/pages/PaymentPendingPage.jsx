/**
 * Payment Pending Page
 * Displayed when payment is pending confirmation - Using centralized UI components
 */

import { Link } from 'react-router-dom';
import { Clock, Home, Mail, AlertCircle } from 'lucide-react';
import { Card, Button } from '../components/ui';

const PaymentPendingPage = () => {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 flex items-center justify-center">
      <div className="max-w-lg w-full text-center">
        <Card hoverable={false} className="p-8">
          {/* Pending Icon */}
          <div className="relative mb-6">
            <div className="w-24 h-24 mx-auto rounded-full bg-yellow-500/20 flex items-center justify-center">
              <Clock size={48} className="text-yellow-400 animate-pulse" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-white mb-4">
            Pago en Proceso
          </h1>

          {/* Message */}
          <p className="text-slate-300 text-lg mb-6">
            Tu pago está siendo procesado. Esto puede tomar algunos minutos dependiendo del método de pago utilizado.
          </p>

          {/* Info Box */}
          <div className="bg-primary-dark/50 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-3 text-left">
              <AlertCircle size={24} className="text-yellow-400" />
              <div>
                <p className="text-white font-semibold">¿Qué hacer ahora?</p>
                <p className="text-slate-400 text-sm">
                  Te notificaremos por correo una vez que el pago sea confirmado.
                </p>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-cyan/10 border border-cyan/30 rounded-xl p-4 mb-6 text-left">
            <div className="flex items-center gap-3">
              <Mail size={24} className="text-cyan" />
              <div>
                <p className="text-white font-semibold">Revisa tu correo</p>
                <p className="text-slate-400 text-sm">
                  Recibirás un email con la confirmación y tus números de boleto.
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/sorteos">
              <Button variant="primary">
                Ver más sorteos
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
          Si tu pago no se confirma en las próximas horas, contáctanos a{' '}
          <a href="mailto:contacto@sorteandoweas.cl" className="text-gold hover:underline">
            contacto@sorteandoweas.cl
          </a>
        </p>
      </div>
    </div>
  );
};

export default PaymentPendingPage;
