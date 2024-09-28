import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { fieldsCard } from '@/utils/fieldsData';
import { cardSchema } from '@/validations/cardSchema';
import { createCard } from '@/services/cardService';
import { useParams } from 'next/navigation';
import { useToast } from '../ui/use-toast';
import { getToken } from '@/utils/token';
import Image from 'next/image';
import CreditCardIcon from '@/assets/credit-card-black.png';

export function PopoverCard({ reloadClient, setReloadClient }: any) {
  const params = useParams();
  const { toast } = useToast();
  const token = getToken();

  const form = useForm<z.infer<typeof cardSchema>>({
    resolver: zodResolver(cardSchema),
    defaultValues: {
      number: '',
      expire_date: '',
      CVV: '',
    },
  });

  async function onSubmit(values: z.infer<typeof cardSchema>) {
    const { message } = await createCard(values, token, Number(params.id));

    toast(message);
    form.reset();
    setReloadClient(!reloadClient);
  }

  function handleMessage() {
    toast({
      title: `Fechar Caixa "Criar Cartão de Crédito"`,
      description:
        'Basta clicar em qualquer lugar da tela ou clicar no mesmo botão que abriu.',
    });
  }

  return (
    <Popover>
      <PopoverTrigger asChild onClick={() => handleMessage()}>
        <Button variant="outline">
          <Image
            src={CreditCardIcon}
            alt="Icone de um cartão de crédito"
            width={24}
            height={24}
            className="cursor-pointer self-center mr-4"
          />
          Criar Cartão de Crédito
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-2">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Adicionar Novo Cartão</h4>
            <p className="text-sm text-muted-foreground">
              Use essa área para associar um novo cartão de crédito para esse cliente.
            </p>
          </div>
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
              <section className="mt-4">
                <Button className="w-full" type="submit">
                  Criar
                </Button>
              </section>
            </form>
          </Form>
        </div>
      </PopoverContent>
    </Popover>
  );
}
