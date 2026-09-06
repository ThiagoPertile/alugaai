'use server';

import { revalidatePath } from 'next/cache';
import { openTicket } from '@/services/maintenanceService';
import { maintenanceSchema } from '@/schemas/maintenanceSchema';
import { changeTicketStatus } from '@/services/maintenanceService';



export async function createTicketAction(formData: FormData) {
  const rawData = {
    contratoId: formData.get('contratoId'),
    category: formData.get('category'),
    description: formData.get('description'),
  };

  const validated = maintenanceSchema.safeParse(rawData);

  if (!validated.success) {
    console.error("Validação falhou:", validated.error.flatten().fieldErrors);
    return { error: "Dados inválidos." };
  }

  await openTicket(validated.data);
  revalidatePath('/portal'); // Recarrega a tela do inquilino
}


export async function updateStatusAction(formData: FormData) {
  const id = formData.get('id') as string;
  const status = formData.get('status') as string;
  
  if (id && status) {
    await changeTicketStatus(id, status);
    revalidatePath('/dashboard/maintenance');
  }
}