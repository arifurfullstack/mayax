import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { MayaLogo } from '@/components/MayaLogo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner';

async function getRedirectPath(userId: string): Promise<string> {
  // Fetch role
  const { data: roleData } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', userId)
    .maybeSingle();

  const role = roleData?.role;

  if (!role || role === 'admin') return '/admin';

  if (role === 'normal_user') return '/marketplace';

  if (role === 'dealer') {
    const { data: dealer } = await supabase
      .from('dealers')
      .select('approval_status')
      .eq('user_id', userId)
      .maybeSingle();
    const status = dealer?.approval_status;
    if (status === 'approved') return '/marketplace';
    if (status === 'rejected') return '/rejected';
    if (status === 'suspended') return '/suspended';
    return '/pending-approval';
  }

  if (role === 'provider') {
    const { data: provider } = await supabase
      .from('provider_profiles')
      .select('approval_status')
      .eq('id', userId)
      .maybeSingle();
    const status = provider?.approval_status;
    if (status === 'approved') return '/provider/leads';
    if (status === 'rejected') return '/provider/rejected';
    if (status === 'suspended') return '/provider/suspended';
    return '/provider/pending-approval';
  }

  return '/marketplace';
}

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }
    if (data.user) {
      const path = await getRedirectPath(data.user.id);
      navigate(path, { replace: true });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[hsl(214,25%,96%)] to-[hsl(210,30%,98%)] px-4">
      <Card className="w-full max-w-md shadow-xl border-0 glass">
        <CardHeader className="text-center space-y-4 pb-2">
          <div className="flex justify-center">
            <MayaLogo variant="dark" />
          </div>
          <div>
            <CardTitle className="text-xl font-bold">Welcome Back</CardTitle>
            <CardDescription>Sign in to your MayaX Lead Hub account</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" />
            </div>
            <Button type="submit" disabled={loading} className="w-full bg-maya-green hover:bg-maya-green/90 text-maya-green-foreground">
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm text-muted-foreground space-y-2">
            <Link to="/reset-password" className="hover:underline block">Forgot Password?</Link>
            <div className="border-t pt-3">
              <span>Don't have an account? </span>
              <Link to="/register" className="text-maya-green font-medium hover:underline">Create Account</Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
