"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, FolderOpen } from "lucide-react";
import { SpotlightCard } from "@/components/effects/SpotlightCard";
import { Section } from "@/components/ui/Section";
import { TagList } from "@/components/ui/Tag";
import { projectCategories, projects, type ProjectCategory } from "@/data/content";
import { asset, cn } from "@/lib/utils";

type Filter = "All" | ProjectCategory;
const filters: Filter[] = ["All", ...projectCategories];

export function Projects() {
  const [filter, setFilter] = useState<Filter>("All");
  const visible = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <Section
      id="projects"
      icon={FolderOpen}
      title="Featured Projects"
      intro="Research prototypes, government systems in production, and products built for clients."
    >
      <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
              filter === f
                ? "bg-accent text-accent-fg shadow-lift"
                : "border border-border bg-surface text-muted hover:border-accent hover:text-accent",
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {visible.length} projects
      </p>

      <motion.ul layout className="mt-8 grid gap-5 lg:grid-cols-2">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((p) => (
            <motion.li
              key={p.title}
              layout
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.25 }}
            >
              <SpotlightCard as="article" className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface p-3 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift sm:flex-row">
                <div className="relative aspect-[16/10] shrink-0 overflow-hidden rounded-xl bg-surface-2 sm:aspect-auto sm:w-[42%]">
                  <Image
                    src={asset(p.image)}
                    alt={p.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 230px, (min-width: 640px) 42vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:transition-none"
                  />
                </div>
                <div className="flex flex-1 flex-col p-3 sm:p-4">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-lg leading-snug font-bold">{p.title}</h3>
                    {p.links?.[0] && (
                      <a
                        href={p.links[0].href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${p.links[0].label}: ${p.title}`}
                        className="shrink-0 text-muted hover:text-accent"
                      >
                        <ExternalLink className="size-4" aria-hidden />
                      </a>
                    )}
                  </div>
                  <p className="mt-1 text-xs font-semibold text-accent">
                    {p.category}
                    {p.highlight && <span className="text-muted"> · {p.highlight}</span>}
                  </p>
                  <p className="mt-2 flex-1 text-sm text-muted">{p.description}</p>
                  <div className="mt-4">
                    <TagList tags={p.tags} label="Technologies" />
                  </div>
                </div>
              </SpotlightCard>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </Section>
  );
}
