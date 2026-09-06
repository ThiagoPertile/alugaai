'use client';

import { useTransition } from 'react';
import { toast } from 'sonner';
import { approveQuoteAction } from '@/actions/quoteActions';
import { Button } from '@/components/ui/button';

type ApproveQuoteFormProps = {
  chamadoId: string;
};

export function ApproveQuoteForm({ chamadoId }: ApproveQuoteFormProps) {
  const [isPending, startTransition] = useTransition();

  function handleApprove() {
    startTransition(async () => {
      const result = await approveQuoteAction(chamadoId);

      if (result.error) {
        toast.error(result.error);
        return;
      }

      if (result.success) {
        toast.success(result.success);
      }
    });
  }

  return (
    <Button
      type="button"
      size="sm"
      onClick={handleApprove}
      disabled={isPending}
      aria-busy={isPending}
      className="bg-emerald-600 text-white hover:bg-emerald-700"
    >
      {isPending ? 'Aprovando...' : 'Aprovar Orçamento'}
    </Button>
  );
}
