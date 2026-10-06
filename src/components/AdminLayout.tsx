import { ReactNode, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MayaLogo } from './MayaLogo';
import {
  LayoutDashboard, Users, FileText, CreditCard, Mail,
  Settings as SettingsIcon, LogOut, ClipboardCheck, PlusCircle, DollarSign, ShieldCheck, Menu
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ThemeToggle } from './ThemeToggle';

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
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (link: typeof links[0]) => {
    if (link.exact) return location.pathname === link.to;
    return location.pathname.startsWith(link.to);
  };

  const handleSignOut = async () => { await signOut(); navigate('/login'); };
  const adminEmail = user?.email || 'admin@mayax.test';
  const initials = 'AD';

  const NavItems = ({ onNavigate }: { onNavigate?: () => void }) => (
    <>
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
              onClick={onNavigate}
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
    </>
  );

  return (
    <div className="min-h-screen flex">
      {/* Desktop Sidebar */}
      <aside className="w-60 shrink-0 bg-maya-navy text-white hidden md:flex flex-col">
        <NavItems />
      </aside>

      <main className="flex-1 bg-background flex flex-col min-w-0">
        <header className="h-16 shrink-0 border-b flex items-center justify-between md:justify-end px-4 sm:px-6 nav-glass sticky top-0 z-10 w-full">
          {/* Mobile hamburger menu */}
          <div className="md:hidden flex items-center">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-64 bg-maya-navy text-white border-r-0 flex flex-col">
                <NavItems onNavigate={() => setMobileOpen(false)} />
              </SheetContent>
            </Sheet>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-9 w-9 cursor-pointer ring-2 ring-border shadow-sm hover:ring-maya-blue transition-all">
                  <AvatarFallback className="bg-maya-blue text-white text-xs font-bold">{initials}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <div className="px-3 py-2 border-b">
                  <p className="text-sm font-medium truncate">Platform Admin</p>
                  <p className="text-xs text-muted-foreground truncate">{adminEmail}</p>
                </div>
                <DropdownMenuItem onClick={() => navigate('/admin/settings')}>
                  <SettingsIcon className="h-4 w-4 mr-2" />Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="text-destructive focus:text-destructive">
                  <LogOut className="h-4 w-4 mr-2" />Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <div className="flex-1 overflow-auto p-0">
          {children}
        </div>
      </main>
    </div>
  );
}
