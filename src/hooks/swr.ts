import useSWR, { trigger as triggerSWR } from 'swr';

import api from '../services/api';

const useFetch = (url: string) => {
  const { data, error } = useSWR(`/api${url}`, async () => {
    const response = await api.get(url);

    return response;
  });
  
  return { data, error };
};

export const trigger = (url: string) => {
  triggerSWR(`/api${url}`);
};

export default useFetch;