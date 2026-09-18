import { education } from "@content";
import { Section } from "./Section";

export function EducationSection() {
  return (
    <Section id="education" eyebrow="education" title="Education">
      <div className="grid gap-4 md:grid-cols-2">
        {education.map((e) => (
          <article key={e.institution + e.degree} className="rounded-xl border border-border bg-card p-5">
            <h3 className="text-base font-semibold">
              {e.degree}, {e.field}
            </h3>
            <p className="mt-1 font-mono text-xs text-muted">
              {e.institution} · {e.location} · {e.period}
            </p>
            {e.thesis ? (
              <p className="mt-3 text-sm text-muted">
                <span className="text-fg/80">Thesis:</span> {e.thesis}
              </p>
            ) : null}
          </article>
        ))}
      </div>
    </Section>
  );
}
