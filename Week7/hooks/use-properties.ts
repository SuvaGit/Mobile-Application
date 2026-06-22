import { useEffect, useState } from 'react';

import { subscribeToProperties } from '@/services/property-service';
import { Property } from '@/types';

export function useProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToProperties((next) => {
      setProperties(next);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return { properties, loading };
}
