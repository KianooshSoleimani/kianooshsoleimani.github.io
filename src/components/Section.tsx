import type { ReactNode } from "react";

export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  className = "",
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-20 py-16 sm:py-24 ${className}`}>
      <div className="container-x">
        <div className="mb-8 max-w-2xl sm:mb-12">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
          {intro ? <p className="mt-3 text-muted">{intro}</p> : null}
        </div>
        {children}
      </div>
    </section>
  );
}
