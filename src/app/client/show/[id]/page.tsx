'use client';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { BreadcrumbDemo } from '@/components/Breadcrumb';
import { Modal } from '@/components/Modal';
import { Client } from '@/interfaces/clientInterface';
import { clientObject } from '@/utils/clientObject';
import DeleteAddressIcon from '@/assets/delete-file.png';
import EditIcon from '@/assets/edit-content.png';
import { getToken } from '@/utils/token';
import { editClient, showClient } from '@/services/clientService';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/DataTable';
import { PopoverCard } from '@/components/Popover';
import { deleteAddress } from '@/services/addressService';
import useMyContext from '@/context/useMyContext';

const ClientInfo = ({ label, value }: { label: string; value: string }) => (
  <div>
    <h2 className="text-xl font-semibold">{label}</h2>
    <span className="text-base text-muted-foreground">{value}</span>
  </div>
);

export default function ShowClient() {
  const [client, setClient] = useState<Client>(clientObject);
  const { reloadClient, setReloadClient } = useMyContext();
  const { id } = useParams();
  const { toast } = useToast();
  const token = getToken();
  const router = useRouter();

  async function handleDeleteAddress(addressId: number) {
    const { ok, message } = await deleteAddress(token, Number(id), addressId);

    if (!ok) {
      return toast(message);
    }

    toast(message);
    setReloadClient(!reloadClient);
    return;
  }

  useEffect(() => {
    async function loadClient() {
      const { ok, message, data } = await showClient(token, Number(id));

      if (!ok) {
        return toast(message);
      }

      setClient(data);
      return toast(message);
    }

    loadClient();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reloadClient]);

  return (
    <>
      <section className="min-h-screen flex-col justify-center items-center gap-10 p-12">
        <BreadcrumbDemo url={`/client/${id}`} title={'Detalhar Cliente'} />
        {client && (
          <article className="flex flex-col justify-center items-center gap-8 mt-10 mb-10">
            <h1 className="text-xl font-semibold">Dados Pessoais</h1>
            <section className="flex flex-col gap-10 border-dashed border-2 rounded p-8">
              <div className="flex justify-between gap-10">
                <ClientInfo label="Nome" value={client.name} />
                <ClientInfo label="Sobrenome" value={client.surname} />
                <Button
                  variant="ghost"
                  onClick={() => router.push(`/client/edit/${client.id}`)}
                  className="text-yellow-500"
                >
                  <Image
                    src={EditIcon}
                    alt="Icone de um lápis representando edição do usuário"
                    width={24}
                    height={24}
                    className="cursor-pointer self-center mr-4"
                  />
                  Editar
                </Button>
              </div>
              <div className="flex justify-between  gap-10">
                <ClientInfo label="Email" value={client.email} />
                <ClientInfo label="Data de Nascimento" value={client.birth_date} />
                <ClientInfo label="Telefone" value={client.phone} />
              </div>
            </section>
            {client.address ? (
              <>
                <h1 className="text-left text-xl font-semibold">Endereço</h1>
                <section className="flex flex-col items-center gap-10 border-dashed border-2 rounded p-8">
                  <section className="w-full flex justify-between gap-10">
                    <ClientInfo label="CEP" value={client.address.zip_code} />
                    <ClientInfo label="Estado" value={client.address.state} />
                    <ClientInfo label="Cidade" value={client.address.city} />
                    <Button
                      variant="ghost"
                      className="text-red-600"
                      onClick={() => handleDeleteAddress(client.address.id)}
                    >
                      <Image
                        src={DeleteAddressIcon}
                        alt="Icone de exclusão do endereço"
                        width={24}
                        height={24}
                        className="cursor-pointer self-center mr-4"
                      />
                      Excluir
                    </Button>
                  </section>
                  <section className="flex justify-between gap-10">
                    <ClientInfo label="Bairro" value={client.address.neighborhood} />
                    <ClientInfo label="Rua" value={client.address.street} />
                    <ClientInfo
                      label="Complemento"
                      value={client.address.additional_information}
                    />
                  </section>
                </section>
              </>
            ) : (
              <Modal reloadClient={reloadClient} setReloadClient={setReloadClient} />
            )}
            <section className="flex flex-col gap-6">
              {client.cards && <DataTable data={client.cards} />}

              <PopoverCard
                reloadClient={reloadClient}
                setReloadClient={setReloadClient}
              />
            </section>
          </article>
        )}
      </section>
    </>
  );
}
