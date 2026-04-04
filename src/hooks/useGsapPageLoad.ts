import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export function useGsapPageLoad() {
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(".top-nav", { y: -20, opacity: 0, duration: 0.5 })
      .from(".sidebar", { x: -240, opacity: 0, duration: 0.5 }, 0.2)
      .from(".sidebar-item", { x: -20, opacity: 0, stagger: 0.05, duration: 0.3 }, 0.3)
      .from(".welcome-header", { y: 30, opacity: 0, duration: 0.5 }, 0.4)
      .from(".metric-card", { y: 40, opacity: 0, stagger: 0.1, duration: 0.6 }, 0.5)
      .from(".stats-bar", { y: 20, opacity: 0, duration: 0.5 }, 0.8)
      .from(".chart-panel", { y: 30, opacity: 0, duration: 0.6 }, 0.9)
      .from(".delivery-panel", { y: 30, opacity: 0, duration: 0.6 }, 0.9)
      .from(".chart-bar", { scaleY: 0, stagger: 0.1, duration: 0.8, transformOrigin: "bottom" }, 1.0)
      .from(".table-row-item", { x: -20, opacity: 0, stagger: 0.05, duration: 0.4 }, 1.2)
      .from(".subscription-card", { y: 30, opacity: 0, duration: 0.6 }, 1.5)
      .from(".quick-action", { scale: 0.9, opacity: 0, stagger: 0.1, duration: 0.5 }, 1.5)
      .from(".unlock-card", { x: 40, opacity: 0, stagger: 0.1, duration: 0.5 }, 1.7);
  });
}
