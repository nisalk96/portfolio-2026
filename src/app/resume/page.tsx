import Link from "next/link";
import { transitionTypes } from "@/components/motion/PageTransition";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { experience as fallbackExperience } from "@/data/experience";
import { profile } from "@/data/profile";
import { skillCategories } from "@/data/skills";
import { mapHygraphExperiences } from "@/lib/cms-mappers";
import { jsonLdScript, pageMetadata } from "@/lib/seo";
import { getAllExperiences } from "@/server/hygraph";

export const revalidate = 3600;

export const metadata = pageMetadata(
  `Resume — ${profile.name}`,
  `Resume for ${profile.name}, ${profile.title} based in ${profile.location}.`,
  "/resume",
);

export default async function ResumePage() {
  const cmsExperiences = await getAllExperiences().catch(() => null);
  const experience =
    cmsExperiences && cmsExperiences.length > 0
      ? mapHygraphExperiences(cmsExperiences)
      : fallbackExperience;

  return (
    <SiteChrome>
      <main className="py-10 md:py-14">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLdScript({
              "@context": "https://schema.org",
              "@type": "ProfilePage",
              "@id": "https://nisalk.dev/resume#profile",
              url: "https://nisalk.dev/resume",
              name: `Resume — ${profile.name}`,
              mainEntity: { "@id": "https://nisalk.dev/#person" },
              isPartOf: { "@id": "https://nisalk.dev/#website" },
            }),
          }}
        />

        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-xs text-muted-foreground">
              nisalk.dev
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">
              {profile.name}
            </h1>
            <p className="mt-1 text-muted-foreground">{profile.title}</p>
          </div>
          <Link
            href="/"
            transitionTypes={transitionTypes.back}
            className="rounded-lg border border-border px-3 py-1.5 text-sm hover:bg-muted"
          >
            Back to portfolio
          </Link>
        </div>

        <section className="space-y-2 text-sm text-muted-foreground">
          <p>{profile.intro}</p>
          <p>
            {profile.location} · {profile.email} ·{" "}
            <a className="underline" href={profile.github}>
              GitHub
            </a>{" "}
            ·{" "}
            <a className="underline" href={profile.linkedin}>
              LinkedIn
            </a>
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-lg font-semibold">Experience</h2>
          <div className="mt-4 space-y-6">
            {experience.map((job) => (
              <article key={job.id}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-medium">
                    {job.role} · {job.company}
                  </h3>
                  <span className="font-mono text-xs text-muted-foreground">
                    {job.period}
                  </span>
                </div>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                  {job.achievements.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg font-semibold">Technical Stack</h2>
          <div className="mt-4 space-y-3">
            {skillCategories.map((category) => (
              <p key={category.id} className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">
                  {category.name}:
                </span>{" "}
                {category.skills.join(", ")}
              </p>
            ))}
          </div>
        </section>
      </main>
    </SiteChrome>
  );
}
