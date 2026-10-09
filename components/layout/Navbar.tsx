"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { CodeXml, Command, Download, Menu, X } from "lucide-react";
import { OPEN_PALETTE_EVENT } from "@/lib/theme";
import { ThemeToggle } from "./ThemeToggle";
import { nav, person } from "@/data/content";
import { asset, cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the nav link of the section currently in view (home page only).
  useEffect(() => {
    if (!isHome) return;
    const sections = nav
      .filter((item) => item.href.includes("#"))
      .map((item) => document.getElementById(item.href.split("#")[1]))
      .filter((el): el is HTMLElement => !!el);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [isHome]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => {
    if (!href.includes("#")) return pathname.startsWith(href.replace(/\/$/, ""));
    if (href === "/#research" && pathname.startsWith("/research")) return true;
    return isHome && active === href.split("#")[1];
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled || open
          ? "border-b border-border bg-surface/85 shadow-soft backdrop-blur-md"
          : "border-b border-transparent bg-surface/60 backdrop-blur-sm",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="group flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <CodeXml className="size-6 text-accent transition-transform group-hover:-rotate-6" aria-hidden />
          <span className="font-display text-lg font-bold tracking-tight whitespace-nowrap">{person.name}</span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-0.5 lg:flex xl:gap-1">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "true" : undefined}
              className={cn(
                "rounded-full px-2.5 py-1.5 text-sm font-medium transition-colors xl:px-3.5",
                isActive(item.href) ? "bg-accent-soft text-accent" : "text-muted hover:text-fg",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={asset(person.cv)}
            download
            aria-label="Download CV"
            className="hidden items-center gap-2 rounded-full bg-strong px-4 py-2 text-sm font-semibold whitespace-nowrap text-strong-fg transition-colors hover:bg-accent hover:text-accent-fg sm:inline-flex"
          >
            <span className="lg:max-xl:hidden">Download CV</span>
            <span className="hidden lg:max-xl:inline">CV</span>
            <Download className="size-4" aria-hidden />
          </a>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event(OPEN_PALETTE_EVENT))}
            aria-label="Open command menu (Ctrl or Cmd + K)"
            title="Command menu (⌘K)"
            className="grid size-9 place-items-center rounded-full border border-border text-muted transition-colors hover:border-accent hover:text-accent"
          >
            <Command className="size-4" aria-hidden />
          </button>
          <ThemeToggle />
          <button
            type="button"
            className="grid size-9 place-items-center rounded-full border border-border lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="size-4" aria-hidden /> : <Menu className="size-4" aria-hidden />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            aria-label="Mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-border lg:hidden"
          >
            <ul className="mx-auto flex max-w-6xl flex-col px-5 py-3 sm:px-8">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-md py-3 text-base text-fg hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a href={asset(person.cv)} download className="block py-3 text-base text-accent">
                  Download CV
                </a>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
