import { supabase } from '@/lib/supabase';

export async function insertMaintenanceTicket(data: any) {
  const { error } = await supabase.from('manutencoes').insert(data);
  if (error) throw new Error('Erro ao salvar o chamado de manutenção.');
}

export async function getMaintenanceTickets() {
  const { data, error } = await supabase
    .from('manutencoes')
    .select(`
      id,
      categoria,
      descricao,
      status,
      created_at,
      contratos (
        imoveis ( titulo ),
        inquilinos ( nome, whatsapp )
      )
    `)
    .order('created_at', { ascending: false });

  if (error) throw new Error('Erro ao buscar chamados.');
  return data;
}

export async function updateTicketStatus(id: string, newStatus: string) {
  const { error } = await supabase
    .from('manutencoes')
    .update({ status: newStatus })
    .eq('id', id);

  if (error) throw new Error('Erro ao atualizar status.');
}