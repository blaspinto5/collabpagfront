/**
 * usePurchases Hook
 * Custom hook for managing purchase data
 */

import { useState, useEffect, useCallback } from 'react';
import { purchaseService } from '../services';

export const usePurchases = (filters = {}) => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPurchases = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await purchaseService.getAll(filters);
      setPurchases(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(filters)]);

  useEffect(() => {
    fetchPurchases();
  }, [fetchPurchases]);

  const confirmPurchase = async (id) => {
    try {
      await purchaseService.confirm(id);
      await fetchPurchases();
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  return { purchases, loading, error, refetch: fetchPurchases, confirmPurchase };
};

export const useStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await purchaseService.getStats();
      setStats(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return { stats, loading, error, refetch: fetchStats };
};

export default usePurchases;
