import { FlaskConical } from "lucide-react";
import { TagList } from "./Tag";
import type { OngoingResearch } from "@/data/content";

export function OngoingCard({ item }: { item: OngoingResearch }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-border bg-surface p-6 shadow-soft transition-shadow hover:shadow-lift">
      <div className="flex items-center justify-between">
        <span className="grid size-10 place-items-center rounded-xl bg-accent-soft text-accent">
          <FlaskConical className="size-5" aria-hidden />
        </span>
        <span className="rounded-full bg-surface-2 px-2.5 py-0.5 text-xs font-semibold text-muted">
          In progress
        </span>
      </div>
      <h3 className="mt-4 font-display text-base leading-snug font-bold text-pretty">{item.title}</h3>
      <p className="mt-2 flex-1 text-sm text-muted">{item.description}</p>
      {item.collaborators && (
        <p className="mt-3 text-xs text-muted">
          <span className="font-semibold text-fg">With</span> {item.collaborators}
        </p>
      )}
      <div className="mt-4">
        <TagList tags={item.tags} label="Topics" />
      </div>
    </article>
  );
}
