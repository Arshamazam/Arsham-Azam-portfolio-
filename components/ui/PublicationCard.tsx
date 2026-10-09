import { ExternalLink, FileText } from "lucide-react";
import { PillLink } from "./Button";
import { TagList } from "./Tag";
import type { Publication } from "@/data/content";
import { arxivUrl, cn, doiUrl } from "@/lib/utils";

export function PublicationCard({
  pub,
  index,
  detailed = false,
}: {
  pub: Publication;
  index: number;
  detailed?: boolean;
}) {
  return (
    <article className="flex gap-5 rounded-2xl border border-border bg-surface p-6 shadow-soft transition-shadow hover:shadow-lift sm:p-7">
      <span
        aria-hidden
        className="hidden size-12 shrink-0 place-items-center rounded-xl bg-accent-soft font-display text-lg font-bold text-accent sm:grid"
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
          <span
            className={cn(
              "rounded-full px-2.5 py-0.5",
              pub.status === "Published" ? "bg-accent text-accent-fg" : "bg-surface-2 text-muted",
            )}
          >
            {pub.status}
          </span>
          {pub.venue && <span className="text-muted">{pub.venue}</span>}
          {pub.year && <span className="text-muted">· {pub.year}</span>}
          {pub.role && <span className="text-accent">· {pub.role}</span>}
        </div>
        <h3 className="mt-3 font-display text-lg leading-snug font-bold text-pretty sm:text-xl">
          {pub.title}
        </h3>
        {pub.authors && <p className="mt-1.5 text-sm text-muted">{pub.authors}</p>}
        {pub.summary && (
          <p className={cn("mt-3 text-sm text-pretty sm:text-base", detailed ? "text-fg" : "text-muted")}>
            {pub.summary}
          </p>
        )}
        <div className="mt-4">
          <TagList tags={pub.tags} label="Topics" />
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          {pub.doi && (
            <PillLink href={doiUrl(pub.doi)}>
              <ExternalLink className="size-3.5" aria-hidden /> DOI
            </PillLink>
          )}
          {pub.arxiv && (
            <PillLink href={arxivUrl(pub.arxiv)}>
              <FileText className="size-3.5" aria-hidden /> arXiv:{pub.arxiv}
            </PillLink>
          )}
          {pub.links?.map((l) => (
            <PillLink key={l.href} href={l.href}>
              <ExternalLink className="size-3.5" aria-hidden /> {l.label}
            </PillLink>
          ))}
        </div>
        {detailed && pub.doi && (
          <p className="mt-4 font-mono text-xs break-all text-muted">doi:{pub.doi}</p>
        )}
      </div>
    </article>
  );
}
