import { supabase } from '@/lib/supabase';

export async function insertMaintenanceTicket(data: any) {
  const { error } = await supabase.from('manutencoes').insert(data);
  if (error) throw new Error('Erro ao salvar o chamado de manutenção.');
}