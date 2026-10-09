/** Flip light/dark and remember the choice (read back by the inline script in app/layout.tsx). */
export function toggleTheme() {
  const next = !document.documentElement.classList.contains("dark");
  document.documentElement.classList.toggle("dark", next);
  try {
    localStorage.setItem("theme", next ? "dark" : "light");
  } catch {}
}

/** Window event that opens the ⌘K command palette from anywhere (e.g. the navbar button). */
export const OPEN_PALETTE_EVENT = "open-command-palette";
