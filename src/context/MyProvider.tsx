'use client';
import { useState } from 'react';
import MyContext from './MyContext';
import { MyProviderProps } from '@/interfaces/contextInterfaces';

export default function MyProvider({ children }: MyProviderProps) {
  const [currentClientId, setCurrentClientId] = useState<number>(0);
  const [search, setSearch] = useState<string>('');
  const [token, setToken] = useState<string>('');

  const values = {
    currentClientId,
    setCurrentClientId,
    search,
    setSearch,
    token,
    setToken,
  };

  return <MyContext.Provider value={values}>{children}</MyContext.Provider>;
}
