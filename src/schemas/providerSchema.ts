import { z } from 'zod';

export const providerSchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres."),
  specialty: z.enum(['hidraulica', 'eletrica', 'estrutural', 'eletrodomestico', 'outro']),
  whatsapp: z.string().min(10, "WhatsApp inválido."),
});

export type ProviderData = z.infer<typeof providerSchema>;