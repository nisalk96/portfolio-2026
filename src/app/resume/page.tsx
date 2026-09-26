import Link from "next/link";
import { experience } from "@/data/experience";
import { profile } from "@/data/profile";
import { skillCategories } from "@/data/skills";

export const metadata = {
  title: "Resume — nisalk.dev",
  description: `Resume for ${profile.name}`,
};

export default function ResumePage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12 text-foreground">
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs text-muted-foreground">nisalk.dev</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            {profile.name}
          </h1>
          <p className="mt-1 text-muted-foreground">{profile.title}</p>
        </div>
        <Link
          href="/"
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
  );
}
