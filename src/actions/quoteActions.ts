'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabaseServer';

export type QuoteActionState = {
  error?: string;
  success?: string;
};

export async function submitQuoteAction(
  chamadoId: string,
  valorTotal: number,
  descricao: string
): Promise<QuoteActionState> {
  if (!chamadoId || !Number.isFinite(valorTotal) || valorTotal <= 0 || !descricao.trim()) {
    return { error: 'Informe um valor válido e a descrição do orçamento.' };
  }

  const supabase = await createClient();
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: 'Sua sessão expirou. Faça login novamente.' };
  }

  const { data: perfil, error: perfilError } = await supabase
    .from('perfis')
    .select('prestador_id')
    .eq('id', user.id)
    .single();

  if (perfilError || !perfil?.prestador_id) {
    return { error: 'Seu usuário não está vinculado a um prestador.' };
  }

  const { data: chamado, error: chamadoError } = await supabase
    .from('chamados')
    .select('id, prestador_id, status')
    .eq('id', chamadoId)
    .eq('prestador_id', perfil.prestador_id)
    .eq('status', 'aguardando_orcamento')
    .single();

  if (chamadoError || !chamado) {
    return { error: 'Chamado não encontrado ou não está atribuído a você.' };
  }

  const taxaPlataforma = Number((valorTotal * 0.1).toFixed(2));
  const valorLiquidoPrestador = Number((valorTotal - taxaPlataforma).toFixed(2));

  const { error: quoteError } = await supabase.from('orcamentos').insert({
    chamado_id: chamado.id,
    prestador_id: perfil.prestador_id,
    descricao: descricao.trim(),
    valor_total: valorTotal,
    taxa_plataforma: taxaPlataforma,
    valor_liquido_prestador: valorLiquidoPrestador,
    status: 'pendente',
  });

  if (quoteError) {
    console.error('Erro ao inserir orçamento:', quoteError.message);
    return { error: 'Não foi possível enviar o orçamento.' };
  }

  const { error: updateError } = await supabase
    .from('chamados')
    .update({ status: 'aguardando_aprovacao' })
    .eq('id', chamado.id)
    .eq('prestador_id', perfil.prestador_id)
    .eq('status', 'aguardando_orcamento');

  if (updateError) {
    console.error('Erro ao atualizar chamado:', updateError.message);
    return { error: 'Orçamento salvo, mas não foi possível atualizar o chamado.' };
  }

  revalidatePath('/dashboard/prestador/chamados');
  revalidatePath('/dashboard/manutencoes');
  return { success: 'Orçamento enviado com sucesso.' };
}

export async function approveQuoteAction(chamadoId: string): Promise<QuoteActionState> {
  if (!chamadoId) {
    return { error: 'Chamado inválido.' };
  }

  const supabase = await createClient();
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: 'Sua sessão expirou. Faça login novamente.' };
  }

  const { data: perfil, error: perfilError } = await supabase
    .from('perfis')
    .select('imobiliaria_id')
    .eq('id', user.id)
    .single();

  if (perfilError || !perfil?.imobiliaria_id) {
    return { error: 'Não foi possível identificar sua imobiliária.' };
  }

  const { data: chamado, error: chamadoError } = await supabase
    .from('chamados')
    .select('id, status')
    .eq('id', chamadoId)
    .eq('imobiliaria_id', perfil.imobiliaria_id)
    .eq('status', 'aguardando_aprovacao')
    .single();

  if (chamadoError || !chamado) {
    return { error: 'Chamado não encontrado ou sem orçamento para aprovação.' };
  }

  const { data: quote, error: quoteLookupError } = await supabase
    .from('orcamentos')
    .select('id')
    .eq('chamado_id', chamado.id)
    .eq('status', 'pendente')
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (quoteLookupError || !quote) {
    return { error: 'Orçamento pendente não encontrado.' };
  }

  const { error: quoteUpdateError } = await supabase
    .from('orcamentos')
    .update({ status: 'aprovado' })
    .eq('id', quote.id)
    .eq('status', 'pendente');

  if (quoteUpdateError) {
    console.error('Erro ao aprovar orçamento:', quoteUpdateError.message);
    return { error: 'Não foi possível aprovar o orçamento.' };
  }

  const { error: ticketUpdateError } = await supabase
    .from('chamados')
    .update({ status: 'em_andamento' })
    .eq('id', chamado.id)
    .eq('imobiliaria_id', perfil.imobiliaria_id)
    .eq('status', 'aguardando_aprovacao');

  if (ticketUpdateError) {
    console.error('Erro ao atualizar chamado após aprovação:', ticketUpdateError.message);
    return { error: 'Orçamento aprovado, mas não foi possível atualizar o chamado.' };
  }

  revalidatePath('/dashboard/manutencoes');
  revalidatePath('/dashboard/prestador/chamados');
  return { success: 'Orçamento aprovado com sucesso.' };
}
