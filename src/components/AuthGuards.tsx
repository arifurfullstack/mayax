import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-muted-foreground">Loading...</div>
    </div>
  );
}

/** Requires any authenticated session */
export function RequireAuth({ children }: { children: ReactNode }) {
  const { session, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  if (!session) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

/** Requires admin role */
export function RequireAdmin({ children }: { children: ReactNode }) {
  const { isAdmin, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  if (!isAdmin) return <Navigate to="/marketplace" replace />;
  return <>{children}</>;
}

/** Requires dealer role + approved */
export function RequireApprovedDealer({ children }: { children: ReactNode }) {
  const { role, dealer, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  if (role !== 'dealer' || !dealer) return <Navigate to="/login" replace />;
  if (dealer.approval_status === 'pending') return <Navigate to="/pending-approval" replace />;
  if (dealer.approval_status === 'rejected') return <Navigate to="/rejected" replace />;
  if (dealer.approval_status === 'suspended') return <Navigate to="/suspended" replace />;
  return <>{children}</>;
}

/** Alias for backward compat with existing code */
export const RequireApproved = RequireApprovedDealer;

/** Requires normal_user role (always auto-approved) */
export function RequireNormalUser({ children }: { children: ReactNode }) {
  const { role, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  if (role !== 'normal_user') return <Navigate to="/login" replace />;
  return <>{children}</>;
}

/** Requires provider role + approved */
export function RequireProvider({ children }: { children: ReactNode }) {
  const { role, provider, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  if (role !== 'provider' || !provider) return <Navigate to="/login" replace />;
  if (provider.approval_status === 'pending') return <Navigate to="/provider/pending-approval" replace />;
  if (provider.approval_status === 'rejected') return <Navigate to="/provider/rejected" replace />;
  if (provider.approval_status === 'suspended') return <Navigate to="/provider/suspended" replace />;
  return <>{children}</>;
}

/** Requires either normal_user or approved dealer (shared marketplace) */
export function RequireBuyer({ children }: { children: ReactNode }) {
  const { role, dealer, normalUser, isAdmin, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  if (isAdmin) return <>{children}</>;
  if (role === 'normal_user' && normalUser) return <>{children}</>;
  if (role === 'dealer' && dealer) {
    if (dealer.approval_status === 'pending') return <Navigate to="/pending-approval" replace />;
    if (dealer.approval_status === 'rejected') return <Navigate to="/rejected" replace />;
    if (dealer.approval_status === 'suspended') return <Navigate to="/suspended" replace />;
    return <>{children}</>;
  }
  return <Navigate to="/login" replace />;
}

/** Redirect already-logged-in users away from public pages */
export function PublicOnly({ children }: { children: ReactNode }) {
  const { session, role, dealer, normalUser, provider, isAdmin, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  if (!session) return <>{children}</>;

  // Route to correct destination based on role
  if (isAdmin) return <Navigate to="/admin" replace />;
  if (role === 'normal_user' && normalUser) return <Navigate to="/marketplace" replace />;
  if (role === 'dealer' && dealer) {
    if (dealer.approval_status === 'approved') return <Navigate to="/marketplace" replace />;
    if (dealer.approval_status === 'pending') return <Navigate to="/pending-approval" replace />;
    if (dealer.approval_status === 'rejected') return <Navigate to="/rejected" replace />;
    return <Navigate to="/suspended" replace />;
  }
  if (role === 'provider' && provider) {
    if (provider.approval_status === 'approved') return <Navigate to="/provider/leads" replace />;
    return <Navigate to="/provider/pending-approval" replace />;
  }

  return <>{children}</>;
}
