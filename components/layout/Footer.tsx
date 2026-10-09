import Link from "next/link";
import { CodeXml, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { person, socials } from "@/data/content";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-7 text-sm text-muted sm:flex-row sm:px-8">
        <p className="inline-flex items-center gap-2">
          <CodeXml className="size-4 text-accent" aria-hidden />© {person.name} · {person.location}
        </p>
        <nav aria-label="Footer" className="flex items-center gap-4">
          <Link href="/research/" className="hover:text-accent">
            Research
          </Link>
          <Link href="/dashboard/" className="hover:text-accent">
            Dashboard
          </Link>
          <a href={socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-accent">
            <GithubIcon className="size-4" />
          </a>
          <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-accent">
            <LinkedinIcon className="size-4" />
          </a>
          <a href={socials.email} aria-label="Email" className="hover:text-accent">
            <Mail className="size-4" aria-hidden />
          </a>
        </nav>
      </div>
    </footer>
  );
}
