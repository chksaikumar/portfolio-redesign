import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FiCheck, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Reveal from "./Reveal.jsx";
import { certifications } from "../data/portfolio.js";

const N = certifications.length; // 13
const SPACING = 200; // px between card centers
const SWIPE_THRESHOLD = 70; // px of drag to change card

// Shortest signed offset around the wrap, so cards take the short path.
function offsetOf(i, index) {
  let o = i - index;
  if (o > N / 2) o -= N;
  if (o < -N / 2) o += N;
  return o;
}

function CertificateCard({ cert }) {
  return (
    <div className="relative flex h-[360px] w-[250px] select-none flex-col items-center justify-between overflow-hidden rounded-lg bg-[#f7f3e8] p-5 text-center shadow-card md:h-[400px] md:w-[290px] md:p-6">
      {/* decorative double border */}
      <div className="pointer-events-none absolute inset-2 rounded border border-[#d9cfb2]" />
      <div className="pointer-events-none absolute inset-3 rounded border border-[#e7dfc6]" />

      <div>
        <p className="font-serif text-[9px] uppercase tracking-[0.3em] text-[#97865f] md:text-[10px]">
          Certificate of Completion
        </p>
        <div className="mx-auto my-3 h-px w-16 bg-[#c9bd97]" />
        <p className="font-serif text-xs italic text-[#6d6350]">
          This certificate is presented to
        </p>
        <p className="mt-1 font-serif text-base font-semibold text-[#2b2620] md:text-lg">
          Sai Kumar Chinthakayala
        </p>
      </div>

      <div className="px-2">
        <p className="font-serif text-lg font-bold leading-snug text-[#1f1b16] md:text-xl">
          {cert.title}
        </p>
      </div>

      <div>
        <p className="font-serif text-xs text-[#6d6350] md:text-sm">{cert.issuer}</p>
        <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[#97865f]">
          {cert.date}
        </p>
      </div>

      {/* seal badge */}
      <div className="absolute bottom-5 right-5 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-[#06281d] shadow-glow ring-2 ring-[#0e9f6e] ring-offset-2 ring-offset-[#f7f3e8] md:h-14 md:w-14">
        <FiCheck className="h-5 w-5 md:h-6 md:w-6" strokeWidth={3} aria-hidden="true" />
      </div>
    </div>
  );
}

export default function Certifications() {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();
  const dragMoved = useRef(false);

  const goTo = useCallback((i) => setIndex(((i % N) + N) % N), []);
  const next = useCallback(() => setIndex((p) => (p + 1) % N), []);
  const prev = useCallback(() => setIndex((p) => (p - 1 + N) % N), []);

  // Arrow-key navigation (skipped while typing in an input)
  useEffect(() => {
    const onKey = (e) => {
      const tag = document.activeElement?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  const transition = reduce
    ? { duration: 0 }
    : { type: "spring", stiffness: 260, damping: 32 };

  return (
    <section id="certifications" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">
            Certifications
          </p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
            Credentials
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muteddark light:text-mutedlight">
            13 credentials across agentic AI, cloud, Python, version control and
            web development
          </p>
        </Reveal>

        <Reveal className="mt-12">
          <div
            className="coverflow-scene relative mx-auto h-[430px] max-w-5xl overflow-hidden md:h-[470px]"
            role="region"
            aria-roledescription="carousel"
            aria-label="Certifications carousel"
          >
            <motion.div
              className="absolute inset-0 cursor-grab active:cursor-grabbing"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.6}
              onDragStart={() => {
                dragMoved.current = false;
              }}
              onDragEnd={(_, info) => {
                if (Math.abs(info.offset.x) > 10) dragMoved.current = true;
                if (info.offset.x < -SWIPE_THRESHOLD) next();
                else if (info.offset.x > SWIPE_THRESHOLD) prev();
                window.setTimeout(() => {
                  dragMoved.current = false;
                }, 80);
              }}
            >
              {certifications.map((cert, i) => {
                const o = offsetOf(i, index);
                const abs = Math.abs(o);
                const hidden = abs > 3;
                return (
                  <motion.div
                    key={cert.title}
                    className={`coverflow-card absolute left-1/2 top-6 md:top-8 ${
                      o === 0 ? "" : "cursor-pointer"
                    }`}
                    initial={false}
                    animate={{
                      x: `calc(-50% + ${o * SPACING}px)`,
                      rotateY: o === 0 ? 0 : (o > 0 ? -1 : 1) * 42 * Math.min(abs, 1.4),
                      scale: 1 - Math.min(abs, 3) * 0.1,
                      opacity: hidden ? 0 : 1 - Math.min(abs, 3) * 0.22,
                      zIndex: 60 - abs,
                    }}
                    transition={transition}
                    onClick={() => {
                      if (dragMoved.current) return;
                      if (o !== 0) goTo(i);
                    }}
                    style={{ pointerEvents: hidden ? "none" : "auto" }}
                    aria-hidden={o !== 0}
                  >
                    <CertificateCard cert={cert} />
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* controls */}
          <div className="mt-6 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous certificate"
              className="rounded-full border border-white/15 p-3 text-fog transition hover:border-accent hover:text-accent light:border-black/15 light:text-ink"
            >
              <FiChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <p
              className="font-mono text-sm tabular-nums text-muteddark light:text-mutedlight"
              aria-live="polite"
            >
              {index + 1} / {N}
            </p>
            <button
              type="button"
              onClick={next}
              aria-label="Next certificate"
              className="rounded-full border border-white/15 p-3 text-fog transition hover:border-accent hover:text-accent light:border-black/15 light:text-ink"
            >
              <FiChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <p className="mt-4 text-center text-xs text-muteddark light:text-mutedlight">
            Drag, swipe, click a side card, or use the arrow keys
          </p>
        </Reveal>
      </div>
    </section>
  );
}
