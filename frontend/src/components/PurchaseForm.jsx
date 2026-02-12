/**
 * PurchaseForm Component
 * Form for purchasing raffle tickets
 */

import { useState } from 'react';
import { Minus, Plus, User, Mail, Phone, CreditCard, Loader2 } from 'lucide-react';
import { paymentService } from '../services';

const PurchaseForm = ({ raffle, onSuccess }) => {
  const [ticketCount, setTicketCount] = useState(1);
  const [formData, setFormData] = useState({
    buyerName: '',
    buyerEmail: '',
    buyerPhone: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const remainingTickets = raffle.totalTickets - raffle.ticketsSold;
  const total = raffle.ticketPrice * ticketCount;

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const incrementTickets = () => {
    if (ticketCount < remainingTickets && ticketCount < 10) {
      setTicketCount(prev => prev + 1);
    }
  };

  const decrementTickets = () => {
    if (ticketCount > 1) {
      setTicketCount(prev => prev - 1);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await paymentService.createPreference({
        raffleId: raffle.id,
        ticketCount,
        ...formData
      });

      // Redirect to MercadoPago
      if (response.initPoint) {
        window.location.href = response.initPoint;
      } else if (response.sandboxInitPoint) {
        window.location.href = response.sandboxInitPoint;
      }

      onSuccess?.(response);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-primary-light/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-6">
      <h3 className="text-xl font-bold text-gold flex items-center gap-2">
        <CreditCard size={24} />
        Comprar Boletos
      </h3>

      {/* Ticket Counter */}
      <div className="bg-primary-dark/50 rounded-xl p-4">
        <label className="block text-sm text-slate-400 mb-2">Cantidad de boletos</label>
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={decrementTickets}
            disabled={ticketCount <= 1}
            className="w-12 h-12 rounded-lg bg-gold/20 text-gold flex items-center justify-center hover:bg-gold/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Minus size={20} />
          </button>
          <div className="text-center">
            <span className="text-4xl font-bold text-white">{ticketCount}</span>
            <p className="text-sm text-slate-400">boleto{ticketCount > 1 ? 's' : ''}</p>
          </div>
          <button
            type="button"
            onClick={incrementTickets}
            disabled={ticketCount >= remainingTickets || ticketCount >= 10}
            className="w-12 h-12 rounded-lg bg-gold/20 text-gold flex items-center justify-center hover:bg-gold/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Plus size={20} />
          </button>
        </div>
        <p className="text-center text-sm text-slate-500 mt-2">
          Máximo 10 boletos por compra • {remainingTickets} disponibles
        </p>
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-slate-400 mb-2">
            <User size={14} className="inline mr-1" />
            Nombre completo
          </label>
          <input
            type="text"
            name="buyerName"
            value={formData.buyerName}
            onChange={handleChange}
            required
            placeholder="Tu nombre"
            className="w-full px-4 py-3.5 rounded-xl bg-slate-800/50 border border-white/10 text-slate-200 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 placeholder:text-slate-500 transition-all"
          />
        </div>

        <div>
          <label className="block text-sm text-slate-400 mb-2">
            <Mail size={14} className="inline mr-1" />
            Email
          </label>
          <input
            type="email"
            name="buyerEmail"
            value={formData.buyerEmail}
            onChange={handleChange}
            required
            placeholder="tu@email.com"
            className="w-full px-4 py-3.5 rounded-xl bg-slate-800/50 border border-white/10 text-slate-200 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 placeholder:text-slate-500 transition-all"
          />
        </div>

        <div>
          <label className="block text-sm text-slate-400 mb-2">
            <Phone size={14} className="inline mr-1" />
            Teléfono (opcional)
          </label>
          <input
            type="tel"
            name="buyerPhone"
            value={formData.buyerPhone}
            onChange={handleChange}
            placeholder="+56 9 XXXX XXXX"
            className="w-full px-4 py-3.5 rounded-xl bg-slate-800/50 border border-white/10 text-slate-200 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 placeholder:text-slate-500 transition-all"
          />
        </div>
      </div>

      {/* Total */}
      <div className="bg-gradient-to-r from-gold/20 to-cyan/20 rounded-xl p-4">
        <div className="flex justify-between items-center">
          <span className="text-slate-300">Precio por boleto:</span>
          <span className="text-white">{formatPrice(raffle.ticketPrice)}</span>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-slate-300">Cantidad:</span>
          <span className="text-white">x{ticketCount}</span>
        </div>
        <div className="border-t border-gold/30 my-3" />
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-white">Total:</span>
          <span className="text-2xl font-bold text-gold">{formatPrice(total)}</span>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-500/20 border border-red-500 rounded-lg p-3 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading || remainingTickets === 0}
        className="w-full px-7 py-4 rounded-xl font-semibold transition-all bg-gradient-to-r from-gold to-amber-600 text-slate-900 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gold/30 flex items-center justify-center gap-2 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <Loader2 size={20} className="animate-spin" />
            Procesando...
          </>
        ) : (
          <>
            <CreditCard size={20} />
            Pagar con MercadoPago
          </>
        )}
      </button>

      <p className="text-xs text-slate-500 text-center">
        Al continuar, aceptas nuestros términos y condiciones
      </p>
    </form>
  );
};

export default PurchaseForm;
