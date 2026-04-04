import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { MayaLogo } from '@/components/MayaLogo';
import { Button } from '@/components/ui/button';
import { ShieldOff } from 'lucide-react';

export default function Suspended() {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[hsl(214,25%,96%)] to-[hsl(210,30%,98%)] px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center"><MayaLogo variant="dark" /></div>
        <div className="p-8 bg-white/80 dark:bg-card/80 backdrop-blur-sm rounded-2xl shadow-xl border">
          <div className="w-16 h-16 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mx-auto mb-4">
            <ShieldOff className="h-8 w-8 text-orange-600 dark:text-orange-400" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Account Suspended</h1>
          <p className="text-muted-foreground mb-4">Your account has been temporarily suspended. Please contact our support team to resolve this issue.</p>
          <p className="text-sm text-muted-foreground">We'll review your account and respond within 1-2 business days.</p>
        </div>
        <Button variant="outline" onClick={async () => { await signOut(); navigate('/login'); }}>Sign Out</Button>
      </div>
    </div>
  );
}
