import { Link, useLocation } from "react-router-dom";
import { UserCircle, LayoutDashboard, Search, PackageSearch, Wallet, Star, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { name: "Account Overview", path: "/profile", icon: UserCircle },
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Leads Marketplace", path: "/marketplace", icon: Search },
    { name: "Orders", path: "/purchases", icon: PackageSearch },
    { name: "Wallet", path: "/wallet", icon: Wallet },
    { name: "Subscription", path: "/upgrade-plan", icon: Star },
    { name: "Account Settings", path: "/settings", icon: Settings },
  ];

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-[240px] bg-[rgba(10,14,30,0.95)] border-r border-[rgba(100,150,255,0.08)] flex flex-col z-40 sidebar">
      <div className="flex-1 py-6 px-4 overflow-y-auto hidden-scrollbar flex flex-col gap-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "sidebar-item flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                isActive 
                  ? "bg-maya-cyan/10 text-maya-cyan border-l-[3px] border-maya-cyan glow-cyan" 
                  : "text-muted-foreground hover:bg-white/5 hover:text-[#c0c8d8]"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium text-sm">{item.name}</span>
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-[rgba(100,150,255,0.08)]">
        <div className="bg-maya-cyan/5 border border-maya-cyan/15 rounded-xl p-4">
          <p className="text-xs text-muted-foreground mb-1">Wallet Balance</p>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[22px] font-bold text-white tracking-tight">$750.00</span>
            <span className="w-2 h-2 rounded-full bg-maya-green glow-green"></span>
          </div>
          <Link 
            to="/wallet"
            className="flex items-center justify-center w-full py-2 rounded-lg border border-maya-cyan text-maya-cyan text-xs font-semibold hover:bg-maya-cyan hover:text-maya-navy transition-all glow-cyan"
          >
            + Add Funds
          </Link>
        </div>
      </div>
    </aside>
  );
}
