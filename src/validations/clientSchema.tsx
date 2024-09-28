'use client';

import { z } from 'zod';

export const createClientSchema = z.object({
  name: z.string().min(1, { message: 'Nome é obrigatório.' }),
  surname: z.string().min(1, { message: 'Sobrenome é obrigatório.' }),
  email: z.string().email({ message: 'E-mail inválido.' }),
  birth_date: z.string().refine(
    (val) => {
      return /^\d{4}-\d{2}-\d{2}$/.test(val) && !isNaN(new Date(val).getTime());
    },
    { message: 'Data de nascimento inválida. Deve estar no formato 2010-04-12.' }
  ),
  phone: z.string().regex(/^\(\d{2}\) \d{5}-\d{4}$/, {
    message: 'Telefone deve estar no formato (71) 99999-5498.',
  }),
});

export const editClientSchema = z.object({
  name: z.string().min(1, { message: 'Nome deve conter mais de 1 caracter.' }).optional(),
  surname: z
    .string()
    .min(1, { message: 'Sobrenome deve conter mais de 1 caracter.' })
    .optional(),
  email: z.string().email({ message: 'E-mail inválido.' }).optional(),
  birth_date: z
    .string()
    .refine(
      (val) => {
        return /^\d{4}-\d{2}-\d{2}$/.test(val) && !isNaN(new Date(val).getTime());
      },
      { message: 'Data de nascimento inválida. Deve estar no formato 2010-04-12.' }
    )
    .optional(),
  phone: z
    .string()
    .regex(/^\(\d{2}\) \d{5}-\d{4}$/, {
      message: 'Telefone deve estar no formato (71) 99999-5498.',
    })
    .optional(),
});

// YYYY-MM-DD
