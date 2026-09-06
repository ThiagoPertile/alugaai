import { createClient } from '@/lib/supabaseServer';

export async function fetchPublicProperties() {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  console.log('[Supabase] Usuário autenticado:', {
    id: user?.id ?? null,
    email: user?.email ?? null,
    erro: userError?.message ?? null,
  });

  const { data, error } = await supabase
    .from('imoveis')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw new Error('Erro ao buscar imóveis.');

  console.log('[Supabase] Imóveis retornados:', {
    quantidade: data?.length ?? 0,
    imobiliarias: data?.map((property) => property.imobiliaria_id) ?? [],
  });

  return data;
}

export const getProperties = fetchPublicProperties;