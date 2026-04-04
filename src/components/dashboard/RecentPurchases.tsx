import { GlassCard } from "@/components/shared/GlassCard";
import { Badge } from "@/components/shared/Badge";
import { GlowButton } from "@/components/shared/GlowButton";
import { Phone, Mail, Car, ChevronDown } from "lucide-react";

export function RecentPurchases() {
  const leads = [
    {
      id: 1,
      type: "Verified · Auto Loan",
      name: "Michael R.",
      phone: "+1 (555) 234-5678",
      email: "m.roberts@email.com",
      vehicle: "2023 Honda CR-V EX-L",
      mileage: "12,400 mi",
      income: "$72k/yr",
      credit: "710",
      price: "$8.75",
      time: "7 minutes ago",
      status: "Delivered",
      statusVariant: "green" as const,
    },
    {
      id: 2,
      type: "Verified · Auto Loan",
      name: "Sarah J.",
      phone: "+1 (555) 876-5432",
      email: "sarah.j77@email.com",
      vehicle: "2021 Toyota RAV4",
      mileage: "34,200 mi",
      income: "$65k/yr",
      credit: "680",
      price: "$8.75",
      time: "24 minutes ago",
      status: "Pending",
      statusVariant: "amber" as const,
    },
    {
      id: 3,
      type: "Standard · Inquiry",
      name: "David T.",
      phone: "+1 (555) 111-2222",
      email: "david.t@email.com",
      vehicle: "2019 Ford F-150 XLT",
      mileage: "58,000 mi",
      income: "$85k/yr",
      credit: "740",
      price: "$5.50",
      time: "1 hour ago",
      status: "Delivered",
      statusVariant: "green" as const,
    },
    {
      id: 4,
      type: "Verified · Auto Loan",
      name: "Amanda W.",
      phone: "+1 (555) 999-8888",
      email: "awilliams@email.com",
      vehicle: "2024 Subaru Outback",
      mileage: "2,100 mi",
      income: "$90k/yr",
      credit: "725",
      price: "$8.75",
      time: "2 hours ago",
      status: "Failed",
      statusVariant: "red" as const,
    }
  ];

  return (
    <GlassCard className="w-full overflow-hidden mb-8">
      <div className="p-6 pb-0 flex justify-between items-center border-b border-white/5">
        <h2 className="text-lg font-semibold text-white mb-4">Recent Purchases</h2>
        <div className="flex items-center gap-4 mb-4">
          <div className="flex bg-white/5 rounded-lg p-1">
            {["All", "Delivered", "Pending", "Failed"].map((tab) => (
              <button
                key={tab}
                className={`text-xs px-3 py-1.5 rounded-md transition-colors ${
                  tab === "All" ? "bg-white/10 text-white" : "text-muted-foreground hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <a href="/purchases" className="text-sm text-maya-cyan hover:underline hidden sm:block">View All →</a>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[rgba(100,150,255,0.05)] text-[11px] uppercase tracking-wider text-muted-foreground">
              <th className="px-6 py-4 font-medium">Type of Lead</th>
              <th className="px-6 py-4 font-medium">Contact Information</th>
              <th className="px-6 py-4 font-medium">Vehicle</th>
              <th className="px-6 py-4 font-medium text-right">Price</th>
              <th className="px-6 py-4 font-medium">Time / Status</th>
              <th className="px-6 py-4 font-medium text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr 
                key={lead.id} 
                className="group border-b border-[rgba(100,150,255,0.05)] hover:bg-maya-cyan/5 transition-colors table-row-item relative"
              >
                <td className="px-6 py-4 relative">
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-maya-cyan opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <Badge variant="green" className="font-medium whitespace-nowrap">{lead.type}</Badge>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-sm text-white font-medium">{lead.name}</span>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Phone className="w-3 h-3" /> {lead.phone}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Mail className="w-3 h-3" /> {lead.email}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-sm text-white flex items-center gap-1.5">
                      <Car className="w-4 h-4 text-maya-cyan" /> {lead.vehicle}
                    </span>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">
                      {lead.mileage} &middot; {lead.income} &middot; Credit {lead.credit}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <span className="text-sm font-bold text-white">{lead.price}</span>
                    <span className="text-maya-green text-[10px]">✓</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-1.5 items-start">
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{lead.time}</span>
                    <Badge variant={lead.statusVariant} className="text-[10px] py-0">{lead.status}</Badge>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <GlowButton variant="outline-cyan" className="py-1 px-3 text-[11px] whitespace-nowrap uppercase tracking-wider">
                    View Details
                  </GlowButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 border-t border-[rgba(100,150,255,0.05)] flex justify-between items-center text-xs text-muted-foreground">
        <div>1-4 of 647</div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button className="hover:text-white transition-colors">&lt;</button>
            <button className="bg-maya-cyan/20 text-maya-cyan w-6 h-6 rounded flex items-center justify-center font-medium">1</button>
            <button className="hover:text-white transition-colors w-6 h-6 flex items-center justify-center">2</button>
            <button className="hover:text-white transition-colors w-6 h-6 flex items-center justify-center">3</button>
            <span>...</span>
            <button className="hover:text-white transition-colors w-6 h-6 flex items-center justify-center">25</button>
            <button className="hover:text-white transition-colors">&gt;</button>
          </div>
          <div className="flex items-center gap-2 border-l border-white/10 pl-4 hidden sm:flex">
            <span>Filter: page 25</span>
            <ChevronDown className="w-3 h-3" />
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
