import type { Certification, Language } from "./types";

export const certifications: Certification[] = [
  {
    name: "React.js",
    issuer: "Jonas Schmedtmann, Udemy",
    detail: "Comprehensive course on building scalable React applications.",
  },
  {
    name: "React.js and Web Development",
    issuer: "Fanavaran Anisa",
    detail: "React and full-stack web development principles.",
  },
  {
    name: "Android Developer",
    issuer: "Andishmand",
    detail: "Android application development in Java.",
  },
];

export const languages: Language[] = [
  { name: "Persian", level: "Native" },
  {
    name: "English",
    level: "Upper-intermediate (B1–B2)",
    detail: "Reading and speaking upper-intermediate; writing and listening intermediate.",
  },
];
