/**
 * useRaffles Hook
 * Custom hook for managing raffle data
 * Optimized with proper memoization
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import { raffleService } from '../services';

export const useRaffles = (filters = {}) => {
  const [raffles, setRaffles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Memoize filters to prevent unnecessary re-fetches
  const filtersKey = useMemo(() => JSON.stringify(filters), [filters]);

  const fetchRaffles = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await raffleService.getAll(JSON.parse(filtersKey));
      setRaffles(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [filtersKey]);

  useEffect(() => {
    fetchRaffles();
  }, [fetchRaffles]);

  return { raffles, loading, error, refetch: fetchRaffles };
};

export const useRaffle = (id) => {
  const [raffle, setRaffle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRaffle = useCallback(async () => {
    // guard against undefined/null or the literal strings 'undefined'/'null'
    if (!id || id === 'undefined' || id === 'null') {
      setRaffle(null);
      setError(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await raffleService.getById(id);
      setRaffle(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchRaffle();
  }, [fetchRaffle]);

  return { raffle, loading, error, refetch: fetchRaffle };
};

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await raffleService.getCategories();
        setCategories(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};

export default useRaffles;
