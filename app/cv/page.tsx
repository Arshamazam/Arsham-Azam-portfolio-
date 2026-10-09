import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import QRCode from "qrcode";
import {
  Award,
  BookOpen,
  Briefcase,
  FlaskConical,
  FolderKanban,
  Globe,
  GraduationCap,
  Languages,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  Target,
  UserRound,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import {
  about,
  cv,
  education,
  experience,
  hero,
  highlights,
  person,
  projects,
  research,
  site,
  skills,
  socials,
  type ProjectCategory,
  type Publication,
} from "@/data/content";
import { arxivUrl, asset, cn, doiUrl } from "@/lib/utils";

/*
 * Designed CV ("research brief" layout), rendered from data/content.ts.
 * `npm run cv` prints this page to public/cv.pdf (A4, with page footer).
 * Colours are hard-coded (not theme tokens) so the CV never follows dark mode.
 */

export const metadata: Metadata = {
  title: "CV",
  description: `Curriculum vitae of ${person.name}.`,
  robots: { index: false, follow: true },
};

const SIDEBAR = "66mm";
const navy = "#0b1736";

const months: Record<string, string> = {
  Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06",
  Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12",
};

/** "Sep 2023 – Present" → "09/2023 – Now" */
function cvDate(period: string) {
  return period
    .replace(/\b([A-Z][a-z]{2}) (\d{4})\b/g, (m, mon: string, year: string) =>
      months[mon] ? `${months[mon]}/${year}` : m,
    )
    .replace(/\b(Present|Ongoing)\b/i, "Now");
}

const pretty = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

const categoryColor: Record<ProjectCategory, string> = {
  "AI/Research": "#2563eb",
  "Government Systems": "#0891b2",
  "Client Work": "#7c3aed",
};

// Print rules for this page only: A4, full-bleed header on page 1, and a sidebar
// tint that continues down every printed page (painted on the page canvas).
const printCss = `
@page { size: A4; margin: 10mm 0 13mm 0; }
@page :first { margin-top: 0; }
@media print {
  html {
    background: linear-gradient(to right, #eef3fd 0, #eef3fd ${SIDEBAR}, #ffffff ${SIDEBAR}) !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  body { background: transparent !important; }
}`;

/* ── Building blocks ─────────────────────────────────────── */

function MainHeading({ n, icon: Icon, children }: { n: string; icon: LucideIcon; children: React.ReactNode }) {
  return (
    <h2 className="mt-5 mb-2.5 flex items-center gap-2.5 break-after-avoid first:mt-0">
      <span className="grid size-6 place-items-center rounded-md bg-[#2563eb] text-white">
        <Icon className="size-3.5" aria-hidden />
      </span>
      <span className="font-display text-[12px] font-extrabold tracking-[0.14em] text-[#0b1736] uppercase">
        {children}
      </span>
      <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-[#2563eb]/45 to-transparent" />
      <span aria-hidden className="font-mono text-[9px] text-[#94a3b8]">
        {n}
      </span>
    </h2>
  );
}

function SideHeading({ icon: Icon, children }: { icon: LucideIcon; children: React.ReactNode }) {
  return (
    <h2 className="mb-2 flex items-center gap-1.5 font-display text-[10px] font-extrabold tracking-[0.16em] text-[#1d4ed8] uppercase break-after-avoid">
      <Icon className="size-3.5" aria-hidden />
      {children}
    </h2>
  );
}

function Chip({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-block rounded-md border border-[#dbe4f5] bg-white px-1.5 py-[1px] text-[9px] font-medium text-[#1e293b]",
        className,
      )}
    >
      {children}
    </span>
  );
}

const A = ({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) => (
  <a href={href} className={cn("text-[#1d4ed8] hover:underline", className)}>
    {children}
  </a>
);

/* ── Page ────────────────────────────────────────────────── */

export default async function CvPage() {
  const [role, focus] = hero.tagline.split(" | ");
  const roles = role.split(" · ");
  const qr = await QRCode.toString(site.url, {
    type: "svg",
    margin: 0,
    color: { dark: navy, light: "#00000000" },
  });

  const contactItems = [
    { Icon: Mail, value: <A href={socials.email}>{person.email}</A> },
    cv.phone ? { Icon: Phone, value: cv.phone } : null,
    { Icon: Globe, value: <A href={site.url}>{pretty(site.url)}</A> },
    { Icon: LinkedinIcon, value: <A href={socials.linkedin}>{pretty(socials.linkedin)}</A> },
    { Icon: GithubIcon, value: <A href={socials.github}>{pretty(socials.github)}</A> },
    { Icon: MapPin, value: cv.nationality ? `${person.location} · ${cv.nationality}` : person.location },
  ].filter((c): c is NonNullable<typeof c> => c !== null);

  const hasLanguages = cv.languages.motherTongue.length > 0 || cv.languages.other.length > 0;

  return (
    <main
      id="main"
      className="min-h-dvh bg-[#e2e8f0] py-8 font-sans text-[#0f172a] print:bg-transparent print:py-0"
    >
      <style dangerouslySetInnerHTML={{ __html: printCss }} />
      {/* Read by scripts/generate-cv.mjs for the printed page footer. */}
      <span hidden data-cv-footer>
        {`${person.name} · Curriculum Vitae · ${pretty(site.url)}`}
      </span>

      {/* Screen-only toolbar */}
      <div className="mx-auto mb-4 flex max-w-[210mm] items-center justify-between px-4 text-sm print:hidden">
        <Link href="/" className="font-semibold text-[#1d4ed8] hover:underline">
          ← Back to website
        </Link>
        <a
          href={asset(person.cv)}
          download
          className="rounded-full bg-[#2563eb] px-4 py-2 font-semibold text-white shadow-[0_8px_20px_-8px_rgb(37_99_235/0.6)] hover:bg-[#1d4ed8]"
        >
          Download PDF
        </a>
      </div>

      <article className="mx-auto w-full max-w-[210mm] overflow-hidden bg-white shadow-[0_20px_60px_-20px_rgb(15_23_42/0.35)] print:max-w-none print:overflow-visible print:bg-transparent print:shadow-none">
        {/* ── Header band ── */}
        <header className="relative overflow-hidden bg-[linear-gradient(120deg,#0b1736_0%,#132f74_55%,#2563eb_100%)] px-[9mm] pt-[9mm] pb-[7mm] text-white">
          <div
            aria-hidden
            className="absolute inset-y-0 right-0 w-[55%] bg-[radial-gradient(rgb(255_255_255/0.22)_1px,transparent_1.2px)] [background-size:9px_9px] [mask-image:linear-gradient(to_left,black,transparent)]"
          />
          <div
            aria-hidden
            className="absolute -top-24 -right-20 size-72 rounded-full bg-[radial-gradient(closest-side,rgb(96_165_250/0.55),transparent)]"
          />

          <div className="relative flex items-center gap-6">
            <div className="shrink-0 rounded-full bg-[conic-gradient(from_200deg,#60a5fa,#f59e0b,#60a5fa)] p-[3px]">
              <div className="relative size-[32mm] overflow-hidden rounded-full border-[3px] border-[#0f2257]">
                <Image src={asset(person.photo)} alt={person.photoAlt} fill sizes="130px" className="object-cover" />
              </div>
            </div>
            <div className="min-w-0">
              <p className="font-mono text-[9px] tracking-[0.3em] text-[#93c5fd] uppercase">Curriculum Vitae</p>
              <h1 className="mt-1 font-display text-[34px] leading-none font-extrabold tracking-tight">
                {person.name}
              </h1>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {roles.map((r) => (
                  <li
                    key={r}
                    className="rounded-full bg-white/12 px-2.5 py-[3px] text-[10px] font-semibold ring-1 ring-white/25"
                  >
                    {r}
                  </li>
                ))}
              </ul>
              {focus && <p className="mt-2.5 text-[10.5px] text-[#c7dbff]">{focus}</p>}
            </div>
          </div>

          <dl className="relative mt-6 grid grid-cols-4 gap-2">
            {highlights.map((h) => (
              <div
                key={h.label}
                className="flex flex-col-reverse rounded-xl bg-white/10 px-3 py-2 ring-1 ring-white/15"
              >
                <dt className="mt-0.5 text-[8.5px] leading-tight text-[#c7dbff]">{h.label}</dt>
                <dd className="font-display text-[17px] leading-none font-extrabold">{h.value}</dd>
              </div>
            ))}
          </dl>
        </header>

        <div className="grid" style={{ gridTemplateColumns: `${SIDEBAR} 1fr` }}>
          {/* ── Sidebar ── */}
          <aside className="space-y-5 bg-[#eef3fd] px-[7mm] pt-[7mm] pb-[4mm] print:bg-transparent">
            <section>
              <SideHeading icon={UserRound}>Contact</SideHeading>
              <ul className="space-y-1.5 text-[9.5px] leading-snug">
                {contactItems.map(({ Icon, value }, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-[1px] grid size-4 shrink-0 place-items-center rounded bg-[#2563eb] text-white">
                      <Icon className="size-2.5" aria-hidden />
                    </span>
                    <span className="min-w-0 break-words">{value}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="flex items-center gap-3 rounded-xl bg-white p-3 ring-1 ring-[#dbe4f5] break-inside-avoid">
              <div
                className="size-[19mm] shrink-0 [&>svg]:size-full"
                role="img"
                aria-label={`QR code linking to ${pretty(site.url)}`}
                dangerouslySetInnerHTML={{ __html: qr }}
              />
              <div className="text-[9px] leading-snug">
                <p className="font-display text-[10px] font-extrabold text-[#0b1736]">Scan for my live portfolio</p>
                <p className="mt-0.5 text-[#475569]">Projects, research &amp; contact</p>
              </div>
            </section>

            <section className="break-inside-avoid">
              <SideHeading icon={Target}>Research focus</SideHeading>
              <ul className="flex flex-wrap gap-1">
                {about.interests.map((i) => (
                  <li key={i}>
                    <Chip className="border-[#bfd3fb] text-[#1d4ed8]">{i}</Chip>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <SideHeading icon={Wrench}>Skills</SideHeading>
              <div className="space-y-2.5">
                {skills.map((g) => (
                  <div key={g.group} className="break-inside-avoid">
                    <p className="mb-1 text-[9px] font-bold text-[#0b1736]">{g.group}</p>
                    <ul className="flex flex-wrap gap-1">
                      {g.items.map((s) => (
                        <li key={s}>
                          <Chip>{s}</Chip>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <section className="break-inside-avoid">
              <SideHeading icon={GraduationCap}>Education</SideHeading>
              {education.map((e) => (
                <div key={e.degree} className="text-[9.5px] leading-snug">
                  <p className="font-display text-[10.5px] font-extrabold text-[#0b1736]">{e.degree}</p>
                  <p className="font-medium text-[#1d4ed8]">{e.institution}</p>
                  <p className="font-mono text-[8.5px] text-[#64748b]">{e.period}</p>
                  <ul className="mt-1 space-y-0.5 text-[#334155]">
                    {e.details.map((d) => (
                      <li key={d}>• {d}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>

            {hasLanguages && (
              <section className="break-inside-avoid">
                <SideHeading icon={Languages}>Languages</SideHeading>
                <ul className="space-y-1 text-[9.5px]">
                  {cv.languages.motherTongue.map((l) => (
                    <li key={l} className="flex justify-between">
                      <span className="font-semibold">{l}</span>
                      <span className="text-[#64748b]">Native</span>
                    </li>
                  ))}
                  {cv.languages.other.map((l) => (
                    <li key={l.language} className="flex justify-between">
                      <span className="font-semibold">{l.language}</span>
                      <span className="font-mono text-[8.5px] text-[#64748b]">
                        {[l.listening, l.reading, l.spokenProduction, l.spokenInteraction, l.writing].join(" ")}
                      </span>
                    </li>
                  ))}
                </ul>
                {cv.languages.other.length > 0 && (
                  <p className="mt-1 text-[7.5px] text-[#64748b]">
                    CEFR: listening, reading, spoken production, spoken interaction, writing
                  </p>
                )}
              </section>
            )}

            {cv.awards.length > 0 && (
              <section className="break-inside-avoid">
                <SideHeading icon={Award}>Honours &amp; awards</SideHeading>
                {cv.awards.map((a) => (
                  <div key={a.title} className="rounded-lg border-l-[3px] border-[#f59e0b] bg-white p-2.5 text-[9.5px] leading-snug">
                    <p className="font-display font-extrabold text-[#0b1736]">{a.title}</p>
                    <p className="mt-0.5 text-[#334155]">{a.detail}</p>
                  </div>
                ))}
              </section>
            )}
          </aside>

          {/* ── Main column ── */}
          <div className="min-w-0 px-[9mm] pt-[7mm] pb-[4mm]">
            <MainHeading n="01" icon={Sparkles}>
              Profile
            </MainHeading>
            <div className="space-y-1.5 text-[10.5px] leading-[1.55] text-[#334155]">
              {about.paragraphs.map((p, i) => (
                <p key={p.slice(0, 24)} className={i === 0 ? "text-[11px] text-[#0f172a]" : undefined}>
                  {p}
                </p>
              ))}
            </div>

            <MainHeading n="02" icon={Briefcase}>
              Experience
            </MainHeading>
            <ol className="relative ml-1.5 border-l-2 border-[#dbe4f5]">
              {experience.map((job) => (
                <li key={`${job.org}-${job.role}`} className="relative pb-3 pl-5 break-inside-avoid last:pb-0">
                  <span
                    aria-hidden
                    className={cn(
                      "absolute top-[3px] -left-[7px] size-3 rounded-full ring-[3px] ring-white",
                      job.current ? "bg-[#2563eb]" : "bg-[#cbd5e1]",
                    )}
                  />
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="font-display text-[12px] leading-snug font-extrabold text-[#0b1736]">
                        {job.role}
                      </h3>
                      <p className="text-[10px] font-semibold text-[#1d4ed8]">
                        {job.org}
                        {job.orgDetail && <span className="font-normal text-[#64748b]"> · {job.orgDetail}</span>}
                      </p>
                    </div>
                    <span
                      className={cn(
                        "shrink-0 rounded-full px-2 py-[2px] font-mono text-[8.5px] font-bold whitespace-nowrap",
                        job.current ? "bg-[#2563eb] text-white" : "bg-[#eef3fd] text-[#1e3a8a]",
                      )}
                    >
                      {cvDate(job.period)}
                    </span>
                  </div>
                  {job.points.length > 0 && (
                    <ul className="mt-1 space-y-0.5 text-[10px] leading-[1.45] text-[#334155]">
                      {job.points.map((p) => (
                        <li key={p} className="flex gap-1.5">
                          <span aria-hidden className="mt-[5px] size-1 shrink-0 rounded-full bg-[#2563eb]" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ol>

            <MainHeading n="03" icon={BookOpen}>
              Publications
            </MainHeading>
            <div className="space-y-2">
              {research.publications.map((pub: Publication, i) => (
                <article
                  key={pub.title}
                  className="rounded-r-lg border-l-[3px] border-[#2563eb] bg-[#f8faff] px-3 py-2.5 break-inside-avoid"
                >
                  <div className="flex flex-wrap items-center gap-1.5 text-[8.5px] font-bold">
                    <span className="font-mono text-[#94a3b8]">[{i + 1}]</span>
                    <span className="rounded-full bg-[#2563eb] px-1.5 py-[1px] text-white">{pub.status}</span>
                    {pub.role && (
                      <span className="rounded-full bg-[#fef3c7] px-1.5 py-[1px] text-[#92400e]">{pub.role}</span>
                    )}
                    {pub.venue && <span className="text-[#475569]">{pub.venue}</span>}
                    {pub.year && <span className="text-[#475569]">· {pub.year}</span>}
                  </div>
                  <h3 className="mt-1 font-display text-[11px] leading-snug font-extrabold text-[#0b1736]">
                    {pub.title}
                  </h3>
                  {pub.authors && <p className="text-[9.5px] text-[#64748b]">{pub.authors}</p>}
                  <p className="mt-1 flex flex-wrap gap-x-3 font-mono text-[8.5px]">
                    {pub.doi && <A href={doiUrl(pub.doi)}>doi:{pub.doi}</A>}
                    {pub.arxiv && <A href={arxivUrl(pub.arxiv)}>arXiv:{pub.arxiv}</A>}
                  </p>
                </article>
              ))}
            </div>

            <MainHeading n="04" icon={FlaskConical}>
              Research in progress
            </MainHeading>
            <ul className="space-y-2">
              {research.ongoing.map((r) => (
                <li key={r.title} className="flex gap-2.5 break-inside-avoid">
                  <span aria-hidden className="relative mt-[3px] flex size-2.5 shrink-0">
                    <span className="absolute inset-0 rounded-full bg-[#f59e0b]/30" />
                    <span className="relative m-auto size-1.5 rounded-full bg-[#f59e0b]" />
                  </span>
                  <div>
                    <h3 className="font-display text-[10.5px] leading-snug font-extrabold text-[#0b1736]">
                      {r.title}
                    </h3>
                    <p className="text-[9.5px] leading-snug text-[#475569]">
                      {r.description}
                      {r.collaborators && <span className="text-[#1d4ed8]"> With {r.collaborators}.</span>}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <MainHeading n="05" icon={FolderKanban}>
              Selected projects
            </MainHeading>
            <div className="grid grid-cols-2 gap-2">
              {projects.map((p) => (
                <article
                  key={p.title}
                  className="rounded-lg border border-[#e2e8f0] bg-white p-2.5 break-inside-avoid"
                >
                  <p
                    className="flex items-center gap-1.5 text-[8px] font-bold tracking-wide uppercase"
                    style={{ color: categoryColor[p.category] }}
                  >
                    <span aria-hidden className="size-1.5 rounded-full" style={{ background: categoryColor[p.category] }} />
                    {p.category}
                  </p>
                  <h3 className="mt-0.5 font-display text-[10.5px] leading-snug font-extrabold text-[#0b1736]">
                    {p.title}
                  </h3>
                  {p.highlight && (
                    <p className="mt-0.5 inline-block rounded bg-[#fef3c7] px-1 text-[8px] font-bold text-[#92400e]">
                      {p.highlight}
                    </p>
                  )}
                  <p className="mt-0.5 text-[9px] leading-snug text-[#475569]">{p.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
