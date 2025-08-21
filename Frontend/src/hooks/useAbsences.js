import useSWR from 'swr';
  import api from '../config/axios';
  import { useContext } from 'react';
  import AuthContext from '../contexts/AuthContext';

  const fetcher = async (url, token) => {
    const response = await api.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  };

  export const useAbsences = () => {
    const { user } = useContext(AuthContext);
    const { data, error, mutate } = useSWR(
      user.token ? ['/absences', user.token] : null,
      ([url, token]) => fetcher(url, token),
      { refreshInterval: 30000 } // Revalidation toutes les 30s
    );

    return {
      absences: data,
      isLoading: !error && !data,
      isError: error,
      mutate,
    };
  };