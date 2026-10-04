import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { floatingLogos } from "../data/portfolio.js";

// Distinct pill styling per logo, plus a fixed spot on the page.
// Only rendered once the user has scrolled past the hero.
const badgeConfig = [
  {
    name: "ChatGPT",
    pill: "bg-black/70 text-fog border-white/15",
    pos: "left-[6%] top-[28%]",
    delay: "0s",
    duration: "20s",
  },
  {
    name: "Claude",
    pill: "bg-orange-500/10 text-orange-300 border-orange-400/30",
    pos: "right-[7%] top-[52%]",
    delay: "4s",
    duration: "24s",
  },
  {
    name: "Claude Code",
    pill: "bg-amber-500/10 text-amber-300 border-amber-400/30",
    pos: "left-[10%] top-[72%]",
    delay: "8s",
    duration: "22s",
  },
  {
    name: "GitHub Copilot",
    pill: "bg-blue-500/10 text-blue-300 border-blue-400/30",
    pos: "right-[10%] top-[30%]",
    delay: "12s",
    duration: "26s",
  },
];

export default function FloatingLogos() {
  const [pastHero, setPastHero] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      setPastHero(window.scrollY > 0.9 * window.innerHeight);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!pastHero) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-10 overflow-hidden">
      {floatingLogos.map((logo) => {
        const config = badgeConfig.find((c) => c.name === logo) ?? badgeConfig[0];
        return (
          <span
            key={logo}
            className={`absolute rounded-full border px-3.5 py-1.5 text-xs font-semibold backdrop-blur-sm ${
              config.pos
            } ${config.pill} ${reduceMotion ? "" : "animate-drift"}`}
            style={
              reduceMotion
                ? undefined
                : { animationDelay: config.delay, animationDuration: config.duration }
            }
          >
            {logo}
          </span>
        );
      })}
    </div>
  );
}
