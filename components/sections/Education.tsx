import { GraduationCap } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { education } from "@/data/content";

export function Education() {
  return (
    <Section id="education" icon={GraduationCap} title="Education">
      <div className="grid gap-5">
        {education.map((e) => (
          <Reveal key={e.degree}>
            <article className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-6 shadow-soft sm:flex-row sm:items-start sm:justify-between sm:p-7">
              <div>
                <h3 className="font-display text-xl font-bold">{e.degree}</h3>
                <p className="mt-1 text-sm font-medium text-accent">{e.institution}</p>
                <ul className="mt-4 space-y-1.5 text-sm text-muted">
                  {e.details.map((d) => (
                    <li key={d} className="flex gap-2">
                      <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
              <span className="self-start rounded-full bg-surface-2 px-3 py-1 text-xs font-semibold text-muted">
                {e.period}
              </span>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
