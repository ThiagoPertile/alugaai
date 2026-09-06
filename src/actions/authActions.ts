'use server';

import { createClient } from '@/lib/supabaseServer';

export type AuthActionState = {
  error?: string;
  success?: string;
};

export async function loginAction(
  _previousState: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Informe o e-mail e a senha.' };
  }

  const supabase = await createClient();
  
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error('Erro no login:', error.message);
    return { error: 'E-mail ou senha incorretos.' };
  }

  return { success: 'Login realizado com sucesso.' };
}