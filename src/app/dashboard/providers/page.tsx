import { fetchProviders } from '@/services/marketplaceService';
import { createProviderAction } from '@/actions/providerActions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default async function ProvidersPage() {
  const providers = await fetchProviders();

  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Rede de Parceiros</h1>
        
        {/* Formulário protegido por Server Action e Zod */}
        <form action={createProviderAction} className="flex gap-3 bg-white p-2 rounded-lg border border-slate-200 shadow-sm">
          <Input name="name" placeholder="Nome do Profissional" required className="w-48" />
          <select name="specialty" className="w-36 rounded-md border border-slate-200 px-3 text-sm">
            <option value="hidraulica">Hidráulica</option>
            <option value="eletrica">Elétrica</option>
            <option value="estrutural">Estrutural</option>
            <option value="eletrodomestico">Eletros</option>
            <option value="outro">Outros</option>
          </select>
          <Input name="whatsapp" placeholder="WhatsApp" required className="w-36" />
          <Button type="submit">Adicionar</Button>
        </form>
      </div>

      <div className="bg-white rounded-md border border-slate-200">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Profissional</TableHead>
              <TableHead>Especialidade</TableHead>
              <TableHead>Avaliação</TableHead>
              <TableHead>Saldo (Créditos)</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {providers.length > 0 ? (
              providers.map((provider) => (
                <TableRow key={provider.id}>
                  <TableCell>
                    <p className="font-medium text-slate-800">{provider.nome}</p>
                    <p className="text-xs text-slate-500">{provider.whatsapp}</p>
                  </TableCell>
                  <TableCell className="capitalize">{provider.especialidade}</TableCell>
                  <TableCell>⭐ {provider.nota}</TableCell>
                  <TableCell className="font-semibold text-green-600">
                    {formatCurrency(provider.saldo_creditos)}
                  </TableCell>
                  <TableCell>
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase">
                      {provider.ativo ? 'Ativo' : 'Inativo'}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-slate-500 py-6">
                  Nenhum parceiro cadastrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}