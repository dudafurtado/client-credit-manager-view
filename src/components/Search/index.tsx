import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import useMyContext from '@/context/useMyContext';
import { searchSchema } from '@/validations/searchSchema';

export function InputWithButton() {
  const { toast } = useToast();
  const { setSearch } = useMyContext();

  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      search: '',
    },
  });

  function onSubmit(values: z.infer<typeof searchSchema>) {
    console.log(values);
    setSearch(values.search);

    toast({
      title: 'Success',
      description: 'Client Created Successful.',
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex gap-4">
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <>
              <FormItem>
                <FormLabel>Procurar pelo nome do Cliente</FormLabel>
                <FormControl>
                  <Input placeholder="Jorge Alonso" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            </>
          )}
        />
        <Button type="submit">Pesquisar</Button>
      </form>
    </Form>
  );
}
