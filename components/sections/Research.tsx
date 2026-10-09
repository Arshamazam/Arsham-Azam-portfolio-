import { BookOpen } from "lucide-react";
import { OngoingCard } from "@/components/ui/OngoingCard";
import { PublicationCard } from "@/components/ui/PublicationCard";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionAction } from "@/components/ui/Section";
import { research } from "@/data/content";

export function Research() {
  return (
    <Section
      id="research"
      icon={BookOpen}
      title="Research & Publications"
      intro={research.intro}
      action={<SectionAction href="/research/">Full research statement</SectionAction>}
    >
      <div className="grid gap-5">
        {research.publications.map((pub, i) => (
          <Reveal key={pub.title} delay={0.05 * i}>
            <PublicationCard pub={pub} index={i} />
          </Reveal>
        ))}
      </div>

      <h3 className="mt-12 font-display text-lg font-bold">Ongoing research</h3>
      <div className="mt-5 grid gap-5 md:grid-cols-3">
        {research.ongoing.map((item, i) => (
          <Reveal key={item.title} delay={0.05 * i} className="h-full">
            <OngoingCard item={item} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
