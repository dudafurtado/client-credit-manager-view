'use client';
import { useContext } from 'react';
import MyContext from './MyContext';

export default function useMyContext() {
  const context = useContext(MyContext);

  if (!context) {
    throw new Error('useMyContext must be used within a MyProvider');
  }

  return context;
}
