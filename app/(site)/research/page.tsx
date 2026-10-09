import type { Metadata } from "next";
import { ArrowLeft, BookOpen, Download, FlaskConical, Lightbulb, Mail, ScrollText } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { OngoingCard } from "@/components/ui/OngoingCard";
import { PublicationCard } from "@/components/ui/PublicationCard";
import { Reveal } from "@/components/ui/Reveal";
import { person, research } from "@/data/content";
import { asset } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Research",
  description: `Research statement, publications and ongoing work of ${person.name} in explainable, federated and multimodal AI for healthcare.`,
  alternates: { canonical: "/research/" },
};

function Heading({ icon: Icon, children }: { icon: typeof BookOpen; children: React.ReactNode }) {
  return (
    <h2 className="flex items-center gap-3 font-display text-2xl font-bold">
      <span className="grid size-10 place-items-center rounded-xl bg-accent-soft text-accent">
        <Icon className="size-5" aria-hidden />
      </span>
      {children}
    </h2>
  );
}

export default function ResearchPage() {
  return (
    <>
      <div className="hero-bg">
        <div className="mx-auto max-w-4xl px-5 pt-10 pb-14 sm:px-8 sm:pt-14">
          <Reveal>
            <ButtonLink href="/" variant="outline" className="px-4 py-2">
              <ArrowLeft className="size-4" aria-hidden /> Home
            </ButtonLink>
            <p className="mt-8 font-display text-lg font-semibold text-accent">Research</p>
            <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">
              Explainable, private and multimodal AI for health
            </h1>
            <p className="mt-5 text-lg text-pretty text-muted">{research.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
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

      <article className="mx-auto max-w-4xl px-5 pb-24 sm:px-8">
        <section aria-label="Research statement" className="mt-14">
          <Heading icon={ScrollText}>Statement</Heading>
          <Reveal>
            <div className="mt-6 space-y-5 rounded-2xl border border-border bg-surface p-6 text-lg leading-relaxed text-pretty shadow-soft sm:p-8">
              {research.statement.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </Reveal>
        </section>

        <section aria-label="Research interests" className="mt-16">
          <Heading icon={Lightbulb}>Interests</Heading>
          <dl className="mt-6 grid gap-5 sm:grid-cols-2">
            {research.interestsDetail.map((r, i) => (
              <Reveal key={r.title} delay={0.05 * i} className="h-full">
                <div className="h-full rounded-2xl border border-border bg-surface p-6 shadow-soft">
                  <dt className="font-display text-lg font-bold">{r.title}</dt>
                  <dd className="mt-2 text-sm text-muted">{r.body}</dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </section>

        <section aria-label="Publications" className="mt-16">
          <Heading icon={BookOpen}>Publications</Heading>
          <div className="mt-6 grid gap-5">
            {research.publications.map((pub, i) => (
              <Reveal key={pub.title}>
                <PublicationCard pub={pub} index={i} detailed />
              </Reveal>
            ))}
          </div>
        </section>

        <section aria-label="Ongoing research" className="mt-16">
          <Heading icon={FlaskConical}>Ongoing research</Heading>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {research.ongoing.map((item, i) => (
              <Reveal key={item.title} delay={0.05 * i} className="h-full">
                <OngoingCard item={item} />
              </Reveal>
            ))}
          </div>
        </section>
      </article>
    </>
  );
}
