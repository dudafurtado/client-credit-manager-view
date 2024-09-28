import { ReactNode } from 'react';
import { Pagination } from './paginationInterface';

export interface MyContextType {
  currentClientId: number;
  setCurrentClientId: (term: number) => void;
  search: string;
  setSearch: (term: string) => void;
  pagination: Pagination;
  setPagination: (term: Pagination) => void;
  reloadClient: boolean;
  setReloadClient: (term: boolean) => void;
}

export interface MyProviderProps {
  children: ReactNode;
}
