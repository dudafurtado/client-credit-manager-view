import { useEffect, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import useMyContext from '@/context/useMyContext';

export interface ResponseError extends Error {
  message: string;
}

export function TableDemo() {
  const [allData, setAllData] = useState<any[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const { search } = useMyContext();
  const { toast } = useToast();

  useEffect(() => {
    async function loadClients() {
      try {
        const data = [
          {
            id: 1,
            name: 'Maria Eduarda',
            email: 'mariaeduarda@email.com',
            birth_date: '20/05/2003',
            phone: '(71) 999516225',
          },
          {
            id: 2,
            name: 'Mauricio Alves',
            email: 'ma@email.com',
            birth_date: '20/05/2003',
            phone: '(71) 999516225',
          },
          {
            id: 3,
            name: 'Jorge Junior',
            email: 'jorge@email.com',
            birth_date: '20/05/2003',
            phone: '(71) 999516225',
          },
          {
            id: 4,
            name: 'Carla Borges',
            email: 'carla@email.com',
            birth_date: '20/05/2003',
            phone: '(71) 999516225',
          },
        ];

        setAllData(data);
        setClients(data);

        toast({
          title: 'Success',
          description: 'Clients List Successful.',
        });
      } catch (err: unknown) {
        const error = err as ResponseError;
        toast({
          title: 'Error',
          description: error.message,
        });
      }
    }

    loadClients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const contentSearched: any[] = allData.filter((client) =>
      client.name.toLowerCase().includes(search.toLowerCase())
    );

    setClients(contentSearched);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <Table>
      <TableCaption>Listagem dos seus clientes.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Nome</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Data de nascimento</TableHead>
          <TableHead className="text-right">Telefone</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {clients.map((client) => (
          <TableRow key={client.id}>
            <TableCell className="font-medium">{client.name}</TableCell>
            <TableCell>{client.email}</TableCell>
            <TableCell>{client.birth_date}</TableCell>
            <TableCell className="text-right">{client.phone}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
