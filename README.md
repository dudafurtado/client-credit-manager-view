# Sistema de Gerenciamento de Clientes com Cartões de Crédito

## Descrição

O "Sistema de Gerenciamento de Clientes com Cartões de Crédito" é uma aplicação desenvolvida com Laravel para gerenciar clientes e seus cartões de crédito. A aplicação permite a administração de usuários e clientes, além de fornecer funcionalidades para gerenciamento de cartões de crédito e endereços.

## Finalidade do Projeto

Este [desafio](./Desafio_Tecnico_Doc.pdf) é projetado para avaliar minhas habilidades em desenvolvimento full stack, especialmente no uso de Laravel e Next.js com TypeScript e Tailwind CSS. Espera-se um código bem organizado, com práticas de desenvolvimento limpo e documentação adequada.

## Tecnologias Utilizadas

- **Frontend:** Next.js com TypeScript e Tailwind CSS
- **React Query** para gerenciamento de estado e requisições
- **React Hook Form** para gerenciamento de formulários
- **Zod** para validação de dados
- **Componentes de UI do ShadCN**
- **Autenticação com Cookies** Biblioteca nookies

## Passo a Passo da Instalação

1. **Crie o projeto Next.js com TypeScript:**

   `npx create-next-app@latest project-view --typescript`

2. **Instale o Tailwind CSS:**

   `npm install -D tailwindcss postcss autoprefixer`

   `npx tailwindcss init -p`

3. **Configure o ShadCN UI:**

   `npx shadcn-ui@latest init`

4. **Instale React Hook Form e Zod:**

   `npm install react-hook-form zod @hookform/resolvers`

## Funcionalidades

1. **CRUD de Clientes:**

   - Criar, visualizar, atualizar e excluir clientes.
   - Associar múltiplos cartões de crédito a cada cliente.

2. **Serviço de Consulta de Endereço:**

   - Implementação de um serviço para consulta de endereço via CEP usando uma API externa, como ViaCEP.

3. **Listagem de Clientes:**

   - Campo de busca para filtrar clientes pelo nome.
   - Tabela paginada com clientes.

4. **Responsividade:**
   - O sistema deve ser adaptável para telas de pelo menos 375px de largura.

## Rotas

- **Página de Nova Conta:** `/new-account`
- **Página de Login:** `/login`
- **Página Inicial:** `/home` (listagem dos clientes, paginação e pesquisa)
- **Página para Criar Novo Cliente:** Permite criar um novo cliente e associar a ele cartões e um endereço.

## Componentes do ShadCN Utilizados

(Insira a lista de todos os componentes ShadCN usados baseada na imagem que você está enviando.)

## Getting Started

Para iniciar o projeto, execute o servidor de desenvolvimento:

`npm run dev`

ou

`yarn dev`

ou

`pnpm dev`

ou

`bun dev`

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

## Deploy on Vercel

A maneira mais fácil de fazer o deploy do seu aplicativo Next.js é usar a [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) dos criadores do Next.js.

Confira nossa [documentação de deploy do Next.js](https://nextjs.org/docs/deployment) para mais detalhes.

### Referências

<https://tanstack.com/query/latest/docs/framework/react/quick-start>
<https://community.revelo.com.br/react-query-um-guia-pratico/>
<https://medium.com/@amandaduuaarte/explorando-o-react-query-simplificando-requisi%C3%A7%C3%B5es-ass%C3%ADncronas-no-react-f75637c290e2>
<https://www.youtube.com/watch?v=M_-XsI0jRAs>

<https://www.4devs.com.br/gerador_de_cep>
<https://www.4devs.com.br/gerador_de_numero_cartao_credito>

<https://www.flaticon.com/br/>
