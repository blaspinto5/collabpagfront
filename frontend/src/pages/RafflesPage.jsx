/**
 * Raffles Page
 * Lists all active raffles with filtering - Using centralized UI components
 */

import { useState } from 'react';
import { RaffleCard, CardSkeleton } from '../components';
import { Card, Input, Select, Badge, Button } from '../components/ui';
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

  const categoryOptions = [
    { value: 'all', label: 'Todas las categorías' },
    ...categories.filter(cat => cat.id !== 'all').map(cat => ({
      value: cat.id,
      label: cat.name
    }))
  ];

  return (
    <div className="min-h-screen py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <Badge variant="gold" className="mb-6">
            <Ticket size={14} className="mr-2" />
            Catálogo
          </Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
            Sorteos Activos
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
            Explora todos nuestros sorteos disponibles y elige tu favorito
          </p>
        </div>

        {/* Filters */}
        <Card hoverable={false} className="mb-14 p-8 md:p-10">
          <div className="flex flex-col md:flex-row gap-5 md:gap-8">
            {/* Search */}
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Buscar sorteos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={<Search size={20} />}
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-3">
              <Filter size={20} className="text-slate-400 hidden md:block" />
              <Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                options={categoryOptions}
                className="md:w-56"
              />
            </div>
          </div>
        </Card>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-10">
          <p className="text-slate-400 text-sm md:text-base">
            {filteredRaffles.length} sorteo{filteredRaffles.length !== 1 ? 's' : ''} encontrado{filteredRaffles.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Raffles Grid */}
        {error ? (
          <Card hoverable={false} className="text-center py-20">
            <p className="text-red-400 text-lg">{error}</p>
          </Card>
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
          <Card hoverable={false} className="text-center py-20">
            <Ticket size={56} className="text-slate-600 mx-auto mb-6" />
            <p className="text-slate-400 text-lg md:text-xl">
              No se encontraron sorteos con esos criterios.
            </p>
            <Button
              variant="ghost"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="mt-6 text-gold hover:underline text-base md:text-lg"
            >
              Limpiar filtros
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
};

export default RafflesPage;
