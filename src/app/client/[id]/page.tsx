'use client';
import { BreadcrumbDemo } from '@/components/Breadcrumb';
import { Modal } from '@/components/Modal';
import { useParams, useRouter } from 'next/navigation';

export default function ShowClient() {
  const params = useParams();
  const router = useRouter();

  console.log(params.id);

  const client = {
    id: 1,
    name: 'Maria Eduarda',
    surname: 'Cerqueira Furtado Melo',
    email: 'mariaeduarda@email.com',
    birth_date: '20/05/2003',
    phone: '(71) 999516225',
    address: {
      zip_code: '40080-003',
      street: 'Avenida Sete de Setembro',
      additional_information: 'de 2377 a 2631 - lado ímpar',
      neighborhood: 'Vitória',
      city: 'Salvador',
      state: 'BA',
      client_id: 2,
    },
    cards: [
      {
        id: 1,
        number: '5573 2662 2502 9811',
        expire_date: '12/25',
        CVV: '123',
        client_id: 2,
      },
    ],
  };

  return (
    <>
      <section className="min-h-screen flex-col justify-center items-center gap-10 p-12">
        <BreadcrumbDemo url={`/client/${params.id}`} title={'Cliente'} />
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
              <span className="text-base text-muted-foreground">{client.birth_date}</span>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Telefone</h2>
              <span className="text-base text-muted-foreground">{client.phone}</span>
            </div>
          </section>
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
          <section className="flex flex-col gap-4">
            {client.cards.map((card) => (
              <>
                <div key={card.id}>
                  <h1 className="text-xl font-semibold">Número do Cartão</h1>
                  <span className="text-base text-muted-foreground">{card.number}</span>
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Data de expiração</h2>
                  <span className="text-base text-muted-foreground">
                    {client.cards[0].expire_date}
                  </span>
                </div>
                <div>
                  <h2 className="text-xl font-semibold">CVV</h2>
                  <span className="text-base text-muted-foreground">
                    {client.cards[0].CVV}
                  </span>
                </div>
              </>
            ))}
            <Modal />
          </section>
        </article>
      </section>
    </>
  );
}
