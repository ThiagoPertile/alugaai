'use client';

import { useActionState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { createChamadoAction, type ChamadoActionState } from '@/actions/chamadoActions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type PropertyOption = {
  id: string;
  titulo: string;
};

export function ChamadoForm({ properties }: { properties: PropertyOption[] }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState<ChamadoActionState, FormData>(
    createChamadoAction,
    {}
  );

  useEffect(() => {
    if (state.error) {
      toast.error(state.error);
      return;
    }

    if (state.success) {
      toast.success(state.success);
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="imovel_id">Imóvel</Label>
        <select
          id="imovel_id"
          name="imovel_id"
          required
          defaultValue=""
          className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-400"
        >
          <option value="" disabled>Selecione um imóvel</option>
          {properties.map((property) => (
            <option key={property.id} value={property.id}>
              {property.titulo}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="titulo">Título</Label>
        <Input id="titulo" name="titulo" required placeholder="Ex.: Vazamento no banheiro" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="descricao">Descrição</Label>
        <Textarea
          id="descricao"
          name="descricao"
          required
          minLength={10}
          placeholder="Descreva o problema e onde ele acontece."
        />
      </div>

      <Button type="submit" disabled={isPending || properties.length === 0}>
        {isPending ? 'Abrindo chamado...' : 'Abrir chamado'}
      </Button>
    </form>
  );
}
