import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { DealerLayout } from '@/components/DealerLayout';
import { NormalUserLayout } from '@/components/NormalUserLayout';
import DealerDashboard from '@/pages/DealerDashboard';
import NormalUserDashboard from '@/pages/NormalUserDashboard';

export default function RoleBasedDashboard() {
  const { role, dealer, normalUser, loading } = useAuth();

  if (loading) return null;

  if (role === 'dealer' && dealer) {
    if (dealer.approval_status === 'pending') return <Navigate to="/pending-approval" replace />;
    if (dealer.approval_status === 'rejected') return <Navigate to="/rejected" replace />;
    if (dealer.approval_status === 'suspended') return <Navigate to="/suspended" replace />;
    return <DealerLayout><DealerDashboard /></DealerLayout>;
  }

  if (role === 'normal_user' && normalUser) {
    return <NormalUserLayout><NormalUserDashboard /></NormalUserLayout>;
  }

  return <Navigate to="/login" replace />;
}
