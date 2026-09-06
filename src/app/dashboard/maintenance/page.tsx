import { fetchTickets } from '@/services/maintenanceService';
import { updateStatusAction } from '@/actions/maintenanceActions';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default async function MaintenancePage() {
  const tickets = await fetchTickets();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'aberto': return <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold uppercase">Aberto</span>;
      case 'em_andamento': return <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold uppercase">Em Andamento</span>;
      case 'concluido': return <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase">Concluído</span>;
      default: return null;
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-800 mb-8">Gestão de Manutenções</h1>
      
      <div className="bg-white rounded-md border border-slate-200">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead>Imóvel / Inquilino</TableHead>
              <TableHead>Problema</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets.length > 0 ? (
              tickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell className="whitespace-nowrap">{ticket.data}</TableCell>
                  <TableCell>
                    <p className="font-medium text-slate-800">{ticket.imovel}</p>
                    <p className="text-xs text-slate-500">{ticket.inquilino} ({ticket.whatsapp})</p>
                  </TableCell>
                  <TableCell>
                    <p className="font-medium text-slate-800 capitalize">{ticket.categoria}</p>
                    <p className="text-sm text-slate-500 truncate max-w-xs">{ticket.descricao}</p>
                  </TableCell>
                  <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                  <TableCell>
                    {/* Formulário invisível para acionar a Server Action via botões */}
                    <form action={updateStatusAction} className="flex gap-2">
                      <input type="hidden" name="id" value={ticket.id} />
                      {ticket.status === 'aberto' && (
                        <Button type="submit" name="status" value="em_andamento" size="sm" variant="outline">
                          Iniciar
                        </Button>
                      )}
                      {ticket.status === 'em_andamento' && (
                        <Button type="submit" name="status" value="concluido" size="sm" className="bg-green-600 hover:bg-green-700">
                          Concluir
                        </Button>
                      )}
                    </form>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-slate-500 py-6">
                  Nenhum chamado de manutenção aberto.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}