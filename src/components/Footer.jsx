import { FiLinkedin, FiGithub, FiMail } from "react-icons/fi";
import { profile } from "../data/portfolio.js";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 light:border-ink/10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-10 text-center md:flex-row md:justify-between md:text-left">
        <div>
          <p className="text-sm font-semibold text-fog light:text-ink">{profile.name}</p>
          <p className="mt-1 text-xs text-muteddark light:text-mutedlight">
            Full-Stack Developer / Agentic AI Engineer
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-muteddark transition hover:border-accent/40 hover:text-accent light:border-ink/10 light:text-mutedlight"
          >
            <FiLinkedin aria-hidden="true" />
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-muteddark transition hover:border-accent/40 hover:text-accent light:border-ink/10 light:text-mutedlight"
          >
            <FiGithub aria-hidden="true" />
          </a>
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-muteddark transition hover:border-accent/40 hover:text-accent light:border-ink/10 light:text-mutedlight"
          >
            <FiMail aria-hidden="true" />
          </a>
        </div>

        <p className="text-xs text-muteddark light:text-mutedlight">
          &copy; {year} {profile.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
