import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import Link from "next/link";
import { experience, profile } from "@content";
import { JsonLd } from "@/components/JsonLd";
import { CV_PDF, SITE_URL } from "@/lib/site";

const vazir = Vazirmatn({ subsets: ["arabic", "latin"], display: "swap", weight: ["400", "500", "700"] });

export const metadata: Metadata = {
  title: { absolute: profile.fa.title },
  description: profile.fa.description,
  keywords: [...profile.nameVariants, profile.name, "برنامه‌نویس فول‌استک", "توسعه‌دهنده React Native", "مهندس نرم‌افزار"],
  alternates: { canonical: "/fa/", languages: { en: "/", fa: "/fa/", "x-default": "/" } },
  openGraph: {
    type: "profile",
    url: `${SITE_URL}/fa/`,
    title: profile.fa.title,
    description: profile.fa.description,
    locale: "fa_IR",
    alternateLocale: ["en_GB"],
    images: [{ url: "/og.png", width: 1200, height: 630, alt: profile.fa.name }],
  },
};

export default function PersianPage() {
  const fa = profile.fa;
  return (
    <div lang="fa" dir="rtl" className={`${vazir.className} flex-1`}>
      <JsonLd lang="fa" />
      <header className="border-b border-border/70">
        <div className="container-x flex h-14 items-center justify-between">
          <Link href="/" className="text-sm text-muted hover:text-fg" lang="en" dir="ltr">
            English →
          </Link>
          <a href={CV_PDF} className="rounded-md bg-accent px-3 py-1.5 text-sm font-medium text-white">
            دانلود رزومه (PDF)
          </a>
        </div>
      </header>

      <main className="container-x py-16 sm:py-24">
        <div className="max-w-3xl">
          <p className="text-sm text-muted">
            {fa.nickname} · {fa.fullName} ·{" "}
            <span lang="en" dir="ltr">
              {profile.name}
            </span>
          </p>
          <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">{fa.name}</h1>
          <p className="mt-4 text-lg leading-relaxed sm:text-xl">{fa.headline}</p>

          <div className="mt-8 space-y-4 text-base leading-loose text-fg/90">
            {fa.summary.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>

          <section className="mt-12">
            <h2 className="text-xl font-bold">سوابق کاری</h2>
            <ul className="mt-4 space-y-3">
              {experience.map((r) => (
                <li key={r.company + r.period} className="rounded-xl border border-border bg-card p-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="font-medium" lang="en" dir="ltr">
                      {r.title} · {r.company}
                    </span>
                    <span className="font-mono text-xs text-muted" lang="en" dir="ltr">
                      {r.period}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-muted">
              شرح کامل هر نقش در{" "}
              <Link href="/" className="text-accent hover:underline">
                نسخه‌ی انگلیسی
              </Link>{" "}
              و{" "}
              <Link href="/cv/" className="text-accent hover:underline">
                رزومه
              </Link>{" "}
              آمده است.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-xl font-bold">تماس</h2>
            <ul className="mt-4 space-y-2 text-base">
              <li>
                ایمیل:{" "}
                <a href={`mailto:${profile.email}`} className="text-accent hover:underline" lang="en" dir="ltr">
                  {profile.email}
                </a>
              </li>
              <li>
                گیت‌هاب:{" "}
                <a href={profile.github} className="text-accent hover:underline" lang="en" dir="ltr" target="_blank" rel="noreferrer">
                  github.com/KianooshSoleimani
                </a>
              </li>
              <li>
                لینکدین:{" "}
                <a href={profile.linkedin} className="text-accent hover:underline" lang="en" dir="ltr" target="_blank" rel="noreferrer">
                  linkedin.com/in/kianoosh-soleimani
                </a>
              </li>
              <li>محل سکونت: بریتانیا (ویگستون، لسترشر) · دارای مجوز کار در بریتانیا</li>
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
}
