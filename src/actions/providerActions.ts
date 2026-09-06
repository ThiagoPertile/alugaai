'use server';

import { revalidatePath } from 'next/cache';
import { addProvider } from '@/services/marketplaceService';
import { providerSchema } from '@/schemas/providerSchema';

export async function createProviderAction(formData: FormData) {
  const rawData = {
    name: formData.get('name'),
    specialty: formData.get('specialty'),
    whatsapp: formData.get('whatsapp'),
  };

  const validated = providerSchema.safeParse(rawData);

  if (!validated.success) {
    console.error("Validação falhou:", validated.error.flatten().fieldErrors);
    return { error: "Dados inválidos." };
  }

  await addProvider(validated.data);
  revalidatePath('/dashboard/providers');
}