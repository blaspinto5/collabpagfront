import React, { useState } from 'react';
import { IllustrationCard } from '../components';
import useIllustrations from '../hooks/useIllustrations';

const IllustrationsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { illustrations, loading, error } = useIllustrations();

  const filtered = illustrations.filter(illu =>
    illu.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    illu.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    illu.number.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen py-16 md:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-indigo-800">Ilustraciones disponibles</h1>
          <p className="text-gray-500">Compra tu ilustración única. Cada una tiene un número exclusivo.</p>
        </div>
        <div className="mb-8 flex justify-center">
          <input
            type="text"
            placeholder="Buscar por título, descripción o número..."
            className="w-full max-w-md px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        {loading ? (
          <div className="text-center text-gray-400">Cargando ilustraciones...</div>
        ) : error ? (
          <div className="text-center text-red-500">Error al cargar ilustraciones</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filtered.map(illu => (
              <IllustrationCard key={illu.id} illustration={illu} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default IllustrationsPage;
