'use client';
import { useParams, useRouter } from 'next/navigation';
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
import { Client } from '@/interfaces/clientInterface';
import { getToken } from '@/utils/token';
import { deleteClient, listClients } from '@/services/clientService';
import Image from 'next/image';
import DeleteClientIcon from '@/assets/delete-client.png';
import ClientIcon from '@/assets/client.png';

export function TableDemo() {
  const [allData, setAllData] = useState<Client[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [reloadClients, setReloadClients] = useState<boolean>(false);
  const { search, setPagination } = useMyContext();
  const { toast } = useToast();
  const router = useRouter();
  const token = getToken();
  const params = useParams();

  async function handleDeleteClient(clientId: number) {
    const { ok, message } = await deleteClient(token, clientId);

    if (!ok) {
      return toast(message);
    }

    toast(message);
    setReloadClients(!reloadClients);
    return;
  }

  useEffect(() => {
    async function loadClients() {
      const { ok, message, data } = await listClients(token);

      if (!ok) {
        return toast(message);
      }

      setAllData(data.data);
      setClients(data.data);
      setPagination({
        current_page: data.current_page,
        last_page: data.last_page,
        next_page_url: data.next_page_url,
        prev_page_url: data.prev_page_url,
        links: data.links,
      });

      toast(message);
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
          <TableHead>Telefone</TableHead>
          <TableHead>Detalhes</TableHead>
          <TableHead>Excluir</TableHead>
        </TableRow>
      </TableHeader>
      {clients && (
        <TableBody>
          {clients.map((client) => (
            <TableRow key={client.id} className="cursor-pointer">
              <TableCell className="font-medium">{client.name}</TableCell>
              <TableCell>{client.email}</TableCell>
              <TableCell>{client.birth_date}</TableCell>
              <TableCell>{client.phone}</TableCell>
              <TableCell onClick={() => router.push(`/client/show/${client.id}`)}>
                <Image
                  src={ClientIcon}
                  alt="Icone de um usuário indicando que ao clicar iremos detalhar ele"
                  width={24}
                  height={24}
                  className="cursor-pointer self-center"
                />
              </TableCell>
              <TableCell>
                <Image
                  src={DeleteClientIcon}
                  alt="Icone de um usuário que será deletado"
                  width={24}
                  height={24}
                  className="cursor-pointer self-center"
                  onClick={() => handleDeleteClient(client.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      )}
    </Table>
  );
}
