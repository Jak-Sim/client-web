import { getSession } from 'next-auth/react';
import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios';
import { API_URL, SOCKET_URL } from '@/config/config';
import { getServerSession } from 'next-auth';
import { nextAuthOptions } from '@/app/api/auth/[...nextauth]/route';

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
}) as CustomAxiosInstance;

const socketApi = axios.create({
  baseURL: SOCKET_URL,
});

api.interceptors.request.use(async (config) => {
  const getSessionFn = typeof window === undefined ? getServerSession : getSession;
  const session = (await getSessionFn(nextAuthOptions)) as { auth: { AT: string } } | undefined;
  const AT = session?.auth?.AT;
  if (AT) {
    config.headers.AT = AT;
  }

  return config;
});

export { socketApi, api };
