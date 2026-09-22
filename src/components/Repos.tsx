import { branches, projects } from "@content";
import { Section } from "./Section";

export function Repos() {
  const color = new Map<string, string>([...branches.map((b) => [b.id, b.color] as [string, string]), ["oss", "#e879f9"]]);
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);
  return (
    <Section
      id="repos"
      eyebrow="repositories"
      title="What I have built"
      intro="Products I owned or shipped a significant part of. Each card is a repository in the career graph above."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {featured.map((p) => (
          <article key={p.id} className="flex flex-col rounded-xl border border-border bg-card p-5 transition-colors hover:border-accent/60">
            <header className="flex items-start gap-3">
              <span className="mt-1.5 inline-block h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: color.get(p.branch) }} aria-hidden />
              <div className="min-w-0">
                <h3 className="text-base font-semibold leading-snug">{p.name}</h3>
                <p className="mt-0.5 font-mono text-xs text-muted">
                  {p.owner} · {p.period} · {p.role}
                </p>
              </div>
            </header>
            <p className="mt-3 text-sm text-muted">{p.description}</p>
            {p.highlights.length ? (
              <ul className="mt-3 space-y-1.5 text-sm">
                {p.highlights.map((h) => (
                  <li key={h} className="flex gap-2">
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            ) : null}
            <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Stack">
              {p.stack.map((s) => (
                <li key={s} className="rounded-md border border-border px-1.5 py-0.5 font-mono text-[11px] text-muted">
                  {s}
                </li>
              ))}
            </ul>
            {p.links?.length ? (
              <p className="mt-4 flex flex-wrap gap-3 font-mono text-xs">
                {p.links.map((l) => (
                  <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="text-accent hover:underline">
                    {l.label} ↗
                  </a>
                ))}
              </p>
            ) : null}
          </article>
        ))}
      </div>

      {[
        { title: "client work", items: rest.filter((p) => p.branch !== "oss") },
        { title: "open source", items: rest.filter((p) => p.branch === "oss") },
      ]
        .filter((g) => g.items.length)
        .map((g) => (
          <div key={g.title} className="mt-6">
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">{g.title}</h3>
            <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {g.items.map((p) => (
                <article key={p.id} className="rounded-xl border border-border bg-card p-4">
                  <div className="flex items-center gap-2">
                    <span className="inline-block h-2 w-2 rounded-full" style={{ background: color.get(p.branch) }} aria-hidden />
                    <h4 className="text-sm font-semibold">{p.name}</h4>
                  </div>
                  <p className="mt-1 font-mono text-[11px] text-muted">
                    {p.owner} · {p.period}
                  </p>
                  <p className="mt-2 text-sm text-muted">{p.description}</p>
                  {p.links?.length ? (
                    <p className="mt-3 flex flex-wrap gap-3 font-mono text-xs">
                      {p.links.map((l) => (
                        <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="text-accent hover:underline">
                          {l.label} ↗
                        </a>
                      ))}
                    </p>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        ))}
    </Section>
  );
}
