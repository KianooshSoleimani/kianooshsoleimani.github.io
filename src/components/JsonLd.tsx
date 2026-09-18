import { education, profile, skills } from "@content";
import { SITE_URL } from "@/lib/site";

export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: SITE_URL,
    email: `mailto:${profile.email}`,
    jobTitle: profile.currentRole.title,
    description: profile.subHeadline,
    address: { "@type": "PostalAddress", addressLocality: "Wigston", addressRegion: "Leicestershire", addressCountry: "GB" },
    worksFor: { "@type": "Organization", name: profile.currentRole.company },
    alumniOf: education.map((e) => ({ "@type": "CollegeOrUniversity", name: e.institution })),
    knowsAbout: skills.flatMap((g) => g.items).slice(0, 25),
    sameAs: [profile.github, profile.linkedin],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
