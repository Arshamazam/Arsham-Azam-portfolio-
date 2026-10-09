"use client";

import { motion } from "framer-motion";
import { SkillIcon } from "./SkillIcon";
import { cn } from "@/lib/utils";

/** Small white card with a skill icon that gently bobs (disabled with reduced motion). */
export function FloatingBadge({
  name,
  className,
  delay = 0,
}: {
  name: string;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      title={name}
      className={cn(
        "absolute grid size-14 place-items-center rounded-2xl border border-border bg-surface shadow-lift sm:size-16",
        className,
      )}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
      transition={{
        opacity: { duration: 0.4, delay },
        scale: { duration: 0.4, delay },
        y: { duration: 4 + delay * 2, repeat: Infinity, ease: "easeInOut", delay },
      }}
    >
      <SkillIcon name={name} className="size-7" />
      <span className="sr-only">{name}</span>
    </motion.div>
  );
}
