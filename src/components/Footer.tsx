import { profile } from "@content";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border py-8">
      <div className="container-x flex flex-col gap-2 font-mono text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {profile.name}. Built with Next.js, deployed by GitHub Actions on every push.
        </p>
        <a
          href="https://github.com/KianooshSoleimani/kianooshsoleimani.github.io"
          target="_blank"
          rel="noreferrer"
          className="hover:text-fg"
        >
          source ↗
        </a>
      </div>
    </footer>
  );
}
