import { z } from 'zod';

export const maintenanceSchema = z.object({
  contratoId: z.string().uuid(),
  category: z.enum(['hidraulica', 'eletrica', 'estrutural', 'eletrodomestico', 'outro']),
  description: z.string().min(10, "A descrição deve ter pelo menos 10 caracteres."),
});

export type MaintenanceData = z.infer<typeof maintenanceSchema>;