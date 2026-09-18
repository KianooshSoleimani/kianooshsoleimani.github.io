# kianooshsoleimani.ir

Personal site of Kianoosh Soleimani: work history rendered as a git history, plus a printable CV.
Built with Next.js (static export), TypeScript and Tailwind CSS. Deployed to GitHub Pages by GitHub Actions on every push to `main`.

## One source of truth

Everything you read on the site, in the CV page, in the PDF and in the DOCX comes from `content/`:

| File | What it holds |
|---|---|
| `content/profile.ts` | name, headline, four-line summary, location, right to work, links |
| `content/career.ts` | the git history: `branches` (employers, freelance, open source, education) and `commits` (dated milestones, merges = collaborations/hand-offs, tags = releases) |
| `content/projects.ts` | products shown as repository cards |
| `content/skills.ts` | grouped skills |
| `content/education.ts` | degrees |

Edit a file, commit, push. CI validates the content (unknown branches, bad dates, parents newer than children all fail the build), builds the site, regenerates `Kianoosh-Soleimani-CV.pdf` and `.docx`, and deploys.

Dates marked `approx: true` are best estimates and render with a `≈`. Replace them with real months when you know them.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm test           # vitest: graph layout + content validation
npm run lint
npm run build      # static export → out/
npm run cv:pdf     # prints /cv/ to out/Kianoosh-Soleimani-CV.pdf (needs `npx playwright install chromium` once)
npm run cv:docx    # writes out/Kianoosh-Soleimani-CV.docx
npm run og         # screenshots /og/ to out/og.png (social card)
```

## Deploy

`.github/workflows/deploy.yml`: pull requests run lint, tests and the build; pushes to `main` also generate the CV files and deploy to GitHub Pages. The custom domain is set in `public/CNAME`; DNS lives in Cloudflare (four `A` records to GitHub Pages + `CNAME www`, DNS-only).

## Design notes

See `docs/superpowers/specs/2026-09-18-portfolio-site-design.md`.
