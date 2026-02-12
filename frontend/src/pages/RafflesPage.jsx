/**
 * Raffles Page
 * Lists all active raffles with filtering
 */

import { useState } from 'react';
import { RaffleCard, CardSkeleton } from '../components';
import { useRaffles, useCategories } from '../hooks';
import { Search, Filter, Ticket } from 'lucide-react';

const RafflesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const { raffles, loading, error } = useRaffles({ status: 'active' });
  const { categories } = useCategories();

  // Filter raffles
  const filteredRaffles = raffles.filter(raffle => {
    const matchesCategory = selectedCategory === 'all' || 
      raffle.category?.toLowerCase() === selectedCategory?.toLowerCase();
    const matchesSearch = raffle.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          raffle.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block px-5 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-bold uppercase tracking-widest mb-6">
            <Ticket size={14} className="inline mr-2" />
            Catálogo
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
            Sorteos Activos
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
            Explora todos nuestros sorteos disponibles y elige tu favorito
          </p>
        </div>

        {/* Filters */}
        <div className="bg-primary-light/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 mb-14">
          <div className="flex flex-col md:flex-row gap-5 md:gap-8">
            {/* Search */}
            <div className="flex-1 relative">
              <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar sorteos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl bg-slate-800/50 border border-white/10 text-slate-200 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 placeholder:text-slate-500 transition-all pl-12"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-3">
              <Filter size={20} className="text-slate-400 hidden md:block" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl bg-slate-800/50 border border-white/10 text-slate-200 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 placeholder:text-slate-500 transition-all md:w-56"
              >
                <option value="all">Todas las categorías</option>
                {categories.filter(cat => cat.id !== 'all').map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-10">
          <p className="text-slate-400 text-sm md:text-base">
            {filteredRaffles.length} sorteo{filteredRaffles.length !== 1 ? 's' : ''} encontrado{filteredRaffles.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Raffles Grid */}
        {error ? (
          <div className="text-center py-20 bg-primary-light/60 backdrop-blur-xl border border-white/10 rounded-2xl">
            <p className="text-red-400 text-lg">{error}</p>
          </div>
        ) : loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {[...Array(6)].map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : filteredRaffles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {filteredRaffles.map((raffle, index) => (
              <RaffleCard key={raffle.id} raffle={raffle} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-primary-light/60 backdrop-blur-xl border border-white/10 rounded-2xl">
            <Ticket size={56} className="text-slate-600 mx-auto mb-6" />
            <p className="text-slate-400 text-lg md:text-xl">
              No se encontraron sorteos con esos criterios.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="mt-6 text-gold hover:underline text-base md:text-lg"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RafflesPage;
