import { getProviders, insertProvider, insertQuote } from '@/repositories/marketplaceRepository';
import { QuoteData } from '@/schemas/quoteSchema';

// Definimos a taxa da plataforma em 10%
const PLATFORM_FEE_PERCENTAGE = 0.10;

export async function fetchProviders() {
  try {
    const providers = await getProviders();
    return providers || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function submitQuote(data: QuoteData) {
  // O backend é a única fonte da verdade para o cálculo financeiro
  const taxaPlataforma = data.totalValue * PLATFORM_FEE_PERCENTAGE;
  const valorLiquido = data.totalValue - taxaPlataforma;

  await insertQuote({
    manutencao_id: data.maintenanceId,
    prestador_id: data.providerId,
    valor_total: data.totalValue,
    taxa_plataforma: taxaPlataforma,
    valor_liquido: valorLiquido,
  });
}

import { ProviderData } from '@/schemas/providerSchema';
import { supabase } from '@/lib/supabase'; // Para buscar a imobiliária de teste

export async function addProvider(data: ProviderData) {
  const { data: imob } = await supabase.from('imobiliarias').select('id').single();
  
  await insertProvider({
    imobiliaria_id: imob?.id,
    nome: data.name.trim(),
    especialidade: data.specialty,
    whatsapp: data.whatsapp.replace(/\D/g, ''),
    saldo_creditos: 0.00, // Todo prestador novo começa zerado
    ativo: true
  });
}