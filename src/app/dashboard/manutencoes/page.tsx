import { ChamadoForm } from '@/components/ChamadoForm';
import { AssignProviderForm } from '@/components/AssignProviderForm';
import { ApproveQuoteForm } from '@/components/ApproveQuoteForm';
import { createClient } from '@/lib/supabaseServer';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default async function ManutencoesPage() {
  const supabase = await createClient();
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

  const [
    { data: properties, error: propertiesError },
    { data: chamados, error: chamadosError },
    { data: providers, error: providersError },
  ] =
    await Promise.all([
      supabase
        .from('imoveis')
        .select('id, titulo')
        .eq('status', 'disponivel')
        .order('titulo'),
      supabase
        .from('chamados')
        .select('id, titulo, descricao, status, created_at, imoveis(titulo), orcamentos(valor_total, taxa_plataforma, status)')
        .neq('status', 'concluido')
        .order('created_at', { ascending: false }),
      supabase
        .from('prestadores')
        .select('id, nome, especialidade')
        .eq('ativo', true)
        .order('nome'),
    ]);

  if (propertiesError) {
    console.error('Erro ao buscar imóveis disponíveis:', propertiesError.message);
  }

  if (chamadosError) {
    console.error('Erro ao buscar chamados:', chamadosError.message);
  }

  if (providersError) {
    console.error('Erro ao buscar prestadores ativos:', providersError.message);
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Chamados de manutenção</h1>
        <p className="mt-2 text-slate-500">
          Abra chamados e acompanhe os atendimentos da sua imobiliária.
        </p>
      </div>

      <section className="grid gap-8 lg:grid-cols-[minmax(0,360px)_1fr]">
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-xl font-semibold text-slate-800">Novo chamado</h2>
          <ChamadoForm properties={properties ?? []} />
          {properties?.length === 0 && (
            <p className="mt-4 text-sm text-amber-700">
              Cadastre um imóvel disponível antes de abrir um chamado.
            </p>
          )}
        </div>

        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-6 py-4">
            <h2 className="text-xl font-semibold text-slate-800">Chamados abertos</h2>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Imóvel</TableHead>
                <TableHead>Título</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {chamados?.map((chamado) => {
                const status = String(chamado.status).toLowerCase();
                const property = Array.isArray(chamado.imoveis)
                  ? chamado.imoveis[0]
                  : chamado.imoveis;
                const quote = Array.isArray(chamado.orcamentos)
                  ? chamado.orcamentos[0]
                  : chamado.orcamentos;

                return (
                  <TableRow key={chamado.id}>
                    <TableCell className="whitespace-nowrap">
                      {new Date(chamado.created_at).toLocaleDateString('pt-BR')}
                    </TableCell>
                    <TableCell>{property?.titulo ?? 'Imóvel não encontrado'}</TableCell>
                    <TableCell>
                      <p className="font-medium text-slate-800">{chamado.titulo}</p>
                      <p className="max-w-xs truncate text-sm text-slate-500">{chamado.descricao}</p>
                    </TableCell>
                    <TableCell>
                      <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-semibold uppercase text-amber-700">
                        {status.replaceAll('_', ' ')}
                      </span>
                    </TableCell>
                    <TableCell>
                      {status === 'pendente' ? (
                        <AssignProviderForm
                          chamadoId={chamado.id}
                          providers={providers ?? []}
                        />
                      ) : status === 'aguardando_orcamento' ? (
                        <span className="text-sm text-slate-500">Aguardando prestador...</span>
                      ) : status === 'aguardando_aprovacao' ? (
                        <div className="space-y-2">
                          {quote ? (
                            <p className="text-sm font-medium text-slate-700">
                              Valor: {formatCurrency(Number(quote.valor_total))}
                            </p>
                          ) : (
                            <p className="text-xs text-red-600">Valor indisponível</p>
                          )}
                          {quote && (
                            <p className="text-xs text-slate-500">
                              Taxa Retida: {formatCurrency(Number(quote.taxa_plataforma))}
                            </p>
                          )}
                          <ApproveQuoteForm chamadoId={chamado.id} />
                        </div>
                      ) : (
                        <span className="text-sm text-slate-500">Prestador acionado</span>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
              {!chamados?.length && (
                <TableRow>
                  <TableCell colSpan={5} className="py-8 text-center text-slate-500">
                    Nenhum chamado aberto.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </section>
    </div>
  );
}
