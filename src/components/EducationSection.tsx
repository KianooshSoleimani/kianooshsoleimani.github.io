import { certifications, education, languages } from "@content";
import { Section } from "./Section";

export function EducationSection() {
  return (
    <Section id="education" eyebrow="education" title="Education, certifications and languages">
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
        <article className="rounded-xl border border-border bg-card p-5">
          <h3 className="text-base font-semibold">Certifications</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {certifications.map((c) => (
              <li key={c.name}>
                <span className="font-medium">{c.name}</span> <span className="text-muted">· {c.issuer}</span>
              </li>
            ))}
          </ul>
          <h3 className="mt-5 text-base font-semibold">Languages</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {languages.map((l) => (
              <li key={l.name}>
                <span className="font-medium">{l.name}</span> <span className="text-muted">· {l.level}</span>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </Section>
  );
}
