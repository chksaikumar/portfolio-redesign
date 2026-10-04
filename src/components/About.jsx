import Reveal from "./Reveal.jsx";
import { about } from "../data/portfolio.js";

const cardBase =
  "h-full rounded-2xl border border-white/10 bg-card p-6 shadow-card light:border-black/10 light:bg-paper";

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">
            About
          </p>
          <h2 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">
            {about.heading}
          </h2>
        </Reveal>

        {/* Story cards */}
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {about.story.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.1}>
              <article className={cardBase}>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muteddark light:text-mutedlight">
                  {item.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Workflow tiles */}
        <Reveal className="mt-16">
          <h3 className="text-xl font-semibold tracking-tight">How I work</h3>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {about.workflow.map((step, i) => (
              <article key={step.title} className={cardBase}>
                <span className="font-mono text-3xl font-bold text-accent" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h4 className="mt-4 text-lg font-semibold">{step.title}</h4>
                <p className="mt-2 text-[15px] leading-relaxed text-muteddark light:text-mutedlight">
                  {step.body}
                </p>
              </article>
            ))}
          </div>
        </Reveal>

        {/* Technology chips */}
        <Reveal className="mt-16">
          <h3 className="text-xl font-semibold tracking-tight">Core toolbox</h3>
          <div className="mt-6 flex flex-wrap gap-2.5">
            {about.chips.map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-accent/30 bg-accent/5 px-4 py-1.5 text-sm text-fog light:text-ink"
              >
                {chip}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
