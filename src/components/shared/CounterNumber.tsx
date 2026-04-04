import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

interface CounterNumberProps {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}

export function CounterNumber({ 
  value, 
  prefix = "", 
  suffix = "", 
  decimals = 0, 
  duration = 1.5,
  className 
}: CounterNumberProps) {
  const numRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    if (!numRef.current) return;

    const formatter = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
    
    // Set initial text to correctly formatted 0
    numRef.current.innerText = prefix + formatter.format(0) + suffix;

    const obj = { val: 0 };
    gsap.to(obj, {
      val: value,
      duration: duration,
      delay: 0.6,
      ease: "power2.out",
      onUpdate: () => {
        if (numRef.current) {
          numRef.current.innerText = prefix + formatter.format(obj.val) + suffix;
        }
      }
    });
  }, [value, prefix, suffix, decimals, duration]);

  return <span ref={numRef} className={cn("font-bold counter-number", className)} data-target={value} data-decimal={decimals > 0 ? "true" : "false"}>0</span>;
}
