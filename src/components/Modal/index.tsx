import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import CreditCardIcon from '@/assets/credit-card.png';
import { cardSchema } from '@/validations/cardSchema';
import { fieldsCard } from '@/utils/fieldsData';
import { fetchData } from '@/services/fetchData';
import useMyContext from '@/context/useMyContext';

export function Modal() {
  const params = useParams();
  const { toast } = useToast();
  const { token } = useMyContext();

  const form = useForm<z.infer<typeof cardSchema>>({
    resolver: zodResolver(cardSchema),
    defaultValues: {
      number: '',
      expire_date: '',
      CVV: '',
    },
  });

  async function onSubmit(values: z.infer<typeof cardSchema>) {
    const { ok, message } = await fetchData(
      'api',
      '/cards',
      'POST',
      'Cartão Criado Com Sucesso',
      { ...values, client_id: params.id },
      token
    );

    if (ok) {
      return toast(message);
    }

    return toast(message);
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Image
          src={CreditCardIcon}
          alt="Icone de um cartão de crédito"
          width={40}
          height={40}
          className="cursor-pointer self-center"
        />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Adicionar Novo Cartão</AlertDialogTitle>
          <AlertDialogDescription>
            Use essa área para associar um novo cartão de crédito para esse cliente.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {fieldsCard.map((item) => (
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
            <AlertDialogFooter className="mt-4">
              <AlertDialogCancel type="button" onClick={() => form.reset()}>
                Fechar
              </AlertDialogCancel>
              <Button type="submit">Criar</Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
