import { Award, BookOpen, Briefcase, Droplets } from "lucide-react";
import { CountUp } from "@/components/effects/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import { highlights } from "@/data/content";

const icons = { publication: BookOpen, villages: Droplets, grant: Award, experience: Briefcase };

/** Four stat cards that overlap the bottom of the hero; numbers count up on scroll. */
export function ImpactStrip() {
  return (
    <section aria-label="Highlights" className="relative z-10 mx-auto -mt-14 max-w-6xl px-5 sm:px-8">
      <Reveal>
        <dl className="grid grid-cols-2 gap-3 rounded-3xl border border-border bg-surface/90 p-3 shadow-lift backdrop-blur sm:gap-4 sm:p-4 lg:grid-cols-4">
          {highlights.map((h) => {
            const Icon = icons[h.icon];
            return (
              <div key={h.label} className="flex items-center gap-3 rounded-2xl p-3 sm:gap-4 sm:p-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-accent to-violet-500 text-white shadow-lift">
                  <Icon className="size-5" aria-hidden />
                </span>
                <div className="flex min-w-0 flex-col-reverse">
                  <dt className="text-xs leading-snug text-muted">{h.label}</dt>
                  <dd className="font-display text-xl font-extrabold tracking-tight whitespace-nowrap sm:text-2xl">
                    <CountUp value={h.value} />
                  </dd>
                </div>
              </div>
            );
          })}
        </dl>
      </Reveal>
    </section>
  );
}
