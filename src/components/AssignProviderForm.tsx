'use client';

import { useState, useTransition } from 'react';
import { toast } from 'sonner';
import { assignProviderAction } from '@/actions/chamadoActions';
import { Button } from '@/components/ui/button';

type ProviderOption = {
  id: string;
  nome: string;
  especialidade: string | null;
};

type AssignProviderFormProps = {
  chamadoId: string;
  providers: ProviderOption[];
};

export function AssignProviderForm({ chamadoId, providers }: AssignProviderFormProps) {
  const [providerId, setProviderId] = useState('');
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!providerId) {
      toast.error('Selecione um prestador.');
      return;
    }

    startTransition(async () => {
      const result = await assignProviderAction(chamadoId, providerId);

      if (result.error) {
        toast.error(result.error);
        return;
      }

      if (result.success) {
        toast.success(result.success);
        setProviderId('');
      }
    });
  }

  if (!providers.length) {
    return <span className="text-sm text-slate-500">Nenhum prestador ativo</span>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex min-w-56 gap-2" aria-busy={isPending}>
      <select
        value={providerId}
        onChange={(event) => setProviderId(event.target.value)}
        disabled={isPending}
        className="h-8 min-w-36 cursor-pointer rounded-md border border-slate-200 bg-white px-2 text-xs text-slate-700 shadow-sm outline-none transition-[border-color,box-shadow] hover:border-slate-300 focus:border-slate-500 focus:ring-2 focus:ring-slate-200 disabled:cursor-wait disabled:bg-slate-100 disabled:opacity-60"
        aria-label="Selecionar prestador"
      >
        <option value="">Selecionar</option>
        {providers.map((provider) => (
          <option key={provider.id} value={provider.id}>
            {provider.nome} {provider.especialidade ? `(${provider.especialidade})` : ''}
          </option>
        ))}
      </select>
      <Button type="submit" size="sm" disabled={isPending || !providerId} aria-busy={isPending}>
        {isPending ? 'Enviando...' : 'Notificar'}
      </Button>
    </form>
  );
}
