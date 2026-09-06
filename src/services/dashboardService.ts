import { createClient } from '@/lib/supabaseServer';

export async function fetchDashboardMetrics() {
  const supabase = await createClient();

  const [propertiesResult, providersResult, quotesResult] = await Promise.all([
    supabase.from('imoveis').select('*', { count: 'exact', head: true }),
    supabase.from('prestadores').select('*', { count: 'exact', head: true }),
    supabase.from('orcamentos').select('*', { count: 'exact', head: true }),
  ]);

  const queryError =
    propertiesResult.error ?? providersResult.error ?? quotesResult.error;

  if (queryError) {
    throw new Error(`Erro ao buscar métricas do dashboard: ${queryError.message}`);
  }

  return {
    totalImoveis: propertiesResult.count ?? 0,
    totalPrestadores: providersResult.count ?? 0,
    totalOrcamentos: quotesResult.count ?? 0,
  };
}