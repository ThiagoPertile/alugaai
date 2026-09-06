'use client';

import Link from 'next/link';
import {Home, Building, Users, Settings, HardHat, Handshake, LogOut} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

const navigation = [
  { href: '/dashboard', label: 'Dashboard', icon: Home, exact: true },
  { href: '/dashboard/imoveis', label: 'Imóveis', icon: Building },
  { href: '/dashboard/leads', label: 'Leads (CRM)', icon: Users },
  { href: '/dashboard/manutencoes', label: 'Manutenção', icon: HardHat },
  { href: '/dashboard/providers', label: 'Parceiros', icon: Handshake },
  { href: '/dashboard/prestador/chamados', label: 'Chamados do prestador', icon: HardHat },
];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    const { error } = await supabase.auth.signOut();

    if (error) {
      setIsLoggingOut(false);
      return;
    }

    router.replace('/login');
    router.refresh();
  };

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 min-h-screen flex flex-col">
      <div className="p-6 border-b border-slate-800">
        <h2 className="text-2xl font-bold text-white">RentFlow</h2>
        <p className="text-xs text-slate-500 mt-1">Admin Panel</p>
      </div>
      
      <nav className="flex-1 space-y-1 p-4">
        {navigation.map(({ href, label, icon: Icon, exact }) => {
          const isActive = exact ? pathname === href : pathname.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              aria-current={isActive ? 'page' : undefined}
              className={`group flex cursor-pointer items-center gap-3 rounded-lg border p-3 text-sm transition-[background-color,color,border-color,transform] duration-150 hover:translate-x-0.5 hover:border-slate-700 hover:bg-slate-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 ${
                isActive
                  ? 'border-slate-700 bg-slate-800 text-white shadow-sm'
                  : 'border-transparent text-slate-300'
              }`}
            >
              <Icon size={20} className="transition-transform duration-150 group-hover:scale-105" />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800 space-y-2">
        <Link href="/dashboard/configuracoes" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
          <Settings size={20} />
          <span>Configurações</span>
        </Link>
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="flex w-full items-center gap-3 rounded-lg border border-transparent p-3 text-sm transition-[background-color,color,border-color] duration-150 hover:border-red-900/50 hover:bg-red-950/50 hover:text-red-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 disabled:cursor-wait disabled:opacity-60"
        >
          <LogOut size={20} />
          <span>{isLoggingOut ? 'Saindo...' : 'Sair'}</span>
        </button>
      </div>
    </aside>
  );
}