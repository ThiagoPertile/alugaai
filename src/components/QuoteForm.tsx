'use client';

import { useState, useTransition } from 'react';
import { toast } from 'sonner';
import { submitQuoteAction } from '@/actions/quoteActions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

type QuoteFormProps = {
  chamadoId: string;
};

export function QuoteForm({ chamadoId }: QuoteFormProps) {
  const [valorTotal, setValorTotal] = useState('');
  const [descricao, setDescricao] = useState('');
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const parsedValue = Number(valorTotal.replace(',', '.'));
    if (!Number.isFinite(parsedValue) || parsedValue <= 0 || descricao.trim().length === 0) {
      toast.error('Informe um valor válido e a descrição do orçamento.');
      return;
    }

    startTransition(async () => {
      const result = await submitQuoteAction(chamadoId, parsedValue, descricao);

      if (result.error) {
        toast.error(result.error);
        return;
      }

      if (result.success) {
        toast.success(result.success);
        setValorTotal('');
        setDescricao('');
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="min-w-64 space-y-2" aria-busy={isPending}>
      <Input
        type="number"
        min="0.01"
        step="0.01"
        value={valorTotal}
        onChange={(event) => setValorTotal(event.target.value)}
        placeholder="Valor total"
        aria-label="Valor total do orçamento"
        disabled={isPending}
        className="transition-[border-color,box-shadow] hover:border-slate-300 focus-visible:border-slate-500 focus-visible:ring-slate-200 disabled:cursor-wait disabled:bg-slate-100"
        required
      />
      <Textarea
        value={descricao}
        onChange={(event) => setDescricao(event.target.value)}
        placeholder="Descrição do serviço"
        aria-label="Descrição do orçamento"
        disabled={isPending}
        required
        minLength={3}
        className="min-h-20 transition-[border-color,box-shadow] hover:border-slate-300 focus-visible:border-slate-500 focus-visible:ring-slate-200 disabled:cursor-wait disabled:bg-slate-100"
      />
      <Button type="submit" size="sm" disabled={isPending} aria-busy={isPending}>
        {isPending ? 'Enviando...' : 'Enviar orçamento'}
      </Button>
    </form>
  );
}
