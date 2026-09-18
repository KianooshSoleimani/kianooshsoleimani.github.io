/**
 * Builds out/Kianoosh-Soleimani-CV.docx from content/. ATS-safe: no tables, no
 * text boxes, plain headings, real bullet lists, standard fonts.
 */
import { mkdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import {
  AlignmentType,
  BorderStyle,
  Document,
  ExternalHyperlink,
  HeadingLevel,
  LevelFormat,
  Packer,
  Paragraph,
  TabStopType,
  TextRun,
} from "docx";
import { education, profile, projects, skills } from "../content/index";
import { experience } from "../content/experience";

const OUT = join(process.cwd(), "out");
const FILE = join(OUT, "Kianoosh-Soleimani-CV.docx");
const FONT = "Calibri";
const MUTED = "555555";
const ACCENT = "15803D";
const RIGHT_TAB = 10466; // page width 11906 twips − 2×720 margins

const text = (t: string, o: Partial<{ bold: boolean; size: number; color: string; italics: boolean }> = {}) =>
  new TextRun({ text: t, font: FONT, size: o.size ?? 21, bold: o.bold, color: o.color, italics: o.italics });

const link = (label: string, href: string) =>
  new ExternalHyperlink({
    children: [new TextRun({ text: label, font: FONT, size: 19, color: ACCENT, underline: {} })],
    link: href,
  });

const heading = (t: string) =>
  new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 240, after: 80 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: "BBBBBB", space: 2 } },
    children: [new TextRun({ text: t.toUpperCase(), font: FONT, size: 20, bold: true, color: "222222" })],
  });

const bullet = (t: string) =>
  new Paragraph({ numbering: { reference: "bullets", level: 0 }, spacing: { after: 40 }, children: [text(t)] });

const twoSide = (left: TextRun[], right: string) =>
  new Paragraph({
    tabStops: [{ type: TabStopType.RIGHT, position: RIGHT_TAB }],
    spacing: { before: 120, after: 20 },
    children: [...left, new TextRun({ text: `\t${right}`, font: FONT, size: 19, color: MUTED })],
  });

const contactBits: (TextRun | ExternalHyperlink)[] = [
  link(profile.email, `mailto:${profile.email}`),
  text("  ·  ", { color: MUTED, size: 19 }),
  link(profile.website.replace(/^https?:\/\//, ""), profile.website),
  text("  ·  ", { color: MUTED, size: 19 }),
  link("github.com/KianooshSoleimani", profile.github),
  text("  ·  ", { color: MUTED, size: 19 }),
  link("linkedin.com/in/kianoosh-soleimani", profile.linkedin),
];
if (profile.phone) contactBits.splice(2, 0, text(`  ·  ${profile.phone}`, { color: MUTED, size: 19 }));

const oss = projects.filter((p) => p.branch === "oss");

const doc = new Document({
  creator: profile.name,
  title: `${profile.name} — CV`,
  description: profile.headline,
  styles: {
    default: { document: { run: { font: FONT, size: 21 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true, run: { font: FONT, size: 40, bold: true } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true, run: { font: FONT, size: 20, bold: true } },
    ],
  },
  numbering: {
    config: [
      {
        reference: "bullets",
        levels: [
          {
            level: 0,
            format: LevelFormat.BULLET,
            text: "•",
            alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 360, hanging: 220 } } },
          },
        ],
      },
    ],
  },
  sections: [
    {
      properties: { page: { margin: { top: 720, right: 720, bottom: 720, left: 720 } } },
      children: [
        new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { after: 40 }, children: [new TextRun({ text: profile.name, font: FONT, size: 40, bold: true })] }),
        new Paragraph({ spacing: { after: 60 }, children: [text(profile.headline, { bold: true, size: 22 })] }),
        new Paragraph({ spacing: { after: 20 }, children: [text(`${profile.location}  ·  ${profile.rightToWork}  ·  ${profile.workingPattern}`, { color: MUTED, size: 19 })] }),
        new Paragraph({ spacing: { after: 120 }, children: contactBits }),

        heading("Summary"),
        new Paragraph({ spacing: { after: 60 }, children: [text(profile.summary.join(" "))] }),

        heading("Experience"),
        ...experience.flatMap((r) => [
          twoSide([text(`${r.title}  ·  ${r.company}`, { bold: true, size: 22 })], r.period),
          new Paragraph({ spacing: { after: 40 }, children: [text(`${r.location} — ${r.context}`, { color: MUTED, size: 19, italics: true })] }),
          ...r.bullets.map(bullet),
        ]),

        heading("Technical skills"),
        ...skills.map(
          (g) =>
            new Paragraph({
              spacing: { after: 40 },
              children: [text(`${g.label}: `, { bold: true }), text(g.items.join(", "))],
            }),
        ),

        heading("Open source"),
        ...oss.map(
          (p) =>
            new Paragraph({
              numbering: { reference: "bullets", level: 0 },
              spacing: { after: 40 },
              children: [
                text(`${p.name} — `, { bold: true }),
                text(p.description),
                ...(p.links ?? []).flatMap((l, i) => [text(i ? ", " : "  ", { color: MUTED }), link(l.href.replace(/^https?:\/\/(www\.)?/, ""), l.href)]),
              ],
            }),
        ),

        heading("Education"),
        ...education.flatMap((e) => [
          twoSide([text(`${e.degree}, ${e.field}`, { bold: true })], e.period),
          new Paragraph({
            spacing: { after: 40 },
            children: [text(`${e.institution}, ${e.location}${e.thesis ? ` — Thesis: ${e.thesis}` : ""}`, { color: MUTED, size: 19 })],
          }),
        ]),
      ],
    },
  ],
});

mkdirSync(OUT, { recursive: true });
writeFileSync(FILE, await Packer.toBuffer(doc));
console.log(`wrote ${FILE} (${(statSync(FILE).size / 1024).toFixed(0)} KB)`);
