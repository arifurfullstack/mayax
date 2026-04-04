import { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MayaLogo } from './MayaLogo';
import {
  LayoutDashboard, Users, FileText, CreditCard, Mail,
  Settings as SettingsIcon, LogOut, ClipboardCheck, PlusCircle, DollarSign, ShieldCheck
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const links = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { to: '/admin/users', label: 'Users', icon: Users },
  { to: '/admin/leads/review', label: 'Lead Review', icon: ClipboardCheck },
  { to: '/admin/leads', label: 'All Leads', icon: FileText, exact: true },
  { to: '/admin/leads/new', label: 'Add Lead', icon: PlusCircle },
  { to: '/admin/transactions', label: 'Transactions', icon: CreditCard },
  { to: '/admin/payouts', label: 'Provider Payouts', icon: DollarSign },
  { to: '/admin/delivery-logs', label: 'Delivery Logs', icon: Mail },
  { to: '/admin/settings', label: 'Settings', icon: SettingsIcon },
];

export function AdminLayout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const isActive = (link: typeof links[0]) => {
    if (link.exact) return location.pathname === link.to;
    return location.pathname.startsWith(link.to);
  };

  const handleSignOut = async () => { await signOut(); navigate('/login'); };

  return (
    <div className="min-h-screen flex">
      <aside className="w-60 shrink-0 bg-maya-navy text-white flex flex-col">
        <div className="p-4 border-b border-white/10">
          <MayaLogo variant="light" />
          <div className="flex items-center gap-1.5 mt-1">
            <ShieldCheck className="h-3 w-3 text-maya-green" />
            <p className="text-xs text-white/50">Admin Panel</p>
          </div>
        </div>
        <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
          {links.map(l => {
            const active = isActive(l);
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors ${
                  active ? 'bg-white/15 text-white font-medium' : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <l.icon className="h-4 w-4 shrink-0" />
                {l.label}
                {l.to === '/admin/leads/review' && (
                  <span className="ml-auto text-xs bg-maya-gold/20 text-maya-gold px-1.5 py-0.5 rounded-full font-medium" id="pending-leads-badge">
                    •
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
        <div className="p-2 border-t border-white/10">
          <button onClick={handleSignOut} className="flex items-center gap-2.5 px-3 py-2 rounded-md text-sm text-white/60 hover:text-white hover:bg-white/5 w-full">
            <LogOut className="h-4 w-4" /> Sign Out
          </button>
        </div>
      </aside>
      <main className="flex-1 bg-background overflow-auto">{children}</main>
    </div>
  );
}
