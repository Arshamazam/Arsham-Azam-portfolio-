import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

/** Section shell: small icon tile + bold title, optional intro and right-side action. */
export function Section({
  id,
  icon: Icon,
  title,
  intro,
  action,
  children,
  className,
}: {
  id: string;
  icon: LucideIcon;
  title: string;
  intro?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={cn("py-10 sm:py-14", className)}>
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl bg-accent-soft text-accent">
                <Icon className="size-5" aria-hidden />
              </span>
              <h2 id={`${id}-title`} className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                {title}
              </h2>
            </div>
            {action}
          </div>
          {intro && <p className="mt-4 max-w-2xl text-pretty text-muted">{intro}</p>}
        </Reveal>
        <div className="mt-8 sm:mt-10">{children}</div>
      </div>
    </section>
  );
}

/** "View all →" style link for the right side of a section header. */
export function SectionAction({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="group inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
      {children}
      <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
        →
      </span>
    </Link>
  );
}
