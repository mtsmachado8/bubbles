import useSWR, { mutate, trigger } from 'swr';
import api from '../services/api';

const useFetch = (url: string) => {
  const { data, error } = useSWR(`/api${url}`, async () => {
    const response = await api.get(url);

    return response;
  });
  
  return { data, error };
};

export const useMutate = (url: string,) => {
  mutate(`/api${url}`, null, false);
};

export const useTrigger = (url: string) => {
  trigger(`/api${url}`);
};

export default useFetch;