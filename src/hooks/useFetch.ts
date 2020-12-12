import useSWR, { mutate } from 'swr';
import api from '../services/api';

const useFetch = (url: string) => {
  const { data, error } = useSWR(`/api${url}`, async () => {
    const response = await api.get(url);

    return response;
  });

  return { data, error };
};

export const useMutate = async (url: string) => {
  await mutate(url, null, true);
};

export default useFetch;