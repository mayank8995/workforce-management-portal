/* eslint-disable @typescript-eslint/consistent-type-imports */
import axios, {
  AxiosError,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';
import { doLogout } from '../api/admin-portal.api';
import { getEnv } from '../config/env';
interface ApiError extends AxiosError {
  status: number;
  data: unknown;
  statusText: string;
}
const MAX_RETRIES = 5;
const RETRY_DELAY_MS = 500;
const { apiUrl } = getEnv();
const apiClient = axios.create({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  baseURL: apiUrl || 'http://localhost:3000/',
  timeout: 5000,
  withCredentials: true,
  headers: {
    'Content-type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  function (config: InternalAxiosRequestConfig) {
    // Do something before request is sent
    if (
      !(
        config.url === '/login' ||
        config.url === '/signup' ||
        config.url === '/logout'
      )
    ) {
      // let access_token: string | null = localStorage.getItem('access-token');
      // if (access_token) {
      //   config.headers.set('Authorization', `Bearer ${access_token}`);
      // }
    }
    return config;
  },
  function (error: AxiosError) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
apiClient.interceptors.response.use(
  function (response: AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if (response?.config?.url === '/login') {
      localStorage.setItem('access-token', response?.data?.token);
    }
    return normalizeApiResponse(response);
  },
  async function (error: AxiosError) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    reportError(error);
    if (error.response?.status === 403) {
      doLogout();
      return Promise.reject(new Error('Auth token expired'));
    }
    // if (error.response?.status === 401) {
    //   console.log('error>>>>>', error?.response);
    //   const responseData = error?.response?.data as
    //     | Record<string, unknown>
    //     | undefined;
    //   const isTokenVerified = responseData?.token;
    //   if (isTokenVerified === false) {
    //     // refetch token
    //     const token = await refreshToken();
    //     console.log('token>>>', token);
    //     // config.headers.set('Authorization', `Bearer ${access_token}`);
    //   }
    // }
    const config = error.config as InternalAxiosRequestConfig & {
      _retryCount?: number;
    };

    if (config && config.url === '/login') {
      config._retryCount = config._retryCount ?? 0;
      if (
        config?._retryCount < MAX_RETRIES &&
        (!error.response || error.response.status >= 500)
      ) {
        config._retryCount = config._retryCount + 1;
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
        return apiClient(config);
      }
    }
    return Promise.reject(normalizeApiError(error));
    // return normalizeApiError(error);
  }
);

function normalizeApiResponse(response: AxiosResponse): AxiosResponse {
  return {
    ...response,
    data: response?.data as unknown,
    status: response.status,
    statusText: response.statusText,
  };
}

function normalizeApiError(error: AxiosError): ApiError {
  const normalizedError = error as ApiError;
  normalizedError.status = Number(error.response?.status);
  normalizedError.statusText =
    error?.response?.statusText ?? 'Something went wrong!';
  normalizedError.data = error?.response?.data;
  return normalizedError;
}

export default apiClient;
