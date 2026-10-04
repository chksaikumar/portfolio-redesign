import { motion, useReducedMotion } from "framer-motion";
import Reveal from "./Reveal.jsx";
import { experiences } from "../data/portfolio.js";

const BRANCH_COLORS = {
  main: "#34d399",
  "feature/ai-agent": "#7dd3fc",
  "hotfix/prod-fix": "#fbbf24",
};

// Commit dots drawn along the three branch lines: [cx, cy, branch, delay]
const DOTS = [
  [60, 75, "main", 0],
  [105, 75, "main", 0.5],
  [240, 75, "main", 1.0],
  [420, 75, "main", 1.5],
  [560, 75, "main", 2.0],
  [300, 32, "feature/ai-agent", 0.35],
  [400, 32, "feature/ai-agent", 1.1],
  [490, 32, "feature/ai-agent", 1.7],
  [430, 118, "hotfix/prod-fix", 0.8],
];

const JUNCTIONS = [
  [150, 75, "main"],
  [330, 75, "main"],
  [542, 75, "main"],
];

function GitGraph({ branches }) {
  const reduce = useReducedMotion();
  const lineClass = reduce ? "" : "git-dash";

  return (
    <div className="relative mt-7 overflow-hidden rounded-xl border border-white/10 bg-night/50 p-4 light:border-black/10 light:bg-white/60">
      <style>{`
        @keyframes gitdash { to { stroke-dashoffset: -28; } }
        .git-dash { stroke-dasharray: 7 7; animation: gitdash 1.3s linear infinite; }
      `}</style>

      <div className="mb-2 flex items-center justify-between font-mono text-[11px] text-muteddark light:text-mutedlight">
        <span>git log --graph</span>
        <span>{branches.length} branches</span>
      </div>

      <svg
        viewBox="0 0 600 150"
        className="h-[120px] w-full md:h-[140px]"
        role="img"
        aria-label={`Git branch graph showing ${branches.join(", ")}`}
      >
        {/* main: straight horizontal line */}
        <line
          x1="20"
          y1="75"
          x2="580"
          y2="75"
          fill="none"
          stroke={BRANCH_COLORS.main}
          strokeWidth="2.5"
          className={lineClass}
          opacity="0.9"
        />
        {/* feature/ai-agent: branches off upward */}
        <path
          d="M 150 75 C 185 75, 195 32, 235 32 L 520 32"
          fill="none"
          stroke={BRANCH_COLORS["feature/ai-agent"]}
          strokeWidth="2"
          className={lineClass}
          opacity="0.85"
        />
        {/* hotfix/prod-fix: branches off downward and merges back */}
        <path
          d="M 330 75 C 362 75, 368 118, 402 118 L 468 118 C 502 118, 508 75, 542 75"
          fill="none"
          stroke={BRANCH_COLORS["hotfix/prod-fix"]}
          strokeWidth="2"
          className={lineClass}
          opacity="0.85"
        />

        {/* branch / merge junction rings */}
        {JUNCTIONS.map(([cx, cy, branch], i) => (
          <circle
            key={`j-${i}`}
            cx={cx}
            cy={cy}
            r="6"
            fill="#05080a"
            stroke={BRANCH_COLORS[branch]}
            strokeWidth="2.5"
          />
        ))}

        {/* pulsing commit dots */}
        {DOTS.map(([cx, cy, branch, delay], i) => (
          <motion.circle
            key={`d-${i}`}
            cx={cx}
            cy={cy}
            r="4.5"
            fill={BRANCH_COLORS[branch]}
            style={{
              transformBox: "fill-box",
              transformOrigin: "center",
              filter: `drop-shadow(0 0 4px ${BRANCH_COLORS[branch]})`,
            }}
            initial={false}
            animate={
              reduce
                ? { opacity: 1, scale: 1 }
                : { opacity: [1, 0.3, 1], scale: [1, 1.6, 1] }
            }
            transition={
              reduce
                ? {}
                : { duration: 2.2, repeat: Infinity, delay, ease: "easeInOut" }
            }
          />
        ))}
      </svg>

      {/* branch labels as tiny mono pills */}
      <span className="absolute bottom-[10%] left-[3%] rounded-full border border-[#34d399]/50 bg-night/70 px-2.5 py-0.5 font-mono text-[10px] text-[#34d399] backdrop-blur-sm light:bg-white/80 md:text-[11px]">
        {branches[0]}
      </span>
      <span className="absolute right-[4%] top-[30%] rounded-full border border-[#7dd3fc]/50 bg-night/70 px-2.5 py-0.5 font-mono text-[10px] text-[#7dd3fc] backdrop-blur-sm light:bg-white/80 md:text-[11px]">
        {branches[1]}
      </span>
      <span className="absolute bottom-[10%] right-[10%] rounded-full border border-[#fbbf24]/50 bg-night/70 px-2.5 py-0.5 font-mono text-[10px] text-[#fbbf24] backdrop-blur-sm light:bg-white/80 md:text-[11px]">
        {branches[2]}
      </span>
    </div>
  );
}

const standardCard =
  "rounded-2xl border border-white/10 bg-card p-6 shadow-card light:border-black/10 light:bg-paper md:p-8";
const highlightCard =
  "rounded-2xl border border-accent/25 border-l-4 border-l-accent bg-[#0d1512] p-6 shadow-card light:bg-paper md:p-8";

export default function Experience() {
  return (
    <section id="experience" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">
            Experience
          </p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
            Where I&apos;ve shipped
          </h2>
        </Reveal>

        <div className="mt-12 space-y-6">
          {experiences.map((exp, i) => (
            <Reveal key={exp.company} delay={i * 0.08}>
              <article className={exp.highlight ? highlightCard : standardCard}>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-bold tracking-tight md:text-[28px]">
                      {exp.role}
                    </h3>
                    <p className="mt-1 text-lg font-medium text-accent">
                      {exp.company}
                    </p>
                  </div>
                  <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
                    {exp.type}
                  </span>
                </div>

                <p className="mt-2 flex items-center gap-2 text-sm text-muteddark light:text-mutedlight">
                  {exp.highlight && (
                    <span className="relative flex h-2 w-2" aria-hidden="true">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                    </span>
                  )}
                  <span>{exp.location}</span>
                  <span aria-hidden="true">·</span>
                  <span>{exp.period}</span>
                </p>

                <ul className="mt-5 space-y-2.5">
                  {exp.points.map((pt, j) => (
                    <li
                      key={j}
                      className="flex gap-3 text-[15px] leading-relaxed text-muteddark light:text-mutedlight"
                    >
                      <span
                        className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                        aria-hidden="true"
                      />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>

                {exp.gitGraph && <GitGraph branches={exp.gitGraph.branches} />}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
