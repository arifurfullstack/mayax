import { GlassCard } from "@/components/shared/GlassCard";
import { Badge } from "@/components/shared/Badge";
import { ExternalLink, Mail, Webhook, AlertCircle } from "lucide-react";

export function DeliveryHealth() {
  const deliveries = [
    { id: "MLH-2084", type: "Email", icon: Mail, status: "Delivered", time: "7 min ago", variant: "green" as const },
    { id: "MLH-2081", type: "Webhook", icon: Webhook, status: "Delivered", time: "5 min ago", variant: "green" as const },
    { id: "MLH-2079", type: "Webhook", icon: Webhook, status: "Failed", time: "7 min ago", variant: "red" as const },
  ];

  return (
    <GlassCard className="p-6 delivery-panel flex flex-col h-full w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-white">Delivery Health</h2>
      </div>

      <div className="flex gap-2 mb-8 justify-center">
        <Badge variant="green" className="font-normal text-[10px] py-1 px-2.5">✅ 142 Delivered</Badge>
        <Badge variant="amber" className="font-normal text-[10px] py-1 px-2.5">⏳ 3 Pending</Badge>
        <Badge variant="red" className="font-normal text-[10px] py-1 px-2.5">❌ 2 Failed</Badge>
      </div>

      <div className="relative flex justify-center mb-8">
        <svg className="w-[140px] h-[140px] transform -rotate-90">
          <circle
            cx="70"
            cy="70"
            r="60"
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="10"
          />
          <circle
            className="text-maya-cyan stroke-current drop-shadow-[0_0_10px_rgba(0,212,255,0.4)] transition-all duration-1000 ease-out delivery-ring"
            cx="70"
            cy="70"
            r="60"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray="377"
            strokeDashoffset="11.3" /* 377 - (377 * 0.97) */
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00d4ff" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center mt-1">
          <span className="text-3xl font-bold text-white tracking-tighter">97%</span>
          <span className="text-[9px] text-muted-foreground text-center leading-[1.1] mt-0.5 uppercase tracking-wider">Success<br/>Rate</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-2.5 justify-end">
        {deliveries.map((delivery, i) => (
          <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-white/5 border border-white/5">
            <div className="flex items-center gap-2">
              <span className="text-xs text-white font-medium">{delivery.id}</span>
              <span className="text-muted-foreground text-xs">→</span>
              <delivery.icon className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{delivery.type}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className={`text-[10px] font-medium ${delivery.variant === 'red' ? 'text-destructive' : 'text-maya-green'}`}>
                {delivery.status === "Delivered" ? "✅" : "❌"} {delivery.status}
              </span>
              <span className="text-[10px] text-muted-foreground">— {delivery.time}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-start gap-2">
        <AlertCircle className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="text-xs text-orange-400 font-medium mb-0.5">2 deliveries failed.</p>
          <a href="/settings" className="text-[11px] text-orange-400 hover:text-orange-300 underline underline-offset-2 flex items-center gap-1">
            Check webhook settings <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </GlassCard>
  );
}
