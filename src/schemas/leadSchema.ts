import { z } from 'zod';

export const leadSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long."),
  whatsapp: z.string().min(10, "Invalid WhatsApp number."),
  funnelStage: z.enum(['novo', 'visita_agendada', 'proposta', 'contrato', 'alugado']).default('novo'),
  propertyId: z.string().uuid().optional(),
});

// Extrai a tipagem TypeScript automaticamente
export type LeadData = z.infer<typeof leadSchema>;