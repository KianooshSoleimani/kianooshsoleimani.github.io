import { describe, expect, it } from "vitest";
import type { Branch, Commit } from "@content/types";
import { assignLanes, layoutGraph, monthIndex, orderCommits } from "./layout";

const branches: Branch[] = [
  { id: "main", label: "main", kind: "main", color: "#0f0" },
  { id: "a", label: "a", kind: "employer", color: "#f00" },
  { id: "b", label: "b", kind: "employer", color: "#00f" },
  { id: "c", label: "c", kind: "oss", color: "#ff0" },
];

const commits: Commit[] = [
  { id: "m0", branch: "main", date: "2016-01", title: "init" },
  { id: "a0", branch: "a", date: "2016-01", kind: "branch", parents: ["m0"], title: "join a" },
  { id: "a1", branch: "a", date: "2016-06", title: "work" },
  { id: "m1", branch: "main", date: "2017-01", kind: "merge", parents: ["a1"], title: "leave a" },
  { id: "b0", branch: "b", date: "2017-01", kind: "branch", parents: ["m1"], title: "join b" },
  { id: "c0", branch: "c", date: "2017-06", kind: "branch", parents: ["b0"], title: "oss" },
  { id: "b1", branch: "b", date: "2018-01", title: "more work" },
];

describe("monthIndex", () => {
  it("parses YYYY-MM and YYYY-MM-DD", () => {
    expect(monthIndex("2018-04")).toBe(2018 * 12 + 3);
    expect(monthIndex("2018-04-15")).toBe(2018 * 12 + 3);
  });
  it("rejects garbage", () => {
    expect(() => monthIndex("April 2018")).toThrow();
    expect(() => monthIndex("2018-13")).toThrow();
  });
});

describe("orderCommits", () => {
  it("is newest-first and keeps children above parents within a month", () => {
    const ids = orderCommits(commits).map((c) => c.id);
    expect(ids).toEqual(["b1", "c0", "b0", "m1", "a1", "a0", "m0"]);
  });
  it("throws on unknown parents", () => {
    expect(() => orderCommits([{ id: "x", branch: "main", date: "2020-01", title: "x", parents: ["nope"] }])).toThrow(/unknown parent/);
  });
});

describe("assignLanes", () => {
  it("keeps main on lane 0 and reuses a lane once a branch is merged", () => {
    const { lanes, laneCount, open } = assignLanes(branches, commits);
    expect(lanes.main).toBe(0);
    expect(lanes.a).toBe(1);
    // b starts the month a is merged, so it can reuse lane 1 (end is exclusive).
    expect(lanes.b).toBe(1);
    // c overlaps b, so it needs a new lane.
    expect(lanes.c).toBe(2);
    expect(laneCount).toBe(3);
    expect(open).toEqual({ a: false, b: true, c: true });
  });
});

describe("layoutGraph", () => {
  it("builds chain edges per branch and parent edges for forks/merges", () => {
    const g = layoutGraph(branches, commits);
    const key = (e: { from: string; to: string; kind: string }) => `${e.kind}:${e.from}->${e.to}`;
    const edges = new Set(g.edges.map(key));
    expect(edges.has("chain:a1->a0")).toBe(true);
    expect(edges.has("chain:b1->b0")).toBe(true);
    expect(edges.has("chain:m1->m0")).toBe(true);
    expect(edges.has("parent:a0->m0")).toBe(true);
    expect(edges.has("parent:m1->a1")).toBe(true);
    expect(edges.has("parent:c0->b0")).toBe(true);
    // every edge points downwards (to an older row)
    for (const e of g.edges) expect(e.toRow).toBeGreaterThan(e.fromRow);
    // fork edges out of main take the branch colour
    const fork = g.edges.find((e) => e.from === "a0" && e.to === "m0")!;
    expect(fork.color).toBe("#f00");
  });
  it("exposes branch tips and can flip to oldest-first without changing edge identity", () => {
    const g = layoutGraph(branches, commits);
    expect(g.heads).toEqual({ main: "m1", a: "a1", b: "b1", c: "c0" });
    const r = layoutGraph(branches, commits, "oldest-first");
    expect(r.nodes.map((n) => n.commit.id)).toEqual(["m0", "a0", "a1", "m1", "b0", "c0", "b1"]);
    expect(r.nodes.map((n) => n.row)).toEqual([0, 1, 2, 3, 4, 5, 6]);
    expect(r.heads).toEqual(g.heads);
    // oldest-first: every edge points UP to an older (smaller) row
    for (const e of r.edges) expect(e.toRow).toBeLessThan(e.fromRow);
    expect(r.nodes[r.edges.find((e) => e.from === "m1" && e.to === "a1")!.toRow].commit.id).toBe("a1");
  });
  it("rejects a parent that is newer than its child", () => {
    const bad: Commit[] = [
      { id: "old", branch: "main", date: "2020-01", title: "old", parents: ["new"] },
      { id: "new", branch: "main", date: "2021-01", title: "new" },
    ];
    expect(() => layoutGraph(branches, bad)).toThrow(/must be older/);
  });
  it("rejects a commit on an unknown branch", () => {
    expect(() => layoutGraph(branches, [{ id: "x", branch: "ghost", date: "2020-01", title: "x" }])).toThrow(/unknown branch/);
  });
});
