import { Code } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SkillIcon, hasBrandIcon } from "@/components/ui/SkillIcon";
import { skills } from "@/data/content";
import { cn } from "@/lib/utils";

const all = skills.flatMap((g) => g.items);
const rows = [all.filter(hasBrandIcon), all.filter((s) => !hasBrandIcon(s))];

/** Decorative, endlessly scrolling row of skills (the grid below is the accessible version). */
function Marquee({ items, reverse }: { items: string[]; reverse?: boolean }) {
  return (
    <div className="marquee-row overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <ul className={cn("marquee flex w-max gap-3 py-1.5", reverse && "marquee-reverse")}>
        {[...items, ...items].map((s, i) => (
          <li
            key={`${s}-${i}`}
            className="flex items-center gap-2.5 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium whitespace-nowrap shadow-soft"
          >
            <SkillIcon name={s} className="size-5" />
            {s}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Skills() {
  return (
    <Section id="skills" icon={Code} title="Skills & Technologies">
      <div aria-hidden className="-mx-5 mb-10 space-y-3 sm:-mx-8">
        <Marquee items={rows[0]} />
        <Marquee items={rows[1]} reverse />
      </div>

      <div className="grid gap-8">
        {skills.map((group, i) => (
          <Reveal key={group.group} delay={0.04 * i}>
            <h3 className="text-sm font-semibold text-muted">{group.group}</h3>
            <ul className="mt-3 grid grid-cols-[repeat(auto-fill,minmax(7.5rem,1fr))] gap-3">
              {group.items.map((s) => (
                <li
                  key={s}
                  className="flex flex-col items-center justify-center gap-2.5 rounded-2xl border border-border bg-surface px-3 py-4 text-center shadow-soft transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-lift"
                >
                  <SkillIcon name={s} className="size-7" />
                  <span className="text-xs leading-tight font-medium">{s}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
