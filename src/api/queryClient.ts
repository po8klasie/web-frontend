import {
  QueryClient,
  QueryClientConfig,
  QueryFunction,
  QueryKey,
  useQuery,
  UseQueryOptions
} from "@tanstack/react-query";
import { useEnvironment } from "../environment/environmentContext";
export const fetchData = (path: string) => fetch(`${process.env.API_URL}${path}`);

export const fetchJson = <T extends unknown>(path: string) => fetchData(path).then(res => res.json() as T)

export const fetcher = <T>({ queryKey }: { queryKey: readonly unknown[] }): Promise<T> =>
  fetchData(`${queryKey[0]}`).then((res) => res.json());

export const queryClientOptions: QueryClientConfig = {
  defaultOptions: {
    queries: {
      refetchIntervalInBackground: false,
    },
  },
};

export const queryClient = new QueryClient(queryClientOptions)

export const useAPIQuery = <T extends unknown>(queryKey: [string], options: Omit<UseQueryOptions, 'queryKey' | 'queryFn'>) => {
  const {publicEnvironment: {API_URL}} = useEnvironment()
  const path = queryKey[0];
  const fullUrl = `${API_URL}${path}`
  const modifiedQueryKey: [string] = [fullUrl]

  return useQuery<T>(
    modifiedQueryKey,
    () => fetch(fullUrl).then((res) => res.json()),
    options
  )
}
