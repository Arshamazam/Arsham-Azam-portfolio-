import type { Metadata } from "next";
import { ArrowLeft, Download, Mail } from "lucide-react";
import { BarChart } from "@/components/dashboard/BarChart";
import { CareerTimeline } from "@/components/dashboard/CareerTimeline";
import { ConcurrencyChart } from "@/components/dashboard/ConcurrencyChart";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { person } from "@/data/content";
import {
  NOW,
  asOfLabel,
  concurrency,
  kpis,
  projectsByCategory,
  researchTopics,
  sectorList,
  skillsByArea,
  timeline,
  timelineYears,
  undatedRoles,
} from "@/lib/profileStats";
import { asset } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Profile dashboard",
  description: `${person.name} at a glance: career timeline, research output, skills and projects, visualised.`,
  alternates: { canonical: "/dashboard/" },
};

export default function DashboardPage() {
  return (
    <>
      <div className="hero-bg">
        <div className="mx-auto max-w-6xl px-5 pt-10 pb-12 sm:px-8 sm:pt-14">
          <Reveal>
            <ButtonLink href="/" variant="outline" className="px-4 py-2">
              <ArrowLeft className="size-4" aria-hidden /> Home
            </ButtonLink>
            <p className="mt-8 font-display text-lg font-semibold text-accent">Profile analytics</p>
            <h1 className="mt-1 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
              {person.name} at a glance
            </h1>
            <p className="mt-4 max-w-2xl text-pretty text-muted">
              Career, research and skills, visualised. Every number is computed from the same data as the rest
              of this site, as of {asOfLabel}.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <ButtonLink href={asset(person.cv)} download>
                <Download className="size-4" aria-hidden /> Download CV
              </ButtonLink>
              <ButtonLink href="/#contact" variant="outline">
                <Mail className="size-4" aria-hidden /> Get in touch
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="mx-auto max-w-6xl space-y-5 px-5 pb-20 sm:px-8">
        <Reveal>
          <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {kpis.map((k) => (
              <div key={k.label} className="flex flex-col rounded-2xl border border-border bg-surface p-4 shadow-soft">
                <dt className="text-xs font-medium text-muted">{k.label}</dt>
                <dd className="mt-1 font-display text-3xl font-bold tracking-tight">{k.value}</dd>
                <dd className="mt-auto pt-1 text-xs text-muted">{k.note}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal>
          <CareerTimeline
            roles={timeline}
            years={timelineYears}
            now={NOW}
            sectors={sectorList}
            undated={undatedRoles.map((r) => `${r.role} at ${r.org}`)}
          />
        </Reveal>

        <div className="grid gap-5 lg:grid-cols-2">
          <Reveal className="h-full">
            <ConcurrencyChart data={concurrency} hasApprox={timeline.some((t) => t.approx)} />
          </Reveal>
          <Reveal className="h-full">
            <BarChart
              title="Projects by category"
              subtitle="Research prototypes, government systems and client work."
              data={projectsByCategory}
              unit="projects"
              labelHead="Category"
            />
          </Reveal>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <Reveal className="h-full">
            <BarChart
              title="Skills by area"
              subtitle="Number of skills listed in each area."
              data={skillsByArea}
              unit="skills"
              labelHead="Area"
            />
          </Reveal>
          <Reveal className="h-full">
            <BarChart
              title="Research topics"
              subtitle="How often each topic appears across publications and ongoing research."
              data={researchTopics}
              unit="papers & projects"
              labelHead="Topic"
            />
          </Reveal>
        </div>
      </div>
    </>
  );
}
