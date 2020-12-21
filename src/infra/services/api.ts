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

const put = async (url: string, data: any) => {
  const response = await createdApi.put(url, data, {
    headers: {},
  });
  return response.data;
};

const remove = async (url: string) => {
  const response = await createdApi.delete(url);

  return response.data;
};

const api = {
  get,
  post,
  put,
  remove,
};

export { api };

export default api;
