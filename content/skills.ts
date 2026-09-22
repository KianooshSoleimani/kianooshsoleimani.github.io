import type { SkillGroup } from "./types";

export const skills: SkillGroup[] = [
  {
    label: "Languages",
    items: ["TypeScript", "JavaScript (ES2023)", "SQL", "Java (Android)"],
  },
  {
    label: "Frontend & Mobile",
    items: ["React", "Next.js", "React Native", "Expo", "Redux", "React Query", "Apollo Client", "Tailwind CSS", "Ant Design", "Vite", "Zod"],
  },
  {
    label: "Backend & APIs",
    items: ["Node.js", "NestJS", "Express", "GraphQL", "REST API design", "Microservices", "BullMQ / Redis", "Prisma"],
  },
  {
    label: "AI Engineering",
    items: [
      "AWS Bedrock (Claude)",
      "OpenAI API",
      "LLM integration",
      "Intent classification",
      "Structured extraction with source grounding",
      "AWS Transcribe",
      "Token & cost metering",
    ],
  },
  {
    label: "Data & Cloud",
    items: ["PostgreSQL", "MongoDB", "Firebase", "AWS (S3, ECS)", "Docker", "GitHub Actions and GitLab CI/CD", "Vercel"],
  },
  {
    label: "Quality & Practice",
    items: ["Functional programming (fp-ts, optics)", "Parse, don't validate", "Jest", "Unit & end-to-end testing", "Performance optimisation", "Code review", "Mentoring", "Agile / Scrum", "AI-assisted development (Claude, Copilot, Cursor)"],
  },
];
