import { publicRuntimeConfig } from '../runtimeConfig';
import { QueryClientConfig, QueryKey } from '@tanstack/react-query';

interface FetcherArgs {
  queryKey: QueryKey;
}

export const fetchData = (path: string) => fetch(`${publicRuntimeConfig.API_URL}${path}`);

export const fetcher = <T>({ queryKey }: FetcherArgs): Promise<T> =>
  fetchData(queryKey[0]).then((res) => res.json());

export const queryClientOptions: QueryClientConfig = {
  defaultOptions: {
    queries: {
      queryFn: fetcher,
      refetchIntervalInBackground: false,
    },
  },
};
