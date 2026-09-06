import { fetchLeads } from '@/services/leadService';
import { createLeadAction } from '@/actions/leadActions';
import KanbanBoard from '@/components/KanbanBoard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default async function LeadsPage() {
  const leads = await fetchLeads();

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Pipeline de Locação</h1>
        
        <form action={createLeadAction} className="flex gap-3">
          <Input name="nome" placeholder="Client Name" required className="w-48 bg-white" />
          <Input name="whatsapp" placeholder="WhatsApp" required className="w-40 bg-white" />
          <Button type="submit">+ Add Lead</Button>
        </form>
      </div>

      {/* Render the interactive Client Component */}
      <KanbanBoard initialLeads={leads} />
    </div>
  );
}