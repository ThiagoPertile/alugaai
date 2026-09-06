import Sidebar from '@/components/Sidebar';
import { supabase } from '../lib/supabase';

export default async function Home() {
  // Puxando os dados da tabela que criamos
  const { data: imobiliarias, error } = await supabase
    .from('imobiliarias')
    .select('*');

  if (error) {
    console.error('Erro ao buscar dados:', error);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-6">
      <h1 className="text-3xl font-bold text-slate-800 mb-8">🚀 RentFlow - MVP Fase 1</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md border border-slate-200">
        <h2 className="text-xl font-semibold mb-4 text-slate-700">Imobiliárias Cadastradas:</h2>
        
        {imobiliarias && imobiliarias.length > 0 ? (
          <ul className="space-y-2">
            {imobiliarias.map((imob) => (
              <li key={imob.id} className="p-3 bg-slate-100 rounded-md text-slate-600 font-medium border border-slate-200">
                {imob.nome} <span className="text-sm text-slate-400 font-normal">({imob.slug})</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-slate-500">Nenhuma imobiliária encontrada.</p>
        )}
      </div>
      <Sidebar />
    </main>
  );
}