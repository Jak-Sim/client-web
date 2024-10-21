import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios';
import { API_URL, SOCKET_URL } from '@/config/config';

interface NextOptions {
  tags?: string[];
}

interface CustomAxiosInstance extends AxiosInstance {
  get: <T = unknown, R = AxiosResponse<T>, D = unknown>(
    url: string,
    config?: AxiosRequestConfig<D> & { next?: NextOptions },
  ) => Promise<R>;
}

const api = axios.create({
  baseURL: API_URL,
});

const socketApi = axios.create({
  baseURL: SOCKET_URL,
});

export { socketApi };
export default api as CustomAxiosInstance;
