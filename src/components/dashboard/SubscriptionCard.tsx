import { Zap, Check } from "lucide-react";
import { GlassCard } from "@/components/shared/GlassCard";
import { Badge } from "@/components/shared/Badge";
import { GlowButton } from "@/components/shared/GlowButton";

export function SubscriptionCard() {
  return (
    <GlassCard className="p-6 subscription-card h-full relative overflow-hidden group !border-maya-gold/30 shadow-[0_0_30px_rgba(245,197,66,0.1),inset_0_0_30px_rgba(245,197,66,0.03)] hover:shadow-[0_0_40px_rgba(245,197,66,0.2),inset_0_0_40px_rgba(245,197,66,0.05)] transition-all duration-500">
      <div className="absolute top-0 right-0 p-6 opacity-20 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-12">
        <Zap className="w-32 h-32 text-maya-gold transform rotate-12" />
      </div>
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="mb-6">
          <Badge variant="gold" className="mb-3 text-[10px] tracking-widest uppercase">Most Popular</Badge>
          <h2 className="text-4xl font-bold text-maya-gold tracking-tight drop-shadow-[0_0_10px_rgba(245,197,66,0.4)] mb-1">
            VIP
          </h2>
          <div className="flex items-center gap-1.5 text-maya-gold opacity-90 text-sm">
            <Zap className="w-4 h-4 fill-current" />
            <span className="font-medium">Instant access</span>
          </div>
        </div>

        <div className="mb-6">
          <span className="text-3xl font-bold text-white">$1,799</span>
          <span className="text-muted-foreground text-sm">/mo</span>
        </div>

        <ul className="space-y-3 mb-8 flex-1">
          {[
            "Instant access to leads",
            "Priority placement",
            "1000 Leads / mo",
            "Webhook + Email delivery",
            "Priority support"
          ].map((feature, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-white/90">
              <Check className="w-4 h-4 text-maya-cyan shrink-0 mt-0.5" />
              {feature}
            </li>
          ))}
        </ul>

        <div className="mt-auto">
          <GlowButton variant="outline-gold" className="w-full mb-3 py-2 text-sm">
            Manage Subscription →
          </GlowButton>
          <p className="text-[11px] text-muted-foreground text-center">
            Renews Apr 15, 2026 · Visa ending 4242
          </p>
        </div>
      </div>
    </GlassCard>
  );
}
