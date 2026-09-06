'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function NovoImovelPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  // Estado para guardar o que o usuário digita
  const [formData, setFormData] = useState({
    titulo: '',
    tipo: 'apartamento',
    preco_aluguel: '',
    quartos: '',
    vagas: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Busca a nossa Imobiliária de teste para vincular o imóvel a ela
      const { data: imob, error: imobError } = await supabase
        .from('imobiliarias')
        .select('id')
        .single();

      if (imobError || !imob) throw new Error('Imobiliária não encontrada. Verifique o banco.');

      // 2. Insere o novo imóvel no banco de dados
      const { error } = await supabase.from('imoveis').insert({
        imobiliaria_id: imob.id,
        titulo: formData.titulo,
        tipo: formData.tipo,
        preco_aluguel: parseFloat(formData.preco_aluguel),
        quartos: parseInt(formData.quartos) || 0,
        vagas: parseInt(formData.vagas) || 0,
        status: 'disponivel'
      });

      if (error) throw error;

      // 3. Volta para a página de listagem e recarrega os dados
      router.push('/dashboard/imoveis');
      router.refresh();
      
    } catch (error) {
      console.error('Erro ao salvar:', error);
      alert('Erro ao salvar o imóvel. Verifique o console.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold text-slate-800 mb-8">Cadastrar Novo Imóvel</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-md border border-slate-200 space-y-6">
        
        <div className="space-y-2">
          <Label htmlFor="titulo">Título do Anúncio</Label>
          <Input 
            id="titulo" 
            required
            placeholder="Ex: Apartamento moderno no Centro"
            value={formData.titulo}
            onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="tipo">Tipo de Imóvel</Label>
            <select
              id="tipo"
              className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950"
              value={formData.tipo}
              onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
            >
              <option value="apartamento">Apartamento</option>
              <option value="casa">Casa</option>
              <option value="comercial">Comercial</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="preco">Valor do Aluguel (R$)</Label>
            <Input 
              id="preco" 
              type="number" 
              required
              step="0.01"
              placeholder="Ex: 2500.00"
              value={formData.preco_aluguel}
              onChange={(e) => setFormData({ ...formData, preco_aluguel: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="quartos">Quartos</Label>
            <Input 
              id="quartos" 
              type="number" 
              value={formData.quartos}
              onChange={(e) => setFormData({ ...formData, quartos: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="vagas">Vagas de Garagem</Label>
            <Input 
              id="vagas" 
              type="number" 
              value={formData.vagas}
              onChange={(e) => setFormData({ ...formData, vagas: e.target.value })}
            />
          </div>
        </div>

        <div className="pt-4 flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancelar
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? 'Salvando...' : 'Salvar Imóvel'}
          </Button>
        </div>
      </form>
    </div>
  );
}