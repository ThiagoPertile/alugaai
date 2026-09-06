import { getLeads, createLead } from '@/repositories/leadRepository';
import { supabase } from '@/lib/supabase';
import { LeadData } from '@/schemas/leadSchema';

export async function fetchLeads() {
  try {
    return await getLeads() || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Função para adicionar um novo lead ao banco de dados, associando-o à imobiliária existente. Recebe os dados do lead validados pelo Zod.
export async function addLead(data: LeadData) {
  const { data: imob } = await supabase.from('imobiliarias').select('id').single();
  if (!imob) throw new Error('Real estate agency not found.');

  return await createLead({
    nome: data.name.trim(),
    whatsapp: data.whatsapp.replace(/\D/g, ''),
    etapa_funil: data.funnelStage,
    imobiliaria_id: imob.id,
  });
}

// Função para alterar o estágio do funil de um lead existente no banco de dados, recebendo o ID do lead e o novo estágio do funil.
import { updateLeadStage } from '@/repositories/leadRepository';

export async function changeLeadStage(id: string, newStage: string) {
  // Here you could add validation, e.g., checking if the stage is valid via Zod
  await updateLeadStage(id, newStage);
}