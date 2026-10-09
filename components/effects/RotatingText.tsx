"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/** Typewriter that types, pauses and deletes each word in turn. Screen readers get the full list. */
export function RotatingText({ words, className }: { words: readonly string[]; className?: string }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [length, setLength] = useState(words[0]?.length ?? 0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduce || words.length < 2) return;
    const word = words[index];
    let timer: ReturnType<typeof setTimeout>;
    if (!deleting && length === word.length) timer = setTimeout(() => setDeleting(true), 1800);
    else if (deleting && length === 0)
      timer = setTimeout(() => {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
      }, 250);
    else timer = setTimeout(() => setLength((l) => l + (deleting ? -1 : 1)), deleting ? 35 : 75);
    return () => clearTimeout(timer);
  }, [index, length, deleting, reduce, words]);

  const text = reduce ? words.join(" · ") : words[index].slice(0, length);

  return (
    <span className={className}>
      <span className="sr-only">{words.join(", ")}</span>
      <span aria-hidden>
        {text}
        {!reduce && (
          <span className="ml-0.5 inline-block h-[0.95em] w-[3px] translate-y-[0.12em] animate-pulse rounded-full bg-accent" />
        )}
      </span>
    </span>
  );
}
