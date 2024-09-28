'use client';
import { useState } from 'react';
import MyContext from './MyContext';
import { MyProviderProps } from '@/interfaces/contextInterfaces';
import { Pagination } from '@/interfaces/paginationInterface';

export default function MyProvider({ children }: MyProviderProps) {
  const [currentClientId, setCurrentClientId] = useState<number>(0);
  const [search, setSearch] = useState<string>('');
  const [pagination, setPagination] = useState<Pagination>({
    current_page: 1,
    last_page: 1,
    next_page_url: null,
    prev_page_url: null,
    links: [],
  });
  const [reloadClient, setReloadClient] = useState<boolean>(false);

  const values = {
    currentClientId,
    setCurrentClientId,
    search,
    setSearch,
    pagination,
    setPagination,
    reloadClient,
    setReloadClient,
  };

  return <MyContext.Provider value={values}>{children}</MyContext.Provider>;
}
