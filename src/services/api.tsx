import axios from 'axios';

const createdApi = axios.create({
  baseURL: '/api',
});

const get = async (url: string) => {
  const response = await createdApi.get(url, {
    headers: {},
  });
  return response.data;
};

const post = async (url: string, data: any) => {
  const response = await createdApi.post(url, data, {
    headers: {},
  });
  return response.data;
};

const api = {
  get,
  post
};

export { api };

export default api;
