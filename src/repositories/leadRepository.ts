import { supabase } from '@/lib/supabase';

// Função para buscar todos os leads no banco de dados Supabase, ordenados pela data de criação mais recente.
export async function getLeads() {
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw new Error('Erro ao buscar leads no banco de dados.');
  return data;
}

// Função para criar um novo lead no banco de dados Supabase. Recebe um objeto com os dados do lead e retorna o lead criado.
export async function createLead(dadosLead: { nome: string; whatsapp: string; etapa_funil: string; imobiliaria_id: string }) {
  const { data, error } = await supabase
    .from('leads')
    .insert(dadosLead)
    .select()
    .single();
  
  if (error) throw new Error('Erro ao salvar lead no banco.');
  return data;
}

// Função para atualizar o estágio do funil de um lead existente no banco de dados Supabase. Recebe o ID do lead e o novo estágio do funil.
export async function updateLeadStage(id: string, newStage: string) {
  const { error } = await supabase
    .from('leads')
    .update({ etapa_funil: newStage })
    .eq('id', id);
  
  if (error) throw new Error('Error updating lead stage.');
}