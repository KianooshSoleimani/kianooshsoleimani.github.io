import Link from "next/link";
import { profile } from "@content";
import { CV_PDF } from "@/lib/site";

const links = [
  { href: "#history", label: "History" },
  { href: "#repos", label: "Work" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-bg/80 backdrop-blur supports-[backdrop-filter]:bg-bg/60">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-accent focus:px-3 focus:py-1.5 focus:text-white"
      >
        Skip to content
      </a>
      <div className="container-x flex h-14 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-mono text-sm">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-accent" aria-hidden />
          <span className="text-muted">~/</span>
          <span className="font-semibold">{profile.shortName.toLowerCase()}</span>
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-6 text-sm text-muted sm:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition-colors hover:text-fg">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/cv/"
            className="hidden rounded-md px-3 py-1.5 text-sm text-muted transition-colors hover:text-fg sm:inline-block"
          >
            CV
          </Link>
          <a
            href={CV_PDF}
            className="rounded-md bg-accent px-3 py-1.5 text-sm font-medium text-white shadow-sm transition-opacity hover:opacity-90"
          >
            Download PDF
          </a>
        </div>
      </div>
    </header>
  );
}
