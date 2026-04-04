import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "cyan" | "purple" | "gold" | "green" | "red" | "amber";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  const variantStyles = {
    default: "bg-white/10 text-white",
    cyan: "bg-[#00d4ff]/20 text-[#00d4ff] border border-[#00d4ff]/30",
    purple: "bg-[#a855f7]/20 text-[#a855f7] border border-[#a855f7]/30",
    gold: "bg-[#f5c542]/20 text-[#f5c542] border border-[#f5c542]/30",
    green: "bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/30",
    red: "bg-destructive/20 text-destructive border border-destructive/30",
    amber: "bg-orange-500/20 text-orange-500 border border-orange-500/30",
  };

  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors", variantStyles[variant], className)}>
      {children}
    </span>
  );
}
