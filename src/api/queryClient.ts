import { QueryClient, QueryClientConfig, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { useEnvironment } from '../environment/environmentContext';

export const queryClientOptions: QueryClientConfig = {
  defaultOptions: {
    queries: {
      refetchIntervalInBackground: false,
    },
  },
};

export const queryClient = new QueryClient(queryClientOptions);

export const useAPIQuery = <T = void>(
  queryKey: [string],
  options: Omit<UseQueryOptions, 'queryKey' | 'queryFn'>,
) => {
  const {
    publicEnvironment: { API_URL },
  } = useEnvironment();
  const path = queryKey[0];
  const fullUrl = `${API_URL}${path}`;
  const modifiedQueryKey: [string] = [fullUrl];

  return useQuery<T>(modifiedQueryKey, () => fetch(fullUrl).then((res) => res.json()), options);
};
