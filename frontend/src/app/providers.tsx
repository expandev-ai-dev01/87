import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

/**
 * @singleton queryClient
 * @summary Global TanStack Query client configuration
 * @type query-client
 * @category core-library
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      retry: (failureCount, error: any) => {
        if (error?.status >= 400 && error?.status < 500) {
          return false;
        }
        return failureCount < 3;
      },
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 1,
    },
  },
});

/**
 * @component AppProviders
 * @summary Global application providers wrapper
 * @domain core
 * @type provider-component
 * @category application
 *
 * @description
 * Wraps the application with all necessary context providers including
 * React Query for server state management and React Router for navigation.
 */
export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{children}</BrowserRouter>
    </QueryClientProvider>
  );
};
