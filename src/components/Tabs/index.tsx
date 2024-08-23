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
import { Label } from '@/components/ui/label';
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
import fetchData from '@/services/api';
import { ResponseError } from '@/interfaces/errorInterface';

export function TabsDemo() {
  const { currentClientId, setCurrentClientId } = useMyContext();
  const { toast } = useToast();

  const cardForm = useForm<z.infer<typeof cardSchema>>({
    resolver: zodResolver(cardSchema),
    defaultValues: {
      number: '',
      expire_date: '',
      CVV: '',
    },
  });

  const addressForm = useForm<z.infer<typeof addressSchema>>({
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

  async function onSubmitCard(values: z.infer<typeof cardSchema>) {
    try {
      const res = await fetchData(`/cards`, 'POST', {
        ...values,
        client_id: currentClientId,
      });

      if (!res.ok) {
        toast({
          title: 'Error',
          description: 'Could not connect with API',
        });
      }

      toast({
        title: 'Success',
        description: 'Card Created Successful.',
      });

      cardForm.reset();
    } catch (err: unknown) {
      const error = err as ResponseError;
      toast({
        title: 'Error',
        description: error.message,
      });
    }
  }

  async function onSubmitAddress(values: z.infer<typeof addressSchema>) {
    try {
      const res = await fetchData(`/addresses`, 'POST', {
        ...values,
        client_id: currentClientId,
      });

      if (!res.ok) {
        toast({
          title: 'Error',
          description: 'Could not connect with API',
        });
      }

      toast({
        title: 'Success',
        description: 'Address Created Successful.',
      });

      addressForm.reset();
    } catch (err: unknown) {
      const error = err as ResponseError;
      toast({
        title: 'Error',
        description: error.message,
      });
    }
  }

  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Endereço</TabsTrigger>
        <TabsTrigger value="password">Cartão</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Endereço</CardTitle>
            <CardDescription>
              Insira seu CEP e confirme as informações assim que o complemento for
              adicionado aos campos.
            </CardDescription>
          </CardHeader>
          <Form {...addressForm}>
            <form onSubmit={addressForm.handleSubmit(onSubmitAddress)}>
              <CardContent className="space-y-2">
                {fieldsAddress.map((item) => (
                  <div key={item.id} className="py-2">
                    <FormField
                      control={addressForm.control}
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
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Cartão de Crédito</CardTitle>
            <CardDescription>
              Insira aqui as credenciais do cartão de crédito do cliente.
            </CardDescription>
          </CardHeader>
          <Form {...cardForm}>
            <form onSubmit={cardForm.handleSubmit(onSubmitCard)}>
              <CardContent className="space-y-2">
                {fieldsCard.map((item) => (
                  <div key={item.id} className="py-2">
                    <FormField
                      control={cardForm.control}
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
                <Button>Salvar</Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
