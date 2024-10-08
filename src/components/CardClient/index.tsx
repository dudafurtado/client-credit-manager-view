'use client';
import * as React from 'react';
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
import { createClientSchema } from '@/validations/clientSchema';
import { fieldsCreateClient } from '@/utils/fieldsData';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import useMyContext from '@/context/useMyContext';
import { getToken } from '@/utils/token';
import { createClient } from '@/services/clientService';

export function CardToCreateClient() {
  const { setCurrentClientId } = useMyContext();
  const { toast } = useToast();
  const token = getToken();

  const form = useForm<z.infer<typeof createClientSchema>>({
    resolver: zodResolver(createClientSchema),
    defaultValues: {
      name: '',
      surname: '',
      email: '',
      birth_date: '',
      phone: '',
    },
  });

  async function onSubmit(values: z.infer<typeof createClientSchema>) {
    const { ok, message, data } = await createClient(values, token);

    if (!ok) {
      return toast(message);
    }

    toast(message);
    setCurrentClientId(data.id);
    form.reset();
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Criar Cliente</CardTitle>
        <CardDescription>Preencha os dados do seu cliente.</CardDescription>
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
            <Button variant="outline" type="button" onClick={() => form.reset()}>
              Cancelar
            </Button>
            <Button type="submit">Criar</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
