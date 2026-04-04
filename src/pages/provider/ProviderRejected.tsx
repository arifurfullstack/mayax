import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { MayaLogo } from '@/components/MayaLogo';
import { Button } from '@/components/ui/button';
import { XCircle } from 'lucide-react';

export default function ProviderRejected() {
  const { provider, signOut } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[hsl(214,25%,96%)] to-[hsl(210,30%,98%)] px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center"><MayaLogo variant="dark" /></div>
        <div className="p-8 bg-white/80 dark:bg-card/80 backdrop-blur-sm rounded-2xl shadow-xl border border-border/50">
          <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-4">
            <XCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Application Not Approved</h1>
          <p className="text-muted-foreground mb-4">
            Unfortunately, your provider application was not approved at this time.
          </p>
          {provider?.rejection_reason && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4 text-sm text-red-700 dark:text-red-400 text-left">
              <p className="font-semibold mb-1">Reason:</p>
              <p>{provider.rejection_reason}</p>
            </div>
          )}
          <p className="text-sm text-muted-foreground">If you believe this was an error or wish to appeal, please contact our support team.</p>
        </div>
        <Button variant="outline" onClick={async () => { await signOut(); navigate('/login'); }}>Sign Out</Button>
      </div>
    </div>
  );
}
