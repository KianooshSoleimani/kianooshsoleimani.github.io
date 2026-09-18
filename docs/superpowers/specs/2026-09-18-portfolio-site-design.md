# Portfolio site + CV pipeline — design

**Date:** 2026-09-18
**Repo:** `KianooshSoleimani/kianooshsoleimani.github.io` (rebuilt from scratch; old CRA site kept in git history)
**Live URL:** https://kianooshsoleimani.ir (apex, custom domain on GitHub Pages) with https://kianooshsoleimani.github.io as the fallback.

## Decisions taken with the user (2026-09-18)

| Question | Decision |
|---|---|
| CV location / right to work | UK address (Wigston, England), explicit "Right to work: UK" line, Iranian phone removed |
| Primary market | Remote international (US / EU / Canada), neutral English |
| Hosting | Rebuild `kianooshsoleimani.github.io`, point `kianooshsoleimani.ir` at it |
| Stack | Next.js (static export) for SEO, TypeScript, Tailwind CSS |

## Goals

1. A modern, fast, SEO-correct personal site that presents work history as a **git history** (branches, commits, merges, tags).
2. **One source of truth** for content: `content/*.ts` drives the site, the printable CV page, the PDF, and the DOCX.
3. **CI/CD**: every push to `main` builds, tests, generates the CV files and deploys to GitHub Pages automatically.

## Non-goals (YAGNI)

- No CMS, no database, no server runtime, no analytics, no blog (can be added later as MDX).
- No i18n (English only).
- No preview deployments for pull requests (a PR runs build + tests only).

## Architecture

```
content/
  profile.ts      name, headline, sub-headline, 4-line summary, links, location, right-to-work
  career.ts       git-history model: branches + commits (the ONLY place work history lives)
  skills.ts       grouped skills
  projects.ts     products / repositories shown as "repo cards"
  education.ts
src/app/
  layout.tsx      metadata, fonts, JSON-LD Person, theme
  page.tsx        home: Hero → CareerGraph → Repositories → Skills → OpenSource → Education → Contact
  cv/page.tsx     printable CV (print stylesheet); source for the PDF
  sitemap.ts / robots.ts / opengraph-image.tsx   (force-static)
src/components/
  git-graph/      layout.ts (pure: commits → lanes + edges), GitGraph.tsx (SVG), CommitCard.tsx, ListView.tsx
  ...section components
scripts/
  cv-pdf.mjs      after `next build`: serve out/, print /cv/ to out/Kianoosh-Soleimani-CV.pdf (Playwright)
  cv-docx.mjs     build out/Kianoosh-Soleimani-CV.docx from content/ (docx package)
.github/workflows/deploy.yml   PR: lint+test+build. main: same + PDF/DOCX + deploy-pages
public/CNAME      kianooshsoleimani.ir
```

### Git-history model

```ts
type Branch = { id: string; label: string; kind: 'main'|'employer'|'freelance'|'oss'|'education'; color: string }
type Commit = {
  id: string; branch: string; date: string /* YYYY-MM or YYYY-MM-DD */;
  title: string; body?: string;
  kind?: 'commit'|'branch'|'merge'|'tag';   // default 'commit'
  parents?: string[];   // extra parent commit ids → drawn as merge edges (collaboration / hand-off)
  people?: string[];    // collaborators shown on the card
  tags?: string[];      // releases: "v1.0 app store", "npm 1.0.3"
  links?: { label: string; href: string }[];
}
```

- `main` = the career. Each employer, the freelance practice, open source and education are branches that fork from `main` at their start date and merge back at their end (or stay open if current).
- Collaboration = a commit with two parents on different branches (e.g. a mentee's commit continuing a module, a freelance delivery merged into a client branch).
- `layout.ts` is pure and unit-tested: sorts commits by date (newest at top, like GitHub), assigns each branch a lane, computes node coordinates and edges (straight + bezier for lane changes). Rendering is a dumb SVG of that output.
- Mobile (< 768px): lanes collapse to a narrow rail and the detail card renders inline; a "List" toggle shows the same data as a plain timeline (also the accessible/no-JS fallback since the list is server-rendered).

### SEO

- Static HTML for every route, semantic headings, `<title>`/description per page, canonical `https://kianooshsoleimani.ir`.
- JSON-LD `Person` (+ `sameAs` LinkedIn/GitHub, `jobTitle`, `worksFor`, `alumniOf`).
- `sitemap.xml`, `robots.txt`, Open Graph + Twitter card with a generated OG image.
- `images.unoptimized = true`, `trailingSlash = true` (Pages-friendly `/cv/index.html`).

### Visual direction

Dark-first developer aesthetic with a light theme via `prefers-color-scheme`: near-black canvas, one accent (teal/green, the "git" colour), one lane colour per branch, Inter for text and JetBrains Mono for dates/ids. Generous whitespace, 16px side gutter on phones, no horizontal page scroll. Reduced-motion respected.

### CI/CD

`deploy.yml`: `pull_request` and `push` to `main`.
1. `npm ci`, `npm run lint`, `npm test` (vitest: layout + content validation), `next build` → `out/`.
2. On `main` only: `npm run cv:pdf` and `npm run cv:docx` (outputs into `out/`), `actions/upload-pages-artifact`, `actions/deploy-pages`.
GitHub Pages source switched from "legacy branch" to "GitHub Actions". Default branch renamed `master` → `main`.

### Domain

Cloudflare zone `kianooshsoleimani.ir`: add `A @ → 185.199.108/109/110/111.153` and `CNAME www → kianooshsoleimani.github.io`, **DNS-only (grey cloud)** so GitHub can issue the certificate. Existing `uk`/`de`/`cdn` records untouched. Then set the Pages custom domain and enforce HTTPS once the cert is issued.

### Error handling / quality gates

- Content validation test fails the build if a commit references an unknown branch/parent or has an unparsable date.
- `next build` type-checks and lints; the deploy step never runs if any step fails.
- PDF generation failure fails the deploy (a broken CV link is worse than a delayed deploy).

## Out of scope for this pass

A profile photo (the old repo only has a 139×140 px image; drop a real one at `public/photo.jpg` later), a blog, and the GitHub profile README.
