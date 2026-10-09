import { ArrowRight, Download, Mail, MapPin } from "lucide-react";
import { NeuralBackground } from "@/components/effects/NeuralBackground";
import { RotatingText } from "@/components/effects/RotatingText";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { ButtonLink } from "@/components/ui/Button";
import { FloatingBadge } from "@/components/ui/FloatingBadge";
import { ProfilePhoto } from "@/components/ui/ProfilePhoto";
import { Reveal } from "@/components/ui/Reveal";
import { hero, person, socials } from "@/data/content";
import { asset } from "@/lib/utils";

const badgePositions = [
  "-left-2 top-6 sm:-left-6",
  "-right-2 top-14 sm:-right-8",
  "-left-4 bottom-14 sm:-left-10",
  "-right-1 bottom-4 sm:-right-4",
];

export function Hero() {
  // "Role · Role | Focus · Focus" → typed roles + focus line.
  const [role, focus] = hero.tagline.split(" | ");
  const roles = role.split(" · ");

  return (
    <section id="home" aria-labelledby="hero-title" className="hero-bg relative overflow-hidden">
      {/* Background: drifting blobs + neural network canvas */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="blob absolute -top-40 -left-32 size-[34rem] rounded-full bg-[radial-gradient(closest-side,rgb(37_99_235/0.16),transparent)]" />
        <div
          className="blob absolute top-10 -right-40 size-[30rem] rounded-full bg-[radial-gradient(closest-side,rgb(139_92_246/0.12),transparent)]"
          style={{ animationDelay: "-6s" }}
        />
        <NeuralBackground className="absolute inset-0 [mask-image:radial-gradient(ellipse_80%_75%_at_50%_40%,black,transparent)]" />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 pt-12 pb-24 sm:px-8 sm:pt-16 lg:grid-cols-[1.15fr_1fr] lg:pt-16 lg:pb-28">
        <div>
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 px-3 py-1 text-xs font-medium text-muted shadow-soft backdrop-blur">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-70 motion-reduce:animate-none" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              {person.availability}
            </p>
            <p className="mt-6 font-display text-xl font-semibold text-accent">{hero.greeting}</p>
            <h1
              id="hero-title"
              className="mt-1 font-display text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl"
            >
              {hero.headline}
            </h1>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="mt-4 min-h-[2.25rem] font-display text-2xl font-bold sm:text-3xl">
              <RotatingText
                words={roles}
                className="bg-gradient-to-r from-accent via-sky-500 to-violet-500 bg-clip-text text-transparent"
              />
            </p>
            {focus && <p className="mt-2 text-sm font-medium text-fg/80 sm:text-base">{focus}</p>}
            <p className="mt-5 max-w-xl text-pretty text-muted">{hero.intro}</p>
            <p className="mt-3 inline-flex items-center gap-1.5 text-sm text-muted">
              <MapPin className="size-4 text-accent" aria-hidden /> {person.location}
            </p>
          </Reveal>

          <Reveal delay={0.14}>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/#research">
                {hero.ctas.research} <ArrowRight className="size-4" aria-hidden />
              </ButtonLink>
              <ButtonLink href={asset(person.cv)} download variant="outline">
                <Download className="size-4" aria-hidden /> {hero.ctas.cv}
              </ButtonLink>
              <ButtonLink href="/#contact" variant="outline">
                <Mail className="size-4" aria-hidden /> {hero.ctas.contact}
              </ButtonLink>
            </div>
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
              <ul aria-label="Social links" className="flex items-center gap-2">
                {[
                  { label: "GitHub", href: socials.github, Icon: GithubIcon },
                  { label: "LinkedIn", href: socials.linkedin, Icon: LinkedinIcon },
                ].map(({ label, href, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="grid size-10 place-items-center rounded-full text-fg/80 transition-colors hover:bg-accent-soft hover:text-accent"
                    >
                      <Icon className="size-5" />
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={socials.email}
                    aria-label="Email"
                    className="grid size-10 place-items-center rounded-full text-fg/80 transition-colors hover:bg-accent-soft hover:text-accent"
                  >
                    <Mail className="size-5" aria-hidden />
                  </a>
                </li>
              </ul>
              <p className="hidden items-center gap-1.5 text-xs text-muted lg:inline-flex">
                Tip: press
                <kbd className="rounded-md border border-border bg-surface px-1.5 py-0.5 font-sans text-[11px] shadow-soft">
                  ⌘ K
                </kbd>
                to explore
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="flex justify-center lg:justify-end">
          <div className="relative size-72 sm:size-80 lg:size-[22rem]">
            <div
              aria-hidden
              className="absolute -inset-5 rounded-full bg-[conic-gradient(from_180deg,var(--accent),#38bdf8,#a78bfa,var(--accent))] opacity-25 blur-2xl"
            />
            <div aria-hidden className="absolute -inset-4 rounded-full bg-accent-soft" />
            <div className="absolute inset-0 rounded-full border-[6px] border-surface shadow-lift">
              <ProfilePhoto />
            </div>
            {hero.floatingBadges.slice(0, 4).map((name, i) => (
              <FloatingBadge key={name} name={name} className={badgePositions[i]} delay={0.2 + i * 0.15} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
