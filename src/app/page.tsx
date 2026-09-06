import { fetchPublicProperties } from '@/services/propertyService';
import { createLeadAction } from '@/actions/leadActions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default async function PublicHome() {
  const properties = await fetchPublicProperties();

  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header Público */}
      <header className="bg-slate-900 text-white p-6">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">RentFlow Imóveis</h1>
          <a href="/dashboard" className="text-sm hover:underline text-slate-300">Área do Corretor</a>
        </div>
      </header>

      {/* Lista de Imóveis */}
      <div className="max-w-5xl mx-auto py-12 px-6">
        <h2 className="text-3xl font-bold text-slate-800 mb-8">Imóveis Disponíveis</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div key={property.id} className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden flex flex-col">
              {/* Placeholder de Imagem */}
              <div className="h-48 bg-slate-200 flex items-center justify-center text-slate-400">
                Sem foto
              </div>
              
              <div className="p-4 flex-1 flex flex-col">
                <span className="text-xs font-bold text-blue-600 uppercase mb-1">{property.tipo}</span>
                <h3 className="font-semibold text-lg text-slate-800 leading-tight mb-2">{property.titulo}</h3>
                <p className="text-2xl font-bold text-slate-900 mb-4">{formatCurrency(property.preco_aluguel)}</p>
                
                <div className="flex gap-4 text-sm text-slate-500 mb-6">
                  <span>🛏️ {property.quartos} Quartos</span>
                  <span>🚗 {property.vagas} Vagas</span>
                </div>

                {/* Formulário reaproveitando a Action do CRM */}
                <form action={createLeadAction} className="mt-auto flex flex-col gap-2 bg-slate-50 p-3 rounded-md border border-slate-100">
                  <p className="text-xs font-medium text-slate-700 text-center mb-1">Tenho interesse!</p>
                  <Input name="nome" placeholder="Seu nome" required className="h-8 text-sm" />
                  <Input name="whatsapp" placeholder="Seu WhatsApp" required className="h-8 text-sm" />
                  <Button type="submit" size="sm" className="w-full">Agendar Visita</Button>
                </form>
              </div>
            </div>
          ))}
        </div>

        {properties.length === 0 && (
          <p className="text-center text-slate-500">Nenhum imóvel disponível no momento.</p>
        )}
      </div>
    </main>
  );
}