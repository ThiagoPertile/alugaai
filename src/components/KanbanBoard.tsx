'use client';

import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { updateLeadStageAction } from '@/actions/leadActions';

const COLUMNS = [
  { id: 'novo', title: 'Novo Lead' },
  { id: 'visita_agendada', title: 'Visita Agendada' },
  { id: 'proposta', title: 'Proposta' },
  { id: 'contrato', title: 'Contrato' },
  { id: 'alugado', title: 'Alugado' },
];

export default function KanbanBoard({ initialLeads }: { initialLeads: any[] }) {
  const [leads, setLeads] = useState(initialLeads);

  // Sync state if initialLeads change from server
  useEffect(() => { setLeads(initialLeads); }, [initialLeads]);

  const onDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId) return;

    // Optimistic UI update: change state immediately
    const updatedLeads = leads.map((lead) =>
      lead.id === draggableId ? { ...lead, etapa_funil: destination.droppableId } : lead
    );
    setLeads(updatedLeads);

    // Call Server Action to persist in Supabase
    await updateLeadStageAction(draggableId, destination.droppableId);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-4 overflow-x-auto pb-4 flex-1 h-full items-start">
        {COLUMNS.map((col) => {
          const columnLeads = leads.filter((l) => l.etapa_funil === col.id);

          return (
            <Droppable key={col.id} droppableId={col.id}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-slate-200/50 rounded-lg p-4 w-72 flex-shrink-0 min-h-[300px]"
                >
                  <h3 className="font-semibold text-slate-700 mb-4">{col.title} ({columnLeads.length})</h3>
                  
                  <div className="flex flex-col gap-3">
                    {columnLeads.map((lead, index) => (
                      <Draggable key={lead.id} draggableId={lead.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-white p-3 rounded-md shadow-sm border border-slate-200 cursor-grab active:cursor-grabbing"
                          >
                            <p className="font-medium text-slate-800">{lead.nome}</p>
                            <p className="text-xs text-slate-500">{lead.whatsapp}</p>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          );
        })}
      </div>
    </DragDropContext>
  );
}