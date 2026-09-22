import type { Branch, Commit } from "./types";

/**
 * The career as a git history, at the level of companies and positions.
 *
 * `main` is the career. Each employer, the freelance practice and education
 * are branches: they fork from `main` when they start and merge back when they
 * end (open branches are current). One node per company / position change;
 * the details of each role live in experience.ts and are shown when a node is
 * expanded.
 *
 * Dates marked `approx: true` are best estimates and render with a "≈".
 */
export const branches: Branch[] = [
  { id: "main", label: "main", kind: "main", color: "#22c55e" },
  {
    id: "education",
    label: "education",
    kind: "education",
    color: "#94a3b8",
    summary: "Islamic Azad University, Science and Research Branch, Tehran — Electronic Engineering.",
    location: "Tehran, Iran",
  },
  {
    id: "freelance",
    label: "freelance",
    kind: "freelance",
    color: "#2dd4bf",
    summary: "Independent contracts for clients in Dubai, Armenia and the US, run part-time alongside every role.",
    location: "Remote",
  },
  {
    id: "dayamooz",
    label: "dayamooz",
    kind: "employer",
    color: "#fb7185",
    summary: "Dayamooz — education product with a native Android app.",
    location: "Mashhad, Iran · on-site",
  },
  {
    id: "hoomaan",
    label: "hoomaan",
    kind: "employer",
    color: "#a78bfa",
    summary: "Hoomaan — mobile agency shipping e-commerce and taxi-hailing apps for clients.",
    location: "Mashhad, Iran · on-site",
  },
  {
    id: "sabana",
    label: "sabana",
    kind: "employer",
    color: "#f59e0b",
    summary: "Sabana — ride-hailing and logistics platform: driver app, customer product, partner admin panel and backend services.",
    location: "Tehran, Iran · hybrid",
  },
  {
    id: "novabyte",
    label: "novabyte",
    kind: "employer",
    color: "#38bdf8",
    summary: "NovaByte Solutions Inc. — software consultancy building healthcare, real-estate and fintech platforms for North American clients.",
    location: "Nova Scotia, Canada · remote",
  },
];

export const commits: Commit[] = [
  // ── 2009: the timeline starts ──
  {
    id: "main-init",
    branch: "main",
    date: "2009-09",
    approx: true,
    title: "init — Tehran, Iran",
    body: "Start of the timeline: Electronic Engineering student.",
  },
  {
    id: "edu-start",
    branch: "education",
    date: "2009-09",
    approx: true,
    kind: "branch",
    parents: ["main-init"],
    title: "Islamic Azad University, Science and Research Branch — Electronic Engineering",
    period: "2009 – 2017",
  },

  // ── 2015 – 2017: Dayamooz ──
  {
    id: "dm-start",
    branch: "dayamooz",
    date: "2015-05",
    kind: "branch",
    parents: ["main-init"],
    title: "Dayamooz — Android & React Native Developer",
    tags: ["first full-time role"],
  },
  {
    id: "edu-msc",
    branch: "education",
    date: "2017-06",
    approx: true,
    title: "MSc awarded — thesis: secure transfer of vital patient data via Android and iOS apps",
    tags: ["MSc"],
  },
  {
    id: "dm-end",
    branch: "main",
    date: "2017-09",
    kind: "merge",
    parents: ["dm-start", "edu-msc"],
    title: "Left Dayamooz after 2 yrs 4 mo; MSc complete → moved to Hoomaan",
  },

  // ── 2017 – 2018: Hoomaan ──
  {
    id: "hm-start",
    branch: "hoomaan",
    date: "2017-09",
    kind: "branch",
    parents: ["dm-end"],
    title: "Hoomaan — React Native Developer",
  },
  {
    id: "hm-end",
    branch: "main",
    date: "2018-05",
    kind: "merge",
    parents: ["hm-start"],
    title: "Left Hoomaan after 8 mo → moved to Sabana",
  },

  // ── 2018 – 2025: Sabana ──
  {
    id: "sb-start",
    branch: "sabana",
    date: "2018-05",
    kind: "branch",
    parents: ["hm-end"],
    title: "Sabana — Front-end Developer (React, Next.js, React Native)",
  },

  // ── 2020: freelance practice begins (still open) ──
  {
    id: "fl-start",
    branch: "freelance",
    date: "2020-01",
    kind: "branch",
    parents: ["hm-end"],
    title: "Freelance — Full-Stack Developer (part-time, ongoing)",
    body: "Web and mobile products for clients in Dubai, Armenia and the US, each run solo from requirements to release: Dayra Club, HomeTrust, Hood Food, TravelLeadApp and Sadaf.",
  },
  {
    id: "sb-lead",
    branch: "sabana",
    date: "2021-01",
    title: "Sabana — Full-Stack Developer, owner of the whole platform",
    body: "Grew from front-end feature work into ownership of the driver app, customer product, partner admin panel and the NestJS backend services.",
    tags: ["promotion"],
  },
  {
    id: "sb-end",
    branch: "main",
    date: "2025-03",
    kind: "merge",
    parents: ["sb-lead"],
    title: "Left Sabana after 6 yrs 10 mo → moved to NovaByte Solutions",
  },

  // ── 2025 – now: NovaByte ──
  {
    id: "nb-start",
    branch: "novabyte",
    date: "2025-03",
    kind: "branch",
    parents: ["sb-end"],
    title: "NovaByte Solutions Inc. — Full-Stack Developer",
    tags: ["current"],
  },
];
