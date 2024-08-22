import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import MyProvider from '@/context/MyProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Client Credit Manager',
  description:
    'Project created by Maria Eduarda Furtado. The idea of the project was projected by the company called Fortes Tecnologia with the goal to challenge me to a position.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/credit-card.png" />
      </head>
      <MyProvider>
        <body className={inter.className}>
          <main>{children}</main>
          <Toaster />
        </body>
      </MyProvider>
    </html>
  );
}
