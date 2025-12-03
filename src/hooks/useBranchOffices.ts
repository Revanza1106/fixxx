import { useState, useEffect } from 'react';
import { pcpTransportService, type BranchOffice } from '../services/pcpTransport';
import type { BranchOfficeApiResponse } from '../types/pcpTransport';

export interface UseBranchOfficesReturn {
  data: BranchOffice[];
  provinces: string[];
  branches: string[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
  fetchByRegion: (region: string) => void;
}

export const useBranchOffices = (region?: string): UseBranchOfficesReturn => {
  const [data, setData] = useState<BranchOffice[]>([]);
  const [provinces, setProvinces] = useState<string[]>([]);
  const [branches, setBranches] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentRegion, setCurrentRegion] = useState<string | undefined>(region);

  const fetchBranchOffices = async (fetchRegion?: string) => {
    setLoading(true);
    setError(null);

    try {
      const response: BranchOfficeApiResponse = await pcpTransportService.getBranchOffices(fetchRegion);

      if (response.status) {
        const transformedOffices = pcpTransportService.transformToBranchOffices(response);
        setData(transformedOffices);

        // Extract unique provinces
        const uniqueProvinces = [...new Set(transformedOffices.map(office => office.provinceName))];
        setProvinces(uniqueProvinces.sort());

        // Extract unique branches
        const uniqueBranches = [...new Set(transformedOffices.map(office => office.branchName))];
        setBranches(uniqueBranches.sort());
      } else {
        setError(response.msg || 'Failed to fetch branch offices');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch branch offices');
    } finally {
      setLoading(false);
    }
  };

  const fetchByRegion = (newRegion: string) => {
    setCurrentRegion(newRegion);
    fetchBranchOffices(newRegion);
  };

  const refetch = () => {
    fetchBranchOffices(currentRegion);
  };

  useEffect(() => {
    fetchBranchOffices(currentRegion);
  }, []);

  return {
    data,
    provinces,
    branches,
    loading,
    error,
    refetch,
    fetchByRegion,
  };
};