import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default async function ImoveisPage() {
  // Busca os imóveis no Supabase, ordenando pelos mais recentes
  const { data: imoveis, error } = await supabase
    .from('imoveis')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) console.error('Erro ao buscar imóveis:', error);

  // Função para formatar moeda
  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Imóveis</h1>
        <Link href="/dashboard/imoveis/new-property">
          <Button>+ Novo Imóvel</Button>
        </Link>
      </div>

      <div className="bg-white rounded-md border border-slate-200">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Aluguel</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {imoveis && imoveis.length > 0 ? (
              imoveis.map((imovel) => (
                <TableRow key={imovel.id}>
                  <TableCell className="font-medium">{imovel.titulo}</TableCell>
                  <TableCell className="capitalize">{imovel.tipo}</TableCell>
                  <TableCell>{formatarMoeda(imovel.preco_aluguel)}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium uppercase">
                      {imovel.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-slate-500 py-6">
                  Nenhum imóvel cadastrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}