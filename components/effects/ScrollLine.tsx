"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

/** Vertical line that fills from top to bottom as its parent scrolls through the viewport. */
export function ScrollLine({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <div ref={ref} aria-hidden className={cn("pointer-events-none absolute", className)}>
      <motion.div
        style={{ scaleY: reduce ? 1 : scaleY }}
        className="size-full origin-top rounded-full bg-gradient-to-b from-accent via-sky-400 to-violet-500"
      />
    </div>
  );
}
