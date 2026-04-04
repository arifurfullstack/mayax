import { useNavigate } from 'react-router-dom';
import { MayaLogo } from '@/components/MayaLogo';
import { Button } from '@/components/ui/button';
import { Clock, Mail } from 'lucide-react';

export default function ProviderPendingApproval() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[hsl(214,25%,96%)] to-[hsl(210,30%,98%)] px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center"><MayaLogo variant="dark" /></div>
        <div className="p-8 bg-white/80 dark:bg-card/80 backdrop-blur-sm rounded-2xl shadow-xl border border-border/50">
          <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mx-auto mb-4">
            <Clock className="h-8 w-8 text-amber-600 dark:text-amber-400" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Application Under Review</h1>
          <p className="text-muted-foreground mb-4">
            Your provider application has been submitted and is currently being reviewed by our team.
            This typically takes <strong>24-48 hours</strong>.
          </p>
          <div className="flex items-center gap-2 justify-center text-sm text-muted-foreground bg-muted/50 rounded-lg px-4 py-3 mb-6">
            <Mail className="h-4 w-4" />
            <span>You'll receive an email once a decision is made</span>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-semibold text-foreground">While you wait:</p>
            <ul className="text-sm text-muted-foreground space-y-1 text-left">
              <li>• Prepare your first leads for submission</li>
              <li>• Set up your company profile details</li>
              <li>• Review our lead quality guidelines</li>
            </ul>
          </div>
        </div>
        <Button variant="outline" onClick={() => navigate('/login')} className="w-full">Back to Login</Button>
      </div>
    </div>
  );
}
