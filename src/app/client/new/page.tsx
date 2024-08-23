'use client';
import { BreadcrumbDemo } from '@/components/Breadcrumb';
import { CardToCreateClient } from '@/components/CardClient';
import { TabsDemo } from '@/components/Tabs';
import useMyContext from '@/context/useMyContext';
import { useEffect } from 'react';

export default function NewClient() {
  const { currentClientId, setCurrentClientId } = useMyContext();

  useEffect(() => {
    console.log(currentClientId);
    setCurrentClientId(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <section className="min-h-screen flex-col justify-center items-center gap-10 p-12">
        <BreadcrumbDemo url={`/client/new`} title={'Novo Cliente'} />
        <div className="flex justify-center items-center gap-8 mt-10">
          <CardToCreateClient />
          <TabsDemo />
        </div>
      </section>
    </>
  );
}
