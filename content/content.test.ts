import { describe, expect, it } from "vitest";
import { branches, commits, education, profile, projects, skills } from "./index";
import { layoutGraph, monthIndex } from "../src/lib/git-graph/layout";

describe("career content", () => {
  it("has unique commit ids", () => {
    const ids = commits.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
  it("has unique branch ids and exactly one main", () => {
    const ids = branches.map((b) => b.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(branches.filter((b) => b.kind === "main")).toHaveLength(1);
  });
  it("only uses valid dates, known branches and older parents", () => {
    for (const c of commits) expect(() => monthIndex(c.date), c.id).not.toThrow();
    expect(() => layoutGraph(branches, commits)).not.toThrow();
  });
  it("every branch has at least one commit", () => {
    for (const b of branches) {
      expect(commits.some((c) => c.branch === b.id), `branch ${b.id} has no commits`).toBe(true);
    }
  });
  it("links are absolute https URLs", () => {
    for (const c of commits) for (const l of c.links ?? []) expect(l.href).toMatch(/^https:\/\//);
    for (const p of projects) for (const l of p.links ?? []) expect(l.href).toMatch(/^https:\/\//);
  });
});

describe("profile content", () => {
  it("has a four-line summary with no empty lines", () => {
    expect(profile.summary).toHaveLength(4);
    for (const line of profile.summary) expect(line.trim().length).toBeGreaterThan(40);
  });
  it("summary is within the 130–160 word target band (±20%)", () => {
    const words = profile.summary.join(" ").split(/\s+/).length;
    expect(words).toBeGreaterThanOrEqual(100);
    expect(words).toBeLessThanOrEqual(190);
  });
  it("has the essentials", () => {
    expect(profile.email).toContain("@");
    expect(profile.website).toMatch(/^https:\/\//);
    expect(profile.rightToWork.length).toBeGreaterThan(0);
  });
});

describe("other content", () => {
  it("projects reference known branches (or the open-source pseudo-branch)", () => {
    const ids = new Set([...branches.map((b) => b.id), "oss"]);
    for (const p of projects) expect(ids.has(p.branch), p.id).toBe(true);
  });
  it("has skills and education", () => {
    expect(skills.length).toBeGreaterThan(3);
    expect(education.length).toBeGreaterThan(0);
  });
});
