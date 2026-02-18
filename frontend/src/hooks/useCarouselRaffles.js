import { useState, useEffect } from 'react';
import { raffleService } from '../services/raffleService';
import { cardsService } from '../services/cardsService';

/**
 * useCarouselRaffles
 * - fetches ACTIVE raffles
 * - for each raffle fetches cards (limit configurable)
 * - returns { items, loading, error }
 */
export default function useCarouselRaffles({ limitPerRaffle = 5 } = {}) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const raffles = await raffleService.getAll({ status: 'active' }) || [];
        const withCards = await Promise.all(
          raffles.map(async (r) => {
            const cards = await cardsService.listByRaffle(r.id, limitPerRaffle);
            return { ...r, cards: Array.isArray(cards) ? cards : [] };
          })
        );
        if (!mounted) return;
        setItems(withCards);
      } catch (err) {
        if (!mounted) return;
        setError(err.message || 'Error cargando sorteos');
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, [limitPerRaffle]);

  return { items, loading, error };
}
