"use client";

import { createElement } from "react";
import { cn } from "@/lib/utils";

/** A card whose background glows softly where the cursor is (see `.spotlight` in globals.css). */
export function SpotlightCard({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "article" | "li";
}) {
  function move(e: React.PointerEvent<HTMLElement>) {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--y", `${e.clientY - rect.top}px`);
  }
  function leave(e: React.PointerEvent<HTMLElement>) {
    e.currentTarget.style.setProperty("--x", "-100%");
  }

  return createElement(
    as,
    { onPointerMove: move, onPointerLeave: leave, className: cn("spotlight", className) },
    children,
  );
}
