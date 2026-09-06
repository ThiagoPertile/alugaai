import { fetchDashboardMetrics } from '@/services/dashboardService';

export default async function DashboardHome() {
  const {
    totalImoveis,
    totalPrestadores,
    totalOrcamentos,
  } = await fetchDashboardMetrics();

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-800 mb-8">Visão Geral</h1>
      
      {/* Grid de Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <p className="text-sm text-slate-500 font-medium">Imóveis</p>
          <p className="text-3xl font-bold text-slate-800 mt-2">{totalImoveis}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <p className="text-sm text-slate-500 font-medium">Prestadores</p>
          <p className="text-3xl font-bold text-slate-800 mt-2">{totalPrestadores}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <p className="text-sm text-slate-500 font-medium">Orçamentos</p>
          <p className="text-3xl font-bold text-slate-800 mt-2">{totalOrcamentos}</p>
        </div>
      </div>

      {/* Espaço para futuros gráficos ou atividades recentes */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 h-64 flex items-center justify-center">
        <p className="text-slate-400">Gráfico de desempenho entrará aqui</p>
      </div>
    </div>
  );
}