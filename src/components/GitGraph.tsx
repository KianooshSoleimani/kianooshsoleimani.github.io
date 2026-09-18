"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { Branch } from "@content/types";
import type { GraphLayout, Node } from "@/lib/git-graph/layout";
import { formatMonth, shortSha } from "@/lib/format";

const LANE_W = 22;
const LANE_W_SM = 16;
const NODE_R = 5;

type View = "graph" | "list";

export function GitGraph({ branches, layout }: { branches: Branch[]; layout: GraphLayout }) {
  const [view, setView] = useState<View>("graph");
  const [active, setActive] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set());
  const [ys, setYs] = useState<Record<string, number>>({});
  const [height, setHeight] = useState(0);
  const [laneW, setLaneW] = useState(LANE_W);
  const containerRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef(new Map<string, HTMLElement>());

  const branchById = useMemo(() => new Map(branches.map((b) => [b.id, b])), [branches]);
  const railW = layout.laneCount * laneW + 6;

  const measure = useCallback(() => {
    const root = containerRef.current;
    if (!root) return;
    const top = root.getBoundingClientRect().top;
    const next: Record<string, number> = {};
    for (const [id, el] of rowRefs.current) {
      const r = el.getBoundingClientRect();
      // Anchor the node on the title line, not the middle of an expanded card.
      next[id] = r.top - top + Math.min(r.height / 2, 28);
    }
    setYs(next);
    setHeight(root.getBoundingClientRect().height);
  }, []);

  useLayoutEffect(() => {
    measure();
  }, [measure, expanded, view]);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    const mq = window.matchMedia("(max-width: 640px)");
    const applyLane = () => setLaneW(mq.matches ? LANE_W_SM : LANE_W);
    applyLane();
    mq.addEventListener("change", applyLane);
    const ro = new ResizeObserver(() => measure());
    ro.observe(root);
    for (const el of rowRefs.current.values()) ro.observe(el);
    return () => {
      ro.disconnect();
      mq.removeEventListener("change", applyLane);
    };
  }, [measure, view]);

  const toggle = (id: string) =>
    setExpanded((s) => {
      const n = new Set(s);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });

  const x = (lane: number) => lane * laneW + laneW / 2 + 3;
  const dim = (branch: string) => active !== null && active !== branch;

  // The tip of each branch gets a ref label, like `git log --decorate`.
  const headOf = useMemo(() => new Map(Object.entries(layout.heads)), [layout.heads]);

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <div className="flex flex-wrap gap-2" aria-label="Branches">
          {branches.map((b) => (
            <button
              key={b.id}
              type="button"
              onMouseEnter={() => setActive(b.id)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(b.id)}
              onBlur={() => setActive(null)}
              onClick={() => setActive((a) => (a === b.id ? null : b.id))}
              aria-pressed={active === b.id}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-1 font-mono text-xs transition-colors hover:border-accent aria-pressed:border-accent"
              style={{ opacity: dim(b.id) ? 0.45 : 1 }}
            >
              <span className="inline-block h-2 w-2 rounded-full" style={{ background: b.color }} aria-hidden />
              {b.label}
              {layout.open[b.id] ? <span className="text-muted">·open</span> : null}
            </button>
          ))}
        </div>
        <div className="ml-auto inline-flex rounded-md border border-border bg-card p-0.5 font-mono text-xs" role="group" aria-label="View">
          {(["graph", "list"] as View[]).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setView(v)}
              aria-pressed={view === v}
              className="rounded px-2.5 py-1 text-muted transition-colors aria-pressed:bg-accent-soft aria-pressed:text-fg"
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      <div ref={containerRef} className="relative rounded-xl border border-border bg-card">
        {view === "graph" ? (
          <svg
            className="pointer-events-none absolute left-2 top-0"
            width={railW}
            height={height}
            aria-hidden
            style={{ overflow: "visible" }}
          >
            {layout.edges.map((e) => {
              const y1 = ys[e.from];
              const y2 = ys[e.to];
              if (y1 === undefined || y2 === undefined) return null;
              const x1 = x(e.fromLane);
              const x2 = x(e.toLane);
              const d =
                x1 === x2
                  ? `M ${x1} ${y1} L ${x2} ${y2}`
                  : `M ${x1} ${y1} C ${x1} ${y1 + (y2 - y1) * 0.5}, ${x2} ${y2 - (y2 - y1) * 0.5}, ${x2} ${y2}`;
              const from = layout.nodes[e.fromRow].commit.branch;
              const to = layout.nodes[e.toRow].commit.branch;
              const faded = active !== null && active !== from && active !== to;
              return (
                <path
                  key={`${e.from}-${e.to}`}
                  d={d}
                  fill="none"
                  stroke={e.color}
                  strokeWidth={e.kind === "chain" ? 2 : 1.75}
                  strokeDasharray={e.kind === "parent" && from !== to && from !== "main" && to !== "main" ? "3 3" : undefined}
                  opacity={faded ? 0.18 : 0.9}
                  style={{ transition: "opacity .2s" }}
                />
              );
            })}
            {layout.nodes.map((n) => {
              const y = ys[n.commit.id];
              if (y === undefined) return null;
              const cx = x(n.lane);
              const merge = n.commit.kind === "merge";
              const tag = n.commit.kind === "tag" || (n.commit.tags?.length ?? 0) > 0;
              return (
                <g key={n.commit.id} opacity={dim(n.commit.branch) ? 0.25 : 1} style={{ transition: "opacity .2s" }}>
                  {merge ? <circle cx={cx} cy={y} r={NODE_R + 3} fill="none" stroke={n.color} strokeWidth={1.5} /> : null}
                  <circle cx={cx} cy={y} r={NODE_R} fill={n.color} stroke="var(--card)" strokeWidth={2} />
                  {tag ? <circle cx={cx} cy={y} r={2} fill="var(--card)" /> : null}
                </g>
              );
            })}
          </svg>
        ) : null}

        <ol className="divide-y divide-border">
          {layout.nodes.map((n) => (
            <Row
              key={n.commit.id}
              node={n}
              branch={branchById.get(n.commit.branch)!}
              isHead={headOf.get(n.commit.branch) === n.commit.id}
              open={layout.open[n.commit.branch] ?? false}
              expanded={expanded.has(n.commit.id)}
              dimmed={dim(n.commit.branch)}
              padLeft={view === "graph" ? railW + 12 : 16}
              onToggle={() => toggle(n.commit.id)}
              onHover={(b) => setActive(b)}
              register={(el) => {
                if (el) rowRefs.current.set(n.commit.id, el);
                else rowRefs.current.delete(n.commit.id);
              }}
            />
          ))}
        </ol>
      </div>
      <p className="mt-3 font-mono text-xs text-muted">
        ≈ marks an estimated month · ○ ring = a chapter merged back into main · HEAD → = current
      </p>
    </div>
  );
}

function Row({
  node,
  branch,
  isHead,
  open,
  expanded,
  dimmed,
  padLeft,
  onToggle,
  onHover,
  register,
}: {
  node: Node;
  branch: Branch;
  isHead: boolean;
  open: boolean;
  expanded: boolean;
  dimmed: boolean;
  padLeft: number;
  onToggle: () => void;
  onHover: (b: string | null) => void;
  register: (el: HTMLElement | null) => void;
}) {
  const c = node.commit;
  const hasMore = Boolean(c.body || c.highlights?.length || c.stack?.length || c.people?.length || c.links?.length);
  const id = `commit-${c.id}`;
  return (
    <li
      ref={register}
      className="relative transition-opacity"
      style={{ paddingLeft: padLeft, opacity: dimmed ? 0.45 : 1 }}
      onMouseEnter={() => onHover(c.branch)}
      onMouseLeave={() => onHover(null)}
    >
      <article className="py-3 pr-4 sm:py-3.5" aria-labelledby={`${id}-title`}>
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <time dateTime={c.date} className="font-mono text-xs text-muted">
            {c.period ?? formatMonth(c.date, c.approx)}
          </time>
          <span className="font-mono text-xs text-muted/70">{shortSha(c.id)}</span>
          {isHead ? (
            <span
              className="rounded-sm border px-1.5 font-mono text-[10px] leading-5"
              style={{ borderColor: branch.color, color: branch.color }}
            >
              {open ? "HEAD → " : ""}
              {branch.label}
            </span>
          ) : null}
          {c.tags?.map((t) => (
            <span key={t} className="rounded-sm bg-accent-soft px-1.5 font-mono text-[10px] leading-5 text-fg">
              tag: {t}
            </span>
          ))}
        </div>
        <h3 id={`${id}-title`} className="mt-1 text-sm font-medium leading-snug sm:text-[15px]">
          {hasMore ? (
            <button
              type="button"
              onClick={onToggle}
              aria-expanded={expanded}
              aria-controls={`${id}-body`}
              className="text-left hover:underline"
            >
              {c.title}
              <span className="ml-2 font-mono text-xs text-muted">{expanded ? "−" : "+"}</span>
            </button>
          ) : (
            c.title
          )}
        </h3>
        {hasMore && expanded ? (
          <div id={`${id}-body`} className="mt-2 space-y-2 text-sm text-muted">
            {c.body ? <p className="max-w-2xl">{c.body}</p> : null}
            {c.highlights?.length ? (
              <ul className="max-w-2xl space-y-1">
                {c.highlights.map((h) => (
                  <li key={h} className="flex gap-2">
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: branch.color }} aria-hidden />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            ) : null}
            {c.people?.length ? (
              <p className="font-mono text-xs">
                <span className="text-fg/70">with:</span> {c.people.join(", ")}
              </p>
            ) : null}
            {c.stack?.length ? (
              <ul className="flex flex-wrap gap-1.5" aria-label="Stack">
                {c.stack.map((s) => (
                  <li key={s} className="rounded-md border border-border px-1.5 py-0.5 font-mono text-[11px]">
                    {s}
                  </li>
                ))}
              </ul>
            ) : null}
            {c.links?.length ? (
              <p className="flex flex-wrap gap-3 font-mono text-xs">
                {c.links.map((l) => (
                  <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="text-accent hover:underline">
                    {l.label} ↗
                  </a>
                ))}
              </p>
            ) : null}
          </div>
        ) : null}
      </article>
    </li>
  );
}
