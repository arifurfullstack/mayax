import { Target, Zap, DollarSign, ShieldCheck } from "lucide-react";
import { CounterNumber } from "@/components/shared/CounterNumber";

export function StatsBar() {
  return (
    <div className="glass-panel rounded-xl p-4 md:px-8 md:py-4 mb-8 flex flex-wrap md:flex-nowrap justify-around items-center gap-6 stats-bar">
      <div className="flex items-center gap-3">
        <Target className="w-5 h-5 text-muted-foreground" />
        <span className="text-sm text-muted-foreground uppercase tracking-widest text-[11px]">Total Leads:</span>
        <span className="text-xl text-maya-cyan font-bold tracking-tight">
          <CounterNumber value={847} />
        </span>
      </div>
      <div className="w-px h-8 bg-white/10 hidden md:block"></div>

      <div className="flex items-center gap-3">
        <Zap className="w-5 h-5 text-muted-foreground" />
        <span className="text-sm text-muted-foreground uppercase tracking-widest text-[11px]">New Leads:</span>
        <span className="text-xl text-maya-green font-bold tracking-tight">
          <CounterNumber value={56} />
        </span>
      </div>
      <div className="w-px h-8 bg-white/10 hidden md:block"></div>

      <div className="flex items-center gap-3">
        <DollarSign className="w-5 h-5 text-muted-foreground" />
        <span className="text-sm text-muted-foreground uppercase tracking-widest text-[11px]">Average Income:</span>
        <span className="text-xl text-maya-gold font-bold tracking-tight">
          <CounterNumber value={7500} prefix="$" />
        </span>
      </div>
      <div className="w-px h-8 bg-white/10 hidden md:block"></div>

      <div className="flex items-center gap-3">
        <ShieldCheck className="w-5 h-5 text-muted-foreground" />
        <span className="text-sm text-muted-foreground uppercase tracking-widest text-[11px]">Trusted Buyers:</span>
        <span className="text-xl text-maya-green font-bold tracking-tight">
          <CounterNumber value={98} suffix="%" />
        </span>
      </div>
    </div>
  );
}
