export type BranchKind = "main" | "employer" | "freelance" | "oss" | "education";

export interface Branch {
  id: string;
  label: string;
  kind: BranchKind;
  /** CSS colour used for the lane, nodes and edges. */
  color: string;
  /** One-line context shown in the branch header (what the company/product is). */
  summary?: string;
  location?: string;
}

export type CommitKind = "commit" | "branch" | "merge" | "tag";

export interface Commit {
  id: string;
  branch: string;
  /** YYYY-MM or YYYY-MM-DD. Only the month is displayed. */
  date: string;
  /** When true the month is a best estimate, rendered with a "≈" prefix. */
  approx?: boolean;
  title: string;
  body?: string;
  kind?: CommitKind;
  /** Extra parent commit ids. Drawn as edges into this commit (fork / merge / collaboration). */
  parents?: string[];
  /** Collaborators or teams involved. */
  people?: string[];
  /** Release-style labels (app launch, npm publish, degree awarded). */
  tags?: string[];
  links?: { label: string; href: string }[];
  /** Technologies touched in this commit. */
  stack?: string[];
  /** Role highlights (filled from experience.ts for "joined" nodes). */
  highlights?: string[];
  /** Period label, e.g. "Apr 2018 – Mar 2025", shown on "joined" nodes. */
  period?: string;
}

export interface Link {
  label: string;
  href: string;
}

export interface PersianProfile {
  name: string;
  fullName: string;
  nickname: string;
  headline: string;
  summary: string[];
  title: string;
  description: string;
}

export interface Profile {
  name: string;
  shortName: string;
  /** Every spelling / script of the name that should find this site. */
  nameVariants: string[];
  fa: PersianProfile;
  headline: string;
  subHeadline: string;
  /** Exactly four sentences, one per line. */
  summary: [string, string, string, string];
  location: string;
  rightToWork: string;
  workingPattern: string;
  email: string;
  website: string;
  github: string;
  linkedin: string;
  /** Optional phone in international format. Leave empty to omit everywhere. */
  phone?: string;
  yearsOfExperience: number;
  currentRole: { title: string; company: string; companyUrl?: string };
}

export interface SkillGroup {
  label: string;
  items: string[];
}

export interface Project {
  id: string;
  name: string;
  /** Employer / client / personal. */
  owner: string;
  period: string;
  role: string;
  description: string;
  highlights: string[];
  stack: string[];
  links?: Link[];
  /** Branch id in the career graph this project belongs to. */
  branch: string;
  /** Show in the "Repositories" grid on the home page. */
  featured?: boolean;
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  period: string;
  location: string;
  thesis?: string;
}
