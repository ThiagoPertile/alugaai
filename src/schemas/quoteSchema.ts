import { z } from 'zod';

export const quoteSchema = z.object({
  maintenanceId: z.string().uuid(),
  providerId: z.string().uuid(),
  totalValue: z.coerce.number().positive("O valor deve ser maior que zero."),
});

export type QuoteData = z.infer<typeof quoteSchema>;