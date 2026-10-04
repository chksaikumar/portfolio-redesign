import { useEffect, useRef } from "react";

export default function FloatingLogos() {
  const layerRef = useRef(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;
    const boundary = document.querySelector(".proof");
    if (!boundary) return;
    let ticking = false;

    function update() {
      const boundaryTop = boundary.getBoundingClientRect().bottom;
      layer.style.setProperty(
        "--roam-clip-top",
        Math.max(0, Math.min(window.innerHeight, boundaryTop)) + "px"
      );
      ticking = false;
    }
    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="ai-roam-layer" aria-hidden="true" ref={layerRef}>
      <span className="roam-agent one">
        <img src="/assets/ref/logo-chatgpt.png" alt="" />
      </span>
      <span className="roam-agent two">
        <img src="/assets/ref/logo-claude.png" alt="" />
      </span>
      <span className="roam-agent three code">
        <img src="/assets/ref/logo-claudecode.png" alt="" />
      </span>
      <span className="roam-agent four copilot">
        <img src="/assets/ref/logo-copilot.png" alt="" />
      </span>
    </div>
  );
}
