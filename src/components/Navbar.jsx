import { useState } from "react";
import { FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi";
import { navLinks, profile } from "../data/portfolio.js";
import { useTheme } from "../theme/ThemeContext.jsx";

export default function Navbar() {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-night/70 backdrop-blur-md light:border-black/10 light:bg-cream/70">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Brand */}
        <a href="#top" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-sm font-bold text-accent ring-2 ring-accent/60">
            SK
          </span>
          <span className="hidden font-semibold text-fog sm:block light:text-ink">
            {profile.firstName}
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muteddark transition hover:text-accent light:text-mutedlight"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggle}
            aria-label="Toggle theme"
            className="rounded-full border border-white/10 p-2 text-fog transition hover:border-accent/50 hover:text-accent light:border-black/10 light:text-ink"
          >
            {theme === "dark" ? <FiSun size={17} /> : <FiMoon size={17} />}
          </button>
          <a
            href="#contact"
            className="hidden rounded-full bg-accent px-4 py-2 text-sm font-semibold text-night transition hover:bg-accent/90 md:inline-flex"
          >
            Contact
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="rounded-full border border-white/10 p-2 text-fog transition hover:text-accent md:hidden light:border-black/10 light:text-ink"
          >
            {open ? <FiX size={17} /> : <FiMenu size={17} />}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <div className="border-t border-white/10 bg-night/95 backdrop-blur-md md:hidden light:border-black/10 light:bg-cream/95">
          <div className="flex flex-col gap-1 px-4 py-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm text-fog transition hover:bg-white/5 hover:text-accent light:text-ink light:hover:bg-black/5"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
