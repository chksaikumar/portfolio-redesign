import { useEffect, useRef } from "react";
import { useTheme } from "../theme/ThemeContext.jsx";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#certifications", label: "Certifications" },
  { href: "#projects", label: "Work" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const { theme, toggle } = useTheme();
  const navRef = useRef(null);
  const dark = theme === "dark";

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const progress = nav.querySelector(".scroll-progress");
    const links = Array.from(nav.querySelectorAll(".nav-links a"));
    const menu = nav.querySelector(".menu");
    const linkList = nav.querySelector(".nav-links");
    const sections = LINKS.map((l) => document.querySelector(l.href)).filter(Boolean);
    let ticking = false;

    function update() {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const y = window.scrollY;
      if (progress) progress.style.transform = "scaleX(" + Math.min(1, y / max) + ")";
      let current = null;
      const probe = y + window.innerHeight * 0.32;
      for (const s of sections) {
        if (s.offsetTop <= probe) current = s;
      }
      links.forEach((a) =>
        a.classList.toggle("active", current ? a.getAttribute("href") === "#" + current.id : false)
      );
      ticking = false;
    }
    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }
    function onMenu() {
      const open = linkList.classList.toggle("open");
      menu.setAttribute("aria-expanded", String(open));
      menu.textContent = open ? "\u00d7" : "\u2630";
    }
    function onLinks() {
      linkList.classList.remove("open");
      menu.setAttribute("aria-expanded", "false");
      menu.textContent = "\u2630";
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    menu.addEventListener("click", onMenu);
    linkList.addEventListener("click", onLinks);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      menu.removeEventListener("click", onMenu);
      linkList.removeEventListener("click", onLinks);
    };
  }, []);

  return (
    <nav className="site-nav" ref={navRef} aria-label="Primary navigation">
      <div className="wrap nav-inner">
        <button className="menu" type="button" aria-label="Toggle navigation" aria-expanded="false">
          {"\u2630"}
        </button>
        <div className="nav-links">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </div>
        <button
          className="theme-toggle"
          type="button"
          onClick={toggle}
          aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
          aria-pressed={String(dark)}
          title={dark ? "Switch to light mode" : "Switch to dark mode"}
        >
          <svg className="sun-icon" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="3.5" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42" />
          </svg>
          <svg className="moon-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20 15.2A8.2 8.2 0 0 1 8.8 4 8.2 8.2 0 1 0 20 15.2Z" />
          </svg>
        </button>
        <a className="nav-cta" href="mailto:chksaikumar@gmail.com">
          Let&rsquo;s talk <span aria-hidden="true">↗</span>
        </a>
        <div className="scroll-progress" aria-hidden="true"></div>
      </div>
    </nav>
  );
}
