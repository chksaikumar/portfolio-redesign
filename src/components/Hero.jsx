import { useReducedMotion } from "framer-motion";
import { profile, heroNodes } from "../data/portfolio.js";
import Reveal from "./Reveal.jsx";

/* Desktop circuit geometry: 560x560 stage, portrait centered at (280,280) r=160 */
const CIRCUIT_NODES = [
  { label: "AI Agents", left: "50%", top: "6%", d: "M 280 62 C 280 82, 280 100, 280 118", jx: 280, jy: 118 },
  { label: "APIs", left: "87%", top: "29%", d: "M 478 172 C 460 182, 442 194, 424 205", jx: 424, jy: 205 },
  { label: "CI/CD", left: "80%", top: "79%", d: "M 441 433 C 427 422, 412 407, 398 392", jx: 398, jy: 392 },
  { label: "MCP", left: "20%", top: "79%", d: "M 119 433 C 133 422, 148 407, 162 392", jx: 162, jy: 392 },
  { label: "LLM", left: "13%", top: "29%", d: "M 82 172 C 100 182, 118 194, 136 205", jx: 136, jy: 205 },
];

const nodePill =
  "rounded-full border border-accent/30 bg-accent/5 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-fog light:text-ink";

function CircuitPortrait() {
  const reduce = useReducedMotion();

  return (
    <div className="relative flex justify-center">
      {/* Mobile: portrait, then a schematic row of node pills with short trace stubs */}
      <div className="relative flex flex-col items-center lg:hidden">
        <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
        <img
          src={profile.portrait}
          alt={`Portrait of ${profile.name}`}
          className="relative h-64 w-64 rounded-full object-cover ring-2 ring-accent/40 shadow-glow sm:h-72 sm:w-72"
        />
        <div className="relative mt-8 flex max-w-xs flex-wrap items-center justify-center gap-x-3 gap-y-2">
          {heroNodes.map((node) => (
            <span key={node} className="flex items-center gap-1.5">
              <svg width="26" height="12" viewBox="0 0 26 12" aria-hidden="true">
                <path d="M1 6 H19" stroke="rgba(52,211,153,0.45)" strokeWidth="1.5" />
                <circle cx="21" cy="6" r="2.5" fill="#34d399" />
              </svg>
              <span className={nodePill}>{node}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Desktop: nodes orbit the portrait, traces converge into it */}
      <div className="relative hidden h-[560px] w-[560px] lg:block">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl" />
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 560 560"
          fill="none"
          aria-hidden="true"
        >
          <circle
            cx="280"
            cy="280"
            r="172"
            stroke="rgba(52,211,153,0.18)"
            strokeWidth="1.5"
            strokeDasharray="4 8"
          />
          {CIRCUIT_NODES.map((node) => (
            <path
              key={node.label}
              d={node.d}
              stroke="rgba(52,211,153,0.3)"
              strokeWidth="1.5"
            />
          ))}
          {CIRCUIT_NODES.map((node) => (
            <circle
              key={`${node.label}-joint`}
              cx={node.jx}
              cy={node.jy}
              r="3"
              fill="rgba(52,211,153,0.6)"
            />
          ))}
          {!reduce &&
            CIRCUIT_NODES.map((node, i) => (
              <circle
                key={`${node.label}-travel`}
                r="3.5"
                fill="#34d399"
                className="travel-dot"
                style={{
                  offsetPath: `path('${node.d}')`,
                  animationDelay: `${i * 0.9}s`,
                  filter: "drop-shadow(0 0 6px #34d399)",
                }}
              />
            ))}
        </svg>
        <img
          src={profile.portrait}
          alt={`Portrait of ${profile.name}`}
          className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full object-cover ring-2 ring-accent/40 shadow-glow"
        />
        {CIRCUIT_NODES.map((node) => (
          <span
            key={node.label}
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/30 bg-night/80 px-3 py-1.5 text-[10px] font-medium uppercase tracking-wider text-fog backdrop-blur light:bg-paper/90 light:text-ink"
            style={{ left: node.left, top: node.top }}
          >
            {node.label}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden pb-16 pt-24">
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
        {/* Text column */}
        <Reveal>
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs text-fog light:text-ink">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              {profile.badge}
            </span>

            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-accent sm:text-sm">
              {profile.role} / {profile.roleAI}
            </p>

            <h1 className="mt-4 text-5xl font-bold tracking-tight text-fog sm:text-6xl xl:text-7xl light:text-ink">
              {profile.firstName}
              <br />
              <span className="bg-gradient-to-r from-accent to-teal-200 bg-clip-text text-transparent">
                {profile.lastName}
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-base text-muteddark sm:text-lg light:text-mutedlight">
              {profile.tagline}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#work"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-night shadow-glow transition hover:bg-accent/90"
              >
                Explore selected work <span aria-hidden="true">&darr;</span>
              </a>
              <a
                href="#experience"
                className="inline-flex items-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-fog transition hover:border-accent/60 hover:text-accent light:border-black/20 light:text-ink"
              >
                View experience
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-y-6">
              {profile.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="min-w-[110px] flex-1 border-l border-white/10 px-5 first:border-l-0 first:pl-0 light:border-black/10"
                >
                  <p className="text-2xl font-bold text-fog light:text-ink">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs text-muteddark light:text-mutedlight">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Circuit portrait */}
        <Reveal delay={0.15}>
          <CircuitPortrait />
        </Reveal>
      </div>
    </section>
  );
}
