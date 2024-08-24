'use client';
import { useRouter } from 'next/navigation';
import { PaginationDemo } from '@/components/Pagination';
import { InputWithButton } from '@/components/Search';
import { TableDemo } from '@/components/Table';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import useMyContext from '@/context/useMyContext';

export default function Home() {
  const router = useRouter();
  const { token } = useMyContext();

  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  });

  return (
    <>
      <section className="min-h-screen flex-col justify-center items-center gap-4 p-12">
        <div className="flex justify-between items-center mb-10">
          <InputWithButton />
          <Button onClick={() => router.push('/client/new')}>Criar Cliente</Button>
        </div>
        <TableDemo />
        <PaginationDemo />
      </section>
    </>
  );
}
