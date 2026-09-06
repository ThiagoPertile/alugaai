import { supabase } from '@/lib/supabase';

export async function getProviders() {
  const { data, error } = await supabase
    .from('prestadores')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw new Error('Erro ao buscar prestadores.');
  return data;
}

export async function insertQuote(quoteData: { 
  manutencao_id: string; 
  prestador_id: string; 
  valor_total: number; 
  taxa_plataforma: number; 
  valor_liquido: number; 
}) {
  const { error } = await supabase.from('orcamentos').insert(quoteData);
  if (error) throw new Error('Erro ao salvar orçamento.');
}

export async function insertProvider(providerData: any) {
  const { error } = await supabase.from('prestadores').insert(providerData);
  if (error) throw new Error('Erro ao salvar prestador no banco.');
}