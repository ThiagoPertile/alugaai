import { fetchMockContract } from '@/services/maintenanceService';
import { createTicketAction } from '@/actions/maintenanceActions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export default async function TenantPortal() {
  // Simulando que o inquilino fez login e pegamos o contrato dele
  const contract = await fetchMockContract();

  if (!contract) {
    return <div className="p-8 text-center text-slate-500">Nenhum contrato ativo encontrado.</div>;
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Portal do Inquilino</h1>
        <p className="text-slate-500 mb-8">Meu Imóvel: <span className="font-semibold text-slate-700">{contract.imoveis?.titulo}</span></p>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <h2 className="text-xl font-semibold mb-4 text-slate-800">Solicitar Manutenção</h2>
          
          <form action={createTicketAction} className="space-y-4">
            <input type="hidden" name="contratoId" value={contract.id} />
            
            <div className="space-y-2">
              <Label htmlFor="category">Categoria do Problema</Label>
              <select 
                name="category" 
                id="category"
                className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950"
              >
                <option value="hidraulica">Hidráulica (Vazamentos, torneiras)</option>
                <option value="eletrica">Elétrica (Fiação, tomadas, luzes)</option>
                <option value="estrutural">Estrutural (Paredes, telhado)</option>
                <option value="outro">Outro</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descreva o problema em detalhes</Label>
              <Textarea 
                name="description" 
                id="description" 
                required 
                placeholder="Ex: A torneira da pia da cozinha não para de pingar desde ontem..."
                className="h-32"
              />
            </div>

            <Button type="submit" className="w-full">Abrir Chamado</Button>
          </form>
        </div>
      </div>
    </div>
  );
}