import { Search, Wallet, PackageSearch, Webhook } from "lucide-react";
import { GlassCard } from "@/components/shared/GlassCard";

export function QuickActions() {
  const actions = [
    { icon: Search, label: "Browse Marketplace", desc: "Find and buy verified leads", color: "cyan" as const, bg: "bg-maya-cyan/10", text: "text-maya-cyan", path: "/marketplace" },
    { icon: Wallet, label: "Add Funds", desc: "Top up your wallet balance", color: "green" as const, bg: "bg-maya-green/10", text: "text-maya-green", path: "/wallet" },
    { icon: PackageSearch, label: "View Orders", desc: "Track your purchased leads", color: "purple" as const, bg: "bg-maya-purple/10", text: "text-maya-purple", path: "/purchases" },
    { icon: Webhook, label: "Webhook Settings", desc: "Configure CRM delivery", color: "gold" as const, bg: "bg-maya-gold/10", text: "text-maya-gold", path: "/settings" },
  ];

  return (
    <GlassCard className="p-6 h-full flex flex-col w-full">
      <h2 className="text-lg font-semibold text-white mb-6">Quick Actions</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
        {actions.map((action, i) => (
          <a key={i} href={action.path} className="block w-full h-full">
            <GlassCard 
              hoverGlow={action.color} 
              className="p-4 cursor-pointer quick-action flex flex-col justify-center bg-white/5 border-white/5 hover:bg-white/10 h-full"
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${action.bg}`}>
                <action.icon className={`w-5 h-5 ${action.text}`} />
              </div>
              <h3 className="text-sm font-semibold text-white mb-1">{action.label}</h3>
              <p className="text-[11px] text-muted-foreground leading-snug">{action.desc}</p>
            </GlassCard>
          </a>
        ))}
      </div>
    </GlassCard>
  );
}
