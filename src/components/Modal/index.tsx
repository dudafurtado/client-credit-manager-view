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
import AddressIcon from '@/assets/address.png';
import { fieldsAddress, fieldsCard } from '@/utils/fieldsData';
import { getToken } from '@/utils/token';
import { createAddress } from '@/services/addressService';
import { addressSchema } from '@/validations/adressSchema';

export function Modal({ reloadClient, setReloadClient }: any) {
  const params = useParams();
  const { toast } = useToast();
  const token = getToken();

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

  async function onSubmit(values: z.infer<typeof addressSchema>) {
    const { message } = await createAddress(values, token, Number(params.id));

    toast(message);
    form.reset();
    setReloadClient(!reloadClient);
    return;
  }

  function handleCloseModal() {}

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost">
          <Image
            src={AddressIcon}
            alt="Icone de um cartão de crédito"
            width={30}
            height={30}
            className="cursor-pointer self-center mr-4"
          />
          Criar Endereço
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Adicionar Endereço</AlertDialogTitle>
          <AlertDialogDescription>
            Insira o CEP e confirme as informações assim que o complemento for adicionado
            aos campos.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
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
            <AlertDialogFooter className="mt-4">
              <AlertDialogCancel type="button" onClick={() => handleCloseModal()}>
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
