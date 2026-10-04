import { FiCpu } from "react-icons/fi";
import Reveal from "./Reveal.jsx";
import { aiSkills, stackSkills } from "../data/portfolio.js";

export default function Skills() {
  return (
    <section id="skills" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">
            Skills
          </p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
            AI-first, full-stack deep
          </h2>
        </Reveal>

        {/* AI Expertise group */}
        <Reveal className="mt-12">
          <div className="rounded-2xl border border-accent/20 bg-gradient-to-r from-accent/15 via-accent/5 to-transparent p-6 md:p-8">
            <h3 className="flex items-center gap-3 text-xl font-semibold tracking-tight">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/15 text-accent">
                <FiCpu className="h-5 w-5" aria-hidden="true" />
              </span>
              AI Expertise
            </h3>
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {aiSkills.map((skill) => (
                <div
                  key={skill}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-card p-4 shadow-card transition hover:border-accent/40 light:border-black/10 light:bg-paper"
                >
                  <span
                    className="h-2 w-2 shrink-0 rounded-full bg-accent shadow-glow"
                    aria-hidden="true"
                  />
                  <span className="text-[15px] font-medium">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Broader stack group */}
        <Reveal className="mt-12">
          <h3 className="text-xl font-semibold tracking-tight">Broader stack</h3>
          <div className="mt-5 flex flex-wrap gap-2.5">
            {stackSkills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-white/10 bg-card/70 px-4 py-1.5 text-sm text-muteddark transition hover:border-accent/40 light:border-black/10 light:bg-paper light:text-mutedlight"
              >
                {skill}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
