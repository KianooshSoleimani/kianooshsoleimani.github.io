import type { Metadata } from "next";
import Link from "next/link";
import { certifications, education, languages, profile, projects, skills } from "@content";
import { experience } from "@content/experience";
import { CV_DOCX, CV_PDF } from "@/lib/site";

export const metadata: Metadata = {
  title: "CV",
  description: `CV of ${profile.name}: ${profile.headline}.`,
  alternates: { canonical: "/cv/" },
};

const oss = projects.filter((p) => p.branch === "oss");
const linked = projects.filter((p) => p.branch !== "oss" && p.links?.length);

export default function CvPage() {
  const site = profile.website.replace(/^https?:\/\//, "");
  return (
    <main className="mx-auto max-w-[210mm] bg-bg px-5 py-8 text-[13px] leading-[1.45] text-fg print:max-w-none print:p-0 print:text-[10.2pt] print:leading-[1.38] sm:px-8">
      <div className="no-print mb-6 flex flex-wrap items-center gap-3 rounded-lg border border-border bg-card p-3 text-sm">
        <Link href="/" className="text-muted hover:text-fg">
          ← back to site
        </Link>
        <span className="ml-auto flex gap-2">
          <a href={CV_PDF} className="rounded-md bg-accent px-3 py-1.5 text-white">
            PDF
          </a>
          <a href={CV_DOCX} className="rounded-md border border-border px-3 py-1.5">
            Word
          </a>
        </span>
      </div>

      <header className="border-b-2 border-fg/80 pb-3">
        <h1 className="text-[26px] font-bold tracking-tight print:text-[20pt]">{profile.name}</h1>
        <p className="mt-1 text-[14px] font-medium print:text-[11.5pt]">{profile.headline}</p>
        <p className="mt-2 text-[12px] text-muted print:text-[9.5pt]">
          {profile.location} · {profile.rightToWork} · {profile.workingPattern}
        </p>
        <p className="mt-0.5 text-[12px] text-muted print:text-[9.5pt]">
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          {profile.phone ? <> · {profile.phone}</> : null} · <a href={profile.website}>{site}</a> ·{" "}
          <a href={profile.github}>github.com/KianooshSoleimani</a> · <a href={profile.linkedin}>linkedin.com/in/kianoosh-soleimani</a>
        </p>
      </header>

      <Section title="Summary">
        <p>{profile.summary.join(" ")}</p>
      </Section>

      <Section title="Experience">
        {experience.map((r) => (
          <article key={r.company + r.period} className="mb-3.5">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3 break-after-avoid">
              <h3 className="text-[13.5px] font-semibold print:text-[11pt]">
                {r.title} · {r.company}
              </h3>
              <span className="font-mono text-[11px] text-muted print:text-[9pt]">{r.period}</span>
            </div>
            <p className="text-[11.5px] text-muted print:text-[9pt]">
              {r.location} — {r.context}
            </p>
            <ul className="mt-1 list-disc space-y-0.5 pl-4">
              {r.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </article>
        ))}
      </Section>

      <Section title="Technical skills">
        <dl className="grid gap-y-1 sm:grid-cols-[150px_1fr] print:grid-cols-[110px_1fr]">
          {skills.map((g) => (
            <div key={g.label} className="contents">
              <dt className="font-semibold">{g.label}</dt>
              <dd>{g.items.join(", ")}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section title="Selected projects (live)">
        <ul className="list-disc space-y-0.5 pl-4">
          {linked.map((p) => (
            <li key={p.id}>
              <span className="font-semibold">{p.name}</span> ({p.owner}, {p.stack.join(", ")}):{" "}
              {p.links!.map((l, i) => (
                <span key={l.href}>
                  {i ? " · " : ""}
                  <a href={l.href} className="text-accent">
                    {l.label}
                  </a>
                </span>
              ))}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Open source">
        <ul className="list-disc space-y-0.5 pl-4">
          {oss.map((p) => (
            <li key={p.id}>
              <span className="font-semibold">{p.name}</span> — {p.description}
              {p.links?.length ? (
                <>
                  {" "}
                  ({p.links.map((l, i) => (
                    <span key={l.href}>
                      {i ? ", " : ""}
                      <a href={l.href} className="text-accent">
                        {l.label}
                      </a>
                    </span>
                  ))}
                  )
                </>
              ) : null}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Education">
        {education.map((e) => (
          <div key={e.institution + e.degree} className="break-inside-avoid">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3">
              <h3 className="font-semibold">
                {e.degree}, {e.field}
              </h3>
              <span className="font-mono text-[11px] text-muted print:text-[9pt]">{e.period}</span>
            </div>
            <p className="text-[11.5px] text-muted print:text-[9pt]">
              {e.institution}, {e.location}
              {e.thesis ? ` — Thesis: ${e.thesis}` : ""}
            </p>
          </div>
        ))}
      </Section>

      <Section title="Certifications and languages">
        <p>
          {certifications.map((c, i) => (
            <span key={c.name}>
              {i ? " · " : ""}
              <span className="font-semibold">{c.name}</span> ({c.issuer})
            </span>
          ))}
        </p>
        <p className="mt-1">
          {languages.map((l, i) => (
            <span key={l.name}>
              {i ? " · " : ""}
              <span className="font-semibold">{l.name}</span>: {l.level}
            </span>
          ))}
        </p>
      </Section>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-4">
      <h2 className="mb-1.5 border-b border-border text-[11px] font-bold uppercase tracking-[0.18em] text-fg/80 print:text-[8.5pt]">
        {title}
      </h2>
      {children}
    </section>
  );
}
