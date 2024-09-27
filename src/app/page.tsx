'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function EntrancePage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/login');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return;
}
