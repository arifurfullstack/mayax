import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { MayaLogo } from './MayaLogo';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Settings, LogOut, Menu, X, BarChart3, PlusCircle, DollarSign } from 'lucide-react';
import { useState } from 'react';
import { ThemeToggle } from './ThemeToggle';

export function ProviderNav() {
  const { provider, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { to: '/provider/leads', label: 'My Leads', icon: BarChart3 },
    { to: '/provider/leads/new', label: 'Add Lead', icon: PlusCircle },
    { to: '/provider/earnings', label: 'Earnings', icon: DollarSign },
  ];

  const isActive = (path: string) => location.pathname.startsWith(path) && path !== '/provider/leads/new'
    ? true
    : location.pathname === path;

  const initials = provider?.contact_person?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'PR';
  const handleSignOut = async () => { await signOut(); navigate('/login'); };

  return (
    <nav className="sticky top-0 z-50 w-full nav-glass">
      <div className="flex h-16 items-center justify-between px-4 lg:px-8">
        <Link to="/provider/leads" className="shrink-0"><MayaLogo variant="dark" /></Link>

        {/* Provider role badge */}
        <div className="hidden md:flex items-center gap-1">
          {links.map(l => {
            const active = location.pathname === l.to;
            return (
              <Link key={l.to} to={l.to} className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                active ? 'text-foreground bg-foreground/8 shadow-sm' : 'text-muted-foreground hover:text-foreground hover:bg-foreground/5'
              }`}>
                <l.icon className="h-4 w-4" />
                {l.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          {/* Provider earnings badge */}
          <div className="hidden sm:flex items-center gap-1.5 text-foreground text-sm">
            <DollarSign className="h-4 w-4 text-maya-green" />
            <span className="font-semibold text-maya-green">${provider?.total_earnings?.toFixed(2) ?? '0.00'}</span>
            <span className="text-muted-foreground text-xs">earned</span>
          </div>
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-9 w-9 cursor-pointer ring-2 ring-border shadow-sm">
                <AvatarFallback className="bg-purple-600 text-white text-xs font-bold">{initials}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <div className="px-3 py-2 border-b">
                <p className="text-sm font-medium truncate">{provider?.company_name}</p>
                <p className="text-xs text-muted-foreground truncate">{provider?.email}</p>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 mt-1">
                  Provider
                </span>
              </div>
              <DropdownMenuItem onClick={() => navigate('/provider/settings')}><Settings className="h-4 w-4 mr-2" />Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut} className="text-destructive focus:text-destructive">
                <LogOut className="h-4 w-4 mr-2" />Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border/50 px-4 py-2 space-y-1">
          {links.map(l => (
            <Link key={l.to} to={l.to} onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-2 px-3 py-2 rounded text-sm ${location.pathname === l.to ? 'text-foreground bg-foreground/8' : 'text-muted-foreground'}`}>
              <l.icon className="h-4 w-4" />{l.label}
            </Link>
          ))}
          <Link to="/provider/settings" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 px-3 py-2 rounded text-sm text-muted-foreground">
            <Settings className="h-4 w-4" />Settings
          </Link>
          <button onClick={handleSignOut} className="block w-full text-left px-3 py-2 text-destructive text-sm">Sign Out</button>
        </div>
      )}
    </nav>
  );
}
