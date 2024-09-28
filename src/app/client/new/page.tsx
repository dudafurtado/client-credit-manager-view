'use client';
import { BreadcrumbDemo } from '@/components/Breadcrumb';
import { CardToCreateClient } from '@/components/CardClient';

export default function NewClient() {
  return (
    <>
      <section className="min-h-screen flex-col justify-center items-center p-12">
        <BreadcrumbDemo url={`/client/new`} title={'Novo Cliente'} />
        <div className="flex justify-center items-center mt-16">
          <CardToCreateClient />
        </div>
      </section>
    </>
  );
}
