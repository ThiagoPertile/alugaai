import { loginAction } from '@/actions/authActions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md border border-slate-200">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-slate-800">Acesso Restrito</h1>
          <p className="text-slate-500 text-sm mt-1">Faça login para gerenciar a imobiliária</p>
        </div>

        <form action={loginAction} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">E-mail corporativo</Label>
            <Input id="email" name="email" type="email" required placeholder="corretor@imobiliaria.com" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input id="password" name="password" type="password" required />
          </div>

          <Button type="submit" className="w-full">Entrar no Dashboard</Button>
        </form>
      </div>
    </div>
  );
}