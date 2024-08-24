'use client';
import { useRouter } from 'next/navigation';
import { PaginationDemo } from '@/components/Pagination';
import { InputWithButton } from '@/components/Search';
import { TableDemo } from '@/components/Table';
import { Button } from '@/components/ui/button';

export default function Home() {
  const router = useRouter();

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
