import { supabase } from '@/lib/supabase';

export async function fetchPublicProperties() {
  const { data, error } = await supabase
    .from('imoveis')
    .select('*')
    .eq('status', 'disponivel')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching public properties:', error);
    return [];
  }
  return data;
}