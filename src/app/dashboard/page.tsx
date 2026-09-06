export default function DashboardHome() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-800 mb-8">Visão Geral</h1>
      
      {/* Grid de Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <p className="text-sm text-slate-500 font-medium">Imóveis Disponíveis</p>
          <p className="text-3xl font-bold text-slate-800 mt-2">0</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <p className="text-sm text-slate-500 font-medium">Novos Leads</p>
          <p className="text-3xl font-bold text-slate-800 mt-2">0</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <p className="text-sm text-slate-500 font-medium">Tempo Médio p/ Alugar</p>
          <p className="text-3xl font-bold text-slate-800 mt-2">0 dias</p>
        </div>
      </div>

      {/* Espaço para futuros gráficos ou atividades recentes */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 h-64 flex items-center justify-center">
        <p className="text-slate-400">Gráfico de desempenho entrará aqui</p>
      </div>
    </div>
  );
}