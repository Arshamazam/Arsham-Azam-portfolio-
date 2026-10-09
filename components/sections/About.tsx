import { ArrowRight, BookOpen, Briefcase, ChartColumn, Cpu, GraduationCap, MapPin, UserRound } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { about } from "@/data/content";

const factIcons = {
  experience: Briefcase,
  specialty: Cpu,
  location: MapPin,
  education: GraduationCap,
  research: BookOpen,
};

export function About() {
  return (
    <Section id="about" icon={UserRound} title="About Me">
      <Reveal>
        <div className="grid gap-8 rounded-2xl border border-border bg-surface p-6 shadow-soft sm:p-8 lg:grid-cols-[1.5fr_1fr] lg:gap-10">
          <div>
            <div className="space-y-4 leading-relaxed text-pretty text-muted">
              {about.paragraphs.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
            <h3 className="mt-7 text-sm font-semibold">Research interests</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {about.interests.map((i) => (
                <li key={i} className="rounded-full bg-accent-soft px-3 py-1 text-sm font-medium text-accent">
                  {i}
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap gap-3">
              <ButtonLink href={about.learnMore.href} variant="outline">
                {about.learnMore.label} <ArrowRight className="size-4" aria-hidden />
              </ButtonLink>
              <ButtonLink href="/dashboard/" variant="outline">
                <ChartColumn className="size-4" aria-hidden /> Profile dashboard
              </ButtonLink>
            </div>
          </div>

          <dl className="grid content-start gap-3 border-border sm:grid-cols-2 lg:grid-cols-1 lg:border-l lg:pl-10">
            {about.facts.map((f) => {
              const Icon = factIcons[f.icon];
              return (
                <div key={f.label} className="flex items-center gap-4 rounded-xl p-2">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <div className="flex flex-col-reverse">
                    <dd className="text-sm font-semibold">{f.value}</dd>
                    <dt className="text-xs text-muted">{f.label}</dt>
                  </div>
                </div>
              );
            })}
          </dl>
        </div>
      </Reveal>
    </Section>
  );
}
