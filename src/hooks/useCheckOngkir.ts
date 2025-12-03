import { useState } from 'react';
import { pcpTransportService } from '../services/pcpTransport';
import type { CheckOngkirRequest, CheckOngkirResponse, ShippingService } from '../types/pcpTransport';

export interface UseCheckOngkirReturn {
  shippingServices: ShippingService[];
  loading: boolean;
  error: string | null;
  checkOngkir: (request: CheckOngkirRequest) => Promise<void>;
  clearResults: () => void;
}

export const useCheckOngkir = (): UseCheckOngkirReturn => {
  const [shippingServices, setShippingServices] = useState<ShippingService[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkOngkir = async (request: CheckOngkirRequest) => {
    setLoading(true);
    setError(null);

    try {
      const response: CheckOngkirResponse = await pcpTransportService.checkOngkir(request);

      if (response.status) {
        setShippingServices(response.list || []);
      } else {
        setError('Failed to get shipping rates');
        setShippingServices([]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while checking shipping rates');
      setShippingServices([]);
    } finally {
      setLoading(false);
    }
  };

  const clearResults = () => {
    setShippingServices([]);
    setError(null);
  };

  return {
    shippingServices,
    loading,
    error,
    checkOngkir,
    clearResults,
  };
};