/**
 * Payment Success Page
 * Displayed after successful payment
 */

import { Link } from 'react-router-dom';
import { CheckCircle, Home, Mail, Ticket } from 'lucide-react';

const PaymentSuccessPage = () => {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 flex items-center justify-center">
      <div className="max-w-lg w-full text-center">
        <div className="bg-primary-light/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
          {/* Success Icon */}
          <div className="relative mb-6">
            <div className="w-24 h-24 mx-auto rounded-full bg-green-500/20 flex items-center justify-center animate-pulse-gold">
              <CheckCircle size={48} className="text-green-400" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-white mb-4">
            ¡Compra Exitosa!
          </h1>

          {/* Message */}
          <p className="text-slate-300 text-lg mb-6">
            Tu compra ha sido procesada correctamente. Recibirás tus números de boleto una vez que confirmemos el pago.
          </p>

          {/* Info Box */}
          <div className="bg-primary-dark/50 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-3 text-left">
              <Mail size={24} className="text-gold" />
              <div>
                <p className="text-white font-semibold">Revisa tu correo</p>
                <p className="text-slate-400 text-sm">Te enviaremos la confirmación y tus números de boleto.</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/sorteos" className="px-7 py-3.5 rounded-xl font-semibold transition-all bg-gradient-to-r from-gold to-amber-600 text-slate-900 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gold/30 flex items-center justify-center gap-2">
              <Ticket size={18} />
              Ver más sorteos
            </Link>
            <Link to="/" className="px-7 py-3.5 rounded-xl font-semibold transition-all bg-transparent border-2 border-gold text-gold hover:bg-gold hover:text-slate-900 flex items-center justify-center gap-2">
              <Home size={18} />
              Ir al inicio
            </Link>
          </div>
        </div>

        {/* Support */}
        <p className="text-slate-500 text-sm mt-6">
          ¿Tienes alguna pregunta? Contáctanos a{' '}
          <a href="mailto:contacto@sorteandoweas.cl" className="text-gold hover:underline">
            contacto@sorteandoweas.cl
          </a>
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
