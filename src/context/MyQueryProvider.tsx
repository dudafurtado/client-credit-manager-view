'use client';

import { MyProviderProps } from '@/interfaces/contextInterfaces';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, ReactNode } from 'react';

export default function MyQueryProvider({ children }: MyProviderProps) {
  const [queryClient] = useState(() => new QueryClient());

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
