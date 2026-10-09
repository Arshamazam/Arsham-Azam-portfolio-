"use client";

import { useState } from "react";
import { ChartCard, DataTable, Legend, Tooltip } from "./ChartCard";
import type { Sector } from "@/data/content";
import type { TimelineRole } from "@/lib/profileStats";
import { cn } from "@/lib/utils";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const label = (m: number) => `${MONTHS[m % 12]} ${Math.floor(m / 12)}`;

/** Gantt of every dated role on one time axis, coloured by sector, with a "Now" line. */
export function CareerTimeline({
  roles,
  years,
  now,
  sectors,
  undated,
}: {
  roles: TimelineRole[];
  years: number[];
  now: number;
  sectors: readonly Sector[];
  undated: string[];
}) {
  const [hover, setHover] = useState<number | null>(null);
  const axisStart = years[0] * 12;
  const axisEnd = (years[years.length - 1] + 1) * 12;
  const pos = (m: number) => ((m - axisStart) / (axisEnd - axisStart)) * 100;
  const colorOf = (s: Sector) => `var(--series-${sectors.indexOf(s) + 1})`;

  return (
    <ChartCard
      title="Career timeline"
      subtitle="Every role on one time axis. Overlapping bars show work done in parallel."
      legend={<Legend items={sectors.map((s) => ({ label: s, color: colorOf(s) }))} />}
      table={
        <DataTable
          head={["Role", "Organisation", "Sector", "Period"]}
          rows={roles.map((r) => [r.role, r.org, r.sector, r.period])}
        />
      }
    >
      <div className="relative" onPointerLeave={() => setHover(null)}>
        {/* Year gridlines + labels, and the Now line, span the bar column only */}
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 left-0 sm:left-[13.5rem]">
          {years.map((y) => (
            <div key={y} className="absolute top-6 bottom-0 w-px bg-border" style={{ left: `${pos(y * 12)}%` }}>
              <span className="absolute -top-6 left-1.5 text-[11px] text-muted tabular-nums">{y}</span>
            </div>
          ))}
          <div className="absolute top-6 bottom-0 w-0.5 bg-fg/70" style={{ left: `${pos(now + 1)}%` }}>
            <span className="absolute -top-6 left-1/2 -translate-x-1/2 rounded-full bg-fg px-1.5 text-[10px] font-semibold text-bg">
              Now
            </span>
          </div>
        </div>

        <ol className="relative space-y-3 pt-9">
          {roles.map((r, i) => (
            <li
              key={`${r.org}-${r.role}`}
              tabIndex={0}
              aria-label={`${r.role} at ${r.org}, ${r.period}, ${r.sector}`}
              onPointerEnter={() => setHover(i)}
              onFocus={() => setHover(i)}
              onBlur={() => setHover(null)}
              className="grid gap-1 rounded-lg outline-offset-4 sm:grid-cols-[13rem_1fr] sm:items-center sm:gap-3"
            >
              <div className="min-w-0 text-sm leading-tight sm:pr-2">
                <p className="truncate font-semibold" title={r.role}>
                  {r.role}
                </p>
                <p className="truncate text-xs text-muted" title={r.org}>
                  {r.org}
                </p>
              </div>
              <div className="relative h-6">
                <div
                  className={cn("absolute top-[3px] h-[18px] rounded-[4px] transition-[filter] duration-150")}
                  style={{
                    left: `${pos(r.start)}%`,
                    width: `max(6px, ${pos(r.end + 1) - pos(r.start)}%)`,
                    background: colorOf(r.sector),
                    filter: hover === null || hover === i ? undefined : "saturate(0.35) opacity(0.5)",
                  }}
                />
                {hover === i && (
                  <Tooltip
                    className={pos(r.start) > 55 ? "top-full right-0 mt-1" : "top-full mt-1"}
                  >
                    <p className="font-semibold">{r.role}</p>
                    <p className="text-muted">{r.org}</p>
                    <p className="mt-1">
                      {label(r.start)} – {r.current ? "Present" : label(r.end)}
                      {r.approx && <span className="text-muted"> (year only)</span>}
                    </p>
                    <p className="mt-0.5 flex items-center gap-1.5 text-muted">
                      <span aria-hidden className="size-2 rounded-[2px]" style={{ background: colorOf(r.sector) }} />
                      {r.sector}
                    </p>
                  </Tooltip>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
      {undated.length > 0 && (
        <p className="mt-5 text-xs text-muted">Not shown (no start date listed): {undated.join(", ")}.</p>
      )}
    </ChartCard>
  );
}
