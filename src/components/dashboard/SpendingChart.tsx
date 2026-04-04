import { GlassCard } from "@/components/shared/GlassCard";

export function SpendingChart() {
  const chartData = [
    { day: "Mon", value: 340, height: "40%" },
    { day: "Tue", value: 520, height: "60%" },
    { day: "Wed", value: 210, height: "25%" },
    { day: "Thu", value: 890, height: "95%" },
    { day: "Fri", value: 650, height: "75%" },
    { day: "Sat", value: 430, height: "50%" },
    { day: "Sun", value: 440, height: "52%" },
  ];

  return (
    <GlassCard className="p-6 chart-panel flex flex-col h-full w-full">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-lg font-semibold text-white">Spending Overview</h2>
        <div className="flex gap-2">
          {["7D", "30D", "90D"].map((period) => (
            <button
              key={period}
              className={`text-xs px-3 py-1 rounded-full ${
                period === "7D" 
                  ? "bg-maya-cyan text-[#0a0e1a] font-semibold" 
                  : "bg-white/5 text-muted-foreground hover:bg-white/10"
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 min-h-[220px] flex items-end gap-3 md:gap-6 relative group">
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-5">
          <div className="border-b border-white w-full h-0"></div>
          <div className="border-b border-white w-full h-0"></div>
          <div className="border-b border-white w-full h-0"></div>
        </div>

        {chartData.map((data, index) => (
          <div key={index} className="flex-1 flex flex-col items-center justify-end h-full gap-2 relative">
            <div className="w-full max-w-[40px] bg-white/5 rounded-t-lg relative group-hover:bg-white/10 transition-colors h-full flex items-end justify-center">
              <div 
                className="chart-bar w-full rounded-t-lg bg-gradient-to-t from-[#0077ff] to-maya-cyan opacity-80 hover:opacity-100 transition-opacity cursor-pointer glow-cyan"
                style={{ height: data.height }}
                title={`$${data.value}`}
              ></div>
            </div>
            <span className="text-xs text-muted-foreground">{data.day}</span>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-4 border-t border-white/5 flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-white text-sm font-medium tracking-wide">Total spent: $3,480.00</span>
          <span className="text-xs text-muted-foreground">Avg per lead: $8.65</span>
        </div>
        <span className="text-xs text-muted-foreground">Most active: Thursday</span>
      </div>
    </GlassCard>
  );
}
