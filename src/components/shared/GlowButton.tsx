import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface GlowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "cyan" | "gold" | "outline-cyan" | "outline-gold";
}

export function GlowButton({ children, className, variant = "cyan", ...props }: GlowButtonProps) {
  const baseStyles = "relative inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 overflow-hidden";
  
  const variantStyles = {
    "cyan": "bg-[#00d4ff]/10 text-[#00d4ff] border border-[#00d4ff] glow-cyan hover:bg-[#00d4ff] hover:text-[#0a0e1a]",
    "gold": "bg-[#f5c542]/10 text-[#f5c542] border border-[#f5c542] glow-gold hover:bg-[#f5c542] hover:text-[#0a0e1a]",
    "outline-cyan": "bg-transparent text-[#00d4ff] border border-[rgba(100,150,255,0.1)] hover:border-[#00d4ff] hover:bg-[#00d4ff] hover:text-[#0a0e1a]",
    "outline-gold": "bg-transparent text-[#f5c542] border border-[rgba(245,197,66,0.3)] hover:border-[#f5c542] hover:bg-[#f5c542] hover:text-[#0a0e1a]",
  };

  return (
    <button 
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}
