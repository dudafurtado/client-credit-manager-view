'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '@/validations/adminSchema';
import { fieldsRegister } from '@/utils/fieldsData';
import { fetchData } from '@/services/fetchData';
import useMyContext from '@/context/useMyContext';

export function CardToRegisterAdmin() {
  const router = useRouter();
  const { toast } = useToast();
  const { token } = useMyContext();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    const { ok, message } = await fetchData(
      'auth',
      '/users',
      'POST',
      'Administrador Criado Com Sucesso',
      values,
      token
    );

    if (ok) {
      toast(message);
      return router.push('/login');
    }

    return toast(message);
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Crie uma conta</CardTitle>
        <CardDescription>
          Seja um administrador para lidar com clientes e cartões de crédito.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CardContent>
            {fieldsRegister.map((item) => (
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
            <Button variant="outline" onClick={() => router.push('/login')}>
              Login
            </Button>
            <Button type="submit">Criar</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
