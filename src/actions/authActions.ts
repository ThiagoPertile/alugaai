'use server';

import { createClient } from '@/lib/supabaseServer';
import { redirect } from 'next/navigation';

export async function loginAction(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const supabase = await createClient();
  
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error('Erro no login:', error.message);
    return { error: 'E-mail ou senha incorretos.' };
  }

  // Se der certo, redireciona para o painel
  redirect('/dashboard');
}