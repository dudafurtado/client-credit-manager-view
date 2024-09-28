'use client';
import { BreadcrumbDemo } from '@/components/Breadcrumb';
import { useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { editClientSchema } from '@/validations/clientSchema';
import { fieldsCreateClient } from '@/utils/fieldsData';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { getToken } from '@/utils/token';
import { editClient, showClient } from '@/services/clientService';
import { useParams, useRouter } from 'next/navigation';

export default function NewClient() {
  const { toast } = useToast();
  const { clientId } = useParams();
  const token = getToken();
  const router = useRouter();

  const form = useForm<z.infer<typeof editClientSchema>>({
    resolver: zodResolver(editClientSchema),
    defaultValues: {
      name: '',
      surname: '',
      email: '',
      birth_date: '',
      phone: '',
    },
  });

  async function onSubmit(values: z.infer<typeof editClientSchema>) {
    const { ok, message } = await editClient(values, token, Number(clientId));

    if (!ok) {
      return toast(message);
    }

    toast(message);
    router.push(`/client/show/${clientId}`);
  }

  useEffect(() => {
    async function loadClient() {
      const { ok, message, data } = await showClient(token, Number(clientId));

      if (!ok) {
        return toast(message);
      }

      toast(message);
      form.reset({
        name: data.name,
        surname: data.surname,
        email: data.email,
        birth_date: data.birth_date,
        phone: data.phone,
      });
      return;
    }

    loadClient();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <section className="min-h-screen flex-col justify-center items-center p-12">
        <BreadcrumbDemo url={`/client/edit`} title={'Editar Cliente'} />
        <div className="flex justify-center items-center mt-16">
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Editar Cliente</CardTitle>
              <CardDescription>Altere os dados do seu cliente.</CardDescription>
            </CardHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <CardContent>
                  {fieldsCreateClient.map((item) => (
                    <div key={item.id} className="py-2">
                      <FormField
                        control={form.control}
                        name={item.name}
                        render={({ field }) => (
                          <>
                            <FormItem>
                              <FormLabel>{item.label}</FormLabel>
                              <FormControl>
                                <Input placeholder={item.placeholder} {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          </>
                        )}
                      />
                    </div>
                  ))}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => router.push(`/client/show/${clientId}`)}
                  >
                    Desistir
                  </Button>
                  <Button type="submit">Atualizar</Button>
                </CardFooter>
              </form>
            </Form>
          </Card>
        </div>
      </section>
    </>
  );
}
