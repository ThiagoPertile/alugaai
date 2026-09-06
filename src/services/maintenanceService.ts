import { insertMaintenanceTicket } from '@/repositories/maintenanceRepository';
import { MaintenanceData } from '@/schemas/maintenanceSchema';
import { supabase } from '@/lib/supabase';

// Busca o contrato de teste que criamos no banco
export async function fetchMockContract() {
  const { data } = await supabase
    .from('contratos')
    .select('id, imoveis(titulo)')
    .limit(1)
    .single();
  return data;
}

export async function openTicket(data: MaintenanceData) {
  const { data: imob } = await supabase.from('imobiliarias').select('id').single();
  
  await insertMaintenanceTicket({
    imobiliaria_id: imob?.id,
    contrato_id: data.contratoId,
    categoria: data.category,
    descricao: data.description,
    status: 'aberto',
    prioridade: 'media',
  });
}

import { getMaintenanceTickets, updateTicketStatus } from '@/repositories/maintenanceRepository';

export async function fetchTickets() {
  try {
    const tickets = await getMaintenanceTickets();
    
    // Formata e blinda a UI contra dados nulos
    return tickets.map((t: any) => ({
      id: t.id,
      categoria: t.categoria,
      descricao: t.descricao,
      status: t.status,
      data: new Date(t.created_at).toLocaleDateString('pt-BR'),
      imovel: t.contratos?.imoveis?.titulo || 'Imóvel não encontrado',
      inquilino: t.contratos?.inquilinos?.nome || 'Inquilino não encontrado',
      whatsapp: t.contratos?.inquilinos?.whatsapp || '',
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function changeTicketStatus(id: string, status: string) {
  // Aqui poderia entrar uma validação Zod para garantir que o status é válido
  await updateTicketStatus(id, status);
}