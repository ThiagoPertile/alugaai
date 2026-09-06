'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabaseServer';

export type ChamadoActionState = {
  error?: string;
  success?: string;
};

export async function createChamadoAction(
  _previousState: ChamadoActionState,
  formData: FormData
): Promise<ChamadoActionState> {
  const imovelId = formData.get('imovel_id');
  const titulo = formData.get('titulo');
  const descricao = formData.get('descricao');

  if (
    typeof imovelId !== 'string' ||
    typeof titulo !== 'string' ||
    typeof descricao !== 'string' ||
    !imovelId ||
    !titulo.trim() ||
    !descricao.trim()
  ) {
    return { error: 'Preencha o imóvel, o título e a descrição.' };
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

  if (perfilError || !perfil) {
    return { error: 'Não foi possível identificar sua imobiliária.' };
  }

  const { data: property, error: propertyError } = await supabase
    .from('imoveis')
    .select('id')
    .eq('id', imovelId)
    .eq('imobiliaria_id', perfil.imobiliaria_id)
    .single();

  if (propertyError || !property) {
    return { error: 'O imóvel selecionado não pertence à sua imobiliária.' };
  }

  const { error } = await supabase.from('chamados').insert({
    imobiliaria_id: perfil.imobiliaria_id,
    imovel_id: property.id,
    titulo: titulo.trim(),
    descricao: descricao.trim(),
    status: 'pendente',
  });

  if (error) {
    console.error('Erro ao criar chamado:', error.message);
    return { error: 'Não foi possível abrir o chamado.' };
  }

  revalidatePath('/dashboard/manutencoes');
  return { success: 'Chamado aberto com sucesso.' };
}

export async function assignProviderAction(
  chamadoId: string,
  prestadorId: string
): Promise<ChamadoActionState> {
  if (!chamadoId || !prestadorId) {
    return { error: 'Selecione um chamado e um prestador.' };
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

  if (perfilError || !perfil) {
    return { error: 'Não foi possível identificar sua imobiliária.' };
  }

  const [{ data: chamado, error: chamadoError }, { data: prestador, error: prestadorError }] =
    await Promise.all([
      supabase
        .from('chamados')
        .select('id, status')
        .eq('id', chamadoId)
        .eq('imobiliaria_id', perfil.imobiliaria_id)
        .single(),
      supabase
        .from('prestadores')
        .select('id')
        .eq('id', prestadorId)
        .eq('ativo', true)
        .single(),
    ]);

  if (chamadoError || !chamado) {
    return { error: 'Chamado não encontrado ou sem acesso.' };
  }

  if (chamado.status !== 'pendente') {
    return { error: 'Este chamado já foi encaminhado.' };
  }

  if (prestadorError || !prestador) {
    return { error: 'O prestador selecionado não está ativo.' };
  }

  const { error } = await supabase
    .from('chamados')
    .update({
      prestador_id: prestador.id,
      status: 'aguardando_orcamento',
    })
    .eq('id', chamado.id)
    .eq('imobiliaria_id', perfil.imobiliaria_id)
    .eq('status', 'pendente');

  if (error) {
    console.error('Erro ao atribuir prestador:', error.message);
    return { error: 'Não foi possível notificar o prestador.' };
  }

  revalidatePath('/dashboard/manutencoes');
  return { success: 'Prestador notificado com sucesso.' };
}
