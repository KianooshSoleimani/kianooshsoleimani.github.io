import type { Branch, Commit } from "../../../content/types";

export interface Node {
  commit: Commit;
  row: number;
  lane: number;
  color: string;
}

export interface Edge {
  from: string;
  to: string;
  fromRow: number;
  toRow: number;
  fromLane: number;
  toLane: number;
  color: string;
  /** Implicit chain along one branch, or an explicit parent (fork / merge / collaboration). */
  kind: "chain" | "parent";
}

export interface GraphLayout {
  nodes: Node[];
  edges: Edge[];
  laneCount: number;
  /** branch id → lane index */
  lanes: Record<string, number>;
  /** branch id → true when the branch has no merge back into main */
  open: Record<string, boolean>;
  /** branch id → id of its newest commit (the branch tip). */
  heads: Record<string, string>;
  direction: Direction;
}

export type Direction = "newest-first" | "oldest-first";

/** "2018-04" → 2018*12+3 (months since year 0); "2018-04-15" is truncated to the month. */
export function monthIndex(date: string): number {
  const m = /^(\d{4})-(\d{2})(?:-\d{2})?$/.exec(date);
  if (!m) throw new Error(`Invalid date "${date}" (expected YYYY-MM or YYYY-MM-DD)`);
  const year = Number(m[1]);
  const month = Number(m[2]);
  if (month < 1 || month > 12) throw new Error(`Invalid month in "${date}"`);
  return year * 12 + (month - 1);
}

/**
 * Orders commits newest-first (like `git log`). Commits sharing a month are
 * ordered so that every commit sits above (smaller row than) its parents.
 */
export function orderCommits(commits: Commit[]): Commit[] {
  const byId = new Map(commits.map((c) => [c.id, c]));
  for (const c of commits) {
    for (const p of c.parents ?? []) {
      if (!byId.has(p)) throw new Error(`Commit "${c.id}" references unknown parent "${p}"`);
    }
  }
  // Group by month, newest first.
  const groups = new Map<number, Commit[]>();
  for (const c of commits) {
    const k = monthIndex(c.date);
    const g = groups.get(k) ?? [];
    g.push(c);
    groups.set(k, g);
  }
  const months = [...groups.keys()].sort((a, b) => b - a);
  const out: Commit[] = [];
  for (const m of months) {
    const group = groups.get(m)!;
    const ids = new Set(group.map((c) => c.id));
    // Topological order within the month: a commit comes before its parents.
    const remaining = [...group];
    const placed: Commit[] = [];
    while (remaining.length) {
      const idx = remaining.findIndex((c) => {
        // c can be placed when no other remaining commit lists c as a parent.
        return !remaining.some((o) => o !== c && (o.parents ?? []).includes(c.id) && ids.has(o.id));
      });
      const pick = idx === -1 ? 0 : idx; // cycle guard: fall back to input order
      placed.push(remaining.splice(pick, 1)[0]);
    }
    out.push(...placed);
  }
  return out;
}

interface Span {
  start: number;
  end: number;
}

/** Assigns lanes greedily: main is lane 0; other branches take the lowest lane free for their whole life span. */
export function assignLanes(
  branches: Branch[],
  commits: Commit[],
): { lanes: Record<string, number>; laneCount: number; open: Record<string, boolean> } {
  const main = branches.find((b) => b.kind === "main");
  if (!main) throw new Error("A branch with kind 'main' is required");
  const lanes: Record<string, number> = { [main.id]: 0 };
  const spans = new Map<string, Span>();
  const newest = Math.max(...commits.map((c) => monthIndex(c.date)));
  const byId = new Map(commits.map((c) => [c.id, c]));

  const open: Record<string, boolean> = {};
  for (const b of branches) {
    if (b.id === main.id) continue;
    const own = commits.filter((c) => c.branch === b.id);
    if (!own.length) continue;
    const start = Math.min(...own.map((c) => monthIndex(c.date)));
    // Closed when some commit on main has a parent on this branch.
    const mergedInto = commits.find(
      (c) => c.branch === main.id && (c.parents ?? []).some((p) => byId.get(p)?.branch === b.id),
    );
    open[b.id] = !mergedInto;
    const end = mergedInto ? monthIndex(mergedInto.date) : newest + 1;
    spans.set(b.id, { start, end });
  }

  const order = [...spans.entries()].sort((a, b) => a[1].start - b[1].start || a[1].end - b[1].end);
  const laneSpans: Span[][] = [[]]; // lane 0 is main, never reused
  for (const [id, span] of order) {
    let lane = 1;
    for (;;) {
      const taken = laneSpans[lane] ?? [];
      // End is exclusive so a branch that ends the month another starts can share a lane.
      const clash = taken.some((s) => span.start < s.end && s.start < span.end);
      if (!clash) break;
      lane++;
    }
    (laneSpans[lane] ??= []).push(span);
    lanes[id] = lane;
  }
  return { lanes, laneCount: laneSpans.length, open };
}

export function layoutGraph(branches: Branch[], commits: Commit[], direction: Direction = "newest-first"): GraphLayout {
  const color = new Map(branches.map((b) => [b.id, b.color]));
  for (const c of commits) {
    if (!color.has(c.branch)) throw new Error(`Commit "${c.id}" is on unknown branch "${c.branch}"`);
  }
  const ordered = orderCommits(commits);
  const { lanes, laneCount, open } = assignLanes(branches, commits);
  const rowOf = new Map(ordered.map((c, i) => [c.id, i]));

  const nodes: Node[] = ordered.map((commit, row) => ({
    commit,
    row,
    lane: lanes[commit.branch],
    color: color.get(commit.branch)!,
  }));

  const edges: Edge[] = [];
  const edge = (from: Commit, to: Commit, kind: Edge["kind"]) => {
    // Colour an edge by the *older* commit's branch when it is a fork out of
    // main, and by the newer commit's branch otherwise (merges into main keep
    // the branch colour so the branch visibly flows back).
    const c = to.branch === from.branch ? color.get(from.branch)! : from.branch === "main" ? color.get(to.branch)! : color.get(from.branch)!;
    edges.push({
      from: from.id,
      to: to.id,
      fromRow: rowOf.get(from.id)!,
      toRow: rowOf.get(to.id)!,
      fromLane: lanes[from.branch],
      toLane: lanes[to.branch],
      color: c,
      kind,
    });
  };

  // Implicit chain along each branch (newer → next older).
  const byBranch = new Map<string, Commit[]>();
  for (const c of ordered) (byBranch.get(c.branch) ?? byBranch.set(c.branch, []).get(c.branch)!).push(c);
  for (const list of byBranch.values()) {
    for (let i = 0; i < list.length - 1; i++) edge(list[i], list[i + 1], "chain");
  }
  // Explicit parents.
  const byId = new Map(commits.map((c) => [c.id, c]));
  for (const c of ordered) {
    for (const p of c.parents ?? []) {
      const parent = byId.get(p)!;
      if (rowOf.get(parent.id)! <= rowOf.get(c.id)!) {
        throw new Error(`Parent "${p}" of "${c.id}" must be older (it is dated ${parent.date} vs ${c.date})`);
      }
      edge(c, parent, "parent");
    }
  }
  const heads: Record<string, string> = {};
  for (const n of nodes) if (!(n.commit.branch in heads)) heads[n.commit.branch] = n.commit.id;

  if (direction === "oldest-first") {
    const last = nodes.length - 1;
    const flipped = [...nodes].reverse().map((n, row) => ({ ...n, row }));
    const flippedEdges = edges.map((e) => ({ ...e, fromRow: last - e.fromRow, toRow: last - e.toRow }));
    return { nodes: flipped, edges: flippedEdges, laneCount, lanes, open, heads, direction };
  }
  return { nodes, edges, laneCount, lanes, open, heads, direction };
}
