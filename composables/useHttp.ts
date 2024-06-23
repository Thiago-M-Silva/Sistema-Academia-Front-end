// composables/useHttp.ts
import { useFetch } from '#app';

interface FetchOptions {
  method?: string;
  body?: Record<string, unknown>;
}

export const useHttp = () => {
  const httpFetch = async <T>(url: string, options: FetchOptions = {}) => {
    const { data, pending, error, refresh } = await useFetch<T>(url);
    return { data, pending, error, refresh };
  };

  return {
    httpFetch
  };
};
