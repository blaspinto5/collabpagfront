import { useEffect, useState } from 'react';
import axios from 'axios';

const useIllustrations = () => {
  const [illustrations, setIllustrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios.get('/api/illustrations')
      .then(res => {
        setIllustrations(res.data);
        setError(null);
      })
      .catch(err => {
        setError(err);
        setIllustrations([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return { illustrations, loading, error };
};

export default useIllustrations;
