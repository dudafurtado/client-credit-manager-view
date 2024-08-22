'use client';
import { createContext } from 'react';
import { MyContextType } from '@/interfaces/contextInterfaces';

const MyContext = createContext<MyContextType | undefined>(undefined);

export default MyContext;
