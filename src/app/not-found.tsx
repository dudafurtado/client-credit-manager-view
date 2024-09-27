import Image from 'next/image';
import Link from 'next/link';
import Icon404 from '@/assets/error-404.png';
import IconError from '@/assets/error-sing.png';

export default function NotFound() {
  return (
    <main className="grid h-screen place-items-center bg-background px-6 py-24 sm:py-32 lg:px-8">
      <section className="text-center">
        <div className="flex justify-center">
          <Image
            src={IconError}
            alt="Icone com a mensagem 'ERROR'"
            width={50}
            height={50}
          />
        </div>
        <section className="flex justify-center items-center gap-6 mt-4">
          <h1 className=" text-3xl font-bold tracking-tight text-gray-400 sm:text-5xl">
            Página não encontrada
          </h1>
          <Image src={Icon404} alt="Icone do erro de 404" width={50} height={50} />
        </section>
        <p className="mt-6 text-base leading-7 text-gray-400">
          Desculpa, não encontramos a página que você estava procurando.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/home"
            className="rounded-md bg-black px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Voltar para Página Principal
          </Link>
        </div>
      </section>
    </main>
  );
}
