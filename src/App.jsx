import { useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Experience from "./components/Experience.jsx";
import Skills from "./components/Skills.jsx";
import Certifications from "./components/Certifications.jsx";
import Projects from "./components/Projects.jsx";
import Contact from "./components/Contact.jsx";
import Chatbot from "./components/Chatbot.jsx";
import FloatingLogos from "./components/FloatingLogos.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Reference reveal system: `.reveal` -> `.visible` via IntersectionObserver.
    const reveals = document.querySelectorAll(".reveal");
    let observer = null;
    if (!("IntersectionObserver" in window) || reduce) {
      reveals.forEach((el) => el.classList.add("visible"));
    } else {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -7%" }
      );
      reveals.forEach((el) => observer.observe(el));
    }

    // Reference button sheen: track pointer position for `.btn` hover glow.
    const btns = Array.from(document.querySelectorAll(".btn"));
    const btnHandlers = [];
    if (!reduce && window.matchMedia("(pointer:fine)").matches) {
      btns.forEach((btn) => {
        const onMove = (e) => {
          const r = btn.getBoundingClientRect();
          btn.style.setProperty("--bx", e.clientX - r.left + "px");
          btn.style.setProperty("--by", e.clientY - r.top + "px");
        };
        btn.addEventListener("pointermove", onMove);
        btnHandlers.push([btn, onMove]);
      });
    }

    return () => {
      if (observer) observer.disconnect();
      btnHandlers.forEach(([btn, h]) => btn.removeEventListener("pointermove", h));
    };
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Certifications />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <FloatingLogos />
      <Chatbot />
    </>
  );
}
