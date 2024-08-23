'use client';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { BreadcrumbDemo } from '@/components/Breadcrumb';
import { Modal } from '@/components/Modal';
import fetchData from '@/services/api';
import { ResponseError } from '@/interfaces/errorInterface';
import { Card, Client } from '@/interfaces/clientInterface';
import { clientObject } from '@/utils/clientObject';
import DeleteClientIcon from '@/assets/delete-client.png';

export default function ShowClient() {
  const [client, setClient] = useState<Client>(clientObject);
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();

  async function handleDeleteClient() {
    try {
      const res = await fetchData(`/clients/${params.id}`, 'DELETE');
      if (!res.ok) {
        toast({
          title: 'Error',
          description: 'Problema ao acessar a aplicação',
        });
      }

      toast({
        title: 'Success',
        description: 'Delete Client Successful.',
      });

      router.push('/home');
    } catch (err: unknown) {
      const error = err as ResponseError;
      toast({
        title: 'Error',
        description: error.message,
      });
    }
  }

  useEffect(() => {
    async function loadClient() {
      try {
        const res = await fetchData(`/clients/${params.id}`, 'GET');
        if (!res.ok) {
          toast({
            title: 'Error',
            description: 'Problema ao acessar a aplicação',
          });
        }

        const data = await res.json();

        setClient(data);

        toast({
          title: 'Success',
          description: 'Show Client Successful.',
        });
      } catch (err: unknown) {
        const error = err as ResponseError;
        toast({
          title: 'Error',
          description: error.message,
        });
      }
    }

    loadClient();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <section className="min-h-screen flex-col justify-center items-center gap-10 p-12">
        <BreadcrumbDemo url={`/client/${params.id}`} title={'Cliente'} />
        {client && (
          <article className="flex justify-center items-center gap-14 mt-14">
            <section className="flex flex-col gap-4">
              <div>
                <h1 className="text-xl font-semibold">Nome</h1>
                <span className="text-base text-muted-foreground">{client.name}</span>
              </div>
              <div>
                <h2 className="text-xl font-semibold">Sobrenome</h2>
                <span className="text-base text-muted-foreground">{client.surname}</span>
              </div>
              <div>
                <h2 className="text-xl font-semibold">Email</h2>
                <span className="text-base text-muted-foreground">{client.email}</span>
              </div>
              <div>
                <h2 className="text-xl font-semibold">Data de Nascimento</h2>
                <span className="text-base text-muted-foreground">
                  {client.birth_date}
                </span>
              </div>
              <div>
                <h2 className="text-xl font-semibold">Telefone</h2>
                <span className="text-base text-muted-foreground">{client.phone}</span>
              </div>
              <Image
                src={DeleteClientIcon}
                alt="Icone de um usuário que será deletado"
                width={40}
                height={40}
                className="cursor-pointer self-center"
                onClick={() => handleDeleteClient()}
              />
            </section>
            {client.address && (
              <section className="flex flex-col gap-4">
                <div>
                  <h1 className="text-xl font-semibold">CEP</h1>
                  <span className="text-base text-muted-foreground">
                    {client.address.zip_code}
                  </span>
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Estado</h2>
                  <span className="text-base text-muted-foreground">
                    {client.address.state}
                  </span>
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Cidade</h2>
                  <span className="text-base text-muted-foreground">
                    {client.address.city}
                  </span>
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Bairro</h2>
                  <span className="text-base text-muted-foreground">
                    {client.address.neighborhood}
                  </span>
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Rua</h2>
                  <span className="text-base text-muted-foreground">
                    {client.address.street}
                  </span>
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Complemento</h2>
                  <span className="text-base text-muted-foreground">
                    {client.address.additional_information}
                  </span>
                </div>
              </section>
            )}
            <section className="flex flex-col gap-4">
              {client.cards.map((card: Card) => (
                <section key={card.id}>
                  <div>
                    <h1 className="text-xl font-semibold">Número do Cartão</h1>
                    <span className="text-base text-muted-foreground">{card.number}</span>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">Data de expiração</h2>
                    <span className="text-base text-muted-foreground">
                      {card.expire_date}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">CVV</h2>
                    <span className="text-base text-muted-foreground">{card.CVV}</span>
                  </div>
                </section>
              ))}
              <Modal />
            </section>
          </article>
        )}
      </section>
    </>
  );
}
