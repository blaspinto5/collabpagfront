/**
 * Admin Page
 * Dashboard for managing raffles and purchases - Using centralized UI components
 */

import { useState } from 'react';
import { StatsDashboard, TableRowSkeleton } from '../components';
import { Card, Button, Badge } from '../components/ui';
import { usePurchases, useRaffles } from '../hooks';
import { 
  LayoutDashboard, 
  Ticket, 
  Users, 
  CheckCircle,
  XCircle,
  Clock,
  RefreshCw,
  Eye
} from 'lucide-react';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('purchases');
  const { purchases, loading: purchasesLoading, confirmPurchase, refetch } = usePurchases();
  const { raffles, loading: rafflesLoading } = useRaffles();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    }).format(price || 0);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-CL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status) => {
    const variants = {
      pending: 'warning',
      confirmed: 'success',
      cancelled: 'error',
      active: 'success'
    };
    const labels = {
      pending: 'Pendiente',
      confirmed: 'Confirmado',
      cancelled: 'Cancelado',
      active: 'Activo'
    };
    return (
      <Badge variant={variants[status] || 'pending'}>
        {labels[status] || status}
      </Badge>
    );
  };

  const handleConfirm = async (purchaseId) => {
    if (window.confirm('¿Confirmar esta compra y asignar números de boleto?')) {
      await confirmPurchase(purchaseId);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 text-gold mb-2">
              <LayoutDashboard size={24} />
            </div>
            <h1 className="text-3xl font-bold text-white">Panel de Administración</h1>
            <p className="text-slate-400">Gestiona sorteos y compras</p>
          </div>
          <Button
            variant="secondary"
            onClick={() => refetch()}
            icon={<RefreshCw size={18} />}
          >
            Actualizar
          </Button>
        </div>

        {/* Stats Dashboard */}
        <div className="mb-8">
          <StatsDashboard />
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-gold/20 pb-4">
          <Button
            variant={activeTab === 'purchases' ? 'primary' : 'ghost'}
            onClick={() => setActiveTab('purchases')}
            icon={<Users size={18} />}
            className={activeTab === 'purchases' ? 'bg-gold/20 text-gold hover:bg-gold/30' : ''}
          >
            Compras
          </Button>
          <Button
            variant={activeTab === 'raffles' ? 'primary' : 'ghost'}
            onClick={() => setActiveTab('raffles')}
            icon={<Ticket size={18} />}
            className={activeTab === 'raffles' ? 'bg-gold/20 text-gold hover:bg-gold/30' : ''}
          >
            Sorteos
          </Button>
        </div>

        {/* Purchases Tab */}
        {activeTab === 'purchases' && (
          <Card hoverable={false} className="overflow-hidden !p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-primary-dark/50">
                  <tr>
                    <th className="text-left px-4 py-3 text-slate-400 font-semibold">ID</th>
                    <th className="text-left px-4 py-3 text-slate-400 font-semibold">Comprador</th>
                    <th className="text-left px-4 py-3 text-slate-400 font-semibold">Sorteo</th>
                    <th className="text-left px-4 py-3 text-slate-400 font-semibold">Boletos</th>
                    <th className="text-left px-4 py-3 text-slate-400 font-semibold">Total</th>
                    <th className="text-left px-4 py-3 text-slate-400 font-semibold">Estado</th>
                    <th className="text-left px-4 py-3 text-slate-400 font-semibold">Fecha</th>
                    <th className="text-left px-4 py-3 text-slate-400 font-semibold">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {purchasesLoading ? (
                    [...Array(5)].map((_, i) => <TableRowSkeleton key={i} />)
                  ) : purchases.length > 0 ? (
                    purchases.map((purchase) => (
                      <tr key={purchase.id} className="border-t border-gold/10 hover:bg-primary-light/30">
                        <td className="px-4 py-3 text-slate-300">#{purchase.id}</td>
                        <td className="px-4 py-3">
                          <div>
                            <p className="text-white font-medium">{purchase.buyerName}</p>
                            <p className="text-slate-400 text-sm">{purchase.buyerEmail}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-slate-300">{purchase.raffleName}</td>
                        <td className="px-4 py-3 text-cyan font-semibold">{purchase.ticketCount}</td>
                        <td className="px-4 py-3 text-gold font-semibold">{formatPrice(purchase.total)}</td>
                        <td className="px-4 py-3">{getStatusBadge(purchase.status)}</td>
                        <td className="px-4 py-3 text-slate-400 text-sm">{formatDate(purchase.createdAt)}</td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            {purchase.status === 'pending' && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleConfirm(purchase.id)}
                                className="p-2 bg-green-500/20 text-green-400 hover:bg-green-500/30"
                                title="Confirmar compra"
                              >
                                <CheckCircle size={16} />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              className="p-2 bg-cyan/20 text-cyan hover:bg-cyan/30"
                              title="Ver detalles"
                            >
                              <Eye size={16} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="px-4 py-12 text-center text-slate-400">
                        No hay compras registradas
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* Raffles Tab */}
        {activeTab === 'raffles' && (
          <Card hoverable={false} className="overflow-hidden !p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-primary-dark/50">
                  <tr>
                    <th className="text-left px-4 py-3 text-slate-400 font-semibold">ID</th>
                    <th className="text-left px-4 py-3 text-slate-400 font-semibold">Título</th>
                    <th className="text-left px-4 py-3 text-slate-400 font-semibold">Categoría</th>
                    <th className="text-left px-4 py-3 text-slate-400 font-semibold">Precio</th>
                    <th className="text-left px-4 py-3 text-slate-400 font-semibold">Vendidos</th>
                    <th className="text-left px-4 py-3 text-slate-400 font-semibold">Total</th>
                    <th className="text-left px-4 py-3 text-slate-400 font-semibold">Estado</th>
                    <th className="text-left px-4 py-3 text-slate-400 font-semibold">Fin</th>
                  </tr>
                </thead>
                <tbody>
                  {rafflesLoading ? (
                    [...Array(3)].map((_, i) => <TableRowSkeleton key={i} />)
                  ) : raffles.length > 0 ? (
                    raffles.map((raffle) => (
                      <tr key={raffle.id} className="border-t border-gold/10 hover:bg-primary-light/30">
                        <td className="px-4 py-3 text-slate-300">#{raffle.id}</td>
                        <td className="px-4 py-3 text-white font-medium">{raffle.title}</td>
                        <td className="px-4 py-3">
                          <Badge variant="gold">{raffle.category}</Badge>
                        </td>
                        <td className="px-4 py-3 text-cyan font-semibold">{formatPrice(raffle.ticketPrice)}</td>
                        <td className="px-4 py-3 text-gold font-semibold">{raffle.ticketsSold}</td>
                        <td className="px-4 py-3 text-slate-300">{raffle.totalTickets}</td>
                        <td className="px-4 py-3">{getStatusBadge(raffle.status)}</td>
                        <td className="px-4 py-3 text-slate-400 text-sm">{formatDate(raffle.endDate)}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="px-4 py-12 text-center text-slate-400">
                        No hay sorteos registrados
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
