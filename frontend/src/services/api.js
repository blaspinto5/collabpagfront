export const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export const apiFetch = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const defaultHeaders = { 'Content-Type': 'application/json' };
  const config = { ...options, headers: { ...defaultHeaders, ...options.headers } };

  const response = await fetch(url, config);

  if (!response.ok) {
    let errorData = {};
    try {
      errorData = await response.json();
    } catch {
      // ignore
    }
    throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
  }

  return response.json();
};