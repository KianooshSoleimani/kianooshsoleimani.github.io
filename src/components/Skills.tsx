import { skills } from "@content";
import { Section } from "./Section";

export function Skills() {
  return (
    <Section id="skills" eyebrow="package.json" title="Skills" intro="Grouped the way I use them day to day.">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((g) => (
          <div key={g.label} className="rounded-xl border border-border bg-card p-5">
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{g.label}</h3>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {g.items.map((s) => (
                <li key={s} className="rounded-md border border-border bg-bg-soft px-2 py-1 text-sm">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
