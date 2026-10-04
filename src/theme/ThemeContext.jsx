import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({ theme: "dark", toggle: () => {} });

function getInitialTheme() {
  if (typeof window === "undefined") return "light";
  const saved = window.localStorage.getItem("sai-theme");
  if (saved === "light" || saved === "dark") return saved;
  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    const meta = document.querySelector('meta[name="theme-color"]');
    root.setAttribute("data-theme", theme);
    // Keep the `light` class too for any remaining Tailwind `light:` variants.
    if (theme === "light") root.classList.add("light");
    else root.classList.remove("light");
    if (meta) meta.setAttribute("content", theme === "dark" ? "#0d1512" : "#f4f8f6");
    window.localStorage.setItem("sai-theme", theme);
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
