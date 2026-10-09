"use client";

import { MotionConfig } from "framer-motion";

export function Providers({ children }: { children: React.ReactNode }) {
  // Respects the visitor's "reduce motion" OS setting for every animation.
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
