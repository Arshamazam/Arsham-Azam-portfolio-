"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  ChartColumn,
  Check,
  Copy,
  CornerDownLeft,
  Download,
  FileText,
  Hash,
  Mail,
  Search,
  SunMoon,
  type LucideIcon,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { nav, person, socials } from "@/data/content";
import { OPEN_PALETTE_EVENT, toggleTheme } from "@/lib/theme";
import { asset, cn } from "@/lib/utils";

type Item = {
  id: string;
  label: string;
  hint?: string;
  group: "Navigate" | "Actions" | "Links";
  icon: LucideIcon | typeof GithubIcon;
  run: () => void;
  keepOpen?: boolean;
};

// Element to give focus back to when the palette closes (only one palette exists).
let returnFocus: HTMLElement | null = null;

/** ⌘K / Ctrl+K command menu: jump to sections, download the CV, copy email, switch theme. */
export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const show = useCallback(() => {
    returnFocus = document.activeElement as HTMLElement | null;
    setQuery("");
    setActive(0);
    setCopied(false);
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    returnFocus?.focus?.();
  }, []);

  const items = useMemo<Item[]>(
    () => [
      ...nav.map((n) => ({
        id: n.href,
        label: n.label,
        group: "Navigate" as const,
        icon: n.href.includes("#") ? Hash : ChartColumn,
        run: () => router.push(n.href),
      })),
      { id: "research", label: "Research page", group: "Navigate", icon: BookOpen, run: () => router.push("/research/") },
      {
        id: "cv-download",
        label: "Download CV",
        hint: "PDF",
        group: "Actions",
        icon: Download,
        run: () => {
          const a = document.createElement("a");
          a.href = asset(person.cv);
          a.download = "";
          a.click();
        },
      },
      { id: "cv-view", label: "View CV online", group: "Actions", icon: FileText, run: () => router.push("/cv/") },
      {
        id: "copy-email",
        label: "Copy email address",
        hint: person.email,
        group: "Actions",
        icon: Copy,
        keepOpen: true,
        run: () => {
          navigator.clipboard?.writeText(person.email).then(() => {
            setCopied(true);
            setTimeout(close, 900);
          });
        },
      },
      { id: "theme", label: "Switch light / dark theme", group: "Actions", icon: SunMoon, run: toggleTheme },
      { id: "email", label: "Send an email", group: "Links", icon: Mail, run: () => (window.location.href = socials.email) },
      { id: "github", label: "GitHub", group: "Links", icon: GithubIcon, run: () => window.open(socials.github, "_blank", "noopener") },
      { id: "linkedin", label: "LinkedIn", group: "Links", icon: LinkedinIcon, run: () => window.open(socials.linkedin, "_blank", "noopener") },
    ],
    [router, close],
  );

  const q = query.trim().toLowerCase();
  const results = q ? items.filter((i) => `${i.label} ${i.hint ?? ""} ${i.group}`.toLowerCase().includes(q)) : items;

  // Global shortcut + the navbar button's event.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (open) close();
        else show();
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_PALETTE_EVENT, show);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_PALETTE_EVENT, show);
    };
  }, [open, show, close]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    document.getElementById(`cmdk-${active}`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  function run(item: Item | undefined) {
    if (!item) return;
    item.run();
    if (!item.keepOpen) close();
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (results.length ? (a + 1) % results.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (results.length ? (a - 1 + results.length) % results.length : 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      run(results[active]);
    } else if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "Tab") {
      e.preventDefault(); // keep focus inside the dialog
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-start justify-center bg-fg/25 px-4 pt-[12vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onMouseDown={(e) => e.target === e.currentTarget && close()}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command menu"
            className="w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-surface shadow-lift"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18 }}
          >
            <div className="flex items-center gap-3 border-b border-border px-4">
              <Search className="size-4 text-muted" aria-hidden />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                onKeyDown={onKeyDown}
                role="combobox"
                aria-expanded="true"
                aria-controls="cmdk-list"
                aria-activedescendant={results[active] ? `cmdk-${active}` : undefined}
                aria-label="Search commands"
                placeholder="Jump to a section, download CV, copy email…"
                className="h-14 flex-1 bg-transparent text-sm outline-none placeholder:text-muted focus-visible:outline-none"
              />
              <kbd className="rounded-md border border-border px-1.5 py-0.5 text-[10px] text-muted">Esc</kbd>
            </div>

            <ul id="cmdk-list" role="listbox" aria-label="Commands" className="max-h-80 overflow-y-auto p-2">
              {results.length === 0 && <li className="px-3 py-8 text-center text-sm text-muted">No results</li>}
              {results.map((item, i) => {
                const Icon = item.icon;
                const isCopied = item.id === "copy-email" && copied;
                return (
                  <li key={item.id} role="presentation">
                    {(i === 0 || results[i - 1].group !== item.group) && (
                      <p className="px-3 pt-2 pb-1 text-[11px] font-semibold tracking-wide text-muted uppercase">
                        {item.group}
                      </p>
                    )}
                    <div
                      id={`cmdk-${i}`}
                      role="option"
                      aria-selected={i === active}
                      onMouseMove={() => setActive(i)}
                      onClick={() => run(item)}
                      className={cn(
                        "flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm",
                        i === active ? "bg-accent-soft text-accent" : "text-fg",
                      )}
                    >
                      {isCopied ? <Check className="size-4" aria-hidden /> : <Icon className="size-4" aria-hidden />}
                      <span className="flex-1 font-medium">{isCopied ? "Copied!" : item.label}</span>
                      {item.hint && <span className="truncate text-xs text-muted">{item.hint}</span>}
                      {i === active && <CornerDownLeft className="size-3.5 opacity-60" aria-hidden />}
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-4 border-t border-border px-4 py-2.5 text-[11px] text-muted">
              <span>↑↓ navigate</span>
              <span>↵ select</span>
              <span>esc close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
