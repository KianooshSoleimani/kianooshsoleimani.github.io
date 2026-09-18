import { profile } from "@content";
import { CV_PDF } from "@/lib/site";

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-mono text-2xl font-semibold text-fg">{value}</div>
      <div className="text-xs uppercase tracking-wider text-muted">{label}</div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden />
      <div className="container-x relative py-20 sm:py-28">
        <div className="max-w-3xl">
          <p className="font-mono text-sm text-muted">
            <span className="text-accent">$</span> git log --graph --author=&quot;{profile.name}&quot;
          </p>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-6xl">{profile.name}</h1>
          <p className="mt-4 text-lg text-fg/90 sm:text-xl">{profile.headline}</p>
          <p className="mt-3 max-w-2xl text-muted">{profile.subHeadline}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={CV_PDF}
              className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-white shadow-sm transition-opacity hover:opacity-90"
            >
              Download CV (PDF)
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-md border border-border bg-card px-4 py-2 text-sm font-medium transition-colors hover:border-accent"
            >
              GitHub
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="rounded-md border border-border bg-card px-4 py-2 text-sm font-medium transition-colors hover:border-accent"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="rounded-md border border-border bg-card px-4 py-2 text-sm font-medium transition-colors hover:border-accent"
            >
              Email
            </a>
          </div>

          <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-border pt-8 sm:grid-cols-4">
            <Stat value={`${profile.yearsOfExperience}+`} label="years shipping" />
            <Stat value="3" label="platforms: web · iOS · Android" />
            <Stat value="AI" label="Bedrock · Transcribe · NestJS" />
            <Stat value="UK" label={profile.rightToWork.replace("Right to work in the ", "right to work · ")} />
          </dl>

          <p className="mt-6 font-mono text-xs text-muted">
            {profile.location} · {profile.workingPattern}
          </p>
        </div>
      </div>
    </section>
  );
}
