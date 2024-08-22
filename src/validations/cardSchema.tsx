import { z } from 'zod';

export const cardSchema = z.object({
  number: z.string().regex(/^\d{4} \d{4} \d{4} \d{4}$/, {
    message: 'Número do cartão deve estar no formato 1234 5678 9012 3456.',
  }),
  expire_date: z.string().regex(/^\d{2}\/\d{2}$/, {
    message: 'Data de expiração deve estar no formato MM/AA.',
  }),
  CVV: z.string().regex(/^\d{3}$/, { message: 'CVV deve ter exatamente 3 dígitos.' }),
});
