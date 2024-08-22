import { z } from 'zod';

export const addressSchema = z.object({
  zip_code: z
    .string()
    .min(8, 'O CEP deve ter no mínimo 8 caracteres.')
    .max(9, 'O CEP deve ter no máximo 9 caracteres.')
    .regex(
      /^\d{5}-?\d{3}$/,
      'CEP inválido. Deve seguir o formato 12345-678 ou 12345678.'
    ),
  state: z
    .string()
    .min(2, 'O estado deve ter no mínimo 2 caracteres.')
    .max(2, 'O estado deve ter no máximo 2 caracteres.')
    .regex(/^[A-Z]{2}$/, 'O estado deve conter apenas letras maiúsculas.'),
  city: z
    .string()
    .min(2, 'A cidade deve ter no mínimo 2 caracteres.')
    .max(50, 'A cidade deve ter no máximo 50 caracteres.'),
  neighborhood: z
    .string()
    .min(2, 'O bairro deve ter no mínimo 2 caracteres.')
    .max(50, 'O bairro deve ter no máximo 50 caracteres.'),
  street: z
    .string()
    .min(2, 'A rua deve ter no mínimo 2 caracteres.')
    .max(100, 'A rua deve ter no máximo 100 caracteres.'),
  additional_information: z
    .string()
    .max(100, 'O complemento deve ter no máximo 100 caracteres.')
    .optional(),
});
