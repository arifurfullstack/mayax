import { Wallet, Package, Search, Zap, TrendingUp } from "lucide-react";
import { GlassCard } from "@/components/shared/GlassCard";
import { CounterNumber } from "@/components/shared/CounterNumber";

export function MetricCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      {/* Card 1: Wallet Balance */}
      <GlassCard hoverGlow="cyan" className="p-6 metric-card">
        <div className="flex items-start justify-between mb-4">
          <div className="w-10 h-10 rounded-full bg-maya-cyan/20 flex items-center justify-center glow-cyan">
            <Wallet className="w-5 h-5 text-maya-cyan" />
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-1">Wallet Balance</p>
        <div className="text-[28px] text-white mb-2 tracking-tight">
          <CounterNumber value={750} prefix="$" decimals={2} />
        </div>
        <p className="text-xs text-muted-foreground">Last top-up: $250 on Mar 28</p>
      </GlassCard>

      {/* Card 2: Leads Purchased */}
      <GlassCard hoverGlow="green" className="p-6 metric-card">
        <div className="flex items-start justify-between mb-4">
          <div className="w-10 h-10 rounded-full bg-maya-green/20 flex items-center justify-center glow-green">
            <Package className="w-5 h-5 text-maya-green" />
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-1">Leads Purchased</p>
        <div className="text-[28px] text-white mb-2 tracking-tight">
          <CounterNumber value={847} />
        </div>
        <p className="text-xs text-maya-green flex items-center gap-1">
          <TrendingUp className="w-3 h-3" /> +56 this month
        </p>
      </GlassCard>

      {/* Card 3: Available Leads */}
      <GlassCard hoverGlow="purple" className="p-6 metric-card">
        <div className="flex items-start justify-between mb-4">
          <div className="w-10 h-10 rounded-full bg-maya-purple/20 flex items-center justify-center glow-purple">
            <Search className="w-5 h-5 text-maya-purple" />
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-1">Available Leads</p>
        <div className="text-[28px] text-white mb-2 tracking-tight">
          <CounterNumber value={156} />
        </div>
        <p className="text-xs text-orange-400">23 unlocking in 6h</p>
      </GlassCard>

      {/* Card 4: Subscription Tier */}
      <GlassCard hoverGlow="gold" className="p-6 metric-card">
        <div className="flex items-start justify-between mb-4">
          <div className="w-10 h-10 rounded-full bg-maya-gold/20 flex items-center justify-center glow-gold">
            <Zap className="w-5 h-5 text-maya-gold fill-current" />
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-1">Current Plan</p>
        <div className="text-[24px] text-maya-gold font-bold mb-2 tracking-tight">
          <span className="drop-shadow-[0_0_8px_rgba(245,197,66,0.5)]">VIP</span>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-[11px] text-muted-foreground">Instant access · 1000 leads/mo</p>
          <a href="/upgrade-plan" className="text-xs text-maya-cyan hover:underline">Manage →</a>
        </div>
      </GlassCard>
    </div>
  );
}
