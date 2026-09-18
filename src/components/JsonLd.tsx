import { education, profile, skills } from "@content";
import { SITE_URL } from "@/lib/site";

/**
 * schema.org graph: WebSite + ProfilePage whose main entity is the Person.
 * `alternateName` carries every spelling and script of the name so a search
 * for any of them resolves to this entity.
 */
export function JsonLd({ lang = "en" }: { lang?: "en" | "fa" }) {
  const personId = `${SITE_URL}/#person`;
  const person = {
    "@type": "Person",
    "@id": personId,
    name: profile.name,
    givenName: "Kianoosh",
    familyName: "Soleimani",
    alternateName: profile.nameVariants,
    url: SITE_URL,
    image: `${SITE_URL}/og.png`,
    email: `mailto:${profile.email}`,
    jobTitle: profile.currentRole.title,
    description: profile.subHeadline,
    address: { "@type": "PostalAddress", addressLocality: "Wigston", addressRegion: "Leicestershire", addressCountry: "GB" },
    worksFor: { "@type": "Organization", name: profile.currentRole.company },
    alumniOf: education.map((e) => ({ "@type": "CollegeOrUniversity", name: e.institution })),
    knowsAbout: skills.flatMap((g) => g.items).slice(0, 25),
    knowsLanguage: ["en", "fa"],
    sameAs: [profile.github, profile.linkedin, "https://www.npmjs.com/~kianooshsoleimani"],
  };
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: profile.name,
        alternateName: profile.nameVariants,
        inLanguage: ["en", "fa"],
        publisher: { "@id": personId },
      },
      {
        "@type": "ProfilePage",
        "@id": lang === "fa" ? `${SITE_URL}/fa/#page` : `${SITE_URL}/#page`,
        url: lang === "fa" ? `${SITE_URL}/fa/` : `${SITE_URL}/`,
        name: lang === "fa" ? profile.fa.title : `${profile.name} — Senior Full-Stack Engineer`,
        inLanguage: lang,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        mainEntity: { "@id": personId },
        dateModified: new Date().toISOString().slice(0, 10),
      },
      person,
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
