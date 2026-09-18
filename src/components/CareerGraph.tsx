import { branches, commits, experience } from "@content";
import { layoutGraph } from "@/lib/git-graph/layout";
import { GitGraph } from "./GitGraph";
import { Section } from "./Section";

export function CareerGraph() {
  // "Joined" nodes carry the role's highlights and period from experience.ts.
  const enriched = commits.map((c) => {
    if (c.kind !== "branch") return c;
    const role = experience.find((r) => r.branch === c.branch);
    return role ? { ...c, highlights: c.highlights ?? role.bullets, stack: c.stack ?? role.stack, period: c.period ?? role.period } : c;
  });
  const layout = layoutGraph(branches, enriched, "oldest-first");
  const employers = branches.filter((b) => b.kind === "employer").length;
  const first = layout.nodes[0].commit.date.slice(0, 4);
  return (
    <Section
      id="history"
      eyebrow="git log --graph --reverse"
      title="Career history, as a repository"
      intro={`Read it top to bottom, from ${first} to today. main is the career; every company, the freelance practice and education are branches that fork when they start and merge back into main when they end. ${employers} employers so far. Expand a node for what the role involved.`}
    >
      <GitGraph branches={branches} layout={layout} />
    </Section>
  );
}
