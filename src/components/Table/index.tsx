'use client';
import { useRouter } from 'next/navigation';
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
import { fetchData } from '@/services/fetchData';
import { Client } from '@/interfaces/clientInterface';
import { getToken } from '@/utils/token';

export function TableDemo() {
  const [allData, setAllData] = useState<Client[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const { search } = useMyContext();
  const { toast } = useToast();
  const router = useRouter();
  const token = getToken();

  useEffect(() => {
    async function loadClients() {
      const { ok, message, data } = await fetchData(
        'api',
        '/clients',
        'GET',
        'Listagem de Clientes Com Sucesso',
        '',
        token
      );

      console.log(data);

      if (ok) {
        setAllData(data.data);
        setClients(data.data);

        return toast(message);
      }

      return toast(message);
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
          <TableHead>Nome</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Data de nascimento</TableHead>
          <TableHead className="text-right">Telefone</TableHead>
        </TableRow>
      </TableHeader>
      {clients && (
        <TableBody>
          {clients.map((client) => (
            <TableRow
              key={client.id}
              onClick={() => router.push(`/client/${client.id}`)}
              className="cursor-pointer"
            >
              <TableCell className="font-medium">{client.name}</TableCell>
              <TableCell>{client.email}</TableCell>
              <TableCell>{client.birth_date}</TableCell>
              <TableCell className="text-right">{client.phone}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      )}
    </Table>
  );
}
