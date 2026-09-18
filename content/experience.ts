/**
 * CV-grade experience bullets: each starts with an action verb, is 18–25
 * words, and carries a number wherever one is genuinely known. This drives the
 * /cv page, the PDF and the DOCX. The career graph (career.ts) tells the same
 * story as commits.
 */
export interface Role {
  company: string;
  title: string;
  period: string;
  location: string;
  /** One line of context so a reader outside the region knows what the company is. */
  context: string;
  bullets: string[];
  stack: string[];
  /** Branch id in career.ts. */
  branch: string;
}

export const experience: Role[] = [
  {
    company: "NovaByte Solutions Inc.",
    title: "Full-Stack Developer",
    period: "Mar 2025 – Present",
    location: "Nova Scotia, Canada · remote",
    context: "Software consultancy delivering healthcare, real-estate and fintech platforms for North American clients.",
    bullets: [
      "Built the AI layer of Humanet, a production healthcare EHR, on AWS Bedrock and NestJS: conversational assistant, intent classification and source-grounded clinical data extraction.",
      "Shipped an AI medical scribe that turns chunked audio uploads into AWS Transcribe transcripts and SOAP-note drafts with evidence-linked suggested actions.",
      "Designed a durable workflow-automation engine on BullMQ/Redis with event triggers, conditional branching and resumable steps driving appointments, forms, prescriptions and referrals.",
      "Added per-model token metering and monthly spend budgets so every AI feature's cost is measured and capped before it reaches clinicians.",
      "Delivered full-stack features for EVNS (real estate) and Arcarius Capital (fintech) in Scrum sprints across Next.js, React Native, NestJS and GraphQL.",
      "Owned GitHub Actions CI/CD and the AWS, MongoDB and Firebase infrastructure, with automated build-and-deploy pipelines running on every commit.",
    ],
    stack: ["TypeScript", "NestJS", "Next.js", "React Native", "GraphQL", "AWS Bedrock", "AWS Transcribe", "BullMQ", "Redis", "MongoDB", "GitHub Actions"],
    branch: "novabyte",
  },
  {
    company: "Sabana",
    title: "Full-Stack Developer",
    period: "Apr 2018 – Mar 2025",
    location: "Tehran, Iran · hybrid",
    context: "Ride-hailing and logistics platform: driver app, customer product, partner admin panel and backend services.",
    bullets: [
      "Improved app performance by 70% across the driver and customer apps through profiling, render optimisation and list virtualisation in React Native.",
      "Grew from front-end feature work to owning the entire platform: driver app, customer product and partner admin panel on React, Next.js and React Native.",
      "Designed and shipped two production NestJS microservices, an SMS notification service and an EU customs (ICS2/ENS) data-exchange integration, via GitHub Actions.",
      "Built a shared, unit-tested UI component library that kept web and mobile in parity and releases stable across both platforms.",
      "Mentored junior developers through code review and pairing on React and React Native patterns while carrying a full delivery load.",
    ],
    stack: ["React Native", "React", "Next.js", "TypeScript", "NestJS", "Node.js", "Jest", "GitHub Actions"],
    branch: "sabana",
  },
  {
    company: "Hoomaan",
    title: "React Native Developer",
    period: "Oct 2017 – Jun 2018",
    location: "Mashhad, Iran · on-site",
    context: "Mobile agency shipping apps for clients.",
    bullets: [
      "Shipped an e-commerce app and a taxi-hailing app to iOS and Android from scratch, leading React Native development end-to-end.",
      "Owned front-end delivery and third-party API integrations for both apps and hit every client launch date on schedule.",
    ],
    stack: ["React Native", "REST", "Maps", "Payments"],
    branch: "hoomaan",
  },
  {
    company: "Dayamooz",
    title: "Android Developer",
    period: "Feb 2016 – Oct 2017",
    location: "Mashhad, Iran · on-site",
    context: "Education product with a native Android app.",
    bullets: [
      "Migrated the core Android app from native Java to React Native, cutting development time and improving performance on the same devices.",
      "Partnered with the UI/UX team to launch the redesigned interface, owning the implementation from wireframes to release.",
    ],
    stack: ["Java", "Android", "React Native"],
    branch: "dayamooz",
  },
  {
    company: "Freelance",
    title: "Full-Stack Developer (part-time, alongside the roles above)",
    period: "Jan 2015 – Present",
    location: "Remote · clients in Dubai, Armenia and the US",
    context: "Nine web and mobile products: HomeTrust (admin panel and web app), TravelLeadApp, a customer/driver taxi-hailing pair, Dayra and Sadaf (marketing site, web app and API each).",
    bullets: [
      "Delivered nine web and mobile products for international clients, running each engagement solo from requirements and estimates through release and handover.",
    ],
    stack: ["React", "Next.js", "React Native", "Node.js", "NestJS", "PostgreSQL", "MongoDB", "Firebase"],
    branch: "freelance",
  },
];
