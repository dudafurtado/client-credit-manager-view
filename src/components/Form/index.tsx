'use client';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { loginSchema } from '@/validations/adminSchema';
import { fetchData } from '@/services/fetchData';
import { saveToken } from '@/utils/token';

export function ProfileForm() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    const { ok, message, data } = await fetchData(
      'auth',
      '/login',
      'POST',
      'Login Efetuado Com Sucesso',
      values
    );

    if (ok) {
      saveToken(data.token);
      toast(message);
      return router.push('/home');
    }

    return toast(message);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <>
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="mariaeduarda@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            </>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <>
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input placeholder="**********" {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </>
          )}
        />
        <Button type="submit">Entrar</Button>
      </form>
    </Form>
  );
}
