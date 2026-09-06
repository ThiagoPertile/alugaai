import { QuoteForm } from '@/components/QuoteForm';
import { createClient } from '@/lib/supabaseServer';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default async function ProviderTicketsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return <p className="text-slate-600">Faça login para acessar seus chamados.</p>;
  }

  const { data: profile, error: profileError } = await supabase
    .from('perfis')
    .select('prestador_id')
    .eq('id', user.id)
    .single();

  if (profileError || !profile?.prestador_id) {
    return <p className="text-slate-600">Seu usuário não está vinculado a um prestador.</p>;
  }

  const { data: chamados, error } = await supabase
    .from('chamados')
    .select('id, titulo, descricao, status, created_at, imoveis(titulo)')
    .eq('prestador_id', profile.prestador_id)
    .eq('status', 'aguardando_orcamento')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Erro ao buscar chamados do prestador:', error.message);
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Chamados atribuídos</h1>
        <p className="mt-2 text-slate-500">Envie seus orçamentos para os serviços disponíveis.</p>
      </div>

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead>Imóvel</TableHead>
              <TableHead>Chamado</TableHead>
              <TableHead>Orçamento</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {chamados?.map((chamado) => {
              const property = Array.isArray(chamado.imoveis)
                ? chamado.imoveis[0]
                : chamado.imoveis;

              return (
                <TableRow key={chamado.id}>
                  <TableCell className="whitespace-nowrap">
                    {new Date(chamado.created_at).toLocaleDateString('pt-BR')}
                  </TableCell>
                  <TableCell>{property?.titulo ?? 'Imóvel não encontrado'}</TableCell>
                  <TableCell>
                    <p className="font-medium text-slate-800">{chamado.titulo}</p>
                    <p className="max-w-xs text-sm text-slate-500">{chamado.descricao}</p>
                  </TableCell>
                  <TableCell>
                    <QuoteForm chamadoId={chamado.id} />
                  </TableCell>
                </TableRow>
              );
            })}
            {!chamados?.length && (
              <TableRow>
                <TableCell colSpan={4} className="py-8 text-center text-slate-500">
                  Nenhum chamado aguardando orçamento.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
