/**
 * Everything on /dashboard is computed here from data/content.ts,
 * so the charts update automatically when the content changes.
 */
import {
  experience,
  projectCategories,
  projects,
  research,
  sectors,
  site,
  skills,
  type Sector,
} from "@/data/content";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** Months since year 0, so ranges are simple integers. */
type MonthIndex = number;
const toIndex = (year: number, month: number): MonthIndex => year * 12 + month;
export const monthLabel = (i: MonthIndex) => `${MONTHS[i % 12]} ${Math.floor(i / 12)}`;

/** "As of" date for the whole dashboard (site.lastUpdated). */
const asOf = new Date(`${site.lastUpdated}T00:00:00`);
export const NOW: MonthIndex = toIndex(asOf.getFullYear(), asOf.getMonth());
export const asOfLabel = asOf.toLocaleDateString("en-GB", { month: "long", year: "numeric" });

function parsePoint(text: string, edge: "start" | "end"): { index: MonthIndex; approx: boolean } | "now" | null {
  const t = text.trim();
  if (/^(present|now|current)$/i.test(t)) return "now";
  const my = t.match(/^([A-Z][a-z]{2})\s+(\d{4})$/);
  if (my && MONTHS.includes(my[1])) return { index: toIndex(+my[2], MONTHS.indexOf(my[1])), approx: false };
  const y = t.match(/^(\d{4})$/);
  if (y) return { index: toIndex(+y[1], edge === "start" ? 0 : 11), approx: true };
  return null;
}

export type TimelineRole = {
  role: string;
  org: string;
  sector: Sector;
  start: MonthIndex;
  end: MonthIndex; // inclusive
  current: boolean;
  approx: boolean; // year-only dates
  period: string;
};

/** Roles with a parseable start date, oldest first. */
export const timeline: TimelineRole[] = experience
  .flatMap((job) => {
    const [a, b] = job.period.split(/\s*[–-]\s*/);
    const start = parsePoint(a, "start");
    if (!start || start === "now") return [];
    const endRaw = parsePoint(b ?? a, "end");
    if (!endRaw) return [];
    const current = endRaw === "now";
    return [
      {
        role: job.role,
        org: job.org,
        sector: job.sector,
        start: start.index,
        end: current ? NOW : endRaw.index,
        current,
        approx: start.approx || (!current && endRaw.approx),
        period: job.period,
      },
    ];
  })
  .sort((a, b) => a.start - b.start || a.end - b.end);

/** Roles left off the timeline because they have no start date. */
export const undatedRoles = experience.filter((job) => !timeline.some((t) => t.role === job.role && t.org === job.org));

export const timelineStart: MonthIndex = Math.min(...timeline.map((t) => t.start));
export const timelineYears = Array.from(
  { length: Math.floor(NOW / 12) - Math.floor(timelineStart / 12) + 1 },
  (_, i) => Math.floor(timelineStart / 12) + i,
);

/** Number of roles active in each month, from the first start to now. */
export const concurrency = Array.from({ length: NOW - timelineStart + 1 }, (_, i) => {
  const m = timelineStart + i;
  return { month: m, active: timeline.filter((t) => t.start <= m && m <= t.end).length };
});

export const sectorList = sectors;

const yearsBuilding = Math.floor((NOW - timelineStart + 1) / 12);

export const kpis = [
  { label: "Years building", value: `${yearsBuilding}+`, note: `since ${Math.floor(timelineStart / 12)}` },
  { label: "Roles held", value: String(experience.length), note: `${experience.filter((e) => e.current).length} current` },
  { label: "Publications", value: String(research.publications.length), note: "incl. Springer Nature" },
  { label: "Research in progress", value: String(research.ongoing.length), note: "explainable AI for health" },
  { label: "Projects", value: String(projects.length), note: `${projectCategories.length} categories` },
  { label: "Skills listed", value: String(skills.reduce((n, g) => n + g.items.length, 0)), note: `${skills.length} areas` },
];

export const peakConcurrency = Math.max(...concurrency.map((c) => c.active));

export type BarDatum = { label: string; value: number; detail?: string };

export const skillsByArea: BarDatum[] = skills
  .map((g) => ({ label: g.group, value: g.items.length, detail: g.items.join(", ") }))
  .sort((a, b) => b.value - a.value);

export const projectsByCategory: BarDatum[] = projectCategories
  .map((c) => {
    const list = projects.filter((p) => p.category === c);
    return { label: c, value: list.length, detail: list.map((p) => p.title).join(", ") };
  })
  .sort((a, b) => b.value - a.value);

/** How often each topic tag appears across publications and ongoing research (top 8). */
export const researchTopics: BarDatum[] = (() => {
  const counts = new Map<string, string[]>();
  for (const item of [...research.publications, ...research.ongoing]) {
    for (const tag of item.tags) counts.set(tag, [...(counts.get(tag) ?? []), item.title]);
  }
  return [...counts.entries()]
    .map(([label, titles]) => ({ label, value: titles.length, detail: titles.join(" · ") }))
    .sort((a, b) => b.value - a.value || a.label.localeCompare(b.label))
    .slice(0, 8);
})();
