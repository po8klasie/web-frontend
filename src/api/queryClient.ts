import { publicRuntimeConfig } from '../runtimeConfig';
import { QueryClientConfig } from '@tanstack/react-query';
export const fetchData = (path: string) => fetch(`${publicRuntimeConfig.API_URL}${path}`);

export const fetcher = <T>({ queryKey }: { queryKey: readonly unknown[] }): Promise<T> =>
  fetchData(`${queryKey[0]}`).then((res) => res.json());

export const queryClientOptions: QueryClientConfig = {
  defaultOptions: {
    queries: {
      queryFn: fetcher,
      refetchIntervalInBackground: false,
    },
  },
};
