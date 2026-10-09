import { Check, Sparkles } from "lucide-react";
import { AttributionVisual, LayersVisual, TokensVisual } from "@/components/effects/ExpertiseVisuals";
import { SpotlightCard } from "@/components/effects/SpotlightCard";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { expertise } from "@/data/content";

const visuals = { attribution: AttributionVisual, tokens: TokensVisual, layers: LayersVisual };

export function Expertise() {
  return (
    <Section
      id="expertise"
      icon={Sparkles}
      title="What I Do"
      intro="Research that asks how AI can be trusted, and engineering that makes it run in the real world."
    >
      <div className="grid gap-5 md:grid-cols-3">
        {expertise.map((e, i) => {
          const Visual = visuals[e.visual];
          return (
            <Reveal key={e.title} delay={0.08 * i} className="h-full">
              <SpotlightCard className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface p-6 shadow-soft transition-shadow hover:shadow-lift">
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent via-sky-400 to-violet-500 opacity-70"
                />
                <div className="h-28 rounded-xl border border-border bg-bg/60 p-4">
                  <Visual />
                </div>
                <p className="mt-5 font-mono text-xs text-muted">0{i + 1}</p>
                <h3 className="mt-1 font-display text-xl font-bold">{e.title}</h3>
                <p className="mt-2 text-sm text-pretty text-muted">{e.body}</p>
                <ul className="mt-4 space-y-2 text-sm">
                  {e.points.map((p) => (
                    <li key={p} className="flex gap-2">
                      <Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                      {p}
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
