'use server';

import { revalidatePath } from 'next/cache';
import { addLead, changeLeadStage } from '@/services/leadService';
import { leadSchema } from '@/schemas/leadSchema';

export async function createLeadAction(formData: FormData) {
  // 1. Extrai e converte os dados do formulário
  const rawData = {
    name: formData.get('nome'),
    whatsapp: formData.get('whatsapp'),
  };

  // 2. O Zod valida os dados com base nas regras (safeParse não quebra o sistema se der erro)
  const validatedFields = leadSchema.safeParse(rawData);

  // 3. Se falhar na validação, bloqueia a execução
  if (!validatedFields.success) {
    console.error("Validation failed:", validatedFields.error.flatten().fieldErrors);
    return { error: "Invalid data." };
  }

  // 4. Repassa os dados limpos e tipados para o serviço
  await addLead(validatedFields.data);
  
  revalidatePath('/dashboard/leads');
  
}

export async function updateLeadStageAction(id: string, newStage: string) {
  await changeLeadStage(id, newStage);
  revalidatePath('/dashboard/leads');
}