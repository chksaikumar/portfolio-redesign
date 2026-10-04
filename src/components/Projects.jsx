import { useEffect, useRef } from "react";

function JobHeistAbstract() {
  return (
    <div className="project-abstract" role="img" aria-label="Abstract workflow of matched candidates moving through a job application pipeline">
      <svg viewBox="0 0 640 360" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <path className="grid" d="M0 60H640M0 120H640M0 180H640M0 240H640M0 300H640M80 0V360M160 0V360M240 0V360M320 0V360M400 0V360M480 0V360M560 0V360" />
        <path className="route-muted" d="M80 180H560M320 55V305" />
        <path className="route" d="M90 180C165 180 155 102 242 102S329 180 402 180 450 266 548 266" />
        <g transform="translate(55 150)">
          <rect className="panel" width="105" height="60" rx="10" />
          <text className="micro" x="15" y="22">DISCOVER</text>
          <text className="label" x="15" y="43">roles</text>
        </g>
        <g transform="translate(266 70)">
          <rect className="panel" width="116" height="66" rx="10" />
          <text className="micro" x="15" y="24">MATCH</text>
          <text className="label" x="15" y="47">skills</text>
        </g>
        <g transform="translate(445 235)">
          <rect className="panel" width="126" height="66" rx="10" />
          <text className="micro" x="15" y="24">TRACK</text>
          <text className="label" x="15" y="47">applications</text>
        </g>
        <circle className="node" cx="242" cy="102" r="9" />
        <circle className="node-core" cx="242" cy="102" r="3" />
        <circle className="node pulse" cx="242" cy="102" r="13" />
        <circle className="node" cx="402" cy="180" r="9" />
        <circle className="node-core" cx="402" cy="180" r="3" />
        <circle className="node pulse p2" cx="402" cy="180" r="13" />
      </svg>
    </div>
  );
}

function RecommendationAbstract() {
  return (
    <div className="project-abstract recommendation" role="img" aria-label="Abstract recommendation engine connecting user signals to ranked suggestions">
      <svg viewBox="0 0 640 360" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <path className="grid" d="M0 60H640M0 120H640M0 180H640M0 240H640M0 300H640M80 0V360M160 0V360M240 0V360M320 0V360M400 0V360M480 0V360M560 0V360" />
        <g transform="translate(48 66)">
          <rect className="panel" width="142" height="228" rx="18" />
          <text className="micro" x="24" y="35">USER SIGNALS</text>
          <circle className="node" cx="38" cy="80" r="9" />
          <circle className="node" cx="38" cy="126" r="9" />
          <circle className="node" cx="38" cy="172" r="9" />
          <path className="route-muted" d="M58 80H112M58 126H101M58 172H121" />
        </g>
        <path className="route" d="M190 146C250 146 246 96 312 96M190 180H312M190 214C250 214 246 264 312 264" />
        <g transform="translate(282 61)">
          <rect className="panel" width="92" height="238" rx="28" />
          <circle className="node pulse" cx="46" cy="47" r="17" />
          <circle className="node pulse p2" cx="46" cy="119" r="17" />
          <circle className="node pulse p3" cx="46" cy="191" r="17" />
          <circle className="node-core" cx="46" cy="47" r="7" />
          <circle className="node-core" cx="46" cy="119" r="7" />
          <circle className="node-core" cx="46" cy="191" r="7" />
        </g>
        <path className="route" d="M374 108C436 108 429 82 482 82M374 180H508M374 252C436 252 429 278 482 278" />
        <g transform="translate(474 50)">
          <rect className="panel" width="120" height="260" rx="16" />
          <text className="micro" x="18" y="31">RANKED</text>
          <text className="label" x="18" y="57">01</text>
          <path className="route-muted" d="M52 53H98" />
          <text className="label" x="18" y="116">02</text>
          <path className="route-muted" d="M52 112H88" />
          <text className="label" x="18" y="175">03</text>
          <path className="route-muted" d="M52 171H104" />
          <text className="label" x="18" y="234">04</text>
          <path className="route-muted" d="M52 230H81" />
        </g>
      </svg>
    </div>
  );
}

const PROJECTS = [
  {
    num: "01 · AI PRODUCT",
    title: "NetflixGemini",
    desc: "A Netflix-style React movie app with Google Gemini AI integration that recommends movies from natural-language mood and genre requests.",
    tags: ["REACT", "GEMINI", "FIREBASE", "REDUX"],
    img: "/assets/ref/proj-netflix.webp",
    alt: "NetflixGemini movie discovery interface with AI search and movie recommendations",
  },
  {
    num: "02 · COMMERCE",
    title: "FoodOrdering",
    desc: "A responsive Swiggy-style app using public restaurant APIs for menus and offers, with a Context API cart, React Router and lazy loading.",
    tags: ["REACT", "CONTEXT API", "REST APIS", "LAZY LOADING"],
    img: "/assets/ref/proj-food.webp",
    alt: "FoodOrdering restaurant discovery interface showing search, restaurant cards, ratings and delivery times",
  },
  {
    num: "03 · E-COMMERCE",
    title: "CRP Clothing",
    desc: "A functional React commerce app with a product catalog, dynamic cart, secure checkout, online payments, Context API and routing.",
    tags: ["REACT", "CONTEXT API", "PAYMENTS", "ROUTING"],
    img: "/assets/ref/proj-crp.webp",
    alt: "CRP Clothing storefront with category tiles for hats, jackets, sneakers, womenswear and menswear",
  },
  {
    num: "04 · DEVELOPER TOOL",
    title: "GitHub Profile Viewer",
    desc: "A focused React app that fetches and presents GitHub user profiles, biographies, locations and repository counts against an animated gradient canvas.",
    tags: ["REACT", "GITHUB API", "ASYNC DATA", "RESPONSIVE UI"],
    img: "/assets/ref/proj-ghviewer.webp",
    alt: "GitHub Profile Viewer displaying a searched user profile, biography, location and repository count",
  },
  {
    num: "05 · FULL STACK",
    title: "Job Heist",
    desc: "A MERN student job portal with listings, search filters, authentication, application tracking and REST APIs.",
    tags: ["MONGODB", "EXPRESS", "REACT", "NODE.JS"],
    abstract: <JobHeistAbstract />,
  },
  {
    num: "06 · MACHINE LEARNING",
    title: "AI-Powered Recommendation Engine",
    desc: "A recommendation system using Python, Pandas and Scikit-learn for predictive modeling, with a React frontend served through a Flask REST API.",
    tags: ["PYTHON", "SCIKIT-LEARN", "FLASK", "REACT"],
    abstract: <RecommendationAbstract />,
  },
];

export default function Projects() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer:fine)").matches;
    const handlers = [];
    // Reveal stagger delay + keyboard focusability, exactly as the reference.
    section.querySelectorAll(".project").forEach((el, i) => {
      el.style.setProperty("--delay", (i % 2) * 90 + "ms");
      el.setAttribute("tabindex", "0");
      if (!reduce && fine) {
        const onMove = (e) => {
          const r = el.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - 0.5;
          const y = (e.clientY - r.top) / r.height - 0.5;
          el.style.transform =
            "perspective(1200px) rotateX(" + -y * 2.2 + "deg) rotateY(" + x * 2.8 + "deg) translateY(-2px)";
        };
        const onLeave = () => {
          el.style.transform = "";
        };
        el.addEventListener("pointermove", onMove);
        el.addEventListener("pointerleave", onLeave);
        handlers.push([el, onMove, onLeave]);
      }
    });
    return () => handlers.forEach(([el, m, l]) => {
      el.removeEventListener("pointermove", m);
      el.removeEventListener("pointerleave", l);
    });
  }, []);

  return (
    <section className="projects" id="projects" ref={sectionRef}>
      <div className="wrap">
        <div className="section-head reveal">
          <h2>Selected work</h2>
          <p>Projects spanning commerce, content platforms and AI-assisted product experiences.</p>
        </div>
        <div className="projects-list">
          {PROJECTS.map((p) => (
            <article className="project reveal" key={p.title}>
              <div className="project-media">
                {p.img ? <img src={p.img} alt={p.alt} /> : p.abstract}
              </div>
              <div className="project-copy">
                <span className="project-num">{p.num}</span>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <div className="tags">
                  {p.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
