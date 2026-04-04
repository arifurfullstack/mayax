import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hoverGlow?: "cyan" | "purple" | "gold" | "green" | "pink" | "none";
}

export function GlassCard({ children, className, hoverGlow = "none" }: GlassCardProps) {
  return (
    <div 
      className={cn(
        "glass",
        hoverGlow !== "none" && "glass-card-hover",
        hoverGlow !== "none" && `hover:glow-${hoverGlow}`,
        className
      )}
    >
      {children}
    </div>
  );
}
