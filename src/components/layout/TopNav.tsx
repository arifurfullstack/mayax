import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Search, PackageSearch, Wallet, ChevronDown, CheckCircle2, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/shared/Badge";
import { usePlatformSettings } from "@/hooks/usePlatformSettings";

export function TopNav() {
  const location = useLocation();
  const { branding } = usePlatformSettings();

  const navLinks = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Leads Marketplace", path: "/marketplace", icon: Search },
    { name: "Orders", path: "/purchases", icon: PackageSearch },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 h-16 z-50 nav-glass px-6 flex items-center justify-between top-nav">
      {/* Logo Area */}
      <div className="flex items-center gap-3">
        {branding?.logo_url ? (
          <img src={branding.logo_url} alt="Logo" className="h-8 w-auto object-contain" />
        ) : (
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-maya-purple via-maya-cyan to-maya-green">
            <span className="text-white font-bold text-sm tracking-tighter">MX</span>
          </div>
        )}
        <span className="text-xl font-bold text-white tracking-wide">
          {branding?.business_name && branding.business_name !== "AUTO LEAD HUB" 
            ? branding.business_name 
            : (
            <>Maya<span className="text-maya-cyan">X</span></>
          )}
        </span>
      </div>

      {/* Center Nav Links */}
      <nav className="hidden md:flex flex-1 items-center justify-center gap-8">
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                "flex items-center gap-2 text-sm transition-colors",
                isActive 
                  ? "text-maya-cyan font-medium relative after:absolute after:-bottom-5 after:left-0 after:right-0 after:h-0.5 after:bg-maya-cyan after:shadow-[0_0_10px_rgba(0,212,255,0.8)]" 
                  : "text-[#e8ecf4] hover:text-maya-cyan"
              )}
            >
              <link.icon className="w-4 h-4" />
              {link.name}
            </Link>
          );
        })}
        <Link 
          to="/wallet"
          className="flex items-center gap-2 text-sm text-[#e8ecf4] hover:text-maya-cyan transition-colors"
        >
          <Wallet className="w-4 h-4" />
          Wallet Balance $750.00
          <CheckCircle2 className="w-4 h-4 text-maya-green" />
        </Link>
      </nav>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        <Badge variant="gold" className="gap-1 px-3">
          <Zap className="w-3 h-3 fill-current" />
          VIP
        </Badge>
        <div className="flex items-center gap-3 cursor-pointer group">
          <span className="text-sm font-medium text-white group-hover:text-maya-cyan transition-colors">
            John's Auto Group
          </span>
          <div className="w-8 h-8 rounded-full bg-maya-blue flex items-center justify-center text-white font-bold text-xs ring-2 ring-transparent group-hover:ring-maya-cyan transition-all">
            JA
          </div>
          <ChevronDown className="w-4 h-4 text-maya-steel group-hover:text-maya-cyan transition-colors" />
        </div>
      </div>
    </header>
  );
}
