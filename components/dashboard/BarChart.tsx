"use client";

import { useState } from "react";
import { ChartCard, DataTable, Tooltip } from "./ChartCard";
import type { BarDatum } from "@/lib/profileStats";

/** Horizontal single-series bar chart with value labels at the bar tips and detail tooltips. */
export function BarChart({
  title,
  subtitle,
  data,
  unit,
  labelHead,
}: {
  title: string;
  subtitle?: string;
  data: BarDatum[];
  unit: string; // e.g. "skills"
  labelHead: string; // table column heading for the label
}) {
  const [hover, setHover] = useState<number | null>(null);
  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <ChartCard
      title={title}
      subtitle={subtitle}
      table={
        <DataTable
          head={[labelHead, unit[0].toUpperCase() + unit.slice(1), "Includes"]}
          rows={data.map((d) => [d.label, d.value, d.detail ?? ""])}
        />
      }
    >
      <ul className="space-y-3" onPointerLeave={() => setHover(null)}>
        {data.map((d, i) => (
          <li
            key={d.label}
            tabIndex={0}
            aria-label={`${d.label}: ${d.value} ${unit}`}
            onPointerEnter={() => setHover(i)}
            onFocus={() => setHover(i)}
            onBlur={() => setHover(null)}
            className="relative grid grid-cols-[minmax(6rem,9.5rem)_1fr] items-center gap-3 rounded-lg outline-offset-4"
          >
            <span className="truncate text-sm text-fg" title={d.label}>
              {d.label}
            </span>
            <span className="flex items-center gap-2">
              <span
                aria-hidden
                className="h-[18px] rounded-r-[4px] transition-[filter] duration-150"
                style={{
                  width: `${(d.value / max) * 85}%`,
                  background: "var(--series-1)",
                  filter: hover === null || hover === i ? undefined : "saturate(0.35) opacity(0.55)",
                }}
              />
              <span className="text-sm font-semibold text-fg">{d.value}</span>
            </span>
            {hover === i && d.detail && (
              <Tooltip className="top-full left-[min(9.5rem,40%)] mt-1.5">
                <p className="font-semibold">
                  {d.label} · {d.value} {unit}
                </p>
                <p className="mt-0.5 text-muted">{d.detail}</p>
              </Tooltip>
            )}
          </li>
        ))}
      </ul>
    </ChartCard>
  );
}
