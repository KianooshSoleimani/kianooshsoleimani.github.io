import { branches, commits } from "@content";
import { layoutGraph } from "@/lib/git-graph/layout";
import { GitGraph } from "./GitGraph";
import { Section } from "./Section";

export function CareerGraph() {
  const layout = layoutGraph(branches, commits);
  const employers = branches.filter((b) => b.kind === "employer").length;
  return (
    <Section
      id="history"
      eyebrow="git log --graph"
      title="Career history, as a repository"
      intro={`main is the career. Each employer, the freelance practice, open source and education are branches: they fork when they start and merge back when they end. A commit with two parents is a collaboration or hand-off. ${employers} employers, ${commits.length} commits, ${layout.laneCount} lanes.`}
    >
      <GitGraph branches={branches} layout={layout} />
    </Section>
  );
}
