import { useEffect, useRef } from "react";

const GROUPS = [
  {
    title: "AI ENGINEERING",
    nav: "AI engineering",
    chips: [
      "Agentic AI Development",
      "AI Agents",
      "Model Context Protocol (MCP)",
      "LLM Applications",
      "Prompt Engineering",
      "Generative AI",
      "Retrieval-Augmented Generation (RAG)",
      "LangChain",
      "Large Language Models (LLM)",
    ],
  },
  {
    title: "BACKEND & DATA",
    nav: "Backend & data",
    chips: [
      "Java",
      "Spring Boot",
      "Python",
      "Node.js",
      "REST APIs",
      "GraphQL",
      "PostgreSQL",
      "MySQL",
      "MongoDB",
    ],
  },
  {
    title: "FRONTEND",
    nav: "Frontend",
    chips: [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Redux",
      "HTML",
      "CSS",
      "Tailwind CSS",
    ],
  },
  {
    title: "PLATFORMS & DELIVERY",
    nav: "Platforms & delivery",
    chips: ["AWS", "Google Cloud", "Docker", "CI/CD", "Git", "Shopify", "SharePoint"],
  },
];

export default function Skills() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const skillButtons = Array.from(section.querySelectorAll(".skill-nav button"));
    const skillGroups = Array.from(section.querySelectorAll(".skill-group"));
    const handlers = [];
    skillButtons.forEach((btn) => {
      btn.setAttribute("aria-pressed", "false");
      const onClick = () => {
        const selected = Number(btn.getAttribute("data-skill"));
        skillButtons.forEach((b) => {
          const on = b === btn;
          b.classList.toggle("active", on);
          b.setAttribute("aria-pressed", String(on));
        });
        skillGroups.forEach((group, i) => {
          group.classList.toggle("is-focused", i === selected);
          group.classList.toggle("is-muted", i !== selected);
        });
        if (window.innerWidth <= 860) {
          skillGroups[selected].scrollIntoView({
            behavior: reduce ? "auto" : "smooth",
            block: "center",
          });
        }
      };
      btn.addEventListener("click", onClick);
      handlers.push([btn, onClick]);
    });
    return () => handlers.forEach(([btn, h]) => btn.removeEventListener("click", h));
  }, []);

  return (
    <section id="skills" ref={sectionRef}>
      <div className="wrap skills-layout reveal">
        <div className="skills-copy">
          <p className="eyebrow">Capabilities</p>
          <h2>Depth across the stack. Curiosity beyond it.</h2>
          <p>
            From resilient backend services to polished interfaces, I work across the complete
            delivery path, with AI as a practical layer rather than a buzzword.
          </p>
          <div className="skill-nav" aria-label="Explore capability groups">
            {GROUPS.map((g, i) => (
              <button key={g.title} type="button" data-skill={i}>
                {g.nav}
              </button>
            ))}
          </div>
        </div>
        <div>
          {GROUPS.map((g) => (
            <div className="skill-group" key={g.title}>
              <h3>{g.title}</h3>
              <div className="chips">
                {g.chips.map((c) => (
                  <span className="chip" key={c}>
                    {c}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
