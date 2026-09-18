import { profile } from "@content";
import { CV_DOCX, CV_PDF } from "@/lib/site";
import { Section } from "./Section";

export function Contact() {
  return (
    <Section
      id="contact"
      eyebrow="git remote add"
      title="Let's work together"
      intro="Open to senior full-stack and AI-integration roles, remote or hybrid, with US, EU or Canadian teams."
    >
      <div className="grid gap-4 md:grid-cols-[1fr_auto]">
        <div className="rounded-xl border border-border bg-card p-5">
          <dl className="grid gap-3 text-sm sm:grid-cols-2">
            <div>
              <dt className="font-mono text-xs uppercase tracking-wider text-muted">Email</dt>
              <dd>
                <a href={`mailto:${profile.email}`} className="text-accent hover:underline">
                  {profile.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-mono text-xs uppercase tracking-wider text-muted">Location</dt>
              <dd>{profile.location}</dd>
            </div>
            <div>
              <dt className="font-mono text-xs uppercase tracking-wider text-muted">Eligibility</dt>
              <dd>{profile.rightToWork}</dd>
            </div>
            <div>
              <dt className="font-mono text-xs uppercase tracking-wider text-muted">Working pattern</dt>
              <dd>{profile.workingPattern}</dd>
            </div>
            <div>
              <dt className="font-mono text-xs uppercase tracking-wider text-muted">GitHub</dt>
              <dd>
                <a href={profile.github} target="_blank" rel="noreferrer" className="text-accent hover:underline">
                  github.com/KianooshSoleimani
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-mono text-xs uppercase tracking-wider text-muted">LinkedIn</dt>
              <dd>
                <a href={profile.linkedin} target="_blank" rel="noreferrer" className="text-accent hover:underline">
                  linkedin.com/in/kianoosh-soleimani
                </a>
              </dd>
            </div>
          </dl>
        </div>
        <div className="flex flex-col gap-2 md:w-56">
          <a href={CV_PDF} className="rounded-md bg-accent px-4 py-2 text-center text-sm font-medium text-white hover:opacity-90">
            CV as PDF
          </a>
          <a href={CV_DOCX} className="rounded-md border border-border bg-card px-4 py-2 text-center text-sm font-medium hover:border-accent">
            CV as Word (.docx)
          </a>
          <a href="/cv/" className="rounded-md border border-border bg-card px-4 py-2 text-center text-sm font-medium hover:border-accent">
            CV as a web page
          </a>
        </div>
      </div>
    </Section>
  );
}
