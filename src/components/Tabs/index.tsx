'use client';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/components/ui/use-toast';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { cardSchema } from '@/validations/cardSchema';
import { fieldsAddress, fieldsCard } from '@/utils/fieldsData';
import { addressSchema } from '@/validations/adressSchema';
import useMyContext from '@/context/useMyContext';
import { fetchData } from '@/services/fetchData';

export function TabsDemo() {
  const { currentClientId, token } = useMyContext();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof addressSchema>>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      zip_code: '',
      state: '',
      city: '',
      neighborhood: '',
      street: '',
      additional_information: '',
    },
  });

  async function onSubmitAddress(values: z.infer<typeof addressSchema>) {
    const { ok, message } = await fetchData(
      'api',
      '/addresses',
      'POST',
      'Endereço Criado Com Sucesso',
      {
        ...values,
        client_id: currentClientId,
      },
      token
    );

    if (ok) {
      toast(message);
      form.reset();
    }

    return toast(message);
  }

  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-1">
        <TabsTrigger value="address">Endereço</TabsTrigger>
      </TabsList>
      <TabsContent value="address">
        <Card>
          <CardHeader>
            <CardTitle>Endereço</CardTitle>
            <CardDescription>
              Insira seu CEP e confirme as informações assim que o complemento for
              adicionado aos campos.
            </CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitAddress)}>
              <CardContent className="space-y-2">
                {fieldsAddress.map((item) => (
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
              <CardFooter>
                <Button type="submit">Salvar</Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
