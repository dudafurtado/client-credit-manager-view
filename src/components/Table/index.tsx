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
import { useQuery } from '@tanstack/react-query';
import fetchData from '@/services/api';
import { ResponseError } from '@/interfaces/errorInterface';
import { Client } from '@/interfaces/clientInterface';

export function TableDemo() {
  const [allData, setAllData] = useState<any[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const { search } = useMyContext();
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    async function loadClients() {
      try {
        const res = await fetchData('/clients', 'GET');

        if (!res.ok) {
          toast({
            title: 'Error',
            description: 'Problema ao acessar a aplicação',
          });
        }

        const { data } = await res.json();

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
          <TableHead>Nome</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Data de nascimento</TableHead>
          <TableHead className="text-right">Telefone</TableHead>
        </TableRow>
      </TableHeader>
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
    </Table>
  );
}
