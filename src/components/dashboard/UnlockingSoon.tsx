import { Clock, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/shared/Badge";

export function UnlockingSoon() {
  const leads = [
    { grade: "A+", gradeVariant: "gold" as const, init: "MG", type: "Online Buyer", credit: "684-710", price: "$8.75" },
    { grade: "A", gradeVariant: "cyan" as const, init: "TJ", type: "Walk-in", credit: "720-740", price: "$6.50" },
    { grade: "A+", gradeVariant: "gold" as const, init: "SB", type: "Online Buyer", credit: "650-670", price: "$8.75" },
    { grade: "A", gradeVariant: "cyan" as const, init: "AL", type: "Online Buyer", credit: "690-710", price: "$6.50" },
    { grade: "B", gradeVariant: "default" as const, init: "JW", type: "Phone Lead", credit: "620-640", price: "$4.25" },
  ];

  return (
    <div className="mb-8 relative z-0">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2 tracking-tight">
          <span className="text-lg">🔥</span> Leads Unlocking Soon
        </h2>
        <p className="text-sm text-muted-foreground">These leads will become available for your tier shortly</p>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-6 pt-2 hidden-scrollbar w-full">
        {leads.map((lead, i) => (
          <div key={i} className="unlock-card min-w-[220px] bg-[rgba(15,20,45,0.5)] border border-[rgba(245,197,66,0.15)] rounded-xl p-4 flex flex-col relative group hover:border-[#f5c542]/40 transition-colors shadow-lg cursor-pointer hover:-translate-y-1">
            <div className="flex justify-between items-start mb-3">
              <Badge variant={lead.gradeVariant} className="px-2">{lead.grade}</Badge>
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-semibold text-white">
                {lead.init}
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-xs text-muted-foreground mb-1">{lead.type}</p>
              <p className="text-[13px] text-white font-medium">Credit {lead.credit}</p>
            </div>

            <div className="flex justify-between items-end mt-auto">
              <span className="text-[15px] font-bold text-white">{lead.price}</span>
              <div className="flex items-center gap-1 text-maya-green">
                <CheckCircle2 className="w-3 h-3" />
                <span className="text-[11px] font-medium tracking-wide">Available Now</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
