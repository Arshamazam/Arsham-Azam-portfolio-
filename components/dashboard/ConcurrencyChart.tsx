"use client";

import { useEffect, useRef, useState } from "react";
import { ChartCard, DataTable, Tooltip } from "./ChartCard";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const label = (m: number) => `${MONTHS[m % 12]} ${Math.floor(m / 12)}`;

const H = 200;
const M = { top: 12, right: 12, bottom: 26, left: 28 };

/** Step line: how many roles were active each month. Crosshair + tooltip on hover, arrow keys when focused. */
export function ConcurrencyChart({
  data,
  hasApprox,
}: {
  data: { month: number; active: number }[];
  hasApprox: boolean; // some roles list only a year, so they count for the whole year
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(560);
  const [hover, setHover] = useState<number | null>(null);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setWidth(Math.max(280, e.contentRect.width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const maxY = Math.max(...data.map((d) => d.active), 1);
  const iw = width - M.left - M.right;
  const ih = H - M.top - M.bottom;
  const x = (i: number) => M.left + (i / Math.max(data.length - 1, 1)) * iw;
  const y = (v: number) => M.top + ih - (v / maxY) * ih;

  // Step path: hold each value until the next month.
  let line = `M ${x(0)} ${y(data[0].active)}`;
  for (let i = 1; i < data.length; i++) line += ` H ${x(i)} V ${y(data[i].active)}`;
  const area = `${line} V ${y(0)} H ${x(0)} Z`;

  const yearTicks = data.map((d, i) => ({ i, m: d.month })).filter((d) => d.m % 12 === 0);
  const peak = data.reduce((best, d, i) => (d.active > data[best].active ? i : best), 0);

  function onMove(e: React.PointerEvent<SVGRectElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    setHover(Math.min(data.length - 1, Math.max(0, Math.round(ratio * (data.length - 1)))));
  }
  function onKey(e: React.KeyboardEvent) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    setHover((h) => {
      const cur = h ?? data.length - 1;
      return Math.min(data.length - 1, Math.max(0, cur + (e.key === "ArrowRight" ? 1 : -1)));
    });
  }

  const h = hover !== null ? data[hover] : null;

  return (
    <ChartCard
      title="Roles held at the same time"
      subtitle={
        `Up to ${data[peak].active} roles at once (${label(data[peak].month)}).` +
        (hasApprox ? " Roles listed by year only count for the whole year, so earlier peaks may be overstated." : "")
      }
      table={
        <DataTable
          head={["From", "Active roles"]}
          rows={data
            .filter((d, i) => i === 0 || d.active !== data[i - 1].active)
            .map((d) => [label(d.month), d.active])}
        />
      }
    >
      <div ref={wrap} className="relative w-full min-w-0">
        <svg
          viewBox={`0 0 ${width} ${H}`}
          style={{ width: "100%", height: H }}
          role="img"
          aria-label={`Line chart of concurrent roles over time, peaking at ${data[peak].active}. Use the arrow keys to inspect months.`}
          tabIndex={0}
          onKeyDown={onKey}
          onBlur={() => setHover(null)}
          className="block overflow-visible rounded-lg"
        >
          {Array.from({ length: maxY + 1 }, (_, v) => (
            <g key={v}>
              <line x1={M.left} x2={width - M.right} y1={y(v)} y2={y(v)} stroke="var(--border)" strokeWidth={1} />
              <text x={M.left - 8} y={y(v)} dy="0.32em" textAnchor="end" fontSize={11} fill="var(--muted)">
                {v}
              </text>
            </g>
          ))}
          {yearTicks.map((t) => (
            <text key={t.m} x={x(t.i)} y={H - 6} textAnchor="middle" fontSize={11} fill="var(--muted)">
              {Math.floor(t.m / 12)}
            </text>
          ))}
          <path d={area} fill="var(--series-1)" fillOpacity={0.1} />
          <path d={line} fill="none" stroke="var(--series-1)" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
          {/* End marker + label on the latest value */}
          <circle cx={x(data.length - 1)} cy={y(data[data.length - 1].active)} r={4} fill="var(--series-1)" stroke="var(--surface)" strokeWidth={2} />

          {h && hover !== null && (
            <g pointerEvents="none">
              <line x1={x(hover)} x2={x(hover)} y1={M.top} y2={y(0)} stroke="var(--muted)" strokeWidth={1} />
              <circle cx={x(hover)} cy={y(h.active)} r={5} fill="var(--series-1)" stroke="var(--surface)" strokeWidth={2} />
            </g>
          )}
          <rect
            x={M.left}
            y={M.top}
            width={iw}
            height={ih}
            fill="transparent"
            onPointerMove={onMove}
            onPointerLeave={() => setHover(null)}
          />
        </svg>
        {h && hover !== null && (
          <Tooltip
            className="-translate-x-1/2"
            style={{
              left: Math.min(Math.max(x(hover), 60), width - 60),
              top: Math.max(y(h.active) - 64, 0),
            }}
          >
            <span className="sr-only">Selected month: </span>
            <p className="font-semibold">{label(h.month)}</p>
            <p className="text-muted">
              {h.active} active {h.active === 1 ? "role" : "roles"}
            </p>
          </Tooltip>
        )}
      </div>
    </ChartCard>
  );
}
