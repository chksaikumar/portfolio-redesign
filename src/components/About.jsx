export default function About() {
  return (
    <section className="about" id="about">
      <div className="wrap">
        <div className="about-intro">
          <div>
            <p className="eyebrow">The engineer behind the work</p>
            <h2>
              Full-stack at the core. <span>AI in the workflow.</span>
            </h2>
          </div>
          <p className="about-lede">
            I turn complex product work and repeated engineering tasks into systems that are clean,
            maintainable and easier to operate.
          </p>
        </div>

        <div className="about-stage">
          <div className="about-visual">
            <div className="about-portrait">
              <svg
                className="role-backdrop"
                viewBox="0 0 520 570"
                preserveAspectRatio="xMidYMid slice"
                aria-hidden="true"
              >
                <defs>
                  <radialGradient id="git-ambient" cx="58%" cy="35%" r="66%">
                    <stop offset="0" stopColor="#65d6ad" stopOpacity=".2" />
                    <stop offset="1" stopColor="#65d6ad" stopOpacity="0" />
                  </radialGradient>
                  <path
                    id="feature-path"
                    d="M136 124 C205 124 204 177 275 177 S353 225 353 254 C353 301 272 315 136 315"
                  />
                  <path id="hotfix-path" d="M136 224 C91 224 70 245 70 274 C70 305 94 327 136 327" />
                </defs>
                <rect className="git-ambient" width="520" height="430" />
                <g className="git-grid">
                  <path d="M28 78H492M28 138H492M28 198H492M28 258H492M28 318H492M28 378H492" />
                  <path d="M72 44V402M152 44V402M232 44V402M312 44V402M392 44V402M472 44V402" />
                </g>

                <g>
                  <path className="git-line" d="M136 66V382" />
                  <use className="git-line" href="#feature-path" />
                  <use className="git-line" href="#hotfix-path" />
                  <path className="git-flow" d="M136 66V382" />
                  <use className="git-flow" href="#feature-path" />
                  <use className="git-flow" href="#hotfix-path" />
                </g>

                <g>
                  <rect className="git-label" x="104" y="42" width="64" height="22" rx="11" />
                  <text className="git-label-text" x="136" y="57" textAnchor="middle">
                    main
                  </text>
                  <rect className="git-label" x="301" y="151" width="142" height="24" rx="12" />
                  <text className="git-label-text" x="372" y="167" textAnchor="middle">
                    feature/ai-agent
                  </text>
                  <rect className="git-label" x="35" y="272" width="126" height="24" rx="12" />
                  <text className="git-label-text" x="98" y="288" textAnchor="middle">
                    hotfix/prod-fix
                  </text>
                </g>

                <g>
                  <circle className="git-pulse" cx="136" cy="91" r="12" />
                  <circle className="git-commit" cx="136" cy="91" r="6" />
                  <circle className="git-commit-core" cx="136" cy="91" r="2" />
                  <text className="git-hash" x="153" y="95">
                    8f2a1c
                  </text>
                  <circle className="git-commit" cx="136" cy="124" r="5" />
                  <circle className="git-pulse p2" cx="233" cy="168" r="12" />
                  <circle className="git-commit" cx="233" cy="168" r="6" />
                  <circle className="git-commit-core" cx="233" cy="168" r="2" />
                  <text className="git-hash" x="249" y="159">
                    agent tools
                  </text>
                  <circle className="git-commit" cx="353" cy="222" r="5" />
                  <circle className="git-pulse p3" cx="353" cy="268" r="12" />
                  <circle className="git-commit" cx="353" cy="268" r="6" />
                  <circle className="git-commit-core" cx="353" cy="268" r="2" />
                  <text className="git-hash" x="370" y="272">
                    tests pass
                  </text>
                  <circle className="git-commit" cx="272" cy="309" r="5" />
                  <circle className="git-commit" cx="136" cy="315" r="6" />
                  <circle className="git-commit-core" cx="136" cy="315" r="2" />
                  <text className="git-hash" x="151" y="306">
                    merge
                  </text>
                  <circle className="git-commit" cx="136" cy="224" r="5" />
                  <circle className="git-pulse p2" cx="70" cy="274" r="11" />
                  <circle className="git-commit" cx="70" cy="274" r="6" />
                  <circle className="git-commit-core" cx="70" cy="274" r="2" />
                  <circle className="git-commit" cx="136" cy="327" r="5" />
                  <circle className="git-commit" cx="136" cy="368" r="6" />
                  <circle className="git-commit-core" cx="136" cy="368" r="2" />
                  <text className="git-hash" x="153" y="372">
                    deploy
                  </text>
                </g>

                <g>
                  <circle className="git-packet" r="3.5">
                    <animateMotion
                      dur="6.8s"
                      repeatCount="indefinite"
                      keyTimes="0;1"
                      keySplines=".45 0 .55 1"
                      calcMode="spline"
                    >
                      <mpath href="#feature-path" />
                    </animateMotion>
                    <animate
                      attributeName="opacity"
                      values="0;1;1;0"
                      keyTimes="0;.12;.86;1"
                      dur="6.8s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <circle className="git-packet" r="3">
                    <animateMotion dur="5.6s" begin="-2.4s" repeatCount="indefinite" path="M136 360V88" />
                    <animate
                      attributeName="opacity"
                      values="0;1;1;0"
                      keyTimes="0;.15;.82;1"
                      dur="5.6s"
                      begin="-2.4s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <circle className="git-packet" r="3">
                    <animateMotion
                      dur="5.2s"
                      begin="-1.1s"
                      repeatCount="indefinite"
                      keyTimes="0;1"
                      keySplines=".45 0 .55 1"
                      calcMode="spline"
                    >
                      <mpath href="#hotfix-path" />
                    </animateMotion>
                    <animate
                      attributeName="opacity"
                      values="0;1;1;0"
                      keyTimes="0;.15;.82;1"
                      dur="5.2s"
                      begin="-1.1s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <text className="git-motion-label" x="159" y="347">
                    PUSH ↑
                  </text>
                  <text className="git-motion-label" x="159" y="112">
                    FETCH ↓
                  </text>
                </g>
              </svg>
              <div className="about-role">
                <span>CURRENTLY</span>
                <strong>Java Full-Stack Developer</strong>
                <small>JPMorganChase · Contract · Newark, Delaware</small>
              </div>
            </div>
            <div className="years-orbit" aria-label="More than six years of experience">
              <div>
                <strong>6+</strong>
                <span>
                  YEARS
                  <br />
                  BUILDING
                </span>
              </div>
            </div>
          </div>

          <div className="about-stories">
            <article className="story-card current">
              <div className="story-label">
                <span>ENTERPRISE ENGINEERING</span>
                <span className="story-index">01</span>
              </div>
              <h3>Production work that has to hold up.</h3>
              <p>
                At JPMorganChase, I build new features, support production systems and manage CI/CD
                pipelines across Java and Spring Boot services.
              </p>
            </article>

            <article className="story-card">
              <div className="story-label">
                <span>AI, EVERY DAY</span>
                <span className="story-index">02</span>
              </div>
              <h3>Agents are part of how I engineer.</h3>
              <p>
                I create AI agents, build reusable skills for them and automate repetitive work. That
                makes code analysis, debugging, test generation and documentation faster and easier,
                and I bring the same automation mindset to everything I build.
              </p>
              <div className="workflow" aria-label="Engineering tasks automated with AI">
                <span>
                  CODE
                  <br />
                  ANALYSIS
                </span>
                <span>DEBUGGING</span>
                <span>
                  TEST
                  <br />
                  GENERATION
                </span>
                <span>DOCS</span>
              </div>
            </article>

            <article className="story-card">
              <div className="story-label">
                <span>FULL-STACK FOUNDATION</span>
                <span className="story-index">03</span>
              </div>
              <h3>Across the stack, from interface to infrastructure.</h3>
              <p>
                Earlier roles took me deep into Python backends with Django, Flask and FastAPI,
                React frontends, REST APIs, relational databases, containers and cloud deployments.
              </p>
              <div className="stack-line" aria-label="Full-stack technologies">
                <span>Python</span>
                <span>Django</span>
                <span>Flask</span>
                <span>FastAPI</span>
                <span>React</span>
                <span>REST APIs</span>
                <span>PostgreSQL</span>
                <span>MySQL</span>
                <span>Docker</span>
                <span>AWS</span>
              </div>
            </article>

            <p className="about-principle">
              Clean code. Practical automation. <span>Real time saved.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
