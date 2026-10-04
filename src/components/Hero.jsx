import { useEffect, useRef } from "react";

export default function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const heroCopy = hero.querySelector(".hero-copyblock");
    const portrait = hero.querySelector(".portrait-wrap");
    let ticking = false;

    function updateScroll() {
      const y = window.scrollY;
      if (!reduce && window.innerWidth > 860) {
        const hp = Math.min(1, y / 620);
        heroCopy.style.transform = "translate3d(0," + -hp * 54 + "px,0)";
        heroCopy.style.opacity = String(1 - hp * 0.48);
        portrait.style.transform =
          "translate3d(0," + hp * 42 + "px,0) scale(" + (1 - hp * 0.035) + ")";
      } else {
        heroCopy.style.transform = "";
        heroCopy.style.opacity = "";
        portrait.style.transform = "";
      }
      ticking = false;
    }
    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(updateScroll);
        ticking = true;
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateScroll);
    updateScroll();

    // Portrait pointer tilt
    let onMove = null;
    let onLeave = null;
    if (!reduce && window.matchMedia("(pointer:fine)").matches) {
      const frame = portrait.querySelector(".portrait-frame");
      onMove = (e) => {
        const r = portrait.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        const nx = x - 0.5;
        const ny = y - 0.5;
        portrait.classList.add("is-active");
        frame.style.transform =
          "perspective(900px) rotateX(" + -ny * 7 + "deg) rotateY(" + nx * 9 + "deg)";
        frame.style.setProperty("--mx", x * 100 + "%");
        frame.style.setProperty("--my", y * 100 + "%");
        frame.style.setProperty("--px", nx * 8 + "px");
        frame.style.setProperty("--py", ny * 8 + "px");
      };
      onLeave = () => {
        portrait.classList.remove("is-active");
        frame.style.transform = "";
      };
      portrait.addEventListener("pointermove", onMove);
      portrait.addEventListener("pointerleave", onLeave);
    }
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateScroll);
      if (onMove) portrait.removeEventListener("pointermove", onMove);
      if (onLeave) portrait.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <>
      <header className="wrap hero" ref={heroRef}>
        <div className="hero-copyblock">
          <p className="eyebrow">Full-Stack Developer / Agentic AI Engineer</p>
          <h1>
            Saikumar <span>Chinthakayala</span>
          </h1>
          <p className="hero-copy">
            I build production-ready web applications and practical AI systems that turn repetitive
            engineering work into reliable, reusable workflows.
          </p>
          <div className="actions">
            <a className="btn" href="#projects">
              Explore selected work <span aria-hidden="true">↓</span>
            </a>
            <a className="btn secondary" href="#experience">
              View experience
            </a>
          </div>
        </div>
        <div className="portrait-wrap" aria-label="Interactive portrait and AI collaboration visual">
          <svg className="hero-board" viewBox="0 0 920 620" aria-hidden="true">
            <defs>
              <path id="hero-trace-agents" d="M0 108H96L126 138H232L270 176H336L378 218" />
              <path id="hero-trace-apis" d="M0 268H190L220 298H312L313 310" />
              <path id="hero-trace-cicd" d="M42 552H160L198 514H310L350 474L412 450" />
              <path id="hero-trace-mcp" d="M920 112H820L790 142H680L620 202L570 224" />
              <path id="hero-trace-llm" d="M920 468H800L766 434H660L620 394L598 386" />
              <path id="hero-profile-arc" d="M350 200A156 156 0 1 1 570 420" />
            </defs>
            <g>
              <use className="pcb-trace" href="#hero-trace-agents" />
              <use className="pcb-trace-live" href="#hero-trace-agents" />
              <use className="pcb-trace" href="#hero-trace-apis" />
              <use className="pcb-trace-live" href="#hero-trace-apis" />
              <use className="pcb-trace" href="#hero-trace-cicd" />
              <use className="pcb-trace-live" href="#hero-trace-cicd" />
              <use className="pcb-trace" href="#hero-trace-mcp" />
              <use className="pcb-trace-live" href="#hero-trace-mcp" />
              <use className="pcb-trace" href="#hero-trace-llm" />
              <use className="pcb-trace-live" href="#hero-trace-llm" />
              <path className="pcb-trace" d="M430 0V102L460 132V154" />
              <path className="pcb-trace-live" d="M430 0V102L460 132V154" />
              <path className="pcb-trace" d="M500 620V536L482 518V464" />
              <path className="pcb-trace-live" d="M500 620V536L482 518V464" />
            </g>
            <circle className="profile-ring" cx="460" cy="310" r="156" />
            <use className="profile-halo" href="#hero-profile-arc" />
            <use className="profile-arc" href="#hero-profile-arc" />
            <g>
              <circle className="pcb-pad" cx="126" cy="138" r="6" />
              <circle className="pcb-pad-core" cx="126" cy="138" r="2" />
              <circle className="pcb-pad" cx="220" cy="298" r="6" />
              <circle className="pcb-pad-core" cx="220" cy="298" r="2" />
              <circle className="pcb-pad" cx="198" cy="514" r="6" />
              <circle className="pcb-pad-core" cx="198" cy="514" r="2" />
              <circle className="pcb-pad" cx="790" cy="142" r="6" />
              <circle className="pcb-pad-core" cx="790" cy="142" r="2" />
              <circle className="pcb-pad" cx="766" cy="434" r="6" />
              <circle className="pcb-pad-core" cx="766" cy="434" r="2" />
            </g>
            <g className="pcb-label-group">
              <rect className="pcb-label-bg" x="142" y="119" width="88" height="25" rx="7" />
              <text className="pcb-label" x="154" y="136">
                AI AGENTS
              </text>
              <text className="pcb-micro" x="142" y="156">
                ORCHESTRATE
              </text>
            </g>
            <g className="pcb-label-group edge">
              <rect className="pcb-label-bg" x="232" y="278" width="56" height="25" rx="7" />
              <text className="pcb-label" x="246" y="295">
                APIs
              </text>
              <text className="pcb-micro" x="232" y="315">
                CONNECT
              </text>
            </g>
            <g className="pcb-label-group">
              <rect className="pcb-label-bg" x="210" y="491" width="62" height="25" rx="7" />
              <text className="pcb-label" x="223" y="508">
                CI/CD
              </text>
              <text className="pcb-micro" x="210" y="528">
                DELIVER
              </text>
            </g>
            <g className="pcb-label-group">
              <rect className="pcb-label-bg" x="718" y="152" width="58" height="25" rx="7" />
              <text className="pcb-label" x="733" y="169">
                MCP
              </text>
              <text className="pcb-micro" x="718" y="190">
                CONTEXT
              </text>
            </g>
            <g className="pcb-label-group edge">
              <rect className="pcb-label-bg" x="786" y="413" width="56" height="25" rx="7" />
              <text className="pcb-label" x="800" y="430">
                LLM
              </text>
              <text className="pcb-micro" x="786" y="450">
                REASON
              </text>
            </g>
            <g>
              <circle className="pcb-pulse" r="3">
                <animateMotion dur="7.4s" repeatCount="indefinite">
                  <mpath href="#hero-trace-agents" />
                </animateMotion>
              </circle>
              <circle className="pcb-pulse" r="3">
                <animateMotion dur="9.2s" begin="-3.5s" repeatCount="indefinite">
                  <mpath href="#hero-trace-apis" />
                </animateMotion>
              </circle>
              <circle className="pcb-pulse" r="3">
                <animateMotion dur="8.6s" begin="-5.4s" repeatCount="indefinite">
                  <mpath href="#hero-trace-cicd" />
                </animateMotion>
              </circle>
              <circle className="pcb-pulse" r="3">
                <animateMotion dur="7.9s" begin="-2.1s" repeatCount="indefinite">
                  <mpath href="#hero-trace-mcp" />
                </animateMotion>
              </circle>
              <circle className="pcb-pulse" r="3">
                <animateMotion dur="10.2s" begin="-6.8s" repeatCount="indefinite">
                  <mpath href="#hero-trace-llm" />
                </animateMotion>
              </circle>
              <circle className="pcb-pulse" r="3.5">
                <animateMotion dur="6.4s" repeatCount="indefinite">
                  <mpath href="#hero-profile-arc" />
                </animateMotion>
              </circle>
            </g>
          </svg>
          <svg className="hero-board-mobile" viewBox="0 0 340 360" aria-hidden="true">
            <defs>
              <path id="mobile-trace-agents" d="M98 27H113L126 44V72L139 101" />
              <path id="mobile-trace-mcp" d="M278 27H264L250 45V72L201 96" />
              <path id="mobile-trace-apis" d="M60 162H78L86 178" />
              <path id="mobile-trace-cicd" d="M170 326V286L170 268" />
              <path id="mobile-trace-llm" d="M286 162H264L254 178" />
              <path id="mobile-profile-arc" d="M139 101A86 86 0 1 1 201 264" />
            </defs>
            <circle className="mobile-ring" cx="170" cy="180" r="86" />
            <use className="mobile-arc" href="#mobile-profile-arc" />
            <g>
              <use className="mobile-trace" href="#mobile-trace-agents" />
              <use className="mobile-flow f1" href="#mobile-trace-agents" />
              <use className="mobile-trace" href="#mobile-trace-mcp" />
              <use className="mobile-flow f2" href="#mobile-trace-mcp" />
              <use className="mobile-trace" href="#mobile-trace-apis" />
              <use className="mobile-flow f3" href="#mobile-trace-apis" />
              <use className="mobile-trace" href="#mobile-trace-cicd" />
              <use className="mobile-flow f4" href="#mobile-trace-cicd" />
              <use className="mobile-trace" href="#mobile-trace-llm" />
              <use className="mobile-flow f5" href="#mobile-trace-llm" />
            </g>
            <g>
              <circle className="mobile-pulse" r="2.7">
                <animateMotion dur="3.6s" repeatCount="indefinite">
                  <mpath href="#mobile-trace-agents" />
                </animateMotion>
              </circle>
              <circle className="mobile-pulse" r="2.7">
                <animateMotion dur="4.2s" begin="-1.4s" repeatCount="indefinite">
                  <mpath href="#mobile-trace-mcp" />
                </animateMotion>
              </circle>
              <circle className="mobile-pulse" r="2.7">
                <animateMotion dur="3.9s" begin="-2.5s" repeatCount="indefinite">
                  <mpath href="#mobile-trace-apis" />
                </animateMotion>
              </circle>
              <circle className="mobile-pulse" r="2.7">
                <animateMotion dur="4.5s" begin="-.8s" repeatCount="indefinite">
                  <mpath href="#mobile-trace-cicd" />
                </animateMotion>
              </circle>
              <circle className="mobile-pulse" r="2.7">
                <animateMotion dur="4.1s" begin="-3.1s" repeatCount="indefinite">
                  <mpath href="#mobile-trace-llm" />
                </animateMotion>
              </circle>
            </g>
            <g>
              <circle className="mobile-pad" cx="98" cy="27" r="3.8" />
              <circle className="mobile-pad-core" cx="98" cy="27" r="1.5" />
              <circle className="mobile-pad" cx="278" cy="27" r="3.8" />
              <circle className="mobile-pad-core" cx="278" cy="27" r="1.5" />
              <circle className="mobile-pad" cx="60" cy="162" r="3.8" />
              <circle className="mobile-pad-core" cx="60" cy="162" r="1.5" />
              <circle className="mobile-pad" cx="170" cy="326" r="3.8" />
              <circle className="mobile-pad-core" cx="170" cy="326" r="1.5" />
              <circle className="mobile-pad" cx="286" cy="162" r="3.8" />
              <circle className="mobile-pad-core" cx="286" cy="162" r="1.5" />
            </g>
            <g>
              <rect className="mobile-node-bg" x="4" y="12" width="94" height="30" rx="7" />
              <text className="mobile-node-label" x="15" y="31">
                AI AGENTS
              </text>
              <rect className="mobile-node-bg" x="278" y="12" width="58" height="30" rx="7" />
              <text className="mobile-node-label" x="296" y="31">
                MCP
              </text>
              <rect className="mobile-node-bg" x="2" y="147" width="58" height="30" rx="7" />
              <text className="mobile-node-label" x="14" y="166">
                APIs
              </text>
              <rect className="mobile-node-bg" x="134" y="326" width="72" height="30" rx="7" />
              <text className="mobile-node-label" x="149" y="345">
                CI/CD
              </text>
              <rect className="mobile-node-bg" x="286" y="147" width="52" height="30" rx="7" />
              <text className="mobile-node-label" x="297" y="166">
                LLM
              </text>
            </g>
          </svg>
          <div className="portrait-frame">
            <img src="/assets/ref/portrait.png" alt="Portrait of Saikumar Chinthakayala" />
          </div>
          <div className="status">
            <i></i> Open to full-stack and AI roles
          </div>
          <div className="mobile-role-nodes" aria-hidden="true">
            <span>AI AGENTS</span>
            <span>APIs</span>
            <span>CI/CD</span>
            <span>MCP</span>
            <span>LLM</span>
          </div>
        </div>
        <a className="scroll-cue" href="#about">
          SCROLL TO EXPLORE
        </a>
      </header>
      <aside className="proof" aria-label="Professional summary">
        <div className="wrap proof-grid">
          <div className="proof-item">
            <strong>6+</strong>
            <span>years in software delivery</span>
          </div>
          <div className="proof-item">
            <strong>AI + MCP</strong>
            <span>agents, skills and automation</span>
          </div>
          <div className="proof-item">
            <strong>Java + React</strong>
            <span>enterprise full-stack systems</span>
          </div>
          <div className="proof-item">
            <strong>Cloud-ready</strong>
            <span>APIs, CI/CD and deployment</span>
          </div>
        </div>
      </aside>
    </>
  );
}
