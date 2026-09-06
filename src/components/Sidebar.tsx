'use client';

import Link from 'next/link';
import {Home, Building, Users, Settings, HardHat, Handshake, LogOut} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function Sidebar() {
  const router = useRouter();
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 min-h-screen flex flex-col">
      <div className="p-6 border-b border-slate-800">
        <h2 className="text-2xl font-bold text-white">RentFlow</h2>
        <p className="text-xs text-slate-500 mt-1">Admin Panel</p>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        <Link href="/dashboard" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
          <Home size={20} />
          <span>Dashboard</span>
        </Link>
        <Link href="/dashboard/imoveis" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
          <Building size={20} />
          <span>Imóveis</span>
        </Link>
        <Link href="/dashboard/leads" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
          <Users size={20} />
          <span>Leads (CRM)</span>
        </Link>
        <Link href="/dashboard/manutencoes" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
          <HardHat size={20} />
          <span>Manutenção</span>
        </Link>
            <Link href="/dashboard/providers" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
              <Handshake size={20} />
              <span>Parceiros</span>
            </Link>
            <Link href="/dashboard/prestador/chamados" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
              <HardHat size={20} />
              <span>Chamados do prestador</span>
            </Link>
      </nav>

      <div className="p-4 border-t border-slate-800 space-y-2">
        <Link href="/dashboard/configuracoes" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
          <Settings size={20} />
          <span>Configurações</span>
        </Link>
        <button onClick={handleLogout} className="flex w-full items-center gap-3 p-3 rounded-lg hover:bg-red-900/50 hover:text-red-400 transition-colors">
          <LogOut size={20} />
          <span>Sair</span>
        </button>
      </div>
    </aside>
  );
}