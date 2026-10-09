import { Briefcase } from "lucide-react";
import { ScrollLine } from "@/components/effects/ScrollLine";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { TagList } from "@/components/ui/Tag";
import { experience } from "@/data/content";
import { cn } from "@/lib/utils";

export function Experience() {
  return (
    <Section
      id="experience"
      icon={Briefcase}
      title="Experience"
      intro="From World Bank-funded public infrastructure to AI products for clients."
    >
      <div className="relative ml-2">
      <ScrollLine className="top-0 left-0 h-full w-0.5" />
      <ol className="border-l-2 border-border">
        {experience.map((job, i) => (
          <li key={`${job.org}-${job.role}`} className="relative pb-6 pl-7 last:pb-0 sm:pl-9">
            <span
              aria-hidden
              className={cn(
                "absolute top-6 -left-[9px] size-4 rounded-full border-[3px] border-bg",
                job.current ? "bg-accent" : "bg-border",
              )}
            />
            <Reveal delay={Math.min(i, 4) * 0.04}>
              <div className="rounded-2xl border border-border bg-surface p-5 shadow-soft sm:p-6">
                <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                  <div>
                    <h3 className="font-display text-lg font-bold">{job.role}</h3>
                    <p className="mt-0.5 text-sm font-medium text-accent">
                      {job.org}
                      {job.orgDetail && <span className="font-normal text-muted"> · {job.orgDetail}</span>}
                    </p>
                  </div>
                  <span
                    className={cn(
                      "rounded-full px-3 py-1 text-xs font-semibold",
                      job.current ? "bg-accent-soft text-accent" : "bg-surface-2 text-muted",
                    )}
                  >
                    {job.period}
                  </span>
                </div>
                {job.points.length > 0 && (
                  <ul className="mt-3 list-disc space-y-1 pl-4 text-sm text-muted marker:text-accent">
                    {job.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                )}
                {job.tags && (
                  <div className="mt-4">
                    <TagList tags={job.tags} label="Skills used" />
                  </div>
                )}
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
      </div>
    </Section>
  );
}
