import { useEffect, useRef } from "react";

const CERTS = [
  { title: "Claude Code 101",
    sig: "ANTHROPIC", issuer: "Anthropic", date: "AUGUST 2026", seal: "VERIFIED" },
  { title: "Introduction to Model Context Protocol",
    sig: "ANTHROPIC", issuer: "Anthropic", date: "JULY 2026", seal: "VERIFIED" },
  { title: "Claude 101",
    sig: "ANTHROPIC", issuer: "Anthropic", date: "JULY 2026", seal: "VERIFIED" },
  { title: "AI Fluency Framework & Foundations",
    sig: "ANTHROPIC", issuer: "Anthropic", date: "JULY 2026", seal: "VERIFIED" },
  { title: "AWS Certified Cloud Practitioner",
    sig: "AWS", issuer: "Amazon Web Services", date: "MAY 2025", seal: "CERTIFIED" },
  { title: "Overview of Web GIS Technology",
    sig: "IIRS / ISRO", issuer: "IIRS / ISRO", date: "JULY 2021", seal: "AWARDED" },
  { title: "Python for Beginners",
    sig: "UDEMY", issuer: "Udemy", date: "JULY 2019", seal: "AWARDED" },
  { title: "Version Control with Git",
    sig: "COURSERA", issuer: "Coursera", date: "JUNE 2021", seal: "AWARDED" },
  { title: "Developers Guide to Python 3 Programming",
    sig: "EDUONIX", issuer: "EDUONIX", date: "MAY 2020", seal: "AWARDED" },
  { title: "CSS Essential Training",
    sig: "LINKEDIN LEARNING", issuer: "LinkedIn Learning", date: "MARCH 2021", seal: "AWARDED" },
  { title: "HTML Essential Training",
    sig: "LINKEDIN LEARNING", issuer: "LinkedIn Learning", date: "MARCH 2021", seal: "AWARDED" },
  { title: "Crash Course on Python",
    sig: "COURSERA / GOOGLE", issuer: "Coursera / Google", date: "APRIL 2020", seal: "AWARDED" },
  { title: "The Complete Web Developer in 2020: Zero to Mastery",
    sig: "UDEMY", issuer: "Udemy", date: "JUNE 2020", seal: "AWARDED" },
];

export default function Certifications() {
  const sectionRef = useRef(null);
  const activeRef = useRef(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const track = section.querySelector(".cert-track");
    const cards = Array.from(section.querySelectorAll(".certificate"));
    const prev = section.querySelector(".cert-prev");
    const next = section.querySelector(".cert-next");
    const count = section.querySelector(".cert-count");
    const bar = section.querySelector(".cert-progress span");
    let pointerX = null;

    function updateCerts() {
      const activeCert = activeRef.current;
      const compact = window.innerWidth <= 520;
      cards.forEach((card, index) => {
        const delta = index - activeCert;
        const amount = Math.min(Math.abs(delta), 4);
        const side = delta < 0 ? -1 : 1;
        const shift = delta * (compact ? 112 : 260);
        const rotate = delta === 0 ? 0 : -side * (compact ? 42 : 54);
        const scale = 1 - Math.min(amount * (compact ? 0.115 : 0.14), compact ? 0.31 : 0.4);
        const depth = -Math.min(amount, 3) * (compact ? 100 : 170);
        const drop = Math.min(amount, 2) * (compact ? 5 : 9);
        card.style.transform =
          "translate3d(" + shift + "px," + drop + "px," + depth + "px) rotateY(" + rotate + "deg) scale(" + scale + ")";
        card.style.opacity = String(
          amount > 3 ? 0 : Math.max(compact ? 0.38 : 0.28, 1 - amount * (compact ? 0.2 : 0.23))
        );
        card.style.filter =
          "saturate(" + (1 - Math.min(amount * 0.14, 0.38)) + ") brightness(" + (1 - Math.min(amount * 0.065, 0.18)) + ")";
        card.style.zIndex = String(100 - amount * 10);
        card.style.pointerEvents = amount > 2 ? "none" : "auto";
        const active = index === activeCert;
        card.classList.toggle("is-active", active);
        card.setAttribute("aria-current", active ? "true" : "false");
        card.setAttribute("aria-hidden", amount > 3 ? "true" : "false");
        card.setAttribute(
          "aria-label",
          "Certification " + (index + 1) + " of " + cards.length + ": " + card.querySelector("h3").textContent
        );
      });
      count.textContent =
        String(activeCert + 1).padStart(2, "0") + " / " + String(cards.length).padStart(2, "0");
      prev.disabled = activeCert === 0;
      next.disabled = activeCert === cards.length - 1;
      bar.style.width = ((activeCert + 1) / cards.length * 100) + "%";
    }
    function moveTo(index) {
      activeRef.current = Math.max(0, Math.min(cards.length - 1, index));
      updateCerts();
    }
    function move(direction) {
      moveTo(activeRef.current + direction);
    }
    const onPrev = () => move(-1);
    const onNext = () => move(1);
    const onCardClick = (index) => () => {
      if (index !== activeRef.current) moveTo(index);
    };
    const onPointerDown = (e) => {
      pointerX = e.clientX;
      track.setPointerCapture(e.pointerId);
    };
    const onPointerUp = (e) => {
      if (pointerX === null) return;
      const distance = e.clientX - pointerX;
      pointerX = null;
      if (Math.abs(distance) > 42) move(distance < 0 ? 1 : -1);
    };
    const onPointerCancel = () => {
      pointerX = null;
    };
    const onKey = (e) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        move(1);
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        move(-1);
      }
      if (e.key === "Home") {
        e.preventDefault();
        moveTo(0);
      }
      if (e.key === "End") {
        e.preventDefault();
        moveTo(cards.length - 1);
      }
    };
    const onResize = () => updateCerts();

    prev.addEventListener("click", onPrev);
    next.addEventListener("click", onNext);
    const cardHandlers = cards.map((card, i) => {
      const h = onCardClick(i);
      card.addEventListener("click", h);
      return [card, h];
    });
    track.addEventListener("pointerdown", onPointerDown);
    track.addEventListener("pointerup", onPointerUp);
    track.addEventListener("pointercancel", onPointerCancel);
    track.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    const raf = requestAnimationFrame(updateCerts);

    return () => {
      prev.removeEventListener("click", onPrev);
      next.removeEventListener("click", onNext);
      cardHandlers.forEach(([card, h]) => card.removeEventListener("click", h));
      track.removeEventListener("pointerdown", onPointerDown);
      track.removeEventListener("pointerup", onPointerUp);
      track.removeEventListener("pointercancel", onPointerCancel);
      track.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="certifications" id="certifications" ref={sectionRef}>
      <div className="wrap cert-heading-row">
        <div className="section-head reveal">
          <h2>Certifications</h2>
          <p>
            13 credentials across agentic AI, cloud, Python, version control, web development and
            geospatial technology.
          </p>
        </div>
        <div className="cert-controls reveal" aria-label="Certification carousel controls">
          <button className="cert-arrow cert-prev" type="button" aria-label="Previous certification">
            ←
          </button>
          <span className="cert-count" aria-live="polite">
            01 / 13
          </span>
          <button className="cert-arrow cert-next" type="button" aria-label="Next certification">
            →
          </button>
        </div>
      </div>
      <div className="cert-track reveal" aria-label="Certification carousel" tabIndex="0">
        {CERTS.map((c) => (
          <article className="certificate" key={c.title}>
            <i className="cert-corner tl"></i>
            <i className="cert-corner tr"></i>
            <i className="cert-corner bl"></i>
            <i className="cert-corner br"></i>
            <div className="cert-content">
              <span className="cert-kicker">CERTIFICATE OF COMPLETION</span>
              <p className="cert-issuer">{c.issuer}</p>
              <span className="cert-presented">PROUDLY PRESENTED TO</span>
              <strong className="cert-name">Saikumar Chinthakayala</strong>
              <p className="cert-award">for successful completion of</p>
              <h3>{c.title}</h3>
              <div className="cert-footer">
                <span className="cert-meta">{c.date}</span>
                <span className="cert-signature">{c.sig}</span>
              </div>
            </div>
            <span className="cert-seal">
              <span>✓</span>
              {c.seal}
            </span>
          </article>
        ))}
      </div>
      <div className="cert-progress" aria-hidden="true">
        <span></span>
      </div>
    </section>
  );
}
