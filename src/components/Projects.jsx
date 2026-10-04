import { FiArrowUpRight } from "react-icons/fi";
import { projects } from "../data/portfolio.js";
import Reveal from "./Reveal.jsx";

function ProjectVisual({ project }) {
  if (project.image) {
    return (
      <div className="overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
    );
  }

  // Abstract visual for projects without a screenshot: gradient panel,
  // subtle grid pattern and the tag initial.
  const initial = ((project.tag || project.title || "?").charAt(0) || "?").toUpperCase();
  return (
    <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-accentdeep/25 via-card to-night light:from-accent/20 light:via-paper light:to-cream">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "linear-gradient(rgba(52, 211, 153, 0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(52, 211, 153, 0.35) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
        <span className="select-none text-7xl font-extrabold tracking-tight text-accent/25">
          {initial}
        </span>
      </div>
      <div className="absolute bottom-3 left-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-muteddark light:text-mutedlight">
        {project.tag}
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="work" className="relative scroll-mt-20 px-6 py-24 md:px-12">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Selected Work
          </p>
          <h2 className="mt-3 text-3xl font-bold text-fog light:text-ink md:text-4xl">
            Things I've built
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal key={project.title} delay={Math.min(i * 0.07, 0.35)}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-card shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-glow light:border-ink/10 light:bg-paper">
                <ProjectVisual project={project} />
                <div className="flex flex-1 flex-col p-6">
                  <span className="inline-flex w-fit rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                    {project.tag}
                  </span>
                  <h3 className="mt-3 text-xl font-semibold text-fog light:text-ink">
                    {project.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muteddark light:text-mutedlight">
                    {project.description}
                  </p>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex w-fit items-center gap-1.5 rounded-full border border-accent/40 px-4 py-2 text-sm font-medium text-accent transition hover:bg-accent hover:text-night"
                  >
                    {project.linkLabel}
                    <FiArrowUpRight aria-hidden="true" />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
