import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "strong";

const styles: Record<Variant, string> = {
  primary: "bg-accent text-accent-fg shadow-lift hover:brightness-110",
  outline: "border border-border bg-surface text-fg shadow-soft hover:border-accent hover:text-accent",
  strong: "bg-strong text-strong-fg hover:bg-accent hover:text-accent-fg",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all";

export function ButtonLink({
  href,
  variant = "primary",
  external,
  download,
  className,
  children,
}: {
  href: string;
  variant?: Variant;
  external?: boolean;
  download?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const cls = cn(base, styles[variant], className);
  if (external || download || !href.startsWith("/")) {
    return (
      <a
        href={href}
        className={cls}
        download={download || undefined}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

/** Small outlined button used for DOI / arXiv / external links. */
export function PillLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-semibold transition-colors hover:border-accent hover:text-accent"
    >
      {children}
    </a>
  );
}
