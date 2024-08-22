import { ReactNode } from 'react';

export interface MyContextType {
  currentClientId: number;
  setCurrentClientId: (term: number) => void;
  search: string;
  setSearch: (term: string) => void;
}

export interface MyProviderProps {
  children: ReactNode;
}

export interface ClientsProp {}
