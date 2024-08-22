import { BreadcrumbDemo } from '@/components/Breadcrumb';
import { CardToCreateClient } from '@/components/CardClient';
import { TabsDemo } from '@/components/Tabs';

export default function Client() {
  return (
    <>
      <section className="min-h-screen flex-col justify-center items-center gap-10 p-12">
        <BreadcrumbDemo />
        <div className="flex justify-center items-center gap-8 mt-10">
          <CardToCreateClient />
          <TabsDemo />
        </div>
      </section>
    </>
  );
}
