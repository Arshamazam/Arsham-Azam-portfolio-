"use client";

import { motion, useReducedMotion } from "framer-motion";

/* Small decorative animations for the "What I Do" cards. All aria-hidden. */

/** SHAP-style attribution plot: bars grow left (negative) or right (positive) from a centre axis. */
export function AttributionVisual() {
  const values = [0.82, -0.38, 0.58, -0.22, 0.4];
  return (
    <div aria-hidden className="relative h-full w-full">
      <div className="absolute inset-y-1 left-1/2 w-px bg-border" />
      <div className="flex h-full flex-col justify-center gap-2">
        {values.map((v, i) => (
          <div key={i} className="relative h-2.5">
            <motion.div
              className={
                v > 0
                  ? "absolute left-1/2 h-full origin-left rounded-r-full bg-accent"
                  : "absolute right-1/2 h-full origin-right rounded-l-full bg-amber-400"
              }
              style={{ width: `${Math.abs(v) * 48}%` }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/** A model chip streaming tokens that light up one after another. */
export function TokensVisual() {
  const reduce = useReducedMotion();
  const tokens = Array.from({ length: 14 });
  return (
    <div aria-hidden className="flex h-full items-center gap-3">
      <div className="grid size-12 shrink-0 place-items-center rounded-xl border-2 border-accent/40 bg-accent-soft font-mono text-[10px] font-bold text-accent">
        GPU
      </div>
      <div className="h-px w-4 shrink-0 bg-accent/40" />
      <div className="flex flex-wrap gap-1.5">
        {tokens.map((_, i) => (
          <motion.span
            key={i}
            className="h-2.5 rounded-full bg-accent"
            style={{ width: `${14 + ((i * 7) % 4) * 6}px` }}
            initial={{ opacity: 0.15 }}
            animate={reduce ? { opacity: 0.7 } : { opacity: [0.15, 1, 0.35] }}
            transition={
              reduce ? undefined : { duration: 2.4, delay: i * 0.12, repeat: Infinity, repeatDelay: 0.6, ease: "easeInOut" }
            }
          />
        ))}
      </div>
    </div>
  );
}

/** Stacked product layers: interface → API & agents → models. */
export function LayersVisual() {
  const layers = [
    { label: "Interface", cls: "bg-surface border-border text-fg" },
    { label: "API & agents", cls: "bg-accent-soft border-accent/30 text-accent" },
    { label: "Models", cls: "bg-accent border-accent text-accent-fg" },
  ];
  return (
    <div aria-hidden className="flex h-full flex-col justify-center gap-1.5">
      {layers.map((l, i) => (
        <motion.div
          key={l.label}
          className={`rounded-lg border px-3 py-0.5 text-[11px] font-semibold ${l.cls}`}
          style={{ marginLeft: `${i * 10}%`, marginRight: `${(2 - i) * 10}%` }}
          initial={{ opacity: 0, y: -8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 + i * 0.12 }}
        >
          {l.label}
        </motion.div>
      ))}
    </div>
  );
}
