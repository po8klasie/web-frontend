import { QueryClient, QueryFunction, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

export const withTestQueryProvider = (queryFn: QueryFunction, children: ReactNode) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        queryFn,
        refetchIntervalInBackground: false,
      },
    },
  });

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
