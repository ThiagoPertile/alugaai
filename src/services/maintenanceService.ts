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